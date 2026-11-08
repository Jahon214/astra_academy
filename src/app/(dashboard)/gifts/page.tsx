'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Gift,
  Coins,
  Sparkles,
  ChevronLeft,
  CheckCircle2,
  Ticket,
  Flame,
  Award,
  ArrowRight,
  PackageCheck,
} from 'lucide-react';
import { useAstra } from '@/lib/store';

export default function GiftsPage() {
  const { user, triggerHaptic } = useAstra();
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<string | null>(null);
  const [isDailyClaimed, setIsDailyClaimed] = useState(false);
  const [rewardAnimation, setRewardAnimation] = useState(false);

  const handleClaimDailyGift = () => {
    if (isDailyClaimed) return;
    triggerHaptic('success');
    setRewardAnimation(true);
    setIsDailyClaimed(true);

    if (user) {
      user.coins += 50;
      user.xp += 30;
      localStorage.setItem('astra_user', JSON.stringify(user));
    }

    setTimeout(() => {
      setRewardAnimation(false);
    }, 2500);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    triggerHaptic('medium');
    const code = promoCode.trim().toUpperCase();

    if (code === 'ASTRA2026' || code === 'TELEGRAM' || code === 'GOLD') {
      if (user) {
        user.coins += 100;
        localStorage.setItem('astra_user', JSON.stringify(user));
      }
      setPromoStatus('Muvaffaqiyatli! Hisobingizga +100 coin qo‘shildi 🎉');
      setPromoCode('');
    } else {
      setPromoStatus('Kechirasiz, bunday promo-kod mavjud emas yoki muddati o‘tgan.');
    }
  };

  const giftCatalog = [
    {
      id: 'g-1',
      title: 'Astra Academy Brendli Hoodie',
      category: 'Merch',
      cost: 1500,
      description: 'Maxsus paxtali, qora va oltin neon printli eksklyuziv Astra kiyimi.',
      icon: '👕',
    },
    {
      id: 'g-2',
      title: 'Katta Mentor bilan 1-ga-1 Konsultatsiya',
      category: 'Karyera',
      cost: 800,
      description: '45 daqiqalik individual rezyume tekshiruvi va kasbiy yo‘naltirish.',
      icon: '🎯',
    },
    {
      id: 'g-3',
      title: 'Har Qanday Kursga 50% Chegirma Kuponi',
      category: 'Ta’lim',
      cost: 500,
      description: 'Pullik intensiv dasturlar uchun bir martalik chegirma promokodi.',
      icon: '🎟️',
    },
    {
      id: 'g-4',
      title: 'Astra VIP Yopiq Jamiyati A’zoligi',
      category: 'Hamjamiyat',
      cost: 300,
      description: 'Katta dasturchilar, loyihalar va ish e’lonlari joylanadigan maxsus kanal.',
      icon: '💎',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          onClick={() => triggerHaptic('light')}
          className="flex items-center gap-1 text-xs font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Bosh menyu</span>
        </Link>
        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 text-xs font-bold">
          <Coins className="w-3.5 h-3.5" />
          <span>{user?.coins || 0} coin</span>
        </div>
      </div>

      {/* Hero Banner Header */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
        <Image
          src="/images/menu/menu-sovgalar.webp"
          alt="Astra Academy Sovg'alar Bo'limi"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Daily Gift Box Claim */}
      <div className="p-4 rounded-2xl bg-neutral-950 border border-yellow-500/30 text-center space-y-3 relative overflow-hidden shadow-[0_0_20px_rgba(250,204,21,0.15)]">
        <div className="relative inline-block">
          <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 border border-yellow-500/40 text-3xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(250,204,21,0.3)]">
            🎁
          </div>
          {rewardAnimation && (
            <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-yellow-400 text-black text-xs font-black animate-bounce">
              +50 COIN!
            </span>
          )}
        </div>

        <div>
          <h2 className="text-sm sm:text-base font-bold text-white">
            Bugungi Kunlik Sovg‘angiz
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Har kuni kirib bepul Astra Coin va tajriba ballarini qabul qiling!
          </p>
        </div>

        <button
          onClick={handleClaimDailyGift}
          disabled={isDailyClaimed}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            isDailyClaimed
              ? 'bg-neutral-900 text-neutral-500 border border-neutral-800 cursor-not-allowed'
              : 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)] active:scale-95'
          }`}
        >
          {isDailyClaimed ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Bugungi sovg‘a olindi (+50 Coin)</span>
            </>
          ) : (
            <>
              <Gift className="w-4 h-4" />
              <span>Sovg‘ani Ochish (+50 Coin)</span>
            </>
          )}
        </button>
      </div>

      {/* Promo Code Redemption */}
      <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2.5">
        <div className="flex items-center gap-1.5">
          <Ticket className="w-4 h-4 text-yellow-400" />
          <h3 className="text-xs sm:text-sm font-bold text-white">Promo-kod faollashtirish</h3>
        </div>
        <form onSubmit={handleApplyPromo} className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Kodni kiriting (masalan: GOLD)"
            className="flex-1 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-yellow-500 text-xs text-white placeholder-neutral-500 outline-none uppercase font-mono"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs flex-shrink-0 transition-colors"
          >
            Faollashtirish
          </button>
        </form>
        {promoStatus && (
          <p className="text-[11px] text-yellow-400 font-medium">
            {promoStatus}
          </p>
        )}
      </div>

      {/* Gifts & Merchandise Catalog */}
      <div className="space-y-2 pt-1">
        <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
          <PackageCheck className="w-4 h-4 text-yellow-400" />
          Sovg‘alar va Mukofotlar Katalogi
        </h3>

        <div className="space-y-2">
          {giftCatalog.map((gift) => (
            <div
              key={gift.id}
              className="p-3 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-yellow-500/40 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xl flex-shrink-0">
                  {gift.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-yellow-400">
                      {gift.category}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-yellow-400 transition-colors">
                    {gift.title}
                  </h4>
                  <p className="text-[10px] text-neutral-400 line-clamp-1">
                    {gift.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  triggerHaptic('medium');
                  if ((user?.coins || 0) >= gift.cost) {
                    alert(`"${gift.title}" sovg‘asiga buyurtma qabul qilindi! Menejerimiz tez orada bog‘lanadi.`);
                  } else {
                    alert(`Sizda yetarli coin mavjud emas. Kerakli miqdor: ${gift.cost} coin.`);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-yellow-400 border border-yellow-500/30 text-[11px] font-bold flex items-center gap-1 flex-shrink-0 transition-colors"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>{gift.cost}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
