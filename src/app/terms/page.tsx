'use client';

import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <main className="flex-grow container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-4xl font-bold font-headline text-primary mb-8">Terms of Use</h1>
        <div className="prose prose-slate max-w-none text-muted-foreground space-y-6">
          <p>Last Updated: February 2026</p>
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Booking Conditions</h2>
            <p>All bookings made through Tailor Travels are subject to availability and the specific terms of the travel provider. Detailed booking conditions will be provided at the time of inquiry.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Financial Protection</h2>
            <p>Many of the flight-inclusive holidays on this website are financially protected by the ATOL scheme. Please ask us to confirm what protection may apply to your booking.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Cancellations</h2>
            <p>Cancellation policies vary by package. We recommend all travelers obtain comprehensive travel insurance at the time of booking.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
