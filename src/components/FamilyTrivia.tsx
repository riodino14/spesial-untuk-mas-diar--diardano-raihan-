import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { ThemeMode, THEMES } from '../types/theme';
import { soundManager } from '../utils/audio';

interface FamilyTriviaProps {
  currentTheme: ThemeMode;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const TRIVIA_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Siapa panggilan akrab dan penuh rasa hormat yang selalu Rio berikan untuk kakaknya?',
    options: ['Abang Bro', 'Mas Diar', 'Kak Raihan', 'Kang Diar'],
    correctIndex: 1,
    explanation: 'Tepat sekali! Rio selalu memanggilnya dengan panggilan penuh kehangatan: "Mas Diar".',
  },
  {
    id: 2,
    question: 'Siapa sosok istri tercinta dan bidadari pendamping hidup setia Mas Diar?',
    options: ['Teh Dinda', 'Mbak Sarah', 'Teh Rina', 'Mbak Maya'],
    correctIndex: 0,
    explanation: 'Benar! Teh Dinda adalah istri tercinta yang selalu melengkapi kebahagiaan Mas Diar.',
  },
  {
    id: 3,
    question: 'Siapa nama putri kecil jelita pembawa tawa dan cahaya di rumah Mas Diar & Teh Dinda?',
    options: ['Alina', 'Delisha', 'Naura', 'Safiya'],
    correctIndex: 1,
    explanation: 'Tepat! Si kecil Delisha adalah buah hati penyejuk jiwa Mas Diar dan Teh Dinda.',
  },
  {
    id: 4,
    question: 'Bagi adik Rio, Mas Diar bukan sekadar saudara biasa, tapi merupakan...?',
    options: [
      'Teman main game biasa',
      'Sosok kakak terbaik, panutan hidup, dan pahlawan nyata',
      'Tetangga rumah',
      'Kenalan keluarga',
    ],
    correctIndex: 1,
    explanation: '100% Benar! Bagi Rio, Mas Diar adalah sosok terbaik, panutan utama, dan pahlawan tanpa tanda jasa.',
  },
];

export const FamilyTrivia: React.FC<FamilyTriviaProps> = ({ currentTheme }) => {
  const activeTheme = THEMES[currentTheme];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = TRIVIA_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      soundManager.playChime(1.4);
      setScore((prev) => prev + 1);
    } else {
      soundManager.playChime(0.8);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < TRIVIA_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      soundManager.playFanfare();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCompleted(false);
    setScore(0);
  };

  return (
    <section id="trivia-mas-diar" className="py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            <span>Kuis Interaktif</span>
            <span aria-hidden="true">·</span>
            <span>Keluarga Mas Diar</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900">
            Seberapa Kenal Kamu dengan Mas Diar?
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Uji seberapa dekat kamu dengan sosok Mas Diar, Teh Dinda, dan Delisha!
          </p>
        </div>

        {/* Card Game Container */}
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs relative">
          
          {!isCompleted ? (
            <div>
              {/* Progress Bar & Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Pertanyaan {currentIdx + 1} dari {TRIVIA_QUESTIONS.length}
                </span>
                <span className="text-xs font-mono text-stone-600">
                  Skor Sementara: {score}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 mb-6 leading-snug">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, idx) => {
                  let buttonStyle = 'bg-white border-stone-200 text-stone-800 hover:bg-stone-100/70';

                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      buttonStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold';
                    } else if (idx === selectedOption) {
                      buttonStyle = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                    } else {
                      buttonStyle = 'bg-white border-stone-200 text-stone-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base transition-all flex items-center justify-between ${buttonStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation */}
              {isAnswered && (
                <div className="mb-6 p-4 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-700">
                  <div className="font-semibold text-stone-900 mb-1">
                    {selectedOption === currentQ.correctIndex ? '🎉 Luar Biasa!' : '💡 Penjelasan:'}
                  </div>
                  <p>{currentQ.explanation}</p>
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs ${activeTheme.buttonClass}`}
                  >
                    {currentIdx + 1 < TRIVIA_QUESTIONS.length ? 'Pertanyaan Berikutnya →' : 'Lihat Hasil Akhir ✨'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Result Screen */
            <div className="text-center py-6 space-y-6">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Trophy className="h-8 w-8" />
              </div>

              <div>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
                  {score === TRIVIA_QUESTIONS.length
                    ? 'Nilai Sempurna! Kamu Sangat Sayang Mas Diar!'
                    : `Hebat! Skor Kamu ${score} dari ${TRIVIA_QUESTIONS.length}`}
                </h3>
                <p className="mt-2 text-stone-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Tidak diragukan lagi, kebaikan Mas Diar, kehangatan Teh Dinda, dan keceriaan Delisha selalu membekas di hati kita semua!
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 transition-all"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Main Lagi
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
