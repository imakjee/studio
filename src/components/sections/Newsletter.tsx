"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const db = useFirestore();
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, 'newsletterSubscribers'), {
        email: email,
        subscriptionDate: new Date().toISOString(),
        createdAt: serverTimestamp(),
      });
      
      setIsSubscribed(true);
      setEmail("");
      toast({
        title: "Subscribed!",
        description: "Welcome to Elite Escapes. You'll hear from us soon.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Subscription Failed",
        description: "Unable to join the newsletter at this time. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-24 bg-gradient-to-br from-[#0F4C55] to-[#0B3D44] text-white w-full">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-green-500/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 border border-green-500/30">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-4">You're on the list!</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
            Thank you for joining our community. Check your inbox soon for your first exclusive travel update.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-[#0F4C55] to-[#0B3D44] text-white w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20">
            <Mail className="w-10 h-10 text-accent" />
          </div>
          
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-4">Get Exclusive Deals</h2>
          <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Subscribe to our newsletter and be the first to know about special offers, new destinations, and travel tips.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white text-primary h-14 rounded-full border-none px-8 placeholder:text-muted-foreground focus-visible:ring-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-accent hover:bg-accent/90 text-white h-14 rounded-full px-10 font-bold shrink-0 transition-all active:scale-95 shadow-lg shadow-accent/20"
            >
              {loading ? "Joining..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-sm text-white/50">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
