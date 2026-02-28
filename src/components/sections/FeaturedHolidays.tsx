'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import HolidayCard from '@/components/shared/HolidayCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function FeaturedHolidays() {
  const db = useFirestore();
  
  const featuredQuery = useMemoFirebase(() => 
    query(collection(db, 'holidays'), where('isFeatured', '==', true), limit(3)), 
  [db]);
  
  const { data: holidays, isLoading } = useCollection(featuredQuery);

  return (
    <section className="py-20 bg-background/50 w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold mb-2">Featured Holidays</h2>
            <p className="text-muted-foreground">Handpicked luxury escapes just for you.</p>
          </div>
          <Link href="/holidays">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-all hidden md:flex">
              View All Holidays
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !holidays?.length ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
            <p className="text-muted-foreground">Check back soon for our latest featured escapes.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {holidays.map((holiday) => (
              <HolidayCard key={holiday.id} holiday={holiday} />
            ))}
          </div>
        )}
        
        <div className="mt-8 flex md:hidden">
          <Link href="/holidays" className="w-full">
            <Button variant="outline" className="w-full border-primary text-primary h-12 font-bold">
              View All Holidays
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
