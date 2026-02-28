
import type { Metadata } from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    default: 'Tailor Travels | Bespoke Luxury Travel Agency UK',
    template: '%s | Tailor Travels'
  },
  description: 'Book your perfect bespoke holiday with Tailor Travels. Award-winning UK travel agency specializing in luxury cruises, exotic beach holidays, and exclusive last-minute deals.',
  keywords: ['luxury holidays', 'bespoke travel agency', 'tailor made holidays', 'premium cruises', 'ATOL protected holidays', 'luxury beach resorts', 'Tailor Travels'],
  authors: [{ name: 'Tailor Travels' }],
  creator: 'Tailor Travels',
  metadataBase: new URL('https://tailortravels.co.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://tailortravels.co.uk',
    siteName: 'Tailor Travels',
    title: 'Tailor Travels | Bespoke Luxury Travel Agency',
    description: 'Curating unforgettable bespoke travel experiences. ATOL protected and award-winning service.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?auto=format&fit=crop&q=80&w=1200&h=630',
        width: 1200,
        height: 630,
        alt: 'Tailor Travels Luxury Resort',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tailor Travels | Your Perfect Escape',
    description: 'Discover luxury destinations and unforgettable experiences worldwide.',
    images: ['https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?auto=format&fit=crop&q=80&w=1200&h=630'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
