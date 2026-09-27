import React from 'react';
import { ShieldCheck, HeartHandshake, Home, Award, Sparkles } from 'lucide-react';
import { ThemeMode, THEMES } from '../types/theme';

interface BrotherPillarSectionProps {
  currentTheme: ThemeMode;
}

export const BrotherPillarSection: React.FC<BrotherPillarSectionProps> = ({
  currentTheme,
}) => {
  const activeTheme = THEMES[currentTheme];

  const pillars = [
    {
      icon: ShieldCheck,
      title: '01. Pahlawan Nyata Tanpa Tanda Jasa',
      desc: 'Bagi Rio, pahlawan bukan yang memakai jubah, melainkan seorang kakak yang selalu siap pasang badan, mendengar setiap keluh kesah, dan memberi rasa aman kapan pun dibutuhkan.',
    },
    {
      icon: Award,
      title: '02. Teladan & Kompas Moral',
      desc: 'Mas Diar selalu memimpin dengan contoh, bukan sekadar kata-kata. Kerja keras, kejujuran, dan ketabahannya menjadi inspirasi terbesar bagi perjalanan langkah hidup Rio.',
    },
    {
      icon: Home,
      title: '03. Sosok Kepala Keluarga Berdedikasi',
      desc: 'Melihat betapa tulusnya Mas Diar merawat dan mencintai Teh Dinda serta mendidik Delisha dengan penuh kelembutan membuat Rio sangat bangga memiliki kakak sehebat Mas Diar.',
    },
    {
      icon: HeartHandshake,
      title: '04. Sahabat Berbagi Cerita Seumur Hidup',
      desc: 'Lebih dari sekadar saudara sedarah, Mas Diar adalah sahabat terbaik tempat bertukar pikiran, tertawa bersama, dan saling menguatkan dalam menghadapi segala tantangan dunia.',
    },
  ];

  return (
    <section id="tentang-mas-diar" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              <span>Keteladanan & Karakter</span>
              <span aria-hidden="true">·</span>
              <span>Diardano Raihan</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              Mengapa Mas Diar Adalah Pahlawan Bagi Rio
            </h2>
          </div>
          <p className="text-sm sm:text-base text-stone-600 max-w-md leading-relaxed">
            "Seorang kakak yang baik adalah anugerah terbesar dari Tuhan, dan Mas Diar adalah bukti nyata kebaikan itu."
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Mas Diar Editorial Portrait Card */}
          <div className="lg:col-span-5 bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden aspect-square border border-stone-200 shadow-sm bg-stone-200">
                <img
                  src="/src/assets/images/portrait_mas_diar_1790382815662.jpg"
                  alt="Potret Mas Diar (Diardano Raihan)"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/70 to-transparent p-4 text-white">
                  <div className="text-xs uppercase font-medium tracking-wide text-stone-300">
                    Diardano Raihan
                  </div>
                  <div className="font-serif-display text-base font-semibold">
                    "Mas Diar"
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif-display text-2xl font-bold text-stone-900">
                  Sosok Hangat & Berwibawa
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Senyum ramah, sikap tenang dalam memecahkan masalah, dan dedikasi tanpa batas untuk keluarga adalah ciri khas yang selalu melekat pada diri Mas Diar.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Kakak Kebanggaan Rio
              </span>
              <span>Sejak Kecil Hingga Selamanya</span>
            </div>
          </div>

          {/* Right: The 4 Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-stone-50/70 hover:bg-stone-50 rounded-2xl p-6 border border-stone-200 transition-all hover:shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${
                      currentTheme === 'blue'
                        ? 'bg-blue-100 text-blue-700'
                        : currentTheme === 'pink'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-stone-900 text-base mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
