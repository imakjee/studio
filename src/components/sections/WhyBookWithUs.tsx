'use client';

import { ShieldCheck, Trophy, Headphones, CreditCard, Tag, MapPin, Users, Building2, Calendar, Star, Loader2 } from 'lucide-react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

const ICON_MAP: Record<string, any> = {
  ShieldCheck, Trophy, Headphones, CreditCard, Tag, MapPin, Users, Building2, Calendar, Star
};

export default function WhyBookWithUs() {
  const db = useFirestore();
  
  const featuresQuery = useMemoFirebase(() => query(collection(db, 'whyBookFeatures'), orderBy('order', 'asc')), [db]);
  const statsQuery = useMemoFirebase(() => query(collection(db, 'companyStatistics'), orderBy('order', 'asc')), [db]);

  const { data: features, isLoading: featuresLoading } = useCollection(featuresQuery);
  const { data: stats, isLoading: statsLoading } = useCollection(statsQuery);

  return (
    <section className="py-24 bg-muted/30 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold mb-4">Why Book With Us?</h2>
          <p className="text-muted-foreground text-lg">Trusted by millions of holidaymakers</p>
        </div>

        {featuresLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {(features?.length ? features : []).map((feature, i) => {
              const Icon = ICON_MAP[feature.iconName] || ShieldCheck;
              return (
                <div 
                  key={i} 
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/50 group"
                >
                  <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 font-headline">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        )}

        {statsLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-accent" /></div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {(stats?.length ? stats : []).map((stat, i) => {
              const Icon = ICON_MAP[stat.iconName] || Users;
              return (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm text-center border border-border/50">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-3xl font-bold text-primary font-headline mb-1">{stat.value}</p>
                  <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
