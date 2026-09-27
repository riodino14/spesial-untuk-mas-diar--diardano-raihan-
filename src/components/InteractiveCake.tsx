import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Wind, RotateCcw, Heart, Sparkles, Gift } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { ThemeMode, THEMES } from '../types/theme';

interface InteractiveCakeProps {
  currentTheme: ThemeMode;
  onOpenSurprise: () => void;
}

export const InteractiveCake: React.FC<InteractiveCakeProps> = ({
  currentTheme,
  onOpenSurprise,
}) => {
  const activeTheme = THEMES[currentTheme];

  // Candles state: 3 candles [candle1, candle2, candle3]
  const [candlesLit, setCandlesLit] = useState<[boolean, boolean, boolean]>([true, true, true]);
  const [cakeFlavor, setCakeFlavor] = useState<'strawberry' | 'chocolate' | 'velvet'>('strawberry');
  const [hasCelebratedAll, setHasCelebratedAll] = useState(false);

  const candleMeanings = [
    { title: 'Lilin 1: Untuk Mas Diar', desc: 'Kesehatan prima, rezeki melimpah & kesuksesan karier' },
    { title: 'Lilin 2: Mas Diar & Teh Dinda', desc: 'Keluarga sakinah, mawaddah, wa rahmah selamanya' },
    { title: 'Lilin 3: Untuk Delisha', desc: 'Tumbuh sehat, cerdas & menjadi kebanggaan orang tua' },
  ];

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563EB', '#E11D48', '#F59E0B', '#10B981', '#EC4899'],
    });
  };

  const handleCandleClick = (index: number) => {
    const newCandles = [...candlesLit] as [boolean, boolean, boolean];
    const willBeLit = !newCandles[index];
    newCandles[index] = willBeLit;
    setCandlesLit(newCandles);

    if (!willBeLit) {
      soundManager.playBlow();
      soundManager.playChime(1.2 + index * 0.2);
    } else {
      soundManager.playChime(1.0);
    }

    // Check if all blown out
    if (newCandles.every((lit) => !lit)) {
      setHasCelebratedAll(true);
      soundManager.playFanfare();
      triggerConfetti();
    }
  };

  const handleBlowAll = () => {
    setCandlesLit([false, false, false]);
    setHasCelebratedAll(true);
    soundManager.playBlow();
    setTimeout(() => {
      soundManager.playFanfare();
      triggerConfetti();
    }, 200);
  };

  const handleRelight = () => {
    setCandlesLit([true, true, true]);
    setHasCelebratedAll(false);
    soundManager.playChime(1.1);
  };

  // Color schemes for cake flavors
  const flavorStyles = {
    strawberry: {
      name: 'Strawberry Blossom',
      topTier: 'bg-rose-200 border-rose-300',
      bottomTier: 'bg-rose-100 border-rose-200',
      frosting: 'fill-rose-300',
      accent: 'text-rose-600',
    },
    chocolate: {
      name: 'Dark Choco Ganache',
      topTier: 'bg-amber-900/80 border-amber-950',
      bottomTier: 'bg-amber-950 border-stone-900',
      frosting: 'fill-amber-800',
      accent: 'text-amber-800',
    },
    velvet: {
      name: 'Red Velvet Classic',
      topTier: 'bg-red-300 border-red-400',
      bottomTier: 'bg-red-200 border-red-300',
      frosting: 'fill-red-400',
      accent: 'text-red-600',
    },
  };

  const activeFlavor = flavorStyles[cakeFlavor];
  const allCandlesOut = candlesLit.every((lit) => !lit);

  return (
    <section id="kue-interaktif" className="py-20 bg-stone-50 border-y border-stone-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            <span>Interaktif & Penuh Cinta</span>
            <span aria-hidden="true">·</span>
            <span>Spesial Untuk Mas Diar</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900">
            Kue Perayaan & Tiga Cahaya Harapan
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Klik lilin satu per satu atau tekan tombol tiup untuk memadamkan lilin dan merayakan kebahagiaan Mas Diar, Teh Dinda, dan Delisha!
          </p>
        </div>

        {/* Cake Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive Cake Stage */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-8 border border-stone-200 shadow-sm flex flex-col items-center">
              
              {/* Flavor Selector */}
              <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl mb-6">
                {(['strawberry', 'chocolate', 'velvet'] as const).map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => {
                      setCakeFlavor(flavor);
                      soundManager.playChime(1.0);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      cakeFlavor === flavor
                        ? 'bg-white text-stone-900 shadow-xs font-semibold'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    {flavorStyles[flavor].name}
                  </button>
                ))}
              </div>

              {/* The Visual Cake Stage */}
              <div className="relative w-72 h-72 flex flex-col items-center justify-end pb-4 select-none">
                {/* 3 Candles */}
                <div className="absolute top-6 w-48 flex justify-between px-6 z-20">
                  {candlesLit.map((isLit, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCandleClick(idx)}
                      type="button"
                      className="group flex flex-col items-center cursor-pointer transition-transform hover:scale-110 active:scale-95 focus:outline-hidden"
                      title={isLit ? 'Klik untuk meniup lilin ini' : 'Klik untuk menyalakan lilin ini'}
                    >
                      {/* Flame / Smoke */}
                      <div className="h-9 flex items-end justify-center mb-1">
                        {isLit ? (
                          <div className="relative flex items-center justify-center">
                            {/* Outer Glow */}
                            <div className="absolute -inset-2 bg-amber-400/30 blur-md rounded-full animate-pulse" />
                            {/* Inner Flame */}
                            <div className="w-4 h-7 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full animate-candle-flame shadow-md" />
                            <div className="absolute bottom-1 w-2 h-3 bg-blue-400/60 rounded-full" />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="text-xs text-stone-400 opacity-60 animate-pulse">💨</span>
                            <div className="w-0.5 h-2 bg-stone-600 rounded-full" />
                          </div>
                        )}
                      </div>

                      {/* Candle Stick */}
                      <div
                        className={`w-3.5 h-12 rounded-t-sm border border-stone-200 shadow-xs flex flex-col items-center ${
                          idx === 0
                            ? 'bg-gradient-to-b from-blue-300 to-blue-400'
                            : idx === 1
                            ? 'bg-gradient-to-b from-rose-300 to-rose-400'
                            : 'bg-gradient-to-b from-amber-300 to-amber-400'
                        }`}
                      >
                        {/* Spiral pattern stripes */}
                        <div className="w-full h-1.5 bg-white/40 my-1 rotate-12" />
                        <div className="w-full h-1.5 bg-white/40 my-1 rotate-12" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Cake Tier 1 (Top) */}
                <div
                  className={`w-44 h-20 rounded-t-2xl relative shadow-md transition-colors duration-300 border-2 ${activeFlavor.topTier} flex items-center justify-center`}
                >
                  {/* Decorative frosting drip */}
                  <div className="absolute -top-1 inset-x-2 flex justify-around">
                    <span className="w-3 h-3 rounded-full bg-white shadow-xs" />
                    <span className="w-3 h-3 rounded-full bg-white shadow-xs" />
                    <span className="w-3 h-3 rounded-full bg-white shadow-xs" />
                    <span className="w-3 h-3 rounded-full bg-white shadow-xs" />
                  </div>
                  {/* Strawberries / Cherries on top */}
                  <div className="flex items-center gap-3">
                    <span className="text-xl filter drop-shadow-sm">🍓</span>
                    <span className="text-xl filter drop-shadow-sm">✨</span>
                    <span className="text-xl filter drop-shadow-sm">🍓</span>
                  </div>
                </div>

                {/* Cake Tier 2 (Bottom Base) */}
                <div
                  className={`w-64 h-24 rounded-t-2xl relative shadow-lg transition-colors duration-300 border-2 ${activeFlavor.bottomTier} flex items-center justify-center`}
                >
                  {/* Frosting line */}
                  <div className="absolute top-0 inset-x-0 h-2 bg-white/80 rounded-t-lg" />
                  {/* Text on cake */}
                  <div className="text-center font-serif-display font-semibold text-stone-800 text-sm tracking-wide">
                    Mas Diar & Family
                  </div>
                </div>

                {/* Cake Tray / Golden Plate */}
                <div className="w-72 h-4 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 rounded-full shadow-md border-t border-amber-100" />
              </div>

              {/* Status & Control Buttons */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {allCandlesOut ? (
                  <button
                    type="button"
                    onClick={handleRelight}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-all shadow-xs"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Nyalakan Ulang Lilin
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleBlowAll}
                    className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg transition-all shadow-sm ${activeTheme.buttonClass}`}
                  >
                    <Wind className="h-4 w-4" />
                    Tiup Semua Lilin 🎂
                  </button>
                )}

                <button
                  type="button"
                  onClick={onOpenSurprise}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 transition-all"
                >
                  <Gift className="h-3.5 w-3.5 text-amber-500" />
                  Buka Kotak Surat Rio
                </button>
              </div>

              {/* Celebration Banner when all blown */}
              {allCandlesOut && (
                <div className="mt-5 w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center animate-gentle-pulse">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center justify-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                    Semua Lilin Berhasil Ditiup!
                  </p>
                  <p className="text-sm font-medium text-emerald-950 mt-1">
                    Semoga segala doa kebaikan, kesehatan panjang, rezeki berkah, dan keharmonisan selalu tercurah untuk Mas Diar, Teh Dinda, dan si kecil Delisha tercinta!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Candle Dedications & Meaning */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900">
                Makna Di Balik Tiga Lilin
              </h3>
              <p className="mt-1 text-xs text-stone-500">
                Tiga pilar cahaya cinta, doa, dan dedikasi untuk keluarga Mas Diar
              </p>
            </div>

            <div className="space-y-3">
              {candleMeanings.map((candle, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border transition-all ${
                    candlesLit[i]
                      ? 'bg-white border-stone-200 shadow-xs'
                      : 'bg-stone-100/70 border-stone-200/50 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-stone-900 flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          candlesLit[i] ? 'bg-amber-400 animate-ping' : 'bg-stone-400'
                        }`}
                      />
                      {candle.title}
                    </span>
                    <span className="text-xs text-stone-500">
                      {candlesLit[i] ? 'Menyala ✨' : 'Terwujud 🤲'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 pl-4">{candle.desc}</p>
                </div>
              ))}
            </div>

            {/* Dedication Showcase Note (No Form Input) */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                <span>Doa Tulus Dari Adik Rio</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                "Setiap tetes keringat dan perjuangan Mas Diar untuk keluarga selalu jadi inspirasi besar buat Rio. Semoga Mas Diar selalu dilindungi Allah SWT dalam setiap langkah kehidupan."
              </p>
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Riodino Raihan</span>
                <span>Untuk Mas Diardano Raihan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
