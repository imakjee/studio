/**
 * Static navigation configuration for Elite Escapes.
 * These items load instantly to prevent layout shift and async delays.
 */

export const STATIC_NAV_ITEMS = [
  { id: '1', label: 'Holidays', url: '/holidays', group: 'mainHeader', order: 1 },
  { id: '2', label: 'Cruises', url: '/cruises', group: 'mainHeader', order: 2 },
  { id: '3', label: 'Deals', url: '/deals', group: 'mainHeader', order: 3 },
  { id: '4', label: 'About Us', url: '/about', group: 'mainHeader', order: 4 },
];

export const STATIC_FOOTER_NAV = {
  footerHolidayTypes: [
    { id: 'f1', label: 'Beach Holidays', url: '/holidays?type=beach' },
    { id: 'f2', label: 'Luxury Cruises', url: '/cruises' },
    { id: 'f3', label: 'City Breaks', url: '/holidays?type=city' },
    { id: 'f4', label: 'Bespoke Luxury', url: '/holidays?type=luxury' },
  ],
  footerDestinations: [
    { id: 'd1', label: 'Maldives', url: '/holidays?dest=maldives' },
    { id: 'd2', label: 'Santorini', url: '/holidays?dest=santorini' },
    { id: 'd3', label: 'Dubai', url: '/holidays?dest=dubai' },
    { id: 'd4', label: 'Bali', url: '/holidays?dest=bali' },
  ],
  footerCompany: [
    { id: 'c1', label: 'About Us', url: '/about' },
    { id: 'c2', label: 'Our Branches', url: '/branches' },
    { id: 'c3', label: 'Contact Us', url: '/contact' },
    { id: 'c4', label: 'Careers', url: '/about' },
  ],
  footerSupport: [
    { id: 's1', label: 'FAQs', url: '/faq' },
    { id: 's2', label: 'Booking Terms', url: '/terms' },
    { id: 's3', label: 'Privacy Policy', url: '/privacy' },
    { id: 's4', label: 'ATOL Protection', url: '/faq' },
  ]
};
