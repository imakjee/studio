'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Plane, ArrowLeftRight, ShieldCheck, Utensils, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HolidayCardProps {
  holiday: any; // Using Firestore holiday object
}

export default function HolidayCard({ holiday }: HolidayCardProps) {
  return (
    <article className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5 border border-border/40 flex flex-col h-full group transition-all duration-500 hover:translate-y-[-8px]">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden shrink-0">
        <Image 
          src={holiday.mainImageUrl || 'https://picsum.photos/seed/holiday/600/400'} 
          alt={`${holiday.name} holiday in ${holiday.location}`} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Rating stars in top right */}
        <div className="absolute top-4 right-4 bg-white rounded-full px-2.5 py-1 flex gap-0.5 shadow-md">
          {[...Array(4)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Location in bottom left */}
        <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 text-white border border-white/10">
          <MapPin className="w-4 h-4 text-white" />
          <span className="text-sm font-bold tracking-tight">{holiday.location}</span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-headline text-2xl font-bold text-[#054452] mb-4 group-hover:text-accent transition-colors leading-tight">
          <Link href={`/holidays/${holiday.id}`} aria-label={`View details for ${holiday.name}`}>
            {holiday.name}
          </Link>
        </h3>
        
        {/* Features row */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px] font-bold text-[#006680] mb-8">
          <div className="flex items-center gap-1.5">
            <Plane className="w-4 h-4" /> Flights
          </div>
          <span className="text-gray-300 font-normal">|</span>
          <div className="flex items-center gap-1.5">
            <ArrowLeftRight className="w-4 h-4" /> Transfers
          </div>
          <span className="text-gray-300 font-normal">|</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> ATOL
          </div>
          <span className="text-gray-300 font-normal">|</span>
          <div className="flex items-center gap-1.5">
            <Utensils className="w-4 h-4" /> {holiday.boardType || 'Room Only'}
          </div>
        </div>

        {/* Bottom pricing row */}
        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-black text-[#054452]">£{holiday.pricePerPerson}</span>
            <span className="text-base font-medium text-gray-400">pp</span>
          </div>
          <div className="text-lg font-bold text-[#054452]">
            {holiday.durationNights} Nights
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Link href={`/holidays/${holiday.id}`} className="w-full">
            <Button className="w-full bg-[#f4a825] hover:bg-[#e09612] text-white font-bold h-14 rounded-2xl shadow-xl shadow-orange-200 transition-all active:scale-95">
              View Deal
            </Button>
          </Link>
          <Button variant="outline" className="w-full border-2 border-[#006680] text-[#006680] hover:bg-[#006680]/5 font-bold h-14 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95">
            <Phone className="w-5 h-5" />
            Call to Book
          </Button>
        </div>
      </div>
    </article>
  );
}