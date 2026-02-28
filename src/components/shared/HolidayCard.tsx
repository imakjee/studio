
'use client';

import Image from 'next/image';
import { Star, MapPin, Clock, Coffee, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Holiday } from '@/lib/holiday-data';

interface HolidayCardProps {
  holiday: Holiday;
}

export default function HolidayCard({ holiday }: HolidayCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-border/50 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden shrink-0">
        <Image 
          src={holiday.image} 
          alt={holiday.name} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          data-ai-hint={holiday.imageHint}
        />
        {holiday.lastMinute && (
          <Badge className="absolute top-4 left-4 bg-accent text-white font-bold px-3">
            Last Minute Deal
          </Badge>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < holiday.rating ? 'fill-accent text-accent' : 'fill-muted text-muted'}`} />
          ))}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase mb-1">
          <MapPin className="w-3 h-3 text-accent" />
          {holiday.location}
        </div>
        <h3 className="font-headline text-xl font-bold text-primary mb-3 line-clamp-1 group-hover:text-accent transition-colors">
          {holiday.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
          {holiday.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs font-semibold text-primary/70 mb-6 mt-auto border-t pt-4 border-border/40">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {holiday.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <Coffee className="w-4 h-4" />
            {holiday.boardBasis}
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4 border-border/40">
          <div>
            <span className="block text-xs text-muted-foreground uppercase font-bold">Total price from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">£{holiday.price}</span>
              <span className="text-xs text-muted-foreground">pp</span>
              {holiday.oldPrice && (
                <span className="text-sm text-muted-foreground line-through ml-1 decoration-destructive/50">£{holiday.oldPrice}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-6">
          <Link href={`/holidays/${holiday.id}`} className="w-full">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-xl">
              View Deal
            </Button>
          </Link>
          <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/5 font-bold h-11 rounded-xl flex items-center gap-2">
            <Phone className="w-3 h-3" />
            Book
          </Button>
        </div>
      </div>
    </div>
  );
}
