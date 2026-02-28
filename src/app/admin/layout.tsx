'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser, useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Palmtree, 
  Users, 
  MapPin, 
  LogOut, 
  Settings,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Holidays', href: '/admin/holidays', icon: Palmtree },
  { label: 'Destinations', href: '/admin/destinations', icon: MapPin },
  { label: 'Subscribers', href: '/admin/subscribers', icon: Users },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();

  // DBAC: Check if user is in roles_admin collection
  const adminDocRef = user ? doc(db, 'roles_admin', user.uid) : null;
  const { data: adminRole, isLoading: isAdminRoleLoading } = useDoc(adminDocRef);

  useEffect(() => {
    if (!isUserLoading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
    // If user is logged in but not an admin, redirect or show unauthorized
    if (!isUserLoading && user && !isAdminRoleLoading && !adminRole && pathname !== '/admin/login') {
      // In a real app, you'd show an unauthorized screen
      console.warn("Access denied: User is not an admin");
    }
  }, [user, isUserLoading, adminRole, isAdminRoleLoading, pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;
  if (isUserLoading || isAdminRoleLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col shrink-0">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
              <span className="text-white font-headline text-lg font-bold italic">E</span>
            </div>
            <span className="font-headline font-bold text-lg uppercase tracking-tight">Elite<span className="text-accent">Admin</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-white/5 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold">
                {user?.email?.[0].toUpperCase()}
              </div>
              <div className="text-xs truncate">
                <p className="font-bold">{user?.email}</p>
                <p className="text-white/40">Administrator</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white/60 hover:text-white hover:bg-white/10 p-2 h-auto text-xs"
              onClick={() => signOut(auth)}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b flex items-center justify-between px-8">
          <h2 className="text-xl font-headline font-bold text-primary">
            {ADMIN_NAV.find(n => n.href === pathname)?.label || 'Elite Escapes Management'}
          </h2>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
               <ShieldCheck className="w-3.5 h-3.5" />
               System Online
             </div>
          </div>
        </header>
        <div className="p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
