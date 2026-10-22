import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { HOTEL_INFO } from '../data';

interface HeroProps {
  lang: Language;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onExplore }) => {
  const t = translations[lang];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay handled by browser policy
      });
    }
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-8 bg-[#0e0e0e] overflow-hidden">
      {/* 1. Large Cinematic Hotel Video Background (Always Muted & Auto-Playing) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.02] scale-100 transition-transform duration-1000"
        >
          {/* User provided hotel cinematic video from public folder */}
          <source
            src="/Hotel%20Cinematic%20%20-%20Boutique%20Hotel%20Port%20Elizabeth.mp4"
            type="video/mp4"
          />
        </video>

        {/* Lightweight Subtle Overlays - keeps video clear and vibrant while preserving text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/20 to-black/35" />
      </div>

      {/* Top spacer */}
      <div className="relative z-10" />

      {/* 2. Ultra-Clean Minimal Hero Content */}
      <div className="relative z-10 max-w-3xl mx-auto w-full text-center my-auto px-4">
        {/* Subtle Minimal Eyebrow */}
        <p className="text-[10px] sm:text-[11px] tracking-[0.35em] text-[#C5A880] uppercase font-sans font-medium mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {lang === 'am' ? 'የካ • አዲስ አበባ' : 'ADDIS ABABA • ETHIOPIA'}
        </p>

        {/* Refined Luxury Headline */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-[#F3F1EC] leading-[1.08] tracking-tight mb-4 sm:mb-5 drop-shadow-[0_3px_16px_rgba(0,0,0,0.9)]">
          {lang === 'am' ? HOTEL_INFO.nameAm : 'TOP TEN HOTEL'}
        </h1>

        {/* Single Refined Tagline (Minimal, no bulky paragraph) */}
        <p className="font-serif-luxury text-lg sm:text-2xl text-stone-200 font-light italic mb-8 sm:mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          {t.hero.tagline}
        </p>

        {/* Minimal Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 text-xs tracking-[0.2em] uppercase font-sans">
          <a
            href={HOTEL_INFO.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#C5A880] hover:bg-[#B8976C] text-[#121212] font-semibold px-8 py-3.5 transition-colors cursor-pointer inline-flex items-center justify-center space-x-2 shadow-2xl"
            id="hero-book-stay-btn"
          >
            <span>{t.hero.bookStay}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onExplore}
            className="w-full sm:w-auto border border-stone-600/80 hover:border-[#C5A880] text-stone-200 hover:text-white px-7 py-3.5 transition-colors cursor-pointer bg-black/40 backdrop-blur-sm"
            id="hero-explore-hotel-btn"
          >
            {t.hero.exploreHotel}
          </button>
        </div>
      </div>

      {/* 4. Subtle Motion Scroll Indicator */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <button
          type="button"
          onClick={onExplore}
          className="text-stone-400 hover:text-[#C5A880] transition-colors inline-flex flex-col items-center space-y-2 cursor-pointer group"
          id="hero-scroll-indicator-btn"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-sans group-hover:tracking-[0.35em] transition-all">
            {t.hero.scroll}
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#C5A880]" />
        </button>
      </div>
    </section>
  );
};
