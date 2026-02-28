'use client';

import { useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, ShieldCheck, Trophy, Headphones, CreditCard, Tag, MapPin, Users, Building2, Calendar, Star, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ICONS = [
  { name: 'ShieldCheck', icon: ShieldCheck },
  { name: 'Trophy', icon: Trophy },
  { name: 'Headphones', icon: Headphones },
  { name: 'CreditCard', icon: CreditCard },
  { name: 'Tag', icon: Tag },
  { name: 'MapPin', icon: MapPin },
  { name: 'Users', icon: Users },
  { name: 'Building2', icon: Building2 },
  { name: 'Calendar', icon: Calendar },
  { name: 'Star', icon: Star },
];

export default function FeaturesAdminPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Features
  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<any>(null);
  const featureRef = useMemoFirebase(() => query(collection(db, 'whyBookFeatures'), orderBy('order', 'asc')), [db]);
  const { data: features, isLoading: featuresLoading } = useCollection(featureRef);

  // Stats
  const [isStatDialogOpen, setIsStatDialogOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<any>(null);
  const statRef = useMemoFirebase(() => query(collection(db, 'companyStatistics'), orderBy('order', 'asc')), [db]);
  const { data: stats, isLoading: statsLoading } = useCollection(statRef);

  const [featureForm, setFeatureForm] = useState({
    title: '',
    description: '',
    iconName: 'ShieldCheck',
    order: 0,
  });

  const [statForm, setStatForm] = useState({
    value: '',
    label: '',
    iconName: 'Users',
    order: 0,
  });

  const handleFeatureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingFeature) {
        await updateDoc(doc(db, 'whyBookFeatures', editingFeature.id), featureForm);
        toast({ title: "Updated", description: "Feature updated successfully." });
      } else {
        await addDoc(collection(db, 'whyBookFeatures'), featureForm);
        toast({ title: "Created", description: "Feature added successfully." });
      }
      setIsFeatureDialogOpen(false);
      setEditingFeature(null);
      setFeatureForm({ title: '', description: '', iconName: 'ShieldCheck', order: (features?.length || 0) + 1 });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error", description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const handleStatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingStat) {
        await updateDoc(doc(db, 'companyStatistics', editingStat.id), statForm);
        toast({ title: "Updated", description: "Statistic updated successfully." });
      } else {
        await addDoc(collection(db, 'companyStatistics'), statForm);
        toast({ title: "Created", description: "Statistic added successfully." });
      }
      setIsStatDialogOpen(false);
      setEditingStat(null);
      setStatForm({ value: '', label: '', iconName: 'Users', order: (stats?.length || 0) + 1 });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error", description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (col: string, id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await deleteDoc(doc(db, col, id));
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
          <h1 className="text-3xl font-headline font-bold text-primary">Trust & Features</h1>
          <p className="text-muted-foreground">Manage the "Why Book With Us" section and company stats.</p>
        </div>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="bg-white p-1 rounded-xl shadow-sm border border-border/40 mb-6">
          <TabsTrigger value="features" className="rounded-lg px-8">Company Features</TabsTrigger>
          <TabsTrigger value="stats" className="rounded-lg px-8">Company Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <div className="flex justify-end mb-4">
            <Button onClick={() => { setEditingFeature(null); setFeatureForm({title: '', description: '', iconName: 'ShieldCheck', order: (features?.length || 0) + 1}); setIsFeatureDialogOpen(true); }} className="bg-accent h-11 rounded-xl">
              <Plus className="w-4 h-4 mr-2" /> Add Feature
            </Button>
          </div>
          <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-border/40">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-none">
                  <TableHead className="font-bold py-6 pl-8">Icon</TableHead>
                  <TableHead className="font-bold">Feature Title</TableHead>
                  <TableHead className="font-bold">Order</TableHead>
                  <TableHead className="text-right font-bold pr-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {featuresLoading ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-10"><Loader2 className="animate-spin mx-auto" /></TableCell></TableRow>
                ) : features?.map((f) => {
                  const Icon = ICONS.find(i => i.name === f.iconName)?.icon || ShieldCheck;
                  return (
                    <TableRow key={f.id} className="border-border/40 group hover:bg-muted/5">
                      <TableCell className="pl-8 py-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-primary">{f.title}</TableCell>
                      <TableCell>{f.order}</TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => { setEditingFeature(f); setFeatureForm({...f}); setIsFeatureDialogOpen(true); }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteItem('whyBookFeatures', f.id)} className="text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="stats">
          <div className="flex justify-end mb-4">
            <Button onClick={() => { setEditingStat(null); setStatForm({value: '', label: '', iconName: 'Users', order: (stats?.length || 0) + 1}); setIsStatDialogOpen(true); }} className="bg-accent h-11 rounded-xl">
              <Plus className="w-4 h-4 mr-2" /> Add Statistic
            </Button>
          </div>
          <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-border/40">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-none">
                  <TableHead className="font-bold py-6 pl-8">Icon</TableHead>
                  <TableHead className="font-bold">Value</TableHead>
                  <TableHead className="font-bold">Label</TableHead>
                  <TableHead className="font-bold">Order</TableHead>
                  <TableHead className="text-right font-bold pr-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statsLoading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="animate-spin mx-auto" /></TableCell></TableRow>
                ) : stats?.map((s) => {
                  const Icon = ICONS.find(i => i.name === s.iconName)?.icon || Users;
                  return (
                    <TableRow key={s.id} className="border-border/40 group hover:bg-muted/5">
                      <TableCell className="pl-8 py-4">
                        <div className="w-10 h-10 rounded-lg bg-accent/5 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-primary">{s.value}</TableCell>
                      <TableCell className="text-muted-foreground">{s.label}</TableCell>
                      <TableCell>{s.order}</TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => { setEditingStat(s); setStatForm({...s}); setIsStatDialogOpen(true); }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteItem('companyStatistics', s.id)} className="text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Feature Dialog */}
      <Dialog open={isFeatureDialogOpen} onOpenChange={setIsFeatureDialogOpen}>
        <DialogContent className="rounded-[32px] sm:max-w-md">
          <DialogHeader><DialogTitle>{editingFeature ? 'Edit Feature' : 'Add Feature'}</DialogTitle></DialogHeader>
          <form onSubmit={handleFeatureSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Icon</Label>
              <Select value={featureForm.iconName} onValueChange={(v) => setFeatureForm({...featureForm, iconName: v})}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ICONS.map(i => <SelectItem key={i.name} value={i.name} className="flex items-center gap-2"><div className="flex items-center gap-2"><i.icon className="w-4 h-4" /> {i.name}</div></SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={featureForm.title} onChange={e => setFeatureForm({...featureForm, title: e.target.value})} placeholder="e.g. ATOL Protected" required className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={featureForm.description} onChange={e => setFeatureForm({...featureForm, description: e.target.value})} placeholder="Short explanation..." className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input type="number" value={featureForm.order} onChange={e => setFeatureForm({...featureForm, order: Number(e.target.value)})} className="rounded-xl" />
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" disabled={loading} className="w-full bg-primary rounded-xl">
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingFeature ? 'Update' : 'Save'} Feature
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Stat Dialog */}
      <Dialog open={isStatDialogOpen} onOpenChange={setIsStatDialogOpen}>
        <DialogContent className="rounded-[32px] sm:max-w-md">
          <DialogHeader><DialogTitle>{editingStat ? 'Edit Stat' : 'Add Stat'}</DialogTitle></DialogHeader>
          <form onSubmit={handleStatSubmit} className="space-y-4 pt-4">
             <div className="space-y-2">
              <Label>Icon</Label>
              <Select value={statForm.iconName} onValueChange={(v) => setStatForm({...statForm, iconName: v})}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ICONS.map(i => <SelectItem key={i.name} value={i.name} className="flex items-center gap-2"><div className="flex items-center gap-2"><i.icon className="w-4 h-4" /> {i.name}</div></SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Value</Label>
              <Input value={statForm.value} onChange={e => setStatForm({...statForm, value: e.target.value})} placeholder="e.g. 500+" required className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Label</Label>
              <Input value={statForm.label} onChange={e => setStatForm({...statForm, label: e.target.value})} placeholder="e.g. UK Branches" required className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input type="number" value={statForm.order} onChange={e => setStatForm({...statForm, order: Number(e.target.value)})} className="rounded-xl" />
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" disabled={loading} className="w-full bg-primary rounded-xl">
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingStat ? 'Update' : 'Save'} Statistic
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
