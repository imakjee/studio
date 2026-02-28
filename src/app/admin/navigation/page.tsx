'use client';

import { useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Link as LinkIcon, Loader2, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const GROUPS = [
  { id: 'mainHeader', label: 'Main Header Navigation' },
  { id: 'footerHolidayTypes', label: 'Footer: Holiday Types' },
  { id: 'footerDestinations', label: 'Footer: Destinations' },
  { id: 'footerCompany', label: 'Footer: Company' },
  { id: 'footerSupport', label: 'Footer: Support' },
];

export default function NavigationAdminPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const navRef = useMemoFirebase(() => query(collection(db, 'navigationItems'), orderBy('order', 'asc')), [db]);
  const { data: navItems, isLoading } = useCollection(navRef);

  const [form, setForm] = useState({
    label: '',
    url: '',
    group: 'mainHeader',
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        await updateDoc(doc(db, 'navigationItems', editingItem.id), form);
        toast({ title: "Updated", description: "Menu item updated." });
      } else {
        await addDoc(collection(db, 'navigationItems'), form);
        toast({ title: "Created", description: "Menu item added." });
      }
      setIsDialogOpen(false);
      setEditingItem(null);
      setForm({ label: '', url: '', group: 'mainHeader', order: (navItems?.length || 0) + 1 });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error", description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (confirm('Remove this menu item?')) {
      try {
        await deleteDoc(doc(db, 'navigationItems', id));
        toast({ title: "Deleted", description: "Item removed." });
      } catch (e: any) {
        toast({ variant: "destructive", title: "Error", description: e.message });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Navigation CMS</h1>
          <p className="text-muted-foreground">Manage header menus and footer columns.</p>
        </div>
        <Button onClick={() => { setEditingItem(null); setForm({ label: '', url: '', group: 'mainHeader', order: (navItems?.length || 0) + 1 }); setIsDialogOpen(true); }} className="bg-accent h-11 rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Add Menu Item
        </Button>
      </div>

      <div className="space-y-8">
        {GROUPS.map((group) => {
          const items = navItems?.filter(item => item.group === group.id) || [];
          return (
            <div key={group.id} className="space-y-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2 px-2">
                <LinkIcon className="w-4 h-4 text-accent" />
                {group.label}
              </h3>
              <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-border/40">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow className="border-none">
                      <TableHead className="font-bold py-4 pl-8 w-1/3">Label</TableHead>
                      <TableHead className="font-bold">Target URL</TableHead>
                      <TableHead className="font-bold">Order</TableHead>
                      <TableHead className="text-right font-bold pr-8">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow><TableCell colSpan={4} className="text-center py-6"><Loader2 className="animate-spin mx-auto" /></TableCell></TableRow>
                    ) : items.length === 0 ? (
                      <TableRow><TableCell colSpan={4} className="text-center py-10 text-muted-foreground italic">No items in this section.</TableCell></TableRow>
                    ) : (
                      items.map((item) => (
                        <TableRow key={item.id} className="border-border/40 group hover:bg-muted/5">
                          <TableCell className="pl-8 py-3 font-bold text-primary">{item.label}</TableCell>
                          <TableCell className="text-xs text-muted-foreground font-mono">{item.url}</TableCell>
                          <TableCell className="text-xs">{item.order}</TableCell>
                          <TableCell className="text-right pr-8">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingItem(item); setForm({...item}); setIsDialogOpen(true); }}>
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => deleteItem(item.id)}>
                                <Trash2 className="w-3.5 h-3.5" />
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
        })}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-[32px] sm:max-w-md">
          <DialogHeader><DialogTitle>{editingItem ? 'Edit Menu Item' : 'New Menu Item'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input value={form.label} onChange={e => setForm({...form, label: e.target.value})} placeholder="e.g. Holidays" required className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>URL / Path</Label>
              <Input value={form.url} onChange={e => setForm({...form, url: e.target.value})} placeholder="/holidays" required className="rounded-xl font-mono" />
            </div>
            <div className="space-y-2">
              <Label>Placement Group</Label>
              <Select value={form.group} onValueChange={(v) => setForm({...form, group: v})}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {GROUPS.map(g => <SelectItem key={g.id} value={g.id}>{g.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input type="number" value={form.order} onChange={e => setForm({...form, order: Number(e.target.value)})} className="rounded-xl" />
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" disabled={loading} className="w-full bg-primary rounded-xl h-11">
                {loading ? <Loader2 className="animate-spin" /> : null}
                {editingItem ? 'Update Item' : 'Add to Menu'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
