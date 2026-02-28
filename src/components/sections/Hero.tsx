"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { generateHeadline } from '@/ai/flows/ai-enhanced-headline-generation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import SearchBox from './SearchBox';
import { Shield, Star, BadgeCheck } from 'lucide-react';

export default function Hero() {
  const [subtitle, setSubtitle] = useState("Discover luxury destinations and unforgettable experiences worldwide.");
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-beach');

  useEffect(() => {
    async function fetchAIHeadline() {
      try {
        const result = await generateHeadline({
          purpose: "hero section subtitle",
          details: "premium luxury travel agency focusing on beach, cruise and family holidays",
          keywords: ["luxury", "unforgettable", "exclusive"]
        });
        if (result.headline) setSubtitle(result.headline);
      } catch (e) {
        console.error("Failed to generate AI headline", e);
      }
    }
    fetchAIHeadline();
  }, []);

  return (
    <section className="relative min-h-[700px] py-20 overflow-hidden w-full">
      {/* Background with overlay (Stretches Full Width) */}
      <div className="absolute inset-0 z-0">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Centered Content Container */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl md:text-6xl text-white font-bold mb-4 drop-shadow-lg">
            Your Perfect Holiday Awaits
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium drop-shadow-md">
            {subtitle}
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto">
          <SearchBox />
          
          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-white">
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">ATOL Protected</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span className="text-sm font-medium">4.8/5 Customer Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <BadgeCheck className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Price Match Promise</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
