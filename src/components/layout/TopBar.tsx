'use client';

import { Phone, Clock, MapPin } from 'lucide-react';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';

export default function TopBar() {
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'companyInfo', 'globalSettings'), [db]);
  const { data: settings } = useDoc(settingsRef);

  return (
    <div className="bg-primary text-white py-2 hidden md:block w-full">
      <div className="container mx-auto px-4 flex justify-between items-center text-xs font-medium">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3" />
            <span>{settings?.contactPhoneNumber || '0800 123 4567'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-accent" />
            <span>{settings?.operatingHoursText || 'Open 7 days a week'}</span>
          </div>
        </div>
        <Link href="/branches" className="flex items-center gap-2 hover:text-accent transition-colors cursor-pointer">
          <MapPin className="w-3 h-3" />
          <span>Find a Branch</span>
        </Link>
      </div>
    </div>
  );
}
