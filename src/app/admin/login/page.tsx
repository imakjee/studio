'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Login Successful", description: "Welcome back, Admin." });
      router.push('/admin');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-2xl border-none rounded-[40px] overflow-hidden">
        <CardHeader className="space-y-1 text-center bg-primary text-white py-12">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <ShieldAlert className="w-8 h-8 text-accent" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold">Admin Portal</CardTitle>
          <CardDescription className="text-white/70">
            Authorized access only
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 pt-10">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@eliteescapes.co.uk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl h-12"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl h-12"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4 pb-10">
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 h-12 rounded-2xl font-bold shadow-lg shadow-primary/20">
              {loading ? "Verifying..." : "Sign In"}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-xs text-muted-foreground mb-3">Don't have an account yet?</p>
              <Link href="/admin/setup">
                <Button variant="outline" className="w-full rounded-2xl h-12 border-accent text-accent hover:bg-accent/5 font-bold">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Go to Setup Page
                </Button>
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
