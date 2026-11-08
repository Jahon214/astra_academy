'use client';

import React, { useState } from 'react';
import { Settings, User, Bell, Shield, Check, Save } from 'lucide-react';
import { useAstra } from '@/lib/store';

export default function SettingsPage() {
  const { user } = useAstra();
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Settings className="w-4 h-4" />
          <span>Profil Boshqaruvi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Platforma Sozlamalari
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Shaxsiy profilingiz, bildirishnomalar va xavfsizlik parametrlarini boshqaring.
        </p>
      </div>

      <form onSubmit={handleSave} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-400" />
          Shaxsiy Ma’lumotlar
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Ism:
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Familiya:
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Email Manzili:
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-400 text-sm cursor-not-allowed"
          />
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
              <Check className="w-4 h-4" /> Ma’lumotlar muvaffaqiyatli saqlandi!
            </span>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-glow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              Saqlash
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
