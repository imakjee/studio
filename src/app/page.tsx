import TopBar from '@/components/layout/TopBar';
import MainHeader from '@/components/layout/MainHeader';
import Hero from '@/components/sections/Hero';
import FeaturedHolidays from '@/components/sections/FeaturedHolidays';
import PopularDestinations from '@/components/sections/PopularDestinations';
import LastMinuteOffers from '@/components/sections/LastMinuteOffers';
import WhyBookWithUs from '@/components/sections/WhyBookWithUs';
import Newsletter from '@/components/sections/Newsletter';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    'name': 'Tailor Travels',
    'alternateName': 'Tailor Travels UK',
    'description': 'Award-winning UK travel agency specializing in bespoke luxury holidays and premium cruises.',
    'url': 'https://tailortravels.co.uk',
    'logo': 'https://tailortravels.co.uk/logo.png',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '0800 123 4567',
      'contactType': 'customer service',
      'areaServed': 'GB',
      'availableLanguage': 'en'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '123 Luxury Lane',
      'addressLocality': 'London',
      'postalCode': 'W1B 4DA',
      'addressCountry': 'GB'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 51.5074,
      'longitude': -0.1278
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      'opens': '09:00',
      'closes': '20:00'
    },
    'sameAs': [
      'https://www.facebook.com/tailortravels',
      'https://www.instagram.com/tailortravels',
      'https://twitter.com/tailortravels',
      'https://www.linkedin.com/company/tailor-travels'
    ],
    'priceRange': '£££'
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopBar />
      <MainHeader />
      <main className="flex-grow">
        <h1 className="sr-only">Tailor Travels | Bespoke Luxury Travel Agency UK</h1>
        <Hero />
        <FeaturedHolidays />
        <PopularDestinations />
        <LastMinuteOffers />
        <WhyBookWithUs />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
