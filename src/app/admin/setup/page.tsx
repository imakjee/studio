'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, ShieldCheck, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminSetupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
      // 1. Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, finalEmail, finalPass);
      const user = userCredential.user;

      // 2. Grant admin role in Firestore
      await setDoc(doc(db, 'roles_admin', user.uid), {
        role: 'admin',
        email: user.email,
        createdAt: serverTimestamp(),
      });

      toast({ 
        title: "Admin Created!", 
        description: "Your account is now ready. Redirecting to login..." 
      });
      
      setTimeout(() => router.push('/admin/login'), 2000);
    } catch (error: any) {
      // If user already exists, maybe they just need the role?
      if (error.code === 'auth/email-already-in-use') {
        toast({
          variant: "destructive",
          title: "Account exists",
          description: "This email is already registered. Try logging in or use a different email.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Setup Failed",
          description: error.message || "Something went wrong during setup.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSetup = () => {
    handleSetup(undefined, 'admin@eliteescapes.co.uk', 'password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-2xl border-none rounded-[40px] overflow-hidden">
        <CardHeader className="space-y-1 text-center bg-primary text-white py-10">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <UserPlus className="w-8 h-8 text-accent" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold">Admin Setup</CardTitle>
          <CardDescription className="text-white/70">
            Initialize your Elite Escapes management account
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-10">
          <div className="bg-accent/5 p-6 rounded-3xl border border-accent/10 space-y-4">
            <div className="flex items-center gap-2 text-accent font-bold text-sm mb-2">
              <Zap className="w-4 h-4" /> Quick Start
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Click below to create a default admin account instantly for testing.
            </p>
            <Button 
              onClick={handleQuickSetup} 
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-12 rounded-2xl shadow-lg shadow-accent/20"
            >
              Quick Create: admin@eliteescapes.co.uk
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or create custom</span>
            </div>
          </div>

          <form onSubmit={handleSetup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. yourname@eliteescapes.co.uk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Choose Password</Label>
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
              {loading ? "Creating Account..." : "Create Custom Account"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="bg-muted/50 p-6">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <ShieldCheck className="w-3 h-3 text-green-600" />
            Admin accounts have full control over holidays and subscribers.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
