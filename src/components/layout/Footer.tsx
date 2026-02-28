'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, ShieldCheck, Lock, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    label: 'ATOL Protected',
    color: 'text-green-500',
    borderColor: 'border-green-500/30',
    bgColor: 'bg-green-500/10'
  },
  {
    icon: Globe,
    label: 'ABTA Member',
    color: 'text-blue-500',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10'
  },
  {
    icon: Lock,
    label: 'Secure Payments',
    color: 'text-purple-500',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/10'
  }
];

const FOOTER_GROUPS = [
  { id: 'footerHolidayTypes', title: 'Holiday Types' },
  { id: 'footerDestinations', title: 'Destinations' },
  { id: 'footerCompany', title: 'Company' },
  { id: 'footerSupport', title: 'Support' },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [isAtolExpanded, setIsAtolExpanded] = useState(false);
  const db = useFirestore();

  // Fetch all navigation items at once and filter locally for performance
  const navQuery = useMemoFirebase(() => query(collection(db, 'navigationItems'), orderBy('order', 'asc')), [db]);
  const { data: allNavItems } = useCollection(navQuery);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#050505] text-white w-full">
      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        {/* Section 1 — Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16 md:mb-20">
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-headline text-3xl font-bold text-white mb-6">
              Tailor<span className="text-accent">Travels</span>
            </h4>
            <p className="text-white/70 mb-8 max-w-sm leading-relaxed text-sm md:text-base">
              Bespoke travel experiences hand-picked by experts. Award-winning service and total financial protection for your peace of mind.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Youtube, href: '#' }
              ].map(({ Icon, href }, i) => (
                <Link 
                  key={i} 
                  href={href} 
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Accordion - Visible only on mobile screens */}
          <div className="md:hidden space-y-2 border-t border-white/10 pt-8">
            <Accordion type="multiple" className="w-full">
              {FOOTER_GROUPS.map((group) => {
                const items = allNavItems?.filter(item => item.group === group.id) || [];
                if (items.length === 0) return null;
                return (
                  <AccordionItem key={group.id} value={group.id} className="border-white/10">
                    <AccordionTrigger className="text-sm font-bold py-4 hover:no-underline hover:text-accent uppercase tracking-[0.15em]">
                      {group.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid grid-cols-1 gap-3 pb-4">
                        {items.map((link) => (
                          <li key={link.id}>
                            <Link href={link.url} className="text-white/50 hover:text-white transition-colors text-sm py-1.5 block">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Desktop/Tablet Grid - Hidden on small mobile */}
          <div className="hidden md:grid md:grid-cols-2 lg:contents gap-10 lg:gap-4 lg:col-span-4">
            {FOOTER_GROUPS.map((group) => {
              const items = allNavItems?.filter(item => item.group === group.id) || [];
              return (
                <div key={group.id} className="space-y-6">
                  <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white/40">{group.title}</h4>
                  <ul className="space-y-4">
                    {items.map((link) => (
                      <li key={link.id}>
                        <Link href={link.url} className="text-white/60 hover:text-accent transition-colors text-sm font-medium">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2 — Trust Row */}
        <div className="border-t border-white/10 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16">
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-5 text-center sm:text-left group">
                <div className={`w-16 h-16 rounded-[20px] border ${item.borderColor} ${item.bgColor} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-500`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <div className="space-y-1">
                  <span className="block text-sm font-bold text-white tracking-widest uppercase">{item.label}</span>
                  <p className="text-[11px] text-white/40 leading-relaxed max-w-[180px]">Fully licensed and bonded for your total protection.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: ATOL Protection Information */}
        <div className="border-t border-white/10 pt-12 md:pt-16 pb-10 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-6">
              Official Licensing & Protection
            </h4>
            <p className="text-white/50 text-xs md:text-sm mb-6 leading-relaxed max-w-2xl mx-auto">
              Tailor Travels is a fully bonded travel operator. Financial protection is provided by the ATOL scheme for flight-inclusive bookings.
            </p>
            <button 
              onClick={() => setIsAtolExpanded(!isAtolExpanded)}
              className="group inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-all font-bold text-xs uppercase tracking-[0.2em] bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full border border-white/10"
              suppressHydrationWarning
            >
              <span>{isAtolExpanded ? 'Hide Details' : 'View ATOL Protection Details'}</span>
              {isAtolExpanded ? (
                <ChevronUp className="w-3 h-3 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>

            {isAtolExpanded && (
              <div className="mt-8 p-8 md:p-12 bg-white/5 rounded-[40px] border border-white/10 text-left animate-in fade-in zoom-in-95 duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="w-6 h-6 text-accent" />
                  <h5 className="font-bold text-white text-xl font-headline">Your Financial Safety</h5>
                </div>
                <div className="text-white/60 text-sm leading-relaxed space-y-4">
                  <p>
                    Many of the flights and flight-inclusive holidays on this website are financially protected by the ATOL scheme. But ATOL protection does not apply to all holiday and travel services listed on this website. 
                  </p>
                  <p>
                    Please ask us to confirm what protection may apply to your booking. If you do not receive an ATOL Certificate then the booking will not be ATOL protected. If you do receive an ATOL Certificate but all the parts of your trip are not listed on it, those parts will not be ATOL protected.
                  </p>
                  <p>
                    For more information about financial protection and the ATOL Certificate go to: <a href="http://www.atol.org.uk/ATOLCertificate" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-bold transition-all">www.atol.org.uk/ATOLCertificate</a>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 3 — Bottom Bar */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-medium text-center md:text-left">
            © {currentYear ?? '2024'} Tailor Travels UK. All Rights Reserved. 
            <span className="hidden md:inline ml-2 border-l border-white/10 pl-2">ABTA & ATOL Licensed</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-10 gap-y-4 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            <Link href="/sitemap.xml" className="text-accent/70 hover:text-accent transition-colors flex items-center gap-1.5">
              <Globe className="w-3 h-3" />
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
