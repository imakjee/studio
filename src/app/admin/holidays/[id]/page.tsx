'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import HolidayForm from '../form';
import { useToast } from '@/hooks/use-toast';

export default function EditHolidayPage() {
  const params = useParams();
  const router = useRouter();
  const db = useFirestore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const holidayRef = useMemoFirebase(() => {
    if (!db || !params.id) return null;
    return doc(db, 'holidays', params.id as string);
  }, [db, params.id]);

  const { data: holiday, isLoading: isFetching } = useDoc(holidayRef);

  const handleSubmit = async (data: any) => {
    if (!holidayRef) return;
    setLoading(true);
    try {
      await updateDoc(holidayRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      toast({ title: "Holiday Updated", description: "Changes saved successfully." });
      router.push('/admin/holidays');
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error", description: e.message });
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) return <div className="p-8 text-center">Loading holiday data...</div>;
  if (!holiday) return <div className="p-8 text-center">Holiday not found.</div>;

  return <HolidayForm initialData={holiday} onSubmit={handleSubmit} loading={loading} />;
}
