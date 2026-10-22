import React from 'react';
import { Quote, Star } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { GUEST_REVIEWS } from '../data';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="py-24 sm:py-28 px-4 sm:px-8 bg-[#161616] border-b border-stone-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-sans font-medium mb-3">
            <span className="w-4 h-px bg-[#C5A880]" />
            <span>{t.reviews.badge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#F3F1EC] tracking-tight mb-3">
            {t.reviews.title}
          </h2>
          <p className="text-stone-300 font-sans text-sm sm:text-base font-light leading-relaxed">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Minimalist Verified Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GUEST_REVIEWS.map((review, idx) => {
            const quote = lang === 'am' ? review.quoteAm : review.quote;
            const stayType = lang === 'am' ? review.stayTypeAm : review.stayType;

            return (
              <div
                key={idx}
                className="bg-[#121212] border border-stone-800 p-8 flex flex-col justify-between space-y-6 relative group hover:border-stone-700 transition-colors"
              >
                <div className="space-y-4">
                  <Quote className="w-6 h-6 text-[#C5A880]/60" />
                  <p className="font-serif-luxury text-lg text-stone-200 font-light italic leading-relaxed">
                    "{quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs font-sans">
                  <div>
                    <div className="font-medium text-stone-200">{review.author}</div>
                    <div className="text-[11px] text-stone-300">{stayType}</div>
                  </div>
                  <span className="text-[10px] tracking-wider uppercase text-[#C5A880] font-medium">
                    {review.source}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
