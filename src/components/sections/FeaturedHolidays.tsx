
import Image from 'next/image';
import { Star, MapPin, Clock, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const HOLIDAYS = [
  {
    id: 1,
    image: PlaceHolderImages.find(img => img.id === 'maldives-luxury'),
    location: 'Maldives',
    hotel: 'Ozen Reserve Bolifushi',
    rating: 5,
    duration: '7 Nights',
    board: 'All Inclusive',
    price: '2,499'
  },
  {
    id: 2,
    image: PlaceHolderImages.find(img => img.id === 'santorini-view'),
    location: 'Santorini, Greece',
    hotel: 'Canaves Oia Luxury Suites',
    rating: 5,
    duration: '5 Nights',
    board: 'Bed & Breakfast',
    price: '1,249'
  },
  {
    id: 3,
    image: PlaceHolderImages.find(img => img.id === 'dubai-skyline'),
    location: 'Dubai, UAE',
    hotel: 'Atlantis The Royal',
    rating: 5,
    duration: '6 Nights',
    board: 'Half Board',
    price: '1,895'
  }
];

export default function FeaturedHolidays() {
  return (
    <section className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold mb-2">Featured Holidays</h2>
            <p className="text-muted-foreground">Handpicked luxury escapes just for you.</p>
          </div>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-all hidden md:flex">
            View All Holidays
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOLIDAYS.map((holiday) => (
            <div key={holiday.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-border/50">
              <div className="relative h-64 overflow-hidden">
                {holiday.image && (
                  <Image 
                    src={holiday.image.imageUrl} 
                    alt={holiday.hotel} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    data-ai-hint={holiday.image.imageHint}
                  />
                )}
                <Badge className="absolute top-4 left-4 bg-primary text-white font-medium">Limited Availability</Badge>
              </div>
              <div className="p-6">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(holiday.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase mb-1">
                  <MapPin className="w-3 h-3" />
                  {holiday.location}
                </div>
                <h3 className="font-headline text-xl font-bold text-primary mb-4">{holiday.hotel}</h3>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 border-y py-3 border-border/40">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary/60" />
                    {holiday.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Coffee className="w-4 h-4 text-primary/60" />
                    {holiday.board}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-xs text-muted-foreground uppercase font-semibold">From</span>
                    <span className="text-2xl font-bold text-primary">£{holiday.price}</span>
                    <span className="text-xs text-muted-foreground ml-1">pp</span>
                  </div>
                  <Button className="bg-accent hover:bg-accent/90 text-white rounded-xl px-6 h-11 font-bold">
                    View Deal
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex md:hidden">
          <Button variant="outline" className="w-full border-primary text-primary h-12 font-bold">
            View All Holidays
          </Button>
        </div>
      </div>
    </section>
  );
}
