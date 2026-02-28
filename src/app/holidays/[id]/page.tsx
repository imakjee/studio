'use client';

import { use } from 'react';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Coffee, ShieldCheck, CheckCircle2, Phone, Calendar } from 'lucide-react';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function HolidayDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const db = useFirestore();
  const holidayRef = doc(db, 'holidays', id);
  const { data: holiday, isLoading } = useDoc(holidayRef);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-bold text-primary">Loading your escape...</p>
        </div>
      </div>
    );
  }

  if (!holiday) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Holiday Not Found</h1>
          <p className="text-muted-foreground mb-8">The luxury escape you're looking for might have been moved or removed.</p>
          <Button asChild className="bg-primary rounded-xl px-8">
            <a href="/holidays">Back to Holidays</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      
      <main className="flex-grow">
        {/* Gallery Section */}
        <section className="bg-muted/30 pt-8 pb-12">
          <div className="container mx-auto px-4 max-w-[1300px]">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-accent text-white font-bold">Featured Escape</Badge>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < (holiday.ratingStars || 5) ? 'fill-accent text-accent' : 'text-muted'}`} />
                    ))}
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">{holiday.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <MapPin className="w-4 h-4 text-accent" />
                  {holiday.location}
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 text-right w-full md:w-auto">
                <p className="text-sm font-bold text-muted-foreground uppercase">From only</p>
                <p className="text-4xl font-bold text-primary">£{holiday.pricePerPerson}<span className="text-sm font-medium ml-1">pp</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px] md:h-[600px]">
              <div className="lg:col-span-8 relative rounded-3xl overflow-hidden group shadow-xl">
                <Image 
                  src={holiday.mainImageUrl || 'https://picsum.photos/seed/holiday/1200/800'} 
                  alt={holiday.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
              <div className="hidden lg:grid lg:col-span-4 grid-rows-2 gap-6">
                <div className="relative rounded-3xl overflow-hidden shadow-lg">
                  <Image 
                    src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800" 
                    alt="Interior" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-3xl overflow-hidden shadow-lg">
                  <Image 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800" 
                    alt="Pool" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-[1300px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-3xl font-bold text-primary font-headline mb-6">About this Holiday</h2>
                  <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                    {holiday.description ? (
                      <p>{holiday.description}</p>
                    ) : (
                      <p>Discover a world of luxury at {holiday.name}. This hand-picked escape offers the perfect blend of relaxation and adventure. Every detail has been meticulously curated to ensure your stay is nothing short of extraordinary.</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-muted/30 p-8 rounded-3xl border border-border/50">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Duration</p>
                    <div className="flex items-center gap-2 font-bold text-primary">
                      <Clock className="w-5 h-5 text-accent" />
                      {holiday.durationNights} Nights
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Board Basis</p>
                    <div className="flex items-center gap-2 font-bold text-primary">
                      <Coffee className="w-5 h-5 text-accent" />
                      {holiday.boardType}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Departure</p>
                    <div className="flex items-center gap-2 font-bold text-primary">
                      <Calendar className="w-5 h-5 text-accent" />
                      {holiday.availableFromDate ? new Date(holiday.availableFromDate).toLocaleDateString() : 'Flex Dates'}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Safety</p>
                    <div className="flex items-center gap-2 font-bold text-primary">
                      <ShieldCheck className="w-5 h-5 text-accent" />
                      ATOL Protected
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-primary font-headline mb-6">What's Included</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Return flights from selected UK airports',
                      'Luxury accommodation in a prime location',
                      'Private airport transfers',
                      'All local taxes and security fees',
                      'Dedicated resort representative service',
                      '24/7 UK-based travel assistance'
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Card */}
              <aside className="lg:col-span-1">
                <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-border/50 sticky top-28">
                  <h3 className="text-2xl font-bold text-primary font-headline mb-6">Book Your Escape</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-muted-foreground">Select Number of Guests</p>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-12 rounded-xl border-accent text-accent">2 Adults</Button>
                        <Button variant="outline" className="h-12 rounded-xl">Family</Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-bold text-muted-foreground">Select Room Type</p>
                      <Button variant="outline" className="w-full h-12 rounded-xl justify-between px-4">
                        <span>Standard Suite</span>
                        <span className="text-accent font-bold">Included</span>
                      </Button>
                    </div>

                    <div className="pt-6 border-t border-border/50">
                      <div className="flex justify-between items-baseline mb-6">
                        <span className="text-lg font-bold text-primary">Total for 2 Adults</span>
                        <span className="text-3xl font-bold text-primary">£{holiday.pricePerPerson * 2}</span>
                      </div>
                      
                      <Button className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-16 rounded-2xl text-lg shadow-xl shadow-accent/20 mb-4">
                        Enquire Now
                      </Button>
                      <Button variant="outline" className="w-full border-primary text-primary font-bold h-16 rounded-2xl text-lg flex items-center justify-center gap-3">
                        <Phone className="w-6 h-6" />
                        0800 123 4567
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-center gap-6 grayscale opacity-50">
                    <span className="text-[10px] font-bold tracking-widest uppercase">ATOL PROTECTED</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase">ABTA MEMBER</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
