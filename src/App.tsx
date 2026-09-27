/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrotherPillarSection } from './components/BrotherPillarSection';
import { FamilySection } from './components/FamilySection';
import { InteractiveCake } from './components/InteractiveCake';
import { FamilyTrivia } from './components/FamilyTrivia';
import { Footer } from './components/Footer';
import { SurpriseModal } from './components/SurpriseModal';
import { ThemeMode, THEMES } from './types/theme';
import { soundManager } from './utils/audio';
import { Gift, Volume2, VolumeX, Music } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('blue');
  const [isBgmPlaying, setIsBgmPlaying] = useState(true);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);

  // Automatically start BGM on load
  useEffect(() => {
    // Attempt auto-start immediately
    soundManager.autoStartBgm();
    setIsBgmPlaying(soundManager.getIsBgmPlaying());

    // Listen to background music state changes (e.g., when browser audio unblocks upon first gesture)
    const unsubscribe = soundManager.onStateChange((playing) => {
      setIsBgmPlaying(playing);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggleBgm = () => {
    const nextState = soundManager.toggleBgm();
    setIsBgmPlaying(nextState);
  };

  const handleOpenSurprise = () => {
    setIsSurpriseOpen(true);
  };

  const handleCloseSurprise = () => {
    setIsSurpriseOpen(false);
  };

  const activeTheme = THEMES[theme];

  return (
    <div className={`min-h-screen ${activeTheme.primaryBg} text-stone-900 transition-colors duration-300`}>
      {/* Top Bar Navigation */}
      <Navbar
        currentTheme={theme}
        onThemeChange={(newTheme) => setTheme(newTheme)}
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={handleToggleBgm}
        onOpenSurprise={handleOpenSurprise}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section: Greeting & Family spotlight */}
        <HeroSection
          currentTheme={theme}
          onOpenSurprise={handleOpenSurprise}
        />

        {/* 2. Sosok Pahlawan Bagi Rio: 4 Pillars of Diardano Raihan */}
        <BrotherPillarSection currentTheme={theme} />

        {/* 3. Keluarga Bahagia: Mas Diar, Teh Dinda, & Delisha */}
        <FamilySection currentTheme={theme} />

        {/* 4. Interactive Birthday / Celebration Cake with Blowable Candles */}
        <InteractiveCake
          currentTheme={theme}
          onOpenSurprise={handleOpenSurprise}
        />

        {/* 5. Fun Interactive Trivia: Seberapa Kenal Mas Diar */}
        <FamilyTrivia currentTheme={theme} />
      </main>

      {/* Footer */}
      <Footer
        currentTheme={theme}
        onOpenSurprise={handleOpenSurprise}
      />

      {/* Surprise Pop-up Modal */}
      <SurpriseModal
        isOpen={isSurpriseOpen}
        onClose={handleCloseSurprise}
        currentTheme={theme}
      />

      {/* Floating Audio Controller Badge on bottom-left */}
      <div className="fixed bottom-6 left-6 z-30">
        <button
          type="button"
          onClick={handleToggleBgm}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border backdrop-blur-md ${
            isBgmPlaying
              ? 'bg-stone-900/90 text-white border-stone-700/80 hover:bg-stone-900'
              : 'bg-white/95 text-stone-700 border-stone-200 hover:bg-white'
          }`}
          title={isBgmPlaying ? 'Klik untuk mematikan lagu' : 'Klik untuk menyalakan lagu'}
        >
          {isBgmPlaying ? (
            <>
              <div className="relative flex items-center justify-center">
                <Music className="h-3.5 w-3.5 text-amber-400 animate-bounce" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="font-medium">Musik Menyala</span>
              <span className="text-[11px] text-stone-300 font-mono bg-stone-800 px-1.5 py-0.5 rounded">
                Matiin 🔇
              </span>
            </>
          ) : (
            <>
              <VolumeX className="h-3.5 w-3.5 text-stone-400" />
              <span className="font-medium">Musik Mati</span>
              <span className="text-[11px] text-stone-500 font-mono bg-stone-100 px-1.5 py-0.5 rounded">
                Nyalain 🎵
              </span>
            </>
          )}
        </button>
      </div>

      {/* Floating Surprise Trigger on bottom-right */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          type="button"
          onClick={handleOpenSurprise}
          className={`flex items-center gap-2 px-4 py-3 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 ${activeTheme.buttonClass}`}
          title="Buka surat rahasia dari Rio"
        >
          <Gift className="h-4 w-4 animate-bounce" />
          <span className="font-medium">Surat Rio 💌</span>
        </button>
      </div>
    </div>
  );
}
