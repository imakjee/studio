
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Holidays', href: '#' },
  { label: 'Cruises', href: '#' },
  { label: 'Deals', href: '#' },
  { label: 'Find a Branch', href: '#' },
  { label: 'About Us', href: '#' },
];

export default function MainHeader() {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-headline text-xl font-bold italic">E</span>
          </div>
          <span className="font-headline text-xl font-bold tracking-tight text-primary uppercase">
            Elite<span className="text-accent">Escapes</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary/5">
            Get a Quote
          </Button>
          <Button className="bg-accent hover:bg-accent/90 text-white font-medium flex items-center gap-2 px-6">
            <Phone className="w-4 h-4" />
            Call Us
          </Button>
        </div>
      </div>
    </header>
  );
}
