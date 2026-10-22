import React from 'react';
import { ArrowUpRight, Plane, Clock, ShieldCheck, Bed } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { HOTEL_INFO } from '../data';

interface IntroSectionProps {
  lang: Language;
  onExploreRooms?: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ lang, onExploreRooms }) => {
  const t = translations[lang];

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-8 bg-[#161616] border-b border-stone-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typography & Narrative (No Card Grid) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center space-x-2 text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-sans font-medium">
              <span className="w-4 h-px bg-[#C5A880]" />
              <span>{t.intro.badge}</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#F3F1EC] leading-[1.15] tracking-tight">
              {t.intro.title}
            </h2>

            {/* Concise Verified Hotel Paragraph */}
            <p className="text-stone-300 font-sans text-base sm:text-lg font-light leading-relaxed max-w-2xl">
              {t.intro.paragraph}
            </p>

            {/* 4 Clean Verified Facts */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-stone-800">
              <div className="flex items-center space-x-3">
                <Bed className="w-5 h-5 text-[#C5A880] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-stone-200">{t.intro.factRooms}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Plane className="w-5 h-5 text-[#C5A880] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-stone-200">{t.intro.factAirport}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#C5A880] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-stone-200">{t.intro.factDesk}</span>
              </div>

              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-[#C5A880] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-stone-200">{t.intro.factShuttle}</span>
              </div>
            </div>

            {/* Action link */}
            <div className="pt-2">
              <a
                href={HOTEL_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase text-[#C5A880] hover:text-[#e4caa3] transition-colors font-sans font-semibold border-b border-[#C5A880]/60 pb-1"
                id="intro-book-cta-btn"
              >
                <span>{t.hero.bookStay} (Booking.com)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: One Strong Editorial Image (Not a Card Grid) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden border border-stone-800 bg-stone-900 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85"
                alt="Top Ten Hotel Facade and Atmosphere in Addis Ababa"
                className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-95 hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-stone-300">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans">
                  GURD SHOLA • YEKA
                </span>
                <p className="font-serif-luxury text-lg text-[#F3F1EC] font-light mt-1">
                  A sanctuary of genuine Ethiopian hospitality
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
