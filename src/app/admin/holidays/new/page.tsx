'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import HolidayForm from '../form';
import { useToast } from '@/hooks/use-toast';

export default function NewHolidayPage() {
  const [loading, setLoading] = useState(false);
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Use Firestore generated ID by not providing a manual 'id' field
      await addDoc(collection(db, 'holidays'), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        currency: 'GBP',
        destinationId: 'global', // Default for now
      });
      toast({ title: "Holiday Created", description: "Package published successfully." });
      router.push('/admin/holidays');
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error", description: e.message });
    } finally {
      setLoading(false);
    }
  };

  return <HolidayForm onSubmit={handleSubmit} loading={loading} />;
}
