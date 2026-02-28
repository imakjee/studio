'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, ShieldCheck, Lock, Globe } from 'lucide-react';
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

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#050505] text-white w-full">
      <div className="container mx-auto px-4 py-16">
        {/* Section 1 — Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2">
            <p className="text-white/80 mb-8 max-w-[240px] leading-relaxed text-sm">
              Your trusted travel partner. ATOL protected and award-winning service.
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
                  className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center hover:opacity-90 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-white" />
                </Link>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((group) => (
            <div key={group.title} className="lg:col-span-1">
              <h4 className="font-bold mb-6 text-base text-white">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/60 hover:text-white transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Section 2 — Trust Row */}
        <div className="border-y border-white/10 py-10 mb-10">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center">
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full border-2 ${item.borderColor} ${item.bgColor} flex items-center justify-center`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <span className="text-sm font-bold text-white tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 — Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm">
            © {currentYear ?? '2024'} Elite Escapes. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-white/40 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
