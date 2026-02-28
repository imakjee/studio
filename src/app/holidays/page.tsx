'use client';

import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import HolidayCard from '@/components/shared/HolidayCard';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function HolidaysPage() {
  const db = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use a query that either orders by name or doesn't use orderBy if createdAt might be missing
  const holidayQuery = useMemoFirebase(() => query(collection(db, 'holidays')), [db]);
  const { data: holidays, isLoading } = useCollection(holidayQuery);

  const filteredHolidays = holidays?.filter(h => 
    h.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      
      <main className="flex-grow bg-muted/30">
        {/* Page Header */}
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 max-w-[1300px]">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Explore Our Holidays</h1>
            <p className="text-white/70 text-lg max-w-2xl">
              From sun-soaked beaches to luxury city escapes, find your next unforgettable journey with Tailor Travels.
            </p>
          </div>
        </div>

        {/* Filters & Grid */}
        <div className="container mx-auto px-4 py-12 max-w-[1300px]">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 shrink-0 space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50">
                <div className="flex items-center gap-2 mb-6 text-primary font-bold">
                  <Filter className="w-4 h-4" />
                  <span>Filter Search</span>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider">Destination</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search locations..." 
                        className="pl-10 h-11 rounded-xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider">Holiday Type</Label>
                    <Select>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="beach">Beach</SelectItem>
                        <SelectItem value="city">City Breaks</SelectItem>
                        <SelectItem value="cruise">Cruises</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider">Price Range</Label>
                    <Select>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Any Price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-500">Under £500</SelectItem>
                        <SelectItem value="500-1000">£500 - £1,000</SelectItem>
                        <SelectItem value="1000-2000">£1,000 - £2,000</SelectItem>
                        <SelectItem value="2000+">Over £2,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-6 rounded-2xl border border-accent/20">
                <h4 className="font-bold text-primary mb-2">Need Help?</h4>
                <p className="text-sm text-muted-foreground mb-4">Our travel experts are ready to help you plan your perfect trip.</p>
                <p className="text-xl font-bold text-primary">0800 123 4567</p>
              </div>
            </aside>

            {/* Holiday Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <p className="text-muted-foreground">
                  {isLoading ? 'Loading...' : (
                    <>Showing <strong>{filteredHolidays?.length || 0}</strong> holidays</>
                  )}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Sort by:</span>
                  <Select defaultValue="popular">
                    <SelectTrigger className="w-[180px] h-10 rounded-lg">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Recent</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-[400px] bg-muted animate-pulse rounded-2xl" />
                  ))}
                </div>
              ) : !filteredHolidays?.length ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
                  <p className="text-muted-foreground">No holidays found. Try a different search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredHolidays.map((holiday) => (
                    <HolidayCard key={holiday.id} holiday={holiday} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
