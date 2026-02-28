'use client';

import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <main className="flex-grow container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-4xl font-bold font-headline text-primary mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-muted-foreground space-y-6">
          <p>Last Updated: February 2026</p>
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Information We Collect</h2>
            <p>At Tailor Travels, we collect information to provide better services to our users. This includes email addresses for newsletters and contact details for holiday inquiries.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. How We Use Information</h2>
            <p>We use the information we collect to process your bookings, respond to your inquiries, and send you updates about our latest luxury travel offers.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data. Your financial protection is also guaranteed via our ATOL and ABTA memberships.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
