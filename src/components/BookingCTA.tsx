import React from 'react';
import { ArrowUpRight, Phone, Calendar } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { HOTEL_INFO } from '../data';

interface BookingCTAProps {
  lang: Language;
  onContactClick?: () => void;
}

export const BookingCTA: React.FC<BookingCTAProps> = ({ lang, onContactClick }) => {
  const t = translations[lang];

  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-8 bg-[#0e0e0e] border-b border-stone-800 overflow-hidden">
      {/* Subtle Luxury Atmospheric Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="Top Ten Hotel Ambiance"
          className="w-full h-full object-cover object-center filter brightness-[0.22] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/90 via-[#121212]/70 to-[#121212]/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Tracked Eyebrow */}
        <div className="inline-flex items-center space-x-3">
          <span className="h-px w-6 bg-[#C5A880]" />
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#C5A880] font-sans font-medium">
            {t.bookingCta.badge}
          </span>
          <span className="h-px w-6 bg-[#C5A880]" />
        </div>

        {/* Large Focused Heading */}
        <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#F3F1EC] tracking-tight leading-tight">
          {t.bookingCta.title}
        </h2>

        {/* Very Short Supporting Line */}
        <p className="text-stone-300 font-sans text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
          {t.bookingCta.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 text-xs tracking-[0.22em] uppercase font-sans">
          {/* Large BOOK YOUR STAY Button -> Booking.com */}
          <a
            href={HOTEL_INFO.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#C5A880] hover:bg-[#B8976C] text-[#121212] font-semibold px-10 py-4 transition-colors cursor-pointer inline-flex items-center justify-center space-x-2 shadow-2xl"
            id="cta-book-stay-btn"
          >
            <span>{t.bookingCta.bookOnBookingCom}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Secondary Button: Call Reception */}
          <a
            href={`tel:${HOTEL_INFO.phonePrimary}`}
            className="w-full sm:w-auto border border-stone-600 hover:border-[#C5A880] text-stone-200 hover:text-white px-8 py-4 transition-colors cursor-pointer inline-flex items-center justify-center space-x-2 bg-[#121212]/80"
            id="cta-call-reception-btn"
          >
            <Phone className="w-4 h-4 text-[#C5A880]" />
            <span>{t.bookingCta.callDirect}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
