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
  X,
  LogOut,
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

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { user, logout } = useAstra();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in"
      />

      {/* Drawer Panel */}
      <div className="relative w-72 max-w-[80vw] h-full bg-astra-darkest border-r border-astra-border p-4 flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-astra-border">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-400/50">
              <Image
                src="/images/astra-logo.png"
                alt="Astra Academy"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-sm tracking-wider block metallic-text">
                ASTRA ACADEMY
              </span>
              <span className="text-[9px] font-semibold text-cyan-400 tracking-wider">
                IT • AI • PROGRAMMING
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {user?.role === 'admin' && (
            <div className="pt-3 mt-3 border-t border-slate-800">
              <Link
                href="/admin"
                onClick={onClose}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20"
              >
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>Admin Paneli</span>
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Profile / Logout */}
        <div className="pt-4 border-t border-astra-border">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan-400/40 flex-shrink-0">
                  <Image
                    src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={user.first_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-[10px] text-cyan-400">🪙 {user.coins} coin</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Chiqish"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="block w-full text-center py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              Kirish
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
