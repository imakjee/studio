
'use client';

import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Search, Navigation } from 'lucide-react';
import { useState } from 'react';

const BRANCHES = [
  { id: 1, name: 'London - West End', address: '123 Regent Street, London, W1B 4DA', phone: '020 7123 4567', hours: 'Mon-Sat: 9am-6pm' },
  { id: 2, name: 'Manchester - City Centre', address: '45 Deansgate, Manchester, M3 2AY', phone: '0161 123 4567', hours: 'Mon-Sat: 9am-6pm' },
  { id: 3, name: 'Birmingham - Bullring', address: 'Bullring Shopping Centre, B5 4BU', phone: '0121 123 4567', hours: 'Mon-Sun: 10am-8pm' },
  { id: 4, name: 'Edinburgh - Princes St', address: '98 Princes Street, Edinburgh, EH2 2ER', phone: '0131 123 4567', hours: 'Mon-Sat: 9am-6pm' },
  { id: 5, name: 'Bristol - Cabot Circus', address: 'Cabot Circus, Bristol, BS1 3BX', phone: '0117 123 4567', hours: 'Mon-Sat: 9am-7pm' },
];

export default function BranchesPage() {
  const [search, setSearch] = useState('');
  
  const filteredBranches = BRANCHES.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      
      <main className="flex-grow bg-muted/30">
        <div className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Find a Branch</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              With over 500 branches nationwide, expert travel advice is never far away. Visit us in person for a coffee and a chat about your next trip.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <div className="max-w-4xl mx-auto bg-white p-4 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-4 border border-border/50">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Enter town, city or postcode" 
                className="pl-12 h-14 rounded-xl border-none bg-muted/50 focus-visible:ring-accent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button className="h-14 bg-accent hover:bg-accent/90 text-white font-bold px-10 rounded-xl flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              Find Nearest
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List */}
            <div className="lg:col-span-1 space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">
                Showing {filteredBranches.length} locations
              </p>
              {filteredBranches.map(branch => (
                <div key={branch.id} className="bg-white p-6 rounded-2xl border border-border/50 hover:border-accent transition-all cursor-pointer group shadow-sm hover:shadow-md">
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent">{branch.name}</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-accent shrink-0" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-accent shrink-0" />
                      <span className="font-bold text-primary">{branch.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent shrink-0" />
                      <span>{branch.hours}</span>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-lg h-10 border-primary text-primary font-bold">Directions</Button>
                    <Button className="flex-1 rounded-lg h-10 bg-primary text-white font-bold">Book Visit</Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="lg:col-span-2 bg-muted rounded-[40px] relative overflow-hidden shadow-inner min-h-[500px] border-4 border-white">
              <div className="absolute inset-0 flex items-center justify-center text-center p-12">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <MapPin className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary font-headline">Interactive Map View</h3>
                  <p className="text-muted-foreground max-w-sm">
                    In the production version, this area would integrate with Google Maps or Mapbox to show all branch locations across the UK.
                  </p>
                </div>
              </div>
              {/* Decorative "Map" elements */}
              <div className="absolute top-20 left-40 w-8 h-8 bg-accent rounded-full border-4 border-white shadow-lg cursor-pointer animate-bounce" />
              <div className="absolute bottom-40 right-60 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg cursor-pointer" />
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg cursor-pointer" />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
