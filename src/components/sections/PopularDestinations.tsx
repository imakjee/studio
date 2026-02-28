'use client';

import Image from 'next/image';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

export default function PopularDestinations() {
  const db = useFirestore();
  
  const popularQuery = useMemoFirebase(() => 
    query(
      collection(db, 'destinations'), 
      where('isPopular', '==', true), 
      limit(4) // PRODUCTION: Limit query to minimize database load
    ), 
  [db]);

  const { data: destinations, isLoading } = useCollection(popularQuery);

  return (
    <section className="py-20 bg-white w-full">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold mb-4">Popular Destinations</h2>
          <p className="text-muted-foreground text-lg">
            Explore our most sought-after holiday hotspots from around the globe.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !destinations?.length ? (
          <div className="text-center py-20 text-muted-foreground">No destinations found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <div key={dest.id} className="relative group h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-transform hover:-translate-y-1">
                {dest.imageUrl && (
                  <Image
                    src={dest.imageUrl}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm font-medium text-accent uppercase tracking-widest mb-1">Elite Hotspot</p>
                  <h3 className="text-2xl font-bold font-headline">{dest.name}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
