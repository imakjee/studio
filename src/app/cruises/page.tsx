
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import HolidayCard from '@/components/shared/HolidayCard';
import { HOLIDAYS } from '@/lib/holiday-data';
import { Ship, Anchor, Waves, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CruisesPage() {
  const cruiseHolidays = HOLIDAYS.filter(h => h.type === 'Cruise');

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-primary/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1920" 
            alt="Cruise Hero" 
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="container mx-auto px-4 relative z-20 text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-headline mb-6 drop-shadow-lg">Luxury Cruises</h1>
            <p className="text-xl max-w-2xl mx-auto font-medium mb-8 drop-shadow-md">
              Set sail on a voyage of discovery. Experience multiple destinations in unmatched comfort.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold rounded-xl px-10 h-14">
                View All Cruises
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md text-white border-white h-14 rounded-xl px-10 font-bold hover:bg-white/20">
                Cruise Experts
              </Button>
            </div>
          </div>
        </section>

        {/* Cruise Features */}
        <section className="py-20 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Ship, label: 'Modern Fleet' },
                { icon: Anchor, label: 'Unique Ports' },
                { icon: Waves, label: 'Full Board' },
                { icon: Compass, label: 'Expert Tours' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4 text-center group">
                  <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <item.icon className="w-8 h-8 text-primary group-hover:text-white" />
                  </div>
                  <span className="font-bold text-primary">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cruise Listing */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold font-headline text-primary mb-2">Our Top Cruise Picks</h2>
                <p className="text-muted-foreground">Hand-picked voyages from the world's best cruise lines.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cruiseHolidays.length > 0 ? (
                cruiseHolidays.map(holiday => (
                  <HolidayCard key={holiday.id} holiday={holiday} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-xl text-muted-foreground">New cruise deals are sailing in soon. Stay tuned!</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
