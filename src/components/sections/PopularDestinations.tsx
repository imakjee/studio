
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const DESTINATIONS = [
  { id: 'tenerife', name: 'Tenerife', subtitle: 'Island Paradise', image: PlaceHolderImages.find(img => img.id === 'tenerife-beach') },
  { id: 'nyc', name: 'New York', subtitle: 'The Big Apple', image: PlaceHolderImages.find(img => img.id === 'new-york') },
  { id: 'bali', name: 'Bali', subtitle: 'Tropical Retreat', image: PlaceHolderImages.find(img => img.id === 'bali-temple') },
  { id: 'maldives-grid', name: 'Maldives', subtitle: 'Pure Luxury', image: PlaceHolderImages.find(img => img.id === 'maldives-luxury') }
];

export default function PopularDestinations() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold mb-4">Popular Destinations</h2>
          <p className="text-muted-foreground text-lg">
            Explore our most sought-after holiday hotspots from around the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.map((dest) => (
            <div key={dest.id} className="relative group h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-transform hover:-translate-y-1">
              {dest.image && (
                <Image
                  src={dest.image.imageUrl}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint={dest.image.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-medium text-accent uppercase tracking-widest mb-1">{dest.subtitle}</p>
                <h3 className="text-2xl font-bold font-headline">{dest.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
