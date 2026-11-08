'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  FileText,
  CheckSquare,
  Code2,
  Rocket,
  Coins,
  Trophy,
  BarChart3,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAstra } from '@/lib/store';

const navItems = [
  { name: 'Bosh sahifa', href: '/', icon: Home },
  { name: 'Kurslar', href: '/courses', icon: BookOpen },
  { name: 'Qo‘llanma', href: '/guides', icon: FileText },
  { name: 'Testlar', href: '/tests', icon: CheckSquare },
  { name: 'Amaliyot', href: '/practice', icon: Code2 },
  { name: 'Loyihalar', href: '/projects', icon: Rocket },
  { name: 'Coinlar', href: '/coins', icon: Coins },
  { name: 'Yutuqlar', href: '/achievements', icon: Trophy },
  { name: 'Natijalar', href: '/results', icon: BarChart3 },
  { name: 'Sozlamalar', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAstra();

  const getLevelTitle = (level: number) => {
    switch (level) {
      case 1: return 'Boshlovchi';
      case 2: return 'O‘rganuvchi';
      case 3: return 'Explorer';
      case 4: return 'Junior Dev';
      case 5: return 'Developer';
      case 6: return 'Advanced Dev';
      case 7: return 'Professional';
      default: return 'Talaba';
    }
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 bg-astra-dark/95 border-r border-astra-border backdrop-blur-xl z-30 transition-all">
      {/* Brand Header with Logo */}
      <div className="p-5 border-b border-astra-border flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400/40 shadow-glow-sm group-hover:border-cyan-400 group-hover:shadow-glow-md transition-all">
            <Image
              src="/images/astra-logo.png"
              alt="Astra Academy Logotipi"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-wider block metallic-text">
              ASTRA ACADEMY
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-cyan-400 uppercase block">
              IT • AI • PROGRAMMING
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="text-[11px] font-bold text-slate-400 uppercase px-3 mb-2 tracking-wider">
          Asosiy Bo‘limlar
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/30 shadow-glow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'
                  }`}
                />
                <span>{item.name}</span>
              </div>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-glow-sm" />
              )}
            </Link>
          );
        })}

        {/* Admin Navigation Section if user is admin */}
        {user?.role === 'admin' && (
          <div className="pt-4 mt-4 border-t border-slate-800/80">
            <div className="text-[11px] font-bold text-amber-400 uppercase px-3 mb-2 tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Boshqaruvi
            </div>
            <Link
              href="/admin"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                pathname.startsWith('/admin')
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-600/10 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-amber-200/80 hover:text-amber-200 hover:bg-amber-500/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>Admin Paneli</span>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-400/60" />
            </Link>
          </div>
        )}
      </div>

      {/* Bottom Profile Footer */}
      <div className="p-3 border-t border-astra-border bg-astra-darkest/60">
        {user ? (
          <div className="glass-panel p-3 rounded-xl flex items-center justify-between gap-3">
            <Link href="/profile" className="flex items-center gap-2.5 min-w-0 flex-1 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-400/40 flex-shrink-0">
                <Image
                  src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={user.first_name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                  {user.first_name} {user.last_name}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-cyan-400">
                  <span>⭐ Daraja {user.level}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{getLevelTitle(user.level)}</span>
                </div>
              </div>
            </Link>

            <button
              onClick={logout}
              title="Chiqish"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors flex-shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="w-full block text-center py-2 px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-sm font-semibold transition-all"
          >
            Hisobga kirish
          </Link>
        )}
      </div>
    </aside>
  );
};
