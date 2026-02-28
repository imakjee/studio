'use client';

import { useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, MapPin, Loader2, Phone, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BranchesAdminPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<any>(null);

  const branchRef = useMemoFirebase(() => collection(db, 'branches'), [db]);
  const { data: branches, isLoading } = useCollection(branchRef);

  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    postcode: '',
    phoneNumber: '',
    openingHours: 'Mon-Sat: 9am-6pm',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingBranch) {
        await updateDoc(doc(db, 'branches', editingBranch.id), form);
        toast({ title: "Updated", description: "Branch details saved." });
      } else {
        await addDoc(collection(db, 'branches'), { ...form, createdAt: serverTimestamp() });
        toast({ title: "Created", description: "New branch added." });
      }
      setIsDialogOpen(false);
      setEditingBranch(null);
      setForm({ name: '', address: '', city: '', postcode: '', phoneNumber: '', openingHours: 'Mon-Sat: 9am-6pm' });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error", description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const deleteBranch = async (id: string) => {
    if (confirm('Delete this branch?')) {
      try {
        await deleteDoc(doc(db, 'branches', id));
        toast({ title: "Deleted", description: "Branch removed." });
      } catch (e: any) {
        toast({ variant: "destructive", title: "Error", description: e.message });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Physical Branches</h1>
          <p className="text-muted-foreground">Manage your travel agency locations across the country.</p>
        </div>
        <Button onClick={() => { setEditingBranch(null); setForm({ name: '', address: '', city: '', postcode: '', phoneNumber: '', openingHours: 'Mon-Sat: 9am-6pm' }); setIsDialogOpen(true); }} className="bg-accent h-11 rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Add Branch
        </Button>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-border/40">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-none">
              <TableHead className="font-bold py-6 pl-8">Branch Name</TableHead>
              <TableHead className="font-bold">Contact</TableHead>
              <TableHead className="font-bold">Opening Hours</TableHead>
              <TableHead className="text-right font-bold pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-20"><Loader2 className="animate-spin mx-auto text-muted-foreground" /></TableCell></TableRow>
            ) : branches?.map((b) => (
              <TableRow key={b.id} className="border-border/40 group hover:bg-muted/5">
                <TableCell className="pl-8 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-primary">{b.name}</p>
                      <p className="text-xs text-muted-foreground">{b.city}, {b.postcode}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-3.5 h-3.5 text-accent" />
                    {b.phoneNumber}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    {b.openingHours}
                  </div>
                </TableCell>
                <TableCell className="text-right pr-8">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => { setEditingBranch(b); setForm({...b}); setIsDialogOpen(true); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteBranch(b.id)} className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-[32px] sm:max-w-lg">
          <DialogHeader><DialogTitle>{editingBranch ? 'Edit Branch' : 'New Branch'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Branch Name</Label>
                <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. London West End" required className="rounded-xl" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Street Address</Label>
                <Input value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="123 Street..." required className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Input value={form.city} onChange={e => setForm({...form, city: e.target.value})} placeholder="London" required className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Postcode</Label>
                <Input value={form.postcode} onChange={e => setForm({...form, postcode: e.target.value})} placeholder="W1B 4DA" required className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input value={form.phoneNumber} onChange={e => setForm({...form, phoneNumber: e.target.value})} placeholder="020..." required className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Opening Hours</Label>
                <Input value={form.openingHours} onChange={e => setForm({...form, openingHours: e.target.value})} placeholder="Mon-Fri..." required className="rounded-xl" />
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" disabled={loading} className="w-full bg-primary rounded-xl h-11">
                {loading ? <Loader2 className="animate-spin" /> : null}
                {editingBranch ? 'Update Branch' : 'Create Branch'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
