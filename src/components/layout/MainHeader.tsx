'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, Menu, ChevronDown, Palmtree, Ship, Building2, Star, Compass, ArrowRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, where, limit, orderBy } from 'firebase/firestore';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const HOLIDAY_TYPES = [
  { label: 'Beach Holidays', href: '/holidays?type=beach', icon: Palmtree, desc: 'Sun-soaked sands and turquoise waters.' },
  { label: 'Luxury Cruises', href: '/cruises', icon: Ship, desc: 'Set sail on a voyage of discovery.' },
  { label: 'City Breaks', href: '/holidays?type=city', icon: Building2, desc: 'Culture, history, and vibrant life.' },
  { label: 'Bespoke Luxury', href: '/holidays?type=luxury', icon: Star, desc: 'Hand-picked premium experiences.' },
];

export default function MainHeader() {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const db = useFirestore();
  const menuRef = useRef<HTMLDivElement>(null);

  const settingsRef = useMemoFirebase(() => doc(db, 'companyInfo', 'globalSettings'), [db]);
  const { data: settings } = useDoc(settingsRef);

  const navQuery = useMemoFirebase(() => query(
    collection(db, 'navigationItems'), 
    orderBy('order', 'asc')
  ), [db]);
  const { data: allNavItems } = useCollection(navQuery);
  const navItems = allNavItems?.filter(item => item.group === 'mainHeader') || [];

  const destQuery = useMemoFirebase(() => query(collection(db, 'destinations'), where('isPopular', '==', true), limit(4)), [db]);
  const { data: popularDests } = useCollection(destQuery);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMega(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (menu: string) => setActiveMega(menu);
  const handleMouseLeave = () => setActiveMega(null);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50 w-full" ref={menuRef}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group shrink-0" onClick={() => setActiveMega(null)}>
          {settings?.logoUrl ? (
            <div className="relative h-12 w-48">
              <Image 
                src={settings.logoUrl} 
                alt="Tailor Travels Logo" 
                fill 
                className="object-contain" 
                priority
              />
            </div>
          ) : (
            <>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors">
                <span className="text-white font-headline text-xl font-bold italic">T</span>
              </div>
              <span className="font-headline text-xl font-bold tracking-tight text-primary uppercase">
                Tailor<span className="text-accent">Travels</span>
              </span>
            </>
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-2 h-full">
          <div 
            className="h-full flex items-center"
            onMouseEnter={() => handleMouseEnter('holidays')}
          >
            <button className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-colors rounded-lg",
              activeMega === 'holidays' ? "text-accent bg-accent/5" : "text-primary hover:text-accent"
            )}>
              Holidays
              <ChevronDown className={cn("w-4 h-4 transition-transform", activeMega === 'holidays' && "rotate-180")} />
            </button>
          </div>

          <div 
            className="h-full flex items-center"
            onMouseEnter={() => handleMouseEnter('destinations')}
          >
            <button className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-colors rounded-lg",
              activeMega === 'destinations' ? "text-accent bg-accent/5" : "text-primary hover:text-accent"
            )}>
              Destinations
              <ChevronDown className={cn("w-4 h-4 transition-transform", activeMega === 'destinations' && "rotate-180")} />
            </button>
          </div>

          {navItems.map((item) => (
            <Link 
              key={item.id} 
              href={item.url} 
              className="px-4 py-2 text-sm font-bold text-primary hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden sm:block">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-xl font-bold">
              {settings?.ctaQuoteButtonText || 'Get a Quote'}
            </Button>
          </Link>
          <Button className="bg-accent hover:bg-accent/90 text-white font-bold flex items-center gap-2 px-6 h-11 rounded-xl shadow-lg shadow-accent/20">
            <Phone className="w-4 h-4" />
            <span className="hidden xs:inline">{settings?.contactPhoneNumber || '0800 123 4567'}</span>
            <span className="xs:hidden">Call</span>
          </Button>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary" aria-label="Open Navigation Menu">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <SheetTitle className="sr-only">Tailor Travels Navigation</SheetTitle>
                <SheetDescription className="sr-only">Access holiday types, destinations, and expert travel advice.</SheetDescription>
                <div className="flex flex-col h-full">
                  <div className="p-6 bg-primary text-white">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Explore</p>
                    <h2 className="text-2xl font-headline font-bold">Tailor Travels</h2>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Holidays</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {HOLIDAY_TYPES.map(type => (
                          <Link key={type.label} href={type.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                              <type.icon className="w-5 h-5 text-accent" />
                            </div>
                            <span className="font-bold text-primary">{type.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Quick Links</h3>
                      <div className="flex flex-col gap-4">
                        {navItems.map((item) => (
                          <Link key={item.id} href={item.url} className="text-lg font-bold text-primary">{item.label}</Link>
                        ))}
                        <Link href="/destinations" className="text-lg font-bold text-primary">All Destinations</Link>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t mt-auto">
                    <Link href="/contact" className="w-full">
                      <Button className="w-full bg-accent text-white font-bold h-14 rounded-xl">Enquire Now</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {activeMega && (
        <div 
          className="absolute left-0 w-full bg-white border-b shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 z-40"
          onMouseEnter={() => setActiveMega(activeMega)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container mx-auto px-4 py-12">
            {activeMega === 'holidays' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4 space-y-6">
                  <h3 className="text-xl font-headline font-bold text-primary mb-6">Choose Your Style</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {HOLIDAY_TYPES.map((type) => (
                      <Link 
                        key={type.label} 
                        href={type.href}
                        className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-all border border-transparent hover:border-border"
                        onClick={() => setActiveMega(null)}
                      >
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                          <type.icon className="w-6 h-6 text-accent group-hover:text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-primary group-hover:text-accent transition-colors">{type.label}</p>
                          <p className="text-xs text-muted-foreground">{type.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-8 bg-muted/30 rounded-[32px] p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-headline font-bold text-primary">Featured Collections</h3>
                    <Link href="/holidays" className="text-accent text-sm font-bold flex items-center gap-1 hover:underline">
                      View all holidays <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer">
                      <Image src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800" alt="Family holiday options" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">New for 2024</p>
                        <p className="text-lg font-bold">Family Adventures</p>
                      </div>
                    </div>
                    <div className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer">
                      <Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800" alt="Wellness retreat options" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">Relaxation</p>
                        <p className="text-lg font-bold">Wellness Retreats</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMega === 'destinations' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-3 space-y-6">
                  <h3 className="text-xl font-headline font-bold text-primary">Top Regions</h3>
                  <ul className="space-y-4">
                    {['Indian Ocean', 'Mediterranean', 'Middle East', 'Far East', 'Caribbean', 'Europe'].map(region => (
                      <li key={region}>
                        <Link href={`/holidays?region=${region.toLowerCase()}`} className="text-muted-foreground hover:text-accent font-medium flex items-center gap-2 group" onClick={() => setActiveMega(null)}>
                          <Compass className="w-4 h-4 text-accent/40 group-hover:text-accent" />
                          {region}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/destinations" className="block w-full mt-4">
                    <Button variant="outline" className="w-full rounded-xl border-accent text-accent font-bold">
                      Explore All Regions
                    </Button>
                  </Link>
                </div>
                <div className="md:col-span-9">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-headline font-bold text-primary text-center">Popular Hotspots</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-6">
                    {popularDests?.map((dest) => (
                      <Link 
                        key={dest.id} 
                        href={`/holidays?dest=${dest.id}`} 
                        className="group space-y-3"
                        onClick={() => setActiveMega(null)}
                      >
                        <div className="relative h-40 rounded-2xl overflow-hidden shadow-md">
                          <Image src={dest.imageUrl} alt={`${dest.name} destination preview`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        </div>
                        <div>
                          <p className="font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1">
                            {dest.name}
                            <ChevronDown className="w-3 h-3 -rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{dest.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}