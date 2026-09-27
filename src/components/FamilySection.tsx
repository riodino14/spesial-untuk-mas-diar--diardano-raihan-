import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Smile, Shield, Flower2 } from 'lucide-react';
import { ThemeMode, THEMES } from '../types/theme';
import { soundManager } from '../utils/audio';

interface FamilySectionProps {
  currentTheme: ThemeMode;
}

export const FamilySection: React.FC<FamilySectionProps> = ({ currentTheme }) => {
  const activeTheme = THEMES[currentTheme];
  const [familyLikes, setFamilyLikes] = useState(256);

  const familyMembers = [
    {
      name: 'Diardano Raihan (Mas Diar)',
      role: 'Kepala Keluarga & Ayah Hebat',
      icon: Shield,
      desc: 'Pemimpin keluarga yang bijaksana, pekerja keras, dan penuh kehangatan. Pelindung bagi Teh Dinda dan panutan pertama untuk Delisha.',
      quote: '"Keluarga adalah prioritas utama dan amanah terindah."',
      accentBg: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      name: 'Teh Dinda',
      role: 'Istri Tercinta & Ibu Penuh Kasih',
      icon: Flower2,
      desc: 'Pendamping hidup setia yang senantiasa menebarkan kelembutan, keteduhan, dan doa di balik setiap langkah keberhasilan keluarga kecil ini.',
      quote: '"Rumah terasa hangat karena cinta dan keikhlasan seorang istri."',
      accentBg: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      name: 'Delisha',
      role: 'Putri Kecil Pembawa Cahaya & Tawa',
      icon: Smile,
      desc: 'Malaikat kecil dan buah hati yang selalu menghadirkan senyuman riang, tawa ceria, dan warna terindah di setiap sudut rumah.',
      quote: '"Senyum Delisha adalah penyejuk hati ayah dan bundanya."',
      accentBg: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  const handleLikeFamily = () => {
    setFamilyLikes((prev) => prev + 1);
    soundManager.playChime(1.3);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#EC4899', '#F43F5E', '#3B82F6', '#F59E0B'],
    });
  };

  return (
    <section id="keluarga-tercinta" className="py-20 bg-stone-50 border-t border-stone-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            <span>Harmoni & Kebahagiaan</span>
            <span aria-hidden="true">·</span>
            <span>Mas Diar · Teh Dinda · Delisha</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Keluarga Bahagia Penuh Berkah
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Melihat keharmonisan Mas Diar bersama Teh Dinda dan buah hati tercinta Delisha selalu menjadi sumber kebahagiaan dan kebanggaan terbesar bagi Rio.
          </p>
        </div>

        {/* Big Spotlight Family Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-200 shadow-lg mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 w-full">
              <img
                src="/src/assets/images/family_delisha_moments_1790382829269.jpg"
                alt="Momen Bahagia Mas Diar, Teh Dinda, dan Delisha"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-950/80 via-transparent to-transparent" />
            </div>

            {/* Right Content */}
            <div className="lg:col-span-5 p-8 sm:p-10 text-white space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold">
                <Sparkles className="h-4 w-4" />
                <span>Keluarga Kecil Penuh Kehangatan</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold leading-tight">
                "Cinta sebuah keluarga adalah anugerah terbesar dalam hidup."
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Setiap tawa kecil Delisha, setiap pandangan penuh kasih antara Mas Diar dan Teh Dinda adalah doa yang hidup di setiap detik hari.
              </p>
              
              <div className="pt-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleLikeFamily}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs ${activeTheme.buttonClass}`}
                >
                  <Heart className="h-4 w-4 fill-white" />
                  Kirim Doa Sakinah ({familyLikes})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Profile Cards for Mas Diar, Teh Dinda, Delisha */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {familyMembers.map((member, idx) => {
            const IconComp = member.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold text-stone-500 font-serif-display">
                      {idx === 0 ? 'Ayah' : idx === 1 ? 'Ibu' : 'Buah Hati'}
                    </span>
                  </div>

                  <h4 className="font-serif-display text-lg sm:text-xl font-bold text-stone-900 mb-1">
                    {member.name}
                  </h4>
                  <div className="text-xs text-stone-500 font-medium mb-3">
                    {member.role}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {member.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <p className="text-xs italic text-stone-500">
                    {member.quote}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
