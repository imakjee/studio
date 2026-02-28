'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminSetupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Grant admin role in Firestore
      // Note: In a production app, you'd protect this with a secret key or manual console entry.
      // For this prototype, we're allowing the first-time setup via this page.
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
      toast({
        variant: "destructive",
        title: "Setup Failed",
        description: error.message || "Something went wrong during setup.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-2xl border-none">
        <CardHeader className="space-y-1 text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-6 h-6 text-accent" />
          </div>
          <CardTitle className="text-2xl font-headline font-bold">Initial Admin Setup</CardTitle>
          <CardDescription>
            Create your primary administrator account for Elite Escapes.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSetup}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@eliteescapes.co.uk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Choose Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl"
              />
              <p className="text-[10px] text-muted-foreground italic">Must be at least 6 characters.</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 h-12 rounded-xl font-bold">
              {loading ? "Creating Account..." : "Create Admin Account"}
            </Button>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground bg-muted/50 p-2 rounded-lg">
              <ShieldCheck className="w-3 h-3 text-green-600" />
              This account will have full access to the holiday management system.
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
