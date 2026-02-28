
'use client';

import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message Sent!",
        description: "We'll be in touch within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      
      <main className="flex-grow bg-muted/30">
        <div className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Get in Touch</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Have a question or ready to book? Our travel experts are here to help you every step of the way.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-border/50">
                <h2 className="text-2xl font-bold text-primary mb-8 font-headline">Contact Details</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Call Us</p>
                      <p className="text-xl font-bold text-primary">0800 123 4567</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Email Us</p>
                      <p className="text-lg font-bold text-primary">hello@eliteescapes.co.uk</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Opening Hours</p>
                      <p className="text-sm font-medium text-primary">Mon - Sat: 9am - 8pm</p>
                      <p className="text-sm font-medium text-primary">Sun: 10am - 4pm</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent text-white p-8 rounded-3xl shadow-lg shadow-accent/20">
                <h3 className="text-xl font-bold mb-4">Live Chat</h3>
                <p className="text-white/80 mb-6">Need a quick answer? Chat live with one of our consultants right now.</p>
                <Button className="w-full bg-white text-accent hover:bg-white/90 font-bold h-12 rounded-xl">
                  Start Chat
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-border/50">
                <h2 className="text-2xl font-bold text-primary mb-8 font-headline">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" required className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required className="h-12 rounded-xl" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="07123 456789" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="General Inquiry" className="h-12 rounded-xl" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">How can we help?</Label>
                    <Textarea id="message" placeholder="Tell us about your dream holiday..." className="min-h-[150px] rounded-xl" required />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-14 rounded-2xl text-lg shadow-xl shadow-accent/20">
                    {loading ? "Sending..." : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" /> Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
