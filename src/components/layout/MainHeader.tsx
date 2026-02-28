'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

const NAV_ITEMS = [
  { label: 'Holidays', href: '/holidays' },
  { label: 'Cruises', href: '/cruises' },
  { label: 'Deals', href: '/deals' },
  { label: 'Find a Branch', href: '/branches' },
  { label: 'About Us', href: '/about' },
];

export default function MainHeader() {
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'companyInfo', 'globalSettings'), [db]);
  const { data: settings } = useDoc(settingsRef);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors">
            <span className="text-white font-headline text-xl font-bold italic">E</span>
          </div>
          <span className="font-headline text-xl font-bold tracking-tight text-primary uppercase">
            Elite<span className="text-accent">Escapes</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden sm:block">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              {settings?.ctaQuoteButtonText || 'Get a Quote'}
            </Button>
          </Link>
          <Button className="bg-accent hover:bg-accent/90 text-white font-bold flex items-center gap-2 px-6 shadow-lg shadow-accent/20">
            <Phone className="w-4 h-4" />
            <span className="hidden xs:inline">{settings?.contactPhoneNumber || '0800 123 4567'}</span>
            <span className="xs:hidden">Call</span>
          </Button>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-6 mt-10">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-lg font-bold text-primary hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link href="/contact" className="w-full">
                    <Button variant="outline" className="w-full border-primary text-primary">
                      Get a Quote
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
