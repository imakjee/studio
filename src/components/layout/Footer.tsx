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
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Section 1 — Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 md:gap-12 mb-16">
          <div className="lg:col-span-2 text-center md:text-left">
            <h4 className="font-headline text-2xl font-bold text-white mb-6">
              Tailor<span className="text-accent">Travels</span>
            </h4>
            <p className="text-white/80 mb-8 max-w-[280px] mx-auto md:mx-0 leading-relaxed text-sm">
              Your trusted travel partner. ATOL protected and award-winning service curated for your perfect escape.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3">
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Youtube, href: '#' }
              ].map(({ Icon, href }, i) => (
                <Link 
                  key={i} 
                  href={href} 
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Accordion - Visible only on small screens */}
          <div className="md:hidden col-span-1">
            <Accordion type="multiple" className="w-full border-t border-white/10">
              {FOOTER_GROUPS.map((group) => {
                const items = allNavItems?.filter(item => item.group === group.id) || [];
                if (items.length === 0) return null;
                return (
                  <AccordionItem key={group.id} value={group.id} className="border-white/10">
                    <AccordionTrigger className="text-sm font-bold py-4 hover:no-underline hover:text-accent uppercase tracking-widest">
                      {group.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 pb-4">
                        {items.map((link) => (
                          <li key={link.id}>
                            <Link href={link.url} className="text-white/60 hover:text-white transition-colors text-sm py-1 block">
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

          {/* Desktop/Tablet Grid - Hidden on mobile */}
          <div className="hidden md:contents">
            {FOOTER_GROUPS.map((group) => {
              const items = allNavItems?.filter(item => item.group === group.id) || [];
              return (
                <div key={group.id} className="lg:col-span-1">
                  <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/40">{group.title}</h4>
                  <ul className="space-y-4">
                    {items.map((link) => (
                      <li key={link.id}>
                        <Link href={link.url} className="text-white/60 hover:text-white transition-colors text-sm">
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
        <div className="border-t border-white/10 py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 items-center">
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
                <div className={`w-14 h-14 rounded-2xl border ${item.borderColor} ${item.bgColor} flex items-center justify-center shrink-0`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <span className="text-sm font-bold text-white tracking-wide uppercase">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: ATOL Protection Information */}
        <div className="border-t border-white/10 py-10 mb-6 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">
              Financial Protection Information
            </h4>
            <p className="text-white/60 text-xs md:text-sm mb-4 leading-relaxed max-w-2xl mx-auto">
              Some of the flights and flight-inclusive holidays on this website are financially protected by the ATOL scheme.
            </p>
            <button 
              onClick={() => setIsAtolExpanded(!isAtolExpanded)}
              className="group inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-bold text-xs uppercase tracking-widest"
              suppressHydrationWarning
            >
              <span>{isAtolExpanded ? 'Hide Details' : 'Read Full Protection Details'}</span>
              {isAtolExpanded ? (
                <ChevronUp className="w-3 h-3 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>

            {isAtolExpanded && (
              <div className="mt-8 p-6 md:p-10 bg-white/5 rounded-[32px] border border-white/10 text-left animate-in fade-in slide-in-from-top-4 duration-500">
                <h5 className="font-bold text-white mb-4 text-lg font-headline">ATOL Protection</h5>
                <p className="text-white/60 text-xs md:text-sm leading-relaxed space-y-4">
                  Some of the flights and flight-inclusive holidays on this website are financially protected by the ATOL scheme. But ATOL protection does not apply to all holiday and travel services listed on this website. Please ask us to confirm what protection may apply to your booking. If you do not receive an ATOL Certificate then the booking will not be ATOL protected. If you do receive an ATOL Certificate but all the parts of your trip are not listed on it, those parts will not be ATOL protected. Please see our booking conditions for information, or for more information about financial protection and the ATOL Certificate go to: <a href="http://www.atol.org.uk/ATOLCertificate" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-bold">www.atol.org.uk/ATOLCertificate</a>.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Section 3 — Bottom Bar */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-white/30 text-[11px] uppercase tracking-widest font-medium">
            © {currentYear ?? '2024'} Tailor Travels. Licensed & Bonded.
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-10 gap-y-4 text-white/40 text-[11px] uppercase tracking-widest font-bold">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            <Link href="/sitemap.xml" className="hover:text-accent transition-colors text-accent/80">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
