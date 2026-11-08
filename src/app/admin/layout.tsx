'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CheckSquare,
  Rocket,
  ShieldCheck,
  ArrowLeft,
  Lock,
  LogOut,
} from 'lucide-react';
import { useAstra } from '@/lib/store';

const adminNavItems = [
  { name: 'Boshqaruv Paneli', href: '/admin', icon: LayoutDashboard },
  { name: 'O‘quvchilar', href: '/admin/students', icon: Users },
  { name: 'Kurslar & Darslar', href: '/admin/courses', icon: BookOpen },
  { name: 'Test Konstruktori', href: '/admin/quizzes', icon: CheckSquare },
  { name: 'Loyihalar', href: '/admin/projects', icon: Rocket },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loginAsAdmin } = useAstra();

  // Role Guard
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-astra-darkest flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-rose-500/40 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white">
              Kirish Huquqi Cheklangan
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bu sahifaga kirish huquqingiz mavjud emas. Admin paneliga faqatgina "admin" roliga ega xodimlar ruxsat olgan.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                loginAsAdmin();
                router.refresh();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-glow-sm transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin hisobiga o‘tish (Demo)
            </button>

            <Link
              href="/"
              className="w-full block py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all"
            >
              Talaba bosh sahifasiga qaytish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-astra-darkest flex">
      {/* Admin Sidebar */}
      <aside className="w-64 h-screen sticky top-0 bg-[#090e1d] border-r border-slate-800 flex flex-col justify-between p-4 z-30">
        <div className="space-y-6">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-3 px-2 py-1 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400/40">
              <Image
                src="/images/astra-logo.png"
                alt="Astra Academy"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider block metallic-text">
                ASTRA ADMIN
              </span>
              <span className="text-[9px] font-bold text-amber-400 tracking-wider uppercase">
                Boshqaruv Paneli
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase px-3 mb-2 tracking-wider">
              Boshqaruv menyusi
            </div>
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Return to Student Portal */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-cyan-300 hover:bg-cyan-500/10 border border-cyan-500/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Talaba Ko‘rinishiga Qaytish</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <div className="flex-1 min-w-0 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
