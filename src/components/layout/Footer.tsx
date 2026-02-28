
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, ShieldCheck, MapPin, Mail, Phone } from 'lucide-react';

const FOOTER_LINKS = [
  {
    title: 'Holiday Types',
    links: [
      { label: 'Beach Holidays', href: '#' },
      { label: 'City Breaks', href: '#' },
      { label: 'Luxury Escapes', href: '#' },
      { label: 'Family Holidays', href: '#' },
      { label: 'Cruise Deals', href: '#' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { label: 'Maldives', href: '#' },
      { label: 'Greece', href: '#' },
      { label: 'Dubai', href: '#' },
      { label: 'Spain', href: '#' },
      { label: 'USA', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Our Blog', href: '#' },
      { label: 'Partnerships', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Centre', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Booking Info', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Travel Advice', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-headline text-xl font-bold italic">E</span>
              </div>
              <span className="font-headline text-2xl font-bold tracking-tight text-white uppercase">
                Elite<span className="text-accent">Escapes</span>
              </span>
            </Link>
            <p className="text-white/60 mb-8 max-w-xs leading-relaxed">
              Experience the world in unmatched luxury. We curate the finest travel experiences for those who seek the extraordinary.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (group.links.length > 0 && (
            <div key={group.title} className="lg:col-span-1">
              <h4 className="font-bold mb-6 text-lg">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/60 hover:text-accent transition-colors text-sm font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )))}
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest">ATOL PROTECTED</span>
            </div>
            <div className="px-3 py-1.5 border border-white/30 rounded text-[10px] font-bold tracking-[0.2em] uppercase">ABTA MEMBER</div>
            <div className="px-3 py-1.5 border border-white/30 rounded text-[10px] font-bold tracking-[0.2em] uppercase">IATA AGENT</div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2 text-white/40 text-xs">
            <div className="flex gap-6 mb-2">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Accessibility</Link>
            </div>
            <p>© {new Date().getFullYear()} Elite Escapes Travel Group Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
