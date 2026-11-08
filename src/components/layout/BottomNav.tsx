'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, CheckSquare, Coins, User } from 'lucide-react';
import { useAstra } from '@/lib/store';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { user, triggerHaptic } = useAstra();

  const navItems = [
    { label: 'Bosh sahifa', href: '/', icon: Home },
    { label: 'Kurslar', href: '/courses', icon: BookOpen },
    { label: 'Sinovlar', href: '/tests', icon: CheckSquare },
    { label: 'Coinlar', href: '/coins', icon: Coins, badge: user?.coins ? `${user.coins}` : undefined },
    { label: 'Profil', href: '/profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-yellow-500/20 max-w-2xl mx-auto shadow-[0_-8px_25px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-around px-2 py-1.5 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => triggerHaptic('light')}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 px-1 relative transition-all rounded-xl ${
                isActive
                  ? 'text-yellow-400 font-bold scale-105'
                  : 'text-neutral-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_8px_#facc15]" />
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight truncate max-w-[64px] ${isActive ? 'font-bold text-yellow-300' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
