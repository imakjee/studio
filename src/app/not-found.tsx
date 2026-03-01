import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-grow flex items-center justify-center bg-muted/30 p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto">
            <span className="text-6xl font-bold text-primary/20 italic">404</span>
          </div>
          <h1 className="text-4xl font-bold font-headline text-primary">Escape Not Found</h1>
          <p className="text-muted-foreground text-lg">
            The destination you are looking for has moved or no longer exists. Let's get you back on track.
          </p>
          <div className="pt-4">
            <Button asChild className="bg-primary rounded-xl px-10 h-12 text-lg font-bold">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
