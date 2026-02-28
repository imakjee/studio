'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { Clock, Star, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LastMinuteOffers() {
  const db = useFirestore();
  
  const offersQuery = useMemoFirebase(() => 
    query(
      collection(db, 'holidays'), 
      where('isLastMinuteOffer', '==', true), 
      limit(3) // PRODUCTION: Limit result set for faster page rendering
    ), 
  [db]);

  const { data: offers, isLoading } = useCollection(offersQuery);

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
          <Link href="/deals">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary transition-all font-bold h-12">
              View All Offers
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : !offers?.length ? (
          <div className="text-center py-20 text-white/60 bg-white/5 rounded-[40px] border border-white/10">
            <p>New last-minute deals are coming soon. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-2xl p-4 md:p-6 flex flex-col gap-6 shadow-2xl">
                <div className="relative w-full h-56 rounded-xl overflow-hidden shrink-0">
                  <Image 
                    src={offer.mainImageUrl || 'https://picsum.photos/seed/holiday/600/400'} 
                    alt={offer.name} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <Badge className="absolute top-3 left-3 bg-accent text-white font-bold px-3 py-1 shadow-lg">Special Offer</Badge>
                </div>
                
                <div className="flex flex-col flex-1 justify-between py-2 w-full">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-headline text-xl font-bold text-primary leading-tight line-clamp-1">{offer.name}</h3>
                      <div className="flex gap-0.5 shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < (offer.ratingStars || 5) ? 'fill-accent text-accent' : 'fill-muted text-muted'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium mb-4">{offer.location}</p>
                    
                    <div className="flex items-center gap-2 text-primary/60 text-sm font-semibold mb-4 bg-muted/50 px-3 py-1.5 rounded-lg inline-flex">
                      <Clock className="w-4 h-4" />
                      {offer.durationNights} Nights
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
                    <div>
                      {offer.oldPricePerPerson && <span className="block text-xs text-muted-foreground line-through decoration-destructive/50">Was £{offer.oldPricePerPerson}</span>}
                      <span className="text-3xl font-bold text-primary">£{offer.pricePerPerson}</span>
                    </div>
                    <Link href={`/holidays/${offer.id}`}>
                      <Button className="bg-accent hover:bg-accent/90 text-white font-bold px-6 h-12 rounded-xl shadow-lg shadow-accent/20 transition-transform active:scale-95">
                        View Deal
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
