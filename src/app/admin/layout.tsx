'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { 
  LayoutDashboard, 
  Palmtree, 
  Users, 
  MapPin, 
  LogOut, 
  Settings,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Star,
  Map,
  Link as LinkIcon,
  UserCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Holidays', href: '/admin/holidays', icon: Palmtree },
  { label: 'Destinations', href: '/admin/destinations', icon: MapPin },
  { label: 'Trust & Features', href: '/admin/features', icon: Star },
  { label: 'Branches', href: '/admin/branches', icon: Map },
  { label: 'Navigation', href: '/admin/navigation', icon: LinkIcon },
  { label: 'Subscribers', href: '/admin/subscribers', icon: Users },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  { label: 'My Account', href: '/admin/profile', icon: UserCircle },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();

  const adminDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'roles_admin', user.uid);
  }, [db, user]);

  const { data: adminRole, isLoading: isAdminRoleLoading } = useDoc(adminDocRef);

  useEffect(() => {
    if (!isUserLoading && !user && pathname !== '/admin/login' && pathname !== '/admin/setup') {
      router.push('/admin/login');
      return;
    }
  }, [user, isUserLoading, pathname, router]);

  if (pathname === '/admin/login' || pathname === '/admin/setup') return <>{children}</>;

  if (isUserLoading || isAdminRoleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-medium text-muted-foreground">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (user && !adminRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
        <div className="max-w-md w-full bg-white rounded-[40px] p-10 text-center shadow-xl">
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-headline font-bold text-primary mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-8">
            Your account ({user.email}) does not have administrator privileges.
          </p>
          <div className="space-y-3">
            <Button onClick={() => signOut(auth)} variant="outline" className="w-full rounded-xl">
              Sign Out
            </Button>
            <Link href="/admin/setup">
              <Button variant="ghost" className="w-full text-xs text-muted-foreground">
                Need to setup admin?
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="w-64 bg-primary text-white flex flex-col shrink-0">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
              <span className="text-white font-headline text-lg font-bold italic">T</span>
            </div>
            <span className="font-headline font-bold text-lg uppercase tracking-tight">Tailor<span className="text-accent">Admin</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
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
                  <span className="text-sm">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-white/5 rounded-2xl p-4">
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

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-headline font-bold text-primary">
            {ADMIN_NAV.find(n => n.href === pathname)?.label || 'Tailor Travels Management'}
          </h2>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
               <ShieldCheck className="w-3.5 h-3.5" />
               CMS Live
             </div>
          </div>
        </header>
        <div className="p-8 overflow-y-auto flex-1 bg-muted/20">
          {children}
        </div>
      </main>
    </div>
  );
}