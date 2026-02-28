'use client';

import { useState } from 'react';
import { useUser, useAuth } from '@/firebase';
import { updatePassword, updateEmail } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2, ShieldCheck, Mail, Lock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdminProfilePage() {
  const { user } = useUser();
  const auth = useAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    
    if (newPassword !== confirmPassword) {
      toast({ variant: "destructive", title: "Passwords mismatch", description: "The new passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
        toast({ title: "Password Updated", description: "Your admin password has been changed." });
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        toast({ 
          variant: "destructive", 
          title: "Re-authentication required", 
          description: "For security, please sign out and sign back in before changing your password." 
        });
      } else {
        toast({ variant: "destructive", title: "Error", description: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary">My Account</h1>
        <p className="text-muted-foreground">Manage your administrative credentials and security settings.</p>
      </div>

      <Alert className="bg-blue-50 border-blue-200 text-blue-800 rounded-2xl">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="font-bold">Security Note</AlertTitle>
        <AlertDescription className="text-xs">
          For your protection, Firebase requires a recent login to change sensitive information like your password. If the update fails, please sign out and sign back in.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 gap-8">
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="bg-primary/5 pb-6">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Mail className="w-5 h-5 text-accent" />
              Account Email
            </CardTitle>
            <CardDescription>Your unique administrator identification email.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input 
                value={email} 
                disabled 
                className="rounded-xl h-11 bg-muted/50 cursor-not-allowed"
              />
              <p className="text-[10px] text-muted-foreground italic">Email changes are restricted to ensure system integrity. Contact system owner for email transfers.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="bg-primary/5 pb-6">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent" />
              Update Password
            </CardTitle>
            <CardDescription>Secure your Tailor Travels management access.</CardDescription>
          </CardHeader>
          <form onSubmit={handleUpdatePassword}>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input 
                  type="password"
                  value={newPassword} 
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input 
                  type="password"
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  required
                  className="rounded-xl h-11"
                />
              </div>
            </CardContent>
            <CardFooter className="pb-8">
              <Button 
                type="submit" 
                disabled={loading || !newPassword}
                className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12 font-bold"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
                Update Password
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
