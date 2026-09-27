import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Cake, Gift, Shield, Users } from 'lucide-react';
import { ThemeMode, THEMES } from '../types/theme';
import { soundManager } from '../utils/audio';

interface HeroSectionProps {
  currentTheme: ThemeMode;
  onOpenSurprise: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentTheme,
  onOpenSurprise,
}) => {
  const activeTheme = THEMES[currentTheme];
  const [loveCount, setLoveCount] = useState(384);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);

  const handleSendLove = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoveCount((prev) => prev + 1);
    soundManager.playChime(1.2 + Math.random() * 0.4);

    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: rect.width / 2 + (Math.random() * 40 - 20),
    };
    setFloatingHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1400);

    if (loveCount % 5 === 0) {
      confetti({
        particleCount: 40,
        spread: 45,
        origin: { y: 0.7 },
      });
    }
  };

  return (
    <section id="beranda" className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Soft Accent Tint */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-stone-200/40 blur-3xl" />
      <div className="absolute top-20 left-10 -z-10 h-72 w-72 rounded-full bg-rose-100/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Tribute */}
          <div className="lg:col-span-7 space-y-6">
            {/* Zero-Pill Clean Metadata Lead */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500">
              <span className="font-semibold text-stone-800">Spesial Untuk Mas Diar</span>
              <span aria-hidden="true">·</span>
              <span>Diardano Raihan</span>
              <span aria-hidden="true">·</span>
              <span>Kakak, Teladan & Pahlawan Rio</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15] text-balance">
              Untuk Sosok Terbaik, Pahlawan & Kakak Tercinta:{' '}
              <span className={activeTheme.accentText}>Mas Diar</span>
            </h1>

            {/* Heartfelt Subtext */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Sebuah halaman persembahan tulus dari Rio untuk <strong>Diardano Raihan</strong>—kakak nomor satu yang selalu membimbing, melindungi, dan menjadi teladan hidup. Berbahagialah selalu bersama <strong>Teh Dinda</strong> dan malaikat kecil tersayang, <strong>Delisha</strong>.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#kue-interaktif"
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm ${activeTheme.buttonClass}`}
              >
                <Cake className="h-4 w-4" />
                Tiup Lilin Kue 🎂
              </a>

              <button
                type="button"
                onClick={onOpenSurprise}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 transition-all shadow-xs"
              >
                <Gift className="h-4 w-4 text-amber-500" />
                Surat Rahasia Rio 💌
              </button>

              <a
                href="#keluarga-tercinta"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-stone-600 hover:text-stone-950 transition-colors"
              >
                <Users className="h-4 w-4" />
                Keluarga Tercinta
              </a>
            </div>

            {/* Tribute Metrics without Pill Enclosure */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-stone-500 font-medium">Panutan Sejati</div>
                <div className="font-serif-display text-lg sm:text-xl font-bold text-stone-900 mt-0.5">
                  100% Kakak Terbaik
                </div>
              </div>
              <div>
                <div className="text-xs text-stone-500 font-medium">Keluarga Bahagia</div>
                <div className="font-serif-display text-lg sm:text-xl font-bold text-stone-900 mt-0.5">
                  Teh Dinda & Delisha
                </div>
              </div>
              <div>
                <div className="text-xs text-stone-500 font-medium">Cinta & Hormat</div>
                <div className="font-serif-display text-lg sm:text-xl font-bold text-stone-900 mt-0.5">
                  Selamanya untuk Rio
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame & Interactive Heart Counter */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Accent Glow */}
              <div
                className={`absolute -inset-2 rounded-3xl opacity-20 blur-xl ${
                  currentTheme === 'blue'
                    ? 'bg-blue-600'
                    : currentTheme === 'pink'
                    ? 'bg-rose-500'
                    : 'bg-red-600'
                }`}
              />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xl">
                <img
                  src="/src/assets/images/hero_brother_family_1790382802516.jpg"
                  alt="Keluarga Bahagia Mas Diardano Raihan bersama Teh Dinda dan Delisha"
                  className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback container if image fails
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Scrim Overlay & Quote */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                    <Shield className="h-3.5 w-3.5 text-amber-400" />
                    <span>Diardano Raihan & Keluarga</span>
                  </div>
                  <h3 className="font-serif-display text-xl font-bold text-white leading-tight">
                    "Keluarga adalah rumah terindah, dan kakak adalah pahlawan pertama."
                  </h3>
                  <p className="text-xs text-stone-300 mt-1">
                    Bersama Teh Dinda & si kecil tercinta Delisha
                  </p>
                </div>
              </div>

              {/* Floating Love Button */}
              <div className="relative mt-4 flex items-center justify-between bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
                <div>
                  <div className="text-xs font-semibold text-stone-800">
                    Kirimkan Cinta untuk Mas Diar
                  </div>
                  <div className="text-xs text-stone-500 font-mono mt-0.5">
                    {loveCount} Orang Menyayangi Mas Diar
                  </div>
                </div>

                <div className="relative">
                  {/* Floating hearts container */}
                  {floatingHearts.map((heart) => (
                    <span
                      key={heart.id}
                      className="absolute -top-4 pointer-events-none text-rose-500 animate-float-heart font-bold"
                      style={{ left: `${heart.x}px` }}
                    >
                      ❤️
                    </span>
                  ))}

                  <button
                    type="button"
                    onClick={handleSendLove}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-transform active:scale-95 shadow-xs ${activeTheme.buttonClass}`}
                  >
                    <Heart className="h-4 w-4 fill-white" />
                    Kirim Cinta ❤️
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
