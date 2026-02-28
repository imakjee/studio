'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, Mail, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SubscribersPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const subscriberRef = useMemoFirebase(() => collection(db, 'newsletterSubscribers'), [db]);
  const { data: subscribers, isLoading } = useCollection(subscriberRef);

  const handleDelete = async (id: string) => {
    if (confirm('Remove this subscriber?')) {
      try {
        await deleteDoc(doc(db, 'newsletterSubscribers', id));
        toast({ title: "Subscriber Removed", description: "Email deleted from database." });
      } catch (e: any) {
        toast({ variant: "destructive", title: "Error", description: e.message });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-border/40">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-none">
              <TableHead className="font-bold py-6 pl-8">Email Address</TableHead>
              <TableHead className="font-bold">Subscription Date</TableHead>
              <TableHead className="text-right font-bold pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={3} className="text-center py-20">Loading...</TableCell></TableRow>
            ) : subscribers?.length === 0 ? (
              <TableRow><TableCell colSpan={3} className="text-center py-20 text-muted-foreground">No subscribers yet.</TableCell></TableRow>
            ) : (
              subscribers?.map((sub) => (
                <TableRow key={sub.id} className="group hover:bg-muted/10 transition-colors border-border/40">
                  <TableCell className="py-5 pl-8 font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      {sub.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {sub.subscriptionDate ? new Date(sub.subscriptionDate).toLocaleDateString() : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      onClick={() => handleDelete(sub.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
