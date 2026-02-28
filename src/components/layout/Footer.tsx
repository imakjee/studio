'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, ShieldCheck, Lock, Globe, Mail, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

const FOOTER_COLUMNS = [
  {
    title: 'Holiday Types',
    links: [
      { label: 'Beach Holidays', href: '/holidays?type=beach' },
      { label: 'City Breaks', href: '/holidays?type=city' },
      { label: 'Family Holidays', href: '/holidays?type=family' },
      { label: 'Luxury Holidays', href: '/holidays?type=luxury' },
      { label: 'All Inclusive', href: '/holidays?type=all-inclusive' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { label: 'Spain', href: '/holidays/spain' },
      { label: 'Greece', href: '/holidays/greece' },
      { label: 'Turkey', href: '/holidays/turkey' },
      { label: 'Portugal', href: '/holidays/portugal' },
      { label: 'Dubai', href: '/holidays/dubai' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Find a Branch', href: '/branches' },
      { label: 'Careers', href: '/about#careers' },
      { label: 'Press', href: '/about#press' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Centre', href: '/faq' },
      { label: 'Manage Booking', href: '/login' },
      { label: 'Travel Insurance', href: '/services/insurance' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#0A0A0B] text-white w-full border-t border-white/5">
      <div className="container mx-auto px-4 py-16">
        {/* Section 1 — Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-headline text-xl font-bold italic">E</span>
              </div>
              <span className="font-headline text-2xl font-bold tracking-tight text-white uppercase">
                Elite<span className="text-accent">Escapes</span>
              </span>
            </Link>
            <p className="text-white/60 mb-8 max-w-xs leading-relaxed text-sm">
              Your trusted travel partner. ATOL protected and award-winning service curated for the extraordinary.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Youtube, href: '#' }
              ].map(({ Icon, href }, i) => (
                <Link 
                  key={i} 
                  href={href} 
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-white" />
                </Link>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((group) => (
            <div key={group.title} className="lg:col-span-1">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-white/90">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/50 hover:text-accent transition-colors text-sm font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Section 2 — Trust Row */}
        <div className="border-y border-white/5 py-10 mb-10">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-white/90">ATOL Protected</span>
                <span className="text-[10px] text-white/40">Financial protection for your trip</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-white/90">ABTA Member</span>
                <span className="text-[10px] text-white/40">Registered: Elite Escapes Ltd</span>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                <Lock className="w-6 h-6 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-white/90">Secure Payments</span>
                <span className="text-[10px] text-white/40">PCI-DSS Level 1 Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 — Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm">
            © {currentYear ?? '...'} Elite Escapes. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-white/40 text-xs font-medium uppercase tracking-wider">
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-accent transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
