
import { PlaceHolderImages } from './placeholder-images';

export interface Holiday {
  id: string;
  name: string;
  location: string;
  type: 'Beach' | 'Cruise' | 'City' | 'Luxury';
  rating: number;
  price: number;
  oldPrice?: number;
  duration: string;
  boardBasis: string;
  image: string;
  imageHint: string;
  description: string;
  featured: boolean;
  lastMinute: boolean;
  departureDate?: string;
}

export const HOLIDAYS: Holiday[] = [
  {
    id: '1',
    name: 'Ozen Reserve Bolifushi',
    location: 'South Male Atoll, Maldives',
    type: 'Luxury',
    rating: 5,
    price: 2499,
    duration: '7 Nights',
    boardBasis: 'All Inclusive',
    image: PlaceHolderImages.find(img => img.id === 'maldives-luxury')?.imageUrl || '',
    imageHint: 'maldives resort',
    description: 'Experience ultimate luxury in an overwater villa with private pools and direct ocean access.',
    featured: true,
    lastMinute: false,
  },
  {
    id: '2',
    name: 'Canaves Oia Luxury Suites',
    location: 'Oia, Santorini',
    type: 'Beach',
    rating: 5,
    price: 1249,
    duration: '5 Nights',
    boardBasis: 'Bed & Breakfast',
    image: PlaceHolderImages.find(img => img.id === 'santorini-view')?.imageUrl || '',
    imageHint: 'santorini greece',
    description: 'Perched on the cliffs of Oia, offering breathtaking caldera views and world-class service.',
    featured: true,
    lastMinute: true,
    oldPrice: 1499,
    departureDate: 'Oct 12, 2024'
  },
  {
    id: '3',
    name: 'Mediterranean Wonders Cruise',
    location: 'Barcelona to Rome',
    type: 'Cruise',
    rating: 4,
    price: 899,
    duration: '7 Nights',
    boardBasis: 'Full Board',
    image: PlaceHolderImages.find(img => img.id === 'cruise-ship')?.imageUrl || '',
    imageHint: 'cruise ship',
    description: 'Sail across the Mediterranean and explore iconic cities like Barcelona, Nice, and Florence.',
    featured: true,
    lastMinute: false,
  },
  {
    id: '4',
    name: 'Atlantis The Royal',
    location: 'Palm Jumeirah, Dubai',
    type: 'Luxury',
    rating: 5,
    price: 1895,
    duration: '6 Nights',
    boardBasis: 'Half Board',
    image: PlaceHolderImages.find(img => img.id === 'dubai-skyline')?.imageUrl || '',
    imageHint: 'dubai city',
    description: 'Dubai\'s newest landmark of ultra-luxury. A destination where everything is designed to exceed expectations.',
    featured: true,
    lastMinute: false,
  },
  {
    id: '5',
    name: 'Hard Rock Hotel Tenerife',
    location: 'Costa Adeje, Tenerife',
    type: 'Beach',
    rating: 5,
    price: 649,
    oldPrice: 849,
    duration: '7 Nights',
    boardBasis: 'All Inclusive',
    image: PlaceHolderImages.find(img => img.id === 'tenerife-beach')?.imageUrl || '',
    imageHint: 'tenerife beach',
    description: 'A cutting-edge luxury hotel that combines the style and energy of the legendary brand.',
    featured: false,
    lastMinute: true,
    departureDate: 'Sep 25, 2024'
  },
  {
    id: '6',
    name: 'Maya Sanur Resort',
    location: 'Sanur, Bali',
    type: 'Luxury',
    rating: 5,
    price: 1100,
    duration: '10 Nights',
    boardBasis: 'Bed & Breakfast',
    image: PlaceHolderImages.find(img => img.id === 'bali-temple')?.imageUrl || '',
    imageHint: 'bali temple',
    description: 'A stylish beachfront resort that reflects the heart of Sanur through contemporary design.',
    featured: false,
    lastMinute: false,
  }
];
