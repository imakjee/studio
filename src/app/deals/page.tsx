
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import HolidayCard from '@/components/shared/HolidayCard';
import { HOLIDAYS } from '@/lib/holiday-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag, Clock, Percent } from 'lucide-react';

export default function DealsPage() {
  const deals = HOLIDAYS.filter(h => h.lastMinute);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      
      <main className="flex-grow bg-muted/30">
        <section className="bg-accent text-white py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 -skew-x-12 translate-x-1/2" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Tag className="w-8 h-8" />
              <Badge className="bg-white text-accent font-bold px-3 py-1">Exclusive Offers</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-headline mb-6">Unbeatable Deals</h1>
            <p className="text-xl text-white/90 max-w-xl leading-relaxed">
              Grab a bargain with our hand-picked last-minute offers and seasonal sales. Luxury travel for less.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 mb-12">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 font-bold">All Deals</Button>
              <Button variant="outline" className="border-primary text-primary rounded-full px-8 font-bold hover:bg-primary/5">Last Minute</Button>
              <Button variant="outline" className="border-primary text-primary rounded-full px-8 font-bold hover:bg-primary/5">Under £500</Button>
              <Button variant="outline" className="border-primary text-primary rounded-full px-8 font-bold hover:bg-primary/5">Family Offers</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deals.map(holiday => (
                <div key={holiday.id} className="relative">
                  <HolidayCard holiday={holiday} />
                  <div className="absolute -top-3 -right-3 w-16 h-16 bg-accent rounded-full flex flex-col items-center justify-center text-white shadow-lg border-2 border-white z-20">
                    <span className="text-[10px] font-bold uppercase leading-none">Save</span>
                    <span className="text-xl font-bold leading-none">£{(holiday.oldPrice || 0) - holiday.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white/5 backdrop-blur-md rounded-[40px] p-12 border border-white/10">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4 text-accent">
                  <Clock className="w-6 h-6" />
                  <span className="font-bold uppercase tracking-widest text-sm">Flash Sale</span>
                </div>
                <h2 className="text-4xl font-bold font-headline mb-4">Register for Priority Access</h2>
                <p className="text-white/70 text-lg">
                  Be the first to hear about our biggest sales. Our members get 24-hour priority access to the best limited-time deals.
                </p>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <Button size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-white font-bold h-16 px-12 rounded-2xl text-lg shadow-xl shadow-accent/20 transition-transform active:scale-95">
                  Join Elite Club
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
