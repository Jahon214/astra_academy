'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Users, Search, ShieldCheck, UserCheck, Shield } from 'lucide-react';
import { useAstra } from '@/lib/store';

export default function AdminStudentsPage() {
  const { allStudents, updateStudentRole } = useAstra();
  const [search, setSearch] = useState('');

  const filteredStudents = allStudents.filter(
    (s) =>
      s.first_name.toLowerCase().includes(search.toLowerCase()) ||
      s.last_name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Foydalanuvchilar Boshqaruvi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            O‘quvchilar va Rollar Ro‘yxati
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Barcha ro‘yxatdan o‘tgan talabalar ma’lumotlari, ularning o‘quv statistikasi va tizim rollari.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ism yoki email orqali qidirish..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Foydalanuvchi</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Daraja & XP</th>
                <th className="py-3.5 px-4">Coinlar</th>
                <th className="py-3.5 px-4">Joriy Rol</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Rolni O‘zgartirish</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-700 flex-shrink-0">
                        <Image
                          src={
                            st.avatar_url ||
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                          }
                          alt={st.first_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-white">
                        {st.first_name} {st.last_name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{st.email}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-blue-300">⭐ {st.level}</span>
                    <span className="text-slate-500 ml-1.5 font-mono">({st.xp} XP)</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-amber-400 font-mono">
                    🪙 {st.coins}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        st.role === 'admin'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {st.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    {st.role === 'student' ? (
                      <button
                        onClick={() => updateStudentRole(st.id, 'admin')}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold transition-all"
                      >
                        Admin Qilish
                      </button>
                    ) : (
                      <button
                        onClick={() => updateStudentRole(st.id, 'student')}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-all"
                      >
                        Talaba Qilish
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
