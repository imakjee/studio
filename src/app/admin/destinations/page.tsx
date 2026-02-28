'use client';

import { useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, MapPin, Loader2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DestinationsAdminPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const destRef = useMemoFirebase(() => collection(db, 'destinations'), [db]);
  const { data: destinations, isLoading } = useCollection(destRef);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    isPopular: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingDest) {
        await updateDoc(doc(db, 'destinations', editingDest.id), {
          ...formData,
          updatedAt: serverTimestamp(),
        });
        toast({ title: "Updated", description: "Destination updated successfully." });
      } else {
        await addDoc(collection(db, 'destinations'), {
          ...formData,
          createdAt: serverTimestamp(),
        });
        toast({ title: "Created", description: "New destination added." });
      }
      setIsDialogOpen(false);
      setEditingDest(null);
      setFormData({ name: '', description: '', imageUrl: '', isPopular: false });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error", description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this destination?')) {
      try {
        await deleteDoc(doc(db, 'destinations', id));
        toast({ title: "Deleted", description: "Destination removed." });
      } catch (e: any) {
        toast({ variant: "destructive", title: "Error", description: e.message });
      }
    }
  };

  const openEdit = (dest: any) => {
    setEditingDest(dest);
    setFormData({
      name: dest.name,
      description: dest.description,
      imageUrl: dest.imageUrl,
      isPopular: dest.isPopular,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Destinations</h1>
          <p className="text-muted-foreground">Manage the hotspots featured on your site.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-white font-bold h-11 rounded-xl">
              <Plus className="w-4 h-4 mr-2" /> Add Destination
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-[32px]">
            <DialogHeader>
              <DialogTitle className="font-headline font-bold">
                {editingDest ? 'Edit Destination' : 'New Destination'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Destination Name</Label>
                <Input 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Maldives"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Short description..."
                />
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input 
                  value={formData.imageUrl} 
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <input 
                  type="checkbox" 
                  id="popular"
                  checked={formData.isPopular}
                  onChange={e => setFormData({...formData, isPopular: e.target.checked})}
                  className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <Label htmlFor="popular">Mark as Popular Destination</Label>
              </div>
              <DialogFooter className="pt-6">
                <Button type="submit" disabled={loading} className="w-full bg-primary h-11 rounded-xl">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {editingDest ? 'Update' : 'Create'} Destination
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-border/40">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-none">
              <TableHead className="font-bold py-6 pl-8">Destination</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={3} className="text-center py-20"><Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" /></TableCell></TableRow>
            ) : !destinations?.length ? (
              <TableRow><TableCell colSpan={3} className="text-center py-20 text-muted-foreground">No destinations found.</TableCell></TableRow>
            ) : (
              destinations.map((dest) => (
                <TableRow key={dest.id} className="group hover:bg-muted/10 transition-colors border-border/40">
                  <TableCell className="py-4 pl-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0 border border-border/50">
                        {dest.imageUrl ? (
                          <img src={dest.imageUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full"><ImageIcon className="w-5 h-5 text-muted-foreground" /></div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-primary">{dest.name}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{dest.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {dest.isPopular && <Badge className="bg-accent/10 text-accent border-none text-[10px]">Popular</Badge>}
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-primary/5 text-primary" onClick={() => openEdit(dest)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-red-50 text-red-500" onClick={() => handleDelete(dest.id)}>
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
