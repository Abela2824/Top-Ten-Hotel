import React, { useState } from 'react';
import {
  Bed,
  ShowerHead,
  Dumbbell,
  Utensils,
  Coffee,
  Bell,
  Clock,
  Globe,
  ShieldCheck,
  Plane,
  Wifi,
  CreditCard,
  Car,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { AMENITY_GROUPS, HOTEL_INFO } from '../data';

interface ExperienceSectionProps {
  lang: Language;
  showAllInitially?: boolean;
}

// Map string icon names to Lucide icons safely
const renderAmenityIcon = (name: string) => {
  const props = { className: 'w-5 h-5 text-[#C5A880] shrink-0' };
  switch (name) {
    case 'Bed':
      return <Bed {...props} />;
    case 'ShowerHead':
      return <ShowerHead {...props} />;
    case 'Dumbbell':
      return <Dumbbell {...props} />;
    case 'Utensils':
      return <Utensils {...props} />;
    case 'Coffee':
      return <Coffee {...props} />;
    case 'Bell':
      return <Bell {...props} />;
    case 'Clock':
      return <Clock {...props} />;
    case 'Globe':
      return <Globe {...props} />;
    case 'ShieldCheck':
      return <ShieldCheck {...props} />;
    case 'Plane':
      return <Plane {...props} />;
    case 'Wifi':
      return <Wifi {...props} />;
    case 'CreditCard':
      return <CreditCard {...props} />;
    case 'Car':
      return <Car {...props} />;
    default:
      return <ShieldCheck {...props} />;
  }
};

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  lang,
  showAllInitially = false,
}) => {
  const t = translations[lang];
  const [showAll, setShowAll] = useState(showAllInitially);

  return (
    <section id="experience" className="py-24 sm:py-32 px-4 sm:px-8 bg-[#121212] border-b border-stone-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-sans font-medium mb-3">
            <span className="w-4 h-px bg-[#C5A880]" />
            <span>{t.experience.badge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#F3F1EC] tracking-tight mb-4">
            {t.experience.title}
          </h2>
          <p className="text-stone-300 font-sans text-sm sm:text-base font-light leading-relaxed">
            {t.experience.subtitle}
          </p>
        </div>

        {/* 4 Clean Meaningful Categories (Comfort, Dining, Hospitality, Convenience) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AMENITY_GROUPS.map((group, groupIdx) => {
            const categoryTitle = lang === 'am' ? group.categoryAm : group.category;
            // On homepage when not expanded, show primary item or show all
            const itemsToShow = showAll ? group.items : group.items.slice(0, 2);

            return (
              <div
                key={groupIdx}
                className="bg-[#161616] border border-stone-800/90 p-6 sm:p-7 flex flex-col justify-between space-y-6"
                id={`amenity-group-${group.category.toLowerCase()}`}
              >
                <div>
                  {/* Category Heading with Clean Accent Line */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-800">
                    <h3 className="font-serif-luxury text-xl font-normal text-[#F3F1EC]">
                      {categoryTitle}
                    </h3>
                    <span className="text-[10px] tracking-[0.25em] text-[#C5A880] uppercase font-sans">
                      0{groupIdx + 1}
                    </span>
                  </div>

                  {/* Amenity Items */}
                  <div className="space-y-3.5">
                    {itemsToShow.map((item, itemIdx) => {
                      const itemTitle = lang === 'am' ? item.titleAm : item.title;
                      return (
                        <div key={itemIdx} className="flex items-center space-x-2.5">
                          {renderAmenityIcon(item.icon)}
                          <span className="text-xs sm:text-sm font-medium text-stone-200 font-sans">
                            {itemTitle}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Micro note for convenience */}
                {group.category === 'Convenience' && (
                  <div className="pt-4 border-t border-stone-800/70 text-[11px] text-[#C5A880] font-sans">
                    {t.experience.shuttleNotice}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All / Collapse Button */}
        {!showAllInitially && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center space-x-2 border border-stone-700 hover:border-[#C5A880] text-stone-300 hover:text-white px-7 py-3 text-xs tracking-[0.2em] uppercase font-sans transition-colors cursor-pointer bg-[#161616]"
              id="toggle-all-amenities-btn"
            >
              <span>{showAll ? 'Show Less' : t.experience.exploreMore}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
