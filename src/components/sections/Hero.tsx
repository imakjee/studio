
"use client";

import Image from 'next/image';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import SearchBox from './SearchBox';
import { Shield, Star, BadgeCheck } from 'lucide-react';

export default function Hero() {
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'companyInfo', 'globalSettings'), [db]);
  const { data: settings } = useDoc(settingsRef);

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-beach');

  return (
    <section className="relative min-h-[600px] lg:min-h-[750px] flex items-center overflow-hidden w-full">
      {/* Background with high-priority loading */}
      <div className="absolute inset-0 z-0">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Luxury beach holiday destination - Tailor Travels"
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={85}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6 drop-shadow-xl animate-in fade-in slide-in-from-top-4 duration-1000">
            {settings?.heroHeading || 'Your Perfect Holiday Awaits'}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto font-medium drop-shadow-md animate-in fade-in slide-in-from-top-6 duration-1000 delay-200">
            {settings?.heroSubtitle || 'Discover luxury destinations and unforgettable experiences worldwide.'}
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <SearchBox />
          
          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 lg:gap-12 text-white">
            <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-default">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm font-bold tracking-tight">ATOL Protected</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-default">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span className="text-sm font-bold tracking-tight">4.8/5 Rated</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-default">
              <BadgeCheck className="w-5 h-5 text-accent" />
              <span className="text-sm font-bold tracking-tight">Expert Travel Advice</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
