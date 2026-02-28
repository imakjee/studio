
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing, ${email}!`);
    setEmail("");
  };

  return (
    <section className="py-20 bg-primary/95 text-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="bg-white/5 backdrop-blur-sm p-8 md:p-16 rounded-[40px] border border-white/10">
          <Mail className="w-12 h-12 text-accent mx-auto mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive deals, travel inspiration, and the latest updates from Elite Escapes.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white/10 border-white/20 h-14 rounded-xl text-white placeholder:text-white/40 focus-visible:ring-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-white h-14 rounded-xl px-10 font-bold shrink-0 transition-transform active:scale-95 shadow-lg shadow-accent/20">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-white/40 mt-6">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </div>
    </section>
  );
}
