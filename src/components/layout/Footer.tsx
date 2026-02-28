'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, ShieldCheck, Lock, Globe, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [isAtolExpanded, setIsAtolExpanded] = useState(false);

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
        <div className="border-t border-white/10 py-10">
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

        {/* Section: ATOL Protection Information */}
        <div className="border-t border-white/10 py-10 mb-10 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
              ATOL Protection Information
            </h4>
            <p className="text-white/60 text-sm mb-4 leading-relaxed max-w-2xl mx-auto">
              Some of the flights and flight-inclusive holidays on this website are financially protected by the ATOL scheme.
            </p>
            <button 
              onClick={() => setIsAtolExpanded(!isAtolExpanded)}
              className="group inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-bold text-sm"
            >
              <span>{isAtolExpanded ? 'Hide Details' : 'Read Full Protection Details'}</span>
              {isAtolExpanded ? (
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>

            {isAtolExpanded && (
              <div className="mt-8 p-8 bg-white/5 rounded-[32px] border border-white/10 text-left animate-in fade-in slide-in-from-top-4 duration-500">
                <h5 className="font-bold text-white mb-4 text-lg">ATOL Protection</h5>
                <p className="text-white/60 text-xs md:text-sm leading-relaxed space-y-4">
                  Some of the flights and flight-inclusive holidays on this website are financially protected by the ATOL scheme. But ATOL protection does not apply to all holiday and travel services listed on this website. Please ask us to confirm what protection may apply to your booking. If you do not receive an ATOL Certificate then the booking will not be ATOL protected. If you do receive an ATOL Certificate but all the parts of your trip are not listed on it, those parts will not be ATOL protected. Please see our booking conditions for information, or for more information about financial protection and the ATOL Certificate go to: <a href="http://www.atol.org.uk/ATOLCertificate" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-bold">www.atol.org.uk/ATOLCertificate</a>.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Section 3 — Bottom Bar */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
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
