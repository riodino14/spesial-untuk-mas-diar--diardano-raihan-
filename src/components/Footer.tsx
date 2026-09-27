import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { ThemeMode, THEMES } from '../types/theme';

interface FooterProps {
  currentTheme: ThemeMode;
  onOpenSurprise: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentTheme, onOpenSurprise }) => {
  const activeTheme = THEMES[currentTheme];

  return (
    <footer className="bg-white border-t border-stone-200 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Note */}
          <div className="text-center md:text-left space-y-1">
            <span className="font-serif-display text-xl font-bold text-stone-900">
              Diardano Raihan (Mas Diar)
            </span>
            <p className="text-xs text-stone-500 max-w-md">
              Dibuat dengan segenap cinta, rasa hormat, dan terima kasih oleh Rio untuk Mas Diar, Teh Dinda, dan putri tercinta Delisha.
            </p>
          </div>

          {/* Quick links & CTA */}
          <div className="flex items-center gap-6 text-xs text-stone-600 font-medium">
            <a href="#beranda" className="hover:text-stone-900 transition-colors">
              Beranda
            </a>
            <a href="#tentang-mas-diar" className="hover:text-stone-900 transition-colors">
              Sosok Pahlawan
            </a>
            <a href="#keluarga-tercinta" className="hover:text-stone-900 transition-colors">
              Keluarga
            </a>
            <a href="#kue-interaktif" className="hover:text-stone-900 transition-colors">
              Kue Lilin
            </a>
            <button
              type="button"
              onClick={onOpenSurprise}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTheme.buttonClass}`}
            >
              Surat Rio 💌
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400">
          <div className="flex items-center gap-1.5">
            <span>Salam hangat dari adik tercinta,</span>
            <span className="font-semibold text-stone-700">Riodino Raihan (Rio)</span>
          </div>
          <div>
            Keluarga Tercinta Mas Diar · Teh Dinda · Delisha
          </div>
        </div>
      </div>
    </footer>
  );
};
