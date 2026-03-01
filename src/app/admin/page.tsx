'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Palmtree, 
  TrendingUp, 
  MapPinned,
  ArrowUpRight,
  ArrowDownRight,
  Rocket,
  ShieldCheck,
  Download,
  AlertCircle
} from 'lucide-react';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  Cell
} from 'recharts';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CHART_DATA = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

export default function AdminDashboard() {
  const db = useFirestore();
  
  const holidayRef = useMemoFirebase(() => collection(db, 'holidays'), [db]);
  const subscriberRef = useMemoFirebase(() => collection(db, 'newsletterSubscribers'), [db]);
  const destinationRef = useMemoFirebase(() => collection(db, 'destinations'), [db]);

  const { data: holidays } = useCollection(holidayRef);
  const { data: subscribers } = useCollection(subscriberRef);
  const { data: destinations } = useCollection(destinationRef);

  const stats = [
    { label: 'Total Holidays', value: holidays?.length || 0, icon: Palmtree, trend: '+12%', up: true },
    { label: 'Subscribers', value: subscribers?.length || 0, icon: Users, trend: '+5%', up: true },
    { label: 'Destinations', value: destinations?.length || 0, icon: MapPinned, trend: '0%', up: true },
    { label: 'Conversion Rate', value: '4.8%', icon: TrendingUp, trend: '-2%', up: false },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-primary font-headline">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Deployment Status Card */}
          <Card className="border-none shadow-xl rounded-[40px] bg-gradient-to-br from-primary to-[#0b3d44] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <CardHeader>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-2">
                <Rocket className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-2xl font-headline font-bold">Launch Center</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                  <p className="font-bold text-accent uppercase tracking-widest text-[10px] mb-2">Step 1: The Firebase Icon</p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Click the <strong>Orange Flame</strong> icon in the far left sidebar of this screen.
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                  <p className="font-bold text-accent uppercase tracking-widest text-[10px] mb-2">Step 2: Deploy</p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Click <strong>"Deploy to Hosting"</strong>. If a login window opens, copy the code provided back here.
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 mb-6 bg-yellow-500/10 p-4 rounded-2xl border border-yellow-500/20">
                  <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0" />
                  <p className="text-xs text-yellow-100/80">
                    <strong>Note:</strong> If the button is missing, ensure you have selected your project in the Firebase sidebar settings.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium">Static Export Config: ACTIVE</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold">Booking Trends (2024)</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] pl-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `£${value}`}
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {CHART_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === CHART_DATA.length - 1 ? '#F4A825' : '#054452'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-headline font-bold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-primary">System Update</p>
                    <p className="text-xs text-muted-foreground">Hosting config synchronized</p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-wider">Just Now</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-6 border-t border-border/50">
               <Link href="/admin/holidays">
                  <Button variant="outline" className="w-full border-primary/20 text-primary font-bold h-11 rounded-xl">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
