'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Printer, X, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  courseTitle: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  courseTitle,
}) => {
  if (!isOpen) return null;

  const certificateId = `ASTRA-${Math.floor(100000 + Math.random() * 900000)}`;
  const issueDate = new Date().toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-3xl rounded-3xl glass-panel border-2 border-cyan-400/40 p-6 sm:p-10 shadow-glow-lg relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-900/60 rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Body */}
        <div className="border-4 border-slate-700/80 rounded-2xl p-6 sm:p-10 bg-gradient-to-b from-[#080f20] to-[#040813] text-center relative overflow-hidden">
          {/* Subtle watermark circuit background */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

          {/* Top Logo */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400 mb-2 shadow-glow-md">
              <Image
                src="/images/astra-logo.png"
                alt="Astra Academy"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-extrabold tracking-widest metallic-text">
              ASTRA ACADEMY
            </h2>
            <p className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase">
              IT • AI • PROGRAMMING
            </p>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3 font-semibold">
            Muvaffaqiyat Sertifikati
          </p>

          <p className="text-sm text-slate-300 mb-4">Ushbu sertifikat tasdiqlaydiki,</p>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-cyan-300 mb-4 border-b border-slate-700 pb-2 inline-block max-w-lg">
            {studentName}
          </h3>

          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Astra Academy dasturlash platformasida <span className="text-white font-bold">"{courseTitle}"</span> kursining barcha amaliy darslari, topshiriqlari va yakuniy testlarini muvaffaqiyatli topshirdi.
          </p>

          {/* Verification & Signatures */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-800 text-left text-xs text-slate-400">
            <div>
              <p className="font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Sertifikat ID:
              </p>
              <p className="font-mono text-cyan-400 text-[11px]">{certificateId}</p>
              <p className="text-[11px] mt-1 text-slate-500">Berilgan sana: {issueDate}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-300 mb-1">Astra Academy Direktorati</p>
              <p className="font-serif italic text-cyan-300 text-sm">Astra Academic Board</p>
              <p className="text-[10px] text-slate-500 mt-1">Rasmiy tasdiqlangan</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-glow-sm"
          >
            <Printer className="w-4 h-4" />
            Chop etish / PDF qilib saqlash
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
