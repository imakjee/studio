
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
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <main className="flex-grow">
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
