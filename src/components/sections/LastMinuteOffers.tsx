import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Clock, Star } from 'lucide-react';

const OFFERS = [
  {
    id: 1,
    image: PlaceHolderImages.find(img => img.id === 'tenerife-beach'),
    hotel: 'Hard Rock Hotel Tenerife',
    location: 'Canary Islands, Spain',
    oldPrice: '849',
    newPrice: '649',
    save: '200',
    date: 'Oct 15, 2024'
  },
  {
    id: 2,
    image: PlaceHolderImages.find(img => img.id === 'santorini-view'),
    hotel: 'Santo Pure Oia Suites',
    location: 'Cyclades, Greece',
    oldPrice: '1,199',
    newPrice: '899',
    save: '300',
    date: 'Sep 28, 2024'
  }
];

export default function LastMinuteOffers() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden w-full">
      {/* Decorative background circle */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Badge className="bg-accent text-white mb-4 px-3 py-1">Hurry! Deals ending soon</Badge>
            <h2 className="font-headline text-3xl md:text-5xl text-white font-bold">Last Minute Offers</h2>
          </div>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary transition-all font-bold h-12">
            View All Offers
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {OFFERS.map((offer) => (
            <div key={offer.id} className="bg-white rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 shadow-2xl items-center md:items-stretch">
              <div className="relative w-full md:w-56 h-48 rounded-xl overflow-hidden shrink-0">
                {offer.image && (
                  <Image 
                    src={offer.image.imageUrl} 
                    alt={offer.hotel} 
                    fill 
                    className="object-cover"
                    data-ai-hint={offer.image.imageHint}
                  />
                )}
                <Badge className="absolute top-2 left-2 bg-accent text-white font-bold">Save £{offer.save}</Badge>
              </div>
              
              <div className="flex flex-col flex-1 justify-between py-2 w-full">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline text-xl font-bold text-primary leading-tight">{offer.hotel}</h3>
                    <div className="flex gap-0.5">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <Star className="w-3 h-3 fill-accent text-accent" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm font-medium mb-4">{offer.location}</p>
                  
                  <div className="flex items-center gap-2 text-primary/60 text-sm font-semibold mb-4 bg-background px-3 py-1.5 rounded-lg inline-flex">
                    <Clock className="w-4 h-4" />
                    Departs: {offer.date}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="block text-xs text-muted-foreground line-through decoration-destructive/50">Was £{offer.oldPrice}</span>
                    <span className="text-3xl font-bold text-primary">£{offer.newPrice}</span>
                  </div>
                  <Button className="bg-accent hover:bg-accent/90 text-white font-bold px-8 h-12 rounded-xl shadow-lg shadow-accent/20">
                    View Deal
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
