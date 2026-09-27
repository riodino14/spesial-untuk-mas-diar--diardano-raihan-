import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ThemeMode, THEMES } from '../types/theme';

interface NavbarProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
  onOpenSurprise: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onThemeChange,
  isBgmPlaying,
  onToggleBgm,
  onOpenSurprise,
}) => {
  const activeTheme = THEMES[currentTheme];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/90 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#beranda"
          className="group flex items-center gap-2 text-xl font-bold tracking-tight text-stone-900 transition-colors"
        >
          <span className="font-serif-display text-2xl font-bold">Diardano Raihan</span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a
            href="#tentang-mas-diar"
            className="hover:text-stone-950 transition-colors py-1"
          >
            Sosok Pahlawan
          </a>
          <a
            href="#keluarga-tercinta"
            className="hover:text-stone-950 transition-colors py-1"
          >
            Keluarga Bahagia
          </a>
          <a
            href="#kue-interaktif"
            className="hover:text-stone-950 transition-colors py-1"
          >
            Kue Spesial
          </a>
          <a
            href="#trivia-mas-diar"
            className="hover:text-stone-950 transition-colors py-1"
          >
            Trivia Kenal Mas Diar
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions (Theme selector + Music button + Surprise) */}
        <div className="flex items-center gap-2.5">
          {/* Segmented Theme Switcher */}
          <div className="flex items-center rounded-lg bg-stone-100 p-0.5 border border-stone-200/60">
            {(['blue', 'pink', 'red'] as ThemeMode[]).map((theme) => {
              const isSelected = currentTheme === theme;
              const colorDot =
                theme === 'blue'
                  ? 'bg-blue-600'
                  : theme === 'pink'
                  ? 'bg-rose-500'
                  : 'bg-red-600';
              return (
                <button
                  key={theme}
                  type="button"
                  onClick={() => onThemeChange(theme)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    isSelected
                      ? 'bg-white text-stone-900 shadow-xs font-semibold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                  title={`Ganti tema ke ${THEMES[theme].name}`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${colorDot}`} />
                  <span className="capitalize">{theme === 'blue' ? 'Biru' : theme === 'pink' ? 'Pink' : 'Merah'}</span>
                </button>
              );
            })}
          </div>

          {/* Sound / Music Toggle Button */}
          <button
            type="button"
            onClick={onToggleBgm}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              isBgmPlaying
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800 shadow-xs'
                : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
            }`}
            title={isBgmPlaying ? 'Klik untuk mematikan lagu' : 'Klik untuk menyalakan lagu'}
          >
            {isBgmPlaying ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                <span className="hidden sm:inline">Musik Nyala</span>
                <span className="text-[10px] text-emerald-600">🔊</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-stone-400" />
                <span className="hidden sm:inline">Musik Mati</span>
                <span className="text-[10px] text-stone-400">🔇</span>
              </>
            )}
          </button>

          {/* Surprise Box CTA */}
          <button
            type="button"
            onClick={onOpenSurprise}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all shadow-xs ${activeTheme.buttonClass}`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Surat Rio</span>
            <span className="sm:hidden">Surat</span>
          </button>
        </div>
      </div>
    </header>
  );
};
