
"use client";

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Calendar, Plane, Users, Search } from 'lucide-react';

export default function SearchBox() {
  const [activeTab, setActiveTab] = useState("holidays");

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-2 md:p-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Tabs defaultValue="holidays" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-transparent h-12 gap-2 mb-4 p-1">
          <TabsTrigger 
            value="holidays" 
            className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-medium"
          >
            Holidays
          </TabsTrigger>
          <TabsTrigger 
            value="cruises" 
            className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-medium"
          >
            Cruises
          </TabsTrigger>
          <TabsTrigger 
            value="deals" 
            className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-medium"
          >
            Deals
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="space-y-1.5 md:col-span-1">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 ml-1">
              <MapPin className="w-3 h-3" /> Where to?
            </Label>
            <Input placeholder="Anywhere" className="bg-background border-none h-12 rounded-xl focus-visible:ring-primary" />
          </div>
          
          <div className="space-y-1.5 md:col-span-1">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 ml-1">
              <Calendar className="w-3 h-3" /> When?
            </Label>
            <Input type="date" className="bg-background border-none h-12 rounded-xl focus-visible:ring-primary" />
          </div>

          <div className="space-y-1.5 md:col-span-1">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 ml-1">
              <Plane className="w-3 h-3" /> Flying from
            </Label>
            <Input placeholder="Any airport" className="bg-background border-none h-12 rounded-xl focus-visible:ring-primary" />
          </div>

          <div className="space-y-1.5 md:col-span-1">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 ml-1">
              <Users className="w-3 h-3" /> Guests
            </Label>
            <Input placeholder="2 Adults" className="bg-background border-none h-12 rounded-xl focus-visible:ring-primary" />
          </div>

          <Button className="bg-accent hover:bg-accent/90 text-white h-12 rounded-xl font-bold flex items-center gap-2 w-full transition-transform active:scale-95 shadow-lg shadow-accent/20">
            <Search className="w-4 h-4" />
            SEARCH
          </Button>
        </div>
      </Tabs>
    </div>
  );
}
