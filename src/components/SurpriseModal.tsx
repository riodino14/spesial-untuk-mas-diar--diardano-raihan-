import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Heart, Sparkles, Copy, Check, Gift, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { ThemeMode, THEMES } from '../types/theme';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeMode;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const activeTheme = THEMES[currentTheme];

  useEffect(() => {
    if (isOpen) {
      setIsOpened(true);
      soundManager.playFanfare();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
      });
    } else {
      setIsOpened(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const letterBody = `Untuk Mas Diar (Diardano Raihan),

Dari lubuk hati terdalam, Rio mau mengucapkan terima kasih yang tak terhingga untuk Mas Diar. Buat Rio, Mas Diar bukan sekadar seorang kakak laki-laki tertua, tapi sosok teladan, panutan, dan pahlawan nyata dalam hidup Rio.

Sejak dulu sampai hari ini, melihat ketulusan, kerja keras, dan cara Mas Diar menyayangi keluarga selalu jadi inspirasi terbesar buat Rio. Rio sangat kagum melihat Mas Diar yang kini menjadi kepala keluarga luar biasa—suami yang penuh cinta untuk Teh Dinda, dan ayah terhebat yang selalu membahagiakan si kecil Delisha.

Terima kasih selalu ada, selalu membimbing, dan menjadi pelindung terbaik. Semoga Allah SWT senantiasa melimpahkan kesehatan, kelapangan rezeki yang penuh berkah, kebahagiaan tanpa akhir, serta keharmonisan untuk Mas Diar, Teh Dinda, dan Delisha tercinta.

Rio bangga punya kakak sehebat Mas Diar.
Salam penuh sayang dan hormat,
Adikmu, Rio (Riodino Raihan)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterBody);
    setIsCopied(true);
    soundManager.playChime(1.5);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Ribbon */}
        <div className={`px-6 py-4 flex items-center justify-between text-white ${activeTheme.buttonClass}`}>
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            <h3 className="font-serif-display font-bold text-lg tracking-wide">
              Kotak Pesan Rahasia dari Rio
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/20 text-white transition-colors"
            title="Tutup pesan"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Top Banner Tag */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Pesan Eksklusif untuk Mas Diar</span>
            </div>
            <span>Dari: Riodino Raihan</span>
          </div>

          {/* Letter parchment effect */}
          <div className="bg-amber-50/50 rounded-2xl p-6 sm:p-8 border border-amber-200/60 shadow-xs space-y-4 font-serif-display text-stone-800 text-sm sm:text-base leading-relaxed">
            <p className="font-bold text-base sm:text-lg text-stone-900 border-b border-amber-200/50 pb-2">
              Bismillah, untuk Mas Diar yang paling Rio hormati dan sayangi,
            </p>
            <p>
              Dari lubuk hati yang paling dalam, Rio mau mengucapkan rasa terima kasih yang sebesar-besarnya. Buat Rio, Mas Diar bukan hanya sekadar saudara tertua—Mas Diar adalah <strong>pahlawan hidup</strong>, panutan, sekaligus guru kehidupan yang selalu mengajarkan kebaikan lewat teladan nyata.
            </p>
            <p>
              Melihat perjalanan Mas Diar hari ini, Rio luar biasa bangga. Mas Diar telah menjadi kepala keluarga yang sangat hebat, pelindung dan pasangan setia bagi <strong>Teh Dinda</strong>, serta ayah paling luar biasa untuk bidadari kecil, <strong>Delisha</strong>. Kehangatan keluarga kecil Mas Diar selalu membuat hati kami teduh dan bersyukur.
            </p>
            <p>
              Doa Rio untuk Mas Diar: Semoga Mas senantiasa diberikan nikmat sehat, umur yang berkah, kemudahan dalam setiap urusan pekerjaan dan rezeki, serta keluarga yang selalu dinaungi sakinah, mawaddah, wa rahmah.
            </p>
            <div className="pt-4 border-t border-amber-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-sans text-stone-600">
              <span className="italic">"Terima kasih telah menjadi kakak terhebat di dunia."</span>
              <span className="font-semibold text-stone-900">— Adikmu, Rio (Riodino Raihan)</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-700 transition-colors"
            >
              {isCopied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              {isCopied ? 'Tersalin ke Clipboard!' : 'Salin Isi Pesan'}
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playFanfare();
                confetti({
                  particleCount: 120,
                  spread: 80,
                  origin: { y: 0.6 },
                });
              }}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs ${activeTheme.buttonClass}`}
            >
              <Heart className="h-4 w-4 fill-white" />
              Tabur Cinta & Doa ❤️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
