'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Star, MapPin, Search } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function HolidaysAdminPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const holidayRef = useMemoFirebase(() => collection(db, 'holidays'), [db]);
  const { data: holidays, isLoading } = useCollection(holidayRef);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this holiday package?')) {
      try {
        await deleteDoc(doc(db, 'holidays', id));
        toast({ title: "Holiday Deleted", description: "Package removed successfully." });
      } catch (e: any) {
        toast({ variant: "destructive", title: "Error", description: e.message });
      }
    }
  };

  const filteredHolidays = holidays?.filter(h => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search holidays..." 
            className="pl-10 rounded-xl bg-white h-11 border-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href="/admin/holidays/new">
          <Button className="bg-accent hover:bg-accent/90 text-white font-bold h-11 rounded-xl shadow-lg shadow-accent/20">
            <Plus className="w-4 h-4 mr-2" />
            Add New Holiday
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-border/40">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-none">
              <TableHead className="font-bold py-6">Holiday Package</TableHead>
              <TableHead className="font-bold">Location</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-20 text-muted-foreground">Loading holidays...</TableCell></TableRow>
            ) : filteredHolidays?.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-20 text-muted-foreground">No holidays found.</TableCell></TableRow>
            ) : (
              filteredHolidays?.map((holiday) => (
                <TableRow key={holiday.id} className="group hover:bg-muted/10 transition-colors border-border/40">
                  <TableCell className="py-4 pl-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0">
                        <img src={holiday.mainImageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-primary">{holiday.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-accent fill-accent" />
                          <span className="text-xs text-muted-foreground">{holiday.ratingStars} Stars</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      {holiday.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-primary">£{holiday.pricePerPerson}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">{holiday.durationNights} Nights</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {holiday.isFeatured && <Badge className="bg-primary/10 text-primary border-none text-[10px]">Featured</Badge>}
                      {holiday.isLastMinuteOffer && <Badge className="bg-accent/10 text-accent border-none text-[10px]">Last Minute</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/holidays/${holiday.id}`}>
                        <Button variant="outline" size="icon" className="w-9 h-9 rounded-lg border-primary/20 text-primary hover:bg-primary hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="w-9 h-9 rounded-lg border-red-200 text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={() => handleDelete(holiday.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
