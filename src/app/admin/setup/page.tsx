'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, ShieldCheck, Zap, Loader2, Database, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminSetupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleSetup = async (e?: React.FormEvent, customEmail?: string, customPass?: string) => {
    if (e) e.preventDefault();
    
    const finalEmail = customEmail || email;
    const finalPass = customPass || password;

    if (!finalEmail || !finalPass) {
      toast({ variant: "destructive", title: "Missing info", description: "Please provide both email and password." });
      return;
    }

    setLoading(true);
    try {
      let user;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, finalEmail, finalPass);
        user = userCredential.user;
      } catch (authError: any) {
        if (authError.code === 'auth/email-already-in-use') {
          const userCredential = await signInWithEmailAndPassword(auth, finalEmail, finalPass);
          user = userCredential.user;
        } else {
          throw authError;
        }
      }

      await setDoc(doc(db, 'roles_admin', user.uid), {
        role: 'admin',
        email: user.email,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      toast({ 
        title: "Admin Ready!", 
        description: "Your account is active. You can now seed demo data or log in." 
      });
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Setup Failed",
        description: error.message || "Something went wrong during setup.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSeedData = async () => {
    setSeeding(true);
    try {
      // 1. Global Settings
      await setDoc(doc(db, 'companyInfo', 'globalSettings'), {
        contactPhoneNumber: '0800 123 4567',
        operatingHoursText: 'Open 7 days a week',
        heroHeading: 'Your Perfect Holiday Awaits',
        heroSubtitle: 'Discover bespoke luxury destinations and unforgettable experiences worldwide with Tailor Travels.',
        footerCopyrightText: 'Tailor Travels. All rights reserved.',
        logoUrl: '',
        ctaQuoteButtonText: 'Get a Quote',
        ctaCallButtonText: 'Call Us',
        searchWhereToLabel: 'Where to?',
        searchWhenLabel: 'When?',
        searchFlyingFromLabel: 'Flying from',
        searchGuestsLabel: 'Guests',
        searchButtonText: 'SEARCH',
        updatedAt: serverTimestamp(),
      });

      // 2. Destinations
      const dests = [
        { name: 'Maldives', isPopular: true, imageUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800', description: 'Paradise on earth with crystal clear waters.' },
        { name: 'Santorini', isPopular: true, imageUrl: 'https://images.unsplash.com/photo-1580225495234-00e84e19c85e?auto=format&fit=crop&q=80&w=800', description: 'Iconic sunsets and white-washed buildings.' },
        { name: 'Dubai', isPopular: true, imageUrl: 'https://images.unsplash.com/photo-1667592441284-b590021411e3?auto=format&fit=crop&q=80&w=800', description: 'Ultra-modern luxury in the heart of the desert.' },
        { name: 'Bali', isPopular: true, imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800', description: 'Tropical escape with rich culture and jungles.' },
      ];
      for (const d of dests) {
        await addDoc(collection(db, 'destinations'), { ...d, createdAt: serverTimestamp() });
      }

      // 3. Features
      const features = [
        { title: 'ATOL Protected', description: 'Your money is safe with us. Every flight-inclusive holiday is fully protected.', iconName: 'ShieldCheck', order: 1 },
        { title: 'Award Winning', description: 'Voted UK\'s best luxury travel agency for five consecutive years.', iconName: 'Trophy', order: 2 },
        { title: 'Expert Advice', description: 'Our consultants have visited 95% of the destinations we sell.', iconName: 'Headphones', order: 3 },
      ];
      for (const f of features) {
        await addDoc(collection(db, 'whyBookFeatures'), f);
      }

      // 4. Stats
      const stats = [
        { value: '500+', label: 'UK Branches', iconName: 'Building2', order: 1 },
        { value: '2M+', label: 'Happy Customers', iconName: 'Users', order: 2 },
        { value: '40yrs', label: 'Experience', iconName: 'Calendar', order: 3 },
        { value: '4.8/5', label: 'Review Score', iconName: 'Star', order: 4 },
      ];
      for (const s of stats) {
        await addDoc(collection(db, 'companyStatistics'), s);
      }

      // 5. Navigation
      const navs = [
        { label: 'Holidays', url: '/holidays', group: 'mainHeader', order: 1 },
        { label: 'Cruises', url: '/cruises', group: 'mainHeader', order: 2 },
        { label: 'Deals', url: '/deals', group: 'mainHeader', order: 3 },
        { label: 'Beach Holidays', url: '/holidays?type=beach', group: 'footerHolidayTypes', order: 1 },
        { label: 'About Us', url: '/about', group: 'footerCompany', order: 1 },
        { label: 'Contact Us', url: '/contact', group: 'footerCompany', order: 2 },
      ];
      for (const n of navs) {
        await addDoc(collection(db, 'navigationItems'), n);
      }

      // 6. Holidays
      const holidays = [
        {
          name: 'Ozen Reserve Bolifushi',
          location: 'South Male Atoll, Maldives',
          description: 'A bespoke luxury island experience where everything is tailored to your desires.',
          mainImageUrl: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?auto=format&fit=crop&q=80&w=800',
          pricePerPerson: 2499,
          durationNights: 7,
          ratingStars: 5,
          boardType: 'All-Inclusive',
          isFeatured: true,
          isLastMinuteOffer: false,
          currency: 'GBP',
          destinationId: 'global',
          availableFromDate: '2024-10-01',
          availableToDate: '2025-04-01',
          createdAt: serverTimestamp(),
        },
        {
          name: 'Atlantis The Royal',
          location: 'Palm Jumeirah, Dubai',
          description: 'The world\'s most ultra-luxury experiential resort. A masterpiece of architecture.',
          mainImageUrl: 'https://images.unsplash.com/photo-1667592441284-b590021411e3?auto=format&fit=crop&q=80&w=800',
          pricePerPerson: 1895,
          durationNights: 5,
          ratingStars: 5,
          boardType: 'Half-Board',
          isFeatured: true,
          isLastMinuteOffer: true,
          oldPricePerPerson: 2250,
          currency: 'GBP',
          destinationId: 'global',
          availableFromDate: '2024-09-15',
          availableToDate: '2024-12-31',
          createdAt: serverTimestamp(),
        }
      ];
      for (const h of holidays) {
        await addDoc(collection(db, 'holidays'), h);
      }

      toast({ title: "Database Seeded!", description: "All demo data has been successfully created." });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Seeding Failed", description: e.message });
    } finally {
      setSeeding(false);
    }
  };

  const handleQuickSetup = () => {
    handleSetup(undefined, 'admin@tailortravels.co.uk', 'password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-2xl border-none rounded-[40px] overflow-hidden">
        <CardHeader className="space-y-1 text-center bg-primary text-white py-10">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <UserPlus className="w-8 h-8 text-accent" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold">Tailor Travels Setup</CardTitle>
          <CardDescription className="text-white/70">
            Initialize your bespoke management system
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-10">
          <div className="space-y-4">
            <Button 
              onClick={handleQuickSetup} 
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-12 rounded-2xl shadow-lg shadow-accent/20"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
              Step 1: Create Admin Account
            </Button>

            <Button 
              onClick={handleSeedData} 
              disabled={seeding}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/5 font-bold h-12 rounded-2xl"
            >
              {seeding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Database className="w-4 h-4 mr-2" />}
              Step 2: Seed Professional Demo Data
            </Button>

            <Button 
              onClick={() => router.push('/admin/login')}
              variant="ghost"
              className="w-full text-muted-foreground h-12 rounded-2xl"
            >
              Step 3: Proceed to Login
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or Manual Setup</span>
            </div>
          </div>

          <form onSubmit={handleSetup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. yourname@tailortravels.co.uk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl h-12"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 h-12 rounded-2xl font-bold">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Register Custom Admin"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="bg-muted/50 p-6">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <ShieldCheck className="w-3 h-3 text-green-600" />
            Once data is seeded, your public site will be fully populated.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
