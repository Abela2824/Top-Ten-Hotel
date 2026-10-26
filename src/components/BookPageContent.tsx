import React from 'react';
import { BookPageDefinition } from '../data/bookSpreads';
import { Language, MenuItem, PageRoute } from '../types';
import { CHEF_FEATURE } from '../menuData';
import { HOTEL_INFO } from '../data';
import { Sparkles, ArrowUpRight, Clock, Coffee, ShieldCheck } from 'lucide-react';

interface BookPageContentProps {
  page: BookPageDefinition;
  lang: Language;
  onSelectDish: (item: MenuItem) => void;
  onNavigateSite?: (route: PageRoute) => void;
  isRightPage?: boolean;
}

export const BookPageContent: React.FC<BookPageContentProps> = ({
  page,
  lang,
  onSelectDish,
  onNavigateSite,
  isRightPage = false,
}) => {
  // Page 1: Cover
  if (page.type === 'cover') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-between p-8 sm:p-12 bg-gradient-to-br from-[#1c1c1c] via-[#161616] to-[#111111] border-2 border-[#B59D77]/40 relative overflow-hidden text-center select-none shadow-2xl">
        {/* Subtle leather-like texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#F2EEE7_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Outer and inner ornamental gold frames */}
        <div className="absolute inset-3 border border-[#B59D77]/30 pointer-events-none" />
        <div className="absolute inset-5 border border-[#B59D77]/15 pointer-events-none" />

        {/* Ornate corners */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#B59D77]" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#B59D77]" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#B59D77]" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#B59D77]" />

        {/* Top Seal */}
        <div className="pt-4 sm:pt-8 flex flex-col items-center z-10">
          <div className="w-10 h-10 border border-[#B59D77]/60 rounded-full flex items-center justify-center mb-3">
            <span className="font-serif-luxury text-sm text-[#B59D77] font-semibold">10</span>
          </div>
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#B59D77] font-sans font-semibold">
            {lang === 'am' ? 'ቶፕ ቴን ሆቴል' : 'TOP TEN HOTEL'}
          </span>
        </div>

        {/* Center Main Titles */}
        <div className="my-auto py-6 z-10 max-w-sm">
          <div className="w-12 h-px bg-[#B59D77]/50 mx-auto mb-4" />
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#F2EEE7] tracking-wider uppercase mb-3 leading-tight">
            {lang === 'am' ? page.titleAm : page.title}
          </h1>
          <div className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#B59D77] font-sans font-light">
            {lang === 'am' ? page.subtitleAm : page.subtitle}
          </div>
          <div className="w-12 h-px bg-[#B59D77]/50 mx-auto mt-4" />
        </div>

        {/* Bottom Signature */}
        <div className="pb-4 sm:pb-8 z-10 flex flex-col items-center space-y-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-sans">
            ADDIS ABABA • ETHIOPIA
          </span>
          <span className="text-[9px] text-[#B59D77]/70 font-sans tracking-widest uppercase">
            EST. 2013
          </span>
        </div>
      </div>
    );
  }

  // Page 2: Welcome / Menu Introduction
  if (page.type === 'welcome') {
    return (
      <div className="h-full w-full flex flex-col justify-between p-6 sm:p-10 bg-[#161616] relative text-[#F2EEE7]">
        {/* Subtle inner page frame */}
        <div className="absolute inset-3 border border-[#2C2C2C] pointer-events-none" />

        {/* Header */}
        <div className="z-10 text-center pt-2">
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#B59D77] font-sans font-medium">
            TOP TEN HOTEL
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#F2EEE7] mt-1 tracking-wide">
            {lang === 'am' ? page.titleAm : page.title}
          </h2>
          <div className="w-8 h-px bg-[#B59D77] mx-auto mt-2" />
        </div>

        {/* Photo & Story */}
        <div className="z-10 my-auto space-y-4">
          <div className="aspect-[16/10] overflow-hidden border border-[#2C2C2C] bg-stone-900 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
              alt="Damera Restaurant"
              className="w-full h-full object-cover filter brightness-95"
            />
          </div>

          <div className="space-y-2 text-center max-w-sm mx-auto">
            <p className="text-stone-300 font-sans text-xs sm:text-sm font-light leading-relaxed">
              {lang === 'am'
                ? 'ዳመራ ሬስቶራንት እውነተኛ የኢትዮጵያ ሞቅ ያለ የእንግዳ ተቀባይነትንና ዓለም አቀፍ ምግቦችን በጥራት ያቀርባል።'
                : 'Thoughtfully prepared dishes, authentic Ethiopian hospitality, and selected international culinary classics in the heart of Yeka.'}
            </p>
          </div>

          {/* Restaurant Hours Info Box */}
          <div className="bg-[#1C1C1C] border border-[#2C2C2C] p-3 text-center space-y-1">
            <div className="flex items-center justify-center space-x-1.5 text-[10px] tracking-[0.2em] uppercase text-[#B59D77] font-sans">
              <Clock className="w-3 h-3 text-[#B59D77]" />
              <span>{lang === 'am' ? 'የአገልግሎት ሰዓታት' : 'DINING HOURS'}</span>
            </div>
            <div className="text-[11px] text-stone-300 font-sans font-light">
              Breakfast: 06:00 – 10:30 • All-Day: 11:30 – 22:30
            </div>
          </div>
        </div>

        {/* Footer Page Number */}
        <div className="z-10 text-center pb-1">
          <span className="text-[10px] font-mono text-stone-500 tracking-widest">
            {page.pageNumber}
          </span>
        </div>
      </div>
    );
  }

  // Page 6: Chef's Feature Spread (Editorial)
  if (page.type === 'featured') {
    return (
      <div className="h-full w-full flex flex-col justify-between p-6 sm:p-10 bg-[#161616] relative text-[#F2EEE7]">
        <div className="absolute inset-3 border border-[#2C2C2C] pointer-events-none" />

        {/* Header */}
        <div className="z-10 text-center pt-2">
          <div className="flex items-center justify-center space-x-1.5 text-[9px] tracking-[0.35em] uppercase text-[#B59D77] font-sans font-medium">
            <Sparkles className="w-3 h-3 text-[#B59D77]" />
            <span>{lang === 'am' ? page.titleAm : page.title}</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#F2EEE7] mt-1">
            A Taste of Ethiopia
          </h2>
          <div className="w-8 h-px bg-[#B59D77] mx-auto mt-2" />
        </div>

        {/* Feature Spotlight Card */}
        <div
          onClick={() => onSelectDish(CHEF_FEATURE)}
          className="z-10 my-auto space-y-4 cursor-pointer group"
        >
          <div className="relative aspect-[4/3] overflow-hidden border border-[#B59D77]/40 bg-stone-900 shadow-xl">
            <img
              src={CHEF_FEATURE.imageUrl}
              alt={CHEF_FEATURE.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
            />
            <div className="absolute top-3 left-3 bg-[#161616]/90 border border-[#B59D77] px-2.5 py-1 text-[9px] font-sans tracking-[0.2em] uppercase text-[#B59D77]">
              SIGNATURE
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#F2EEE7] group-hover:text-[#B59D77] transition-colors">
              {lang === 'am' ? CHEF_FEATURE.nameAm : CHEF_FEATURE.name}
            </h3>
            <p className="italic font-serif-luxury text-stone-300 text-sm">
              "{lang === 'am' ? 'የኢትዮጵያ ባህል ጣዕም' : 'A taste of Ethiopia.'}"
            </p>
            <p className="text-stone-400 font-sans text-xs font-light max-w-sm mx-auto leading-relaxed">
              {lang === 'am' ? CHEF_FEATURE.descriptionAm : CHEF_FEATURE.description}
            </p>
            <div className="pt-2">
              <span className="font-serif-luxury text-2xl text-[#B59D77] tracking-wider">
                {CHEF_FEATURE.priceETB}{' '}
                <span className="text-xs font-sans text-stone-400">ETB</span>
              </span>
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-stone-400 group-hover:text-[#B59D77] transition-colors inline-flex items-center space-x-1 pt-1">
              <span>VIEW INGREDIENTS</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Footer Page Number */}
        <div className="z-10 text-center pb-1">
          <span className="text-[10px] font-mono text-stone-500 tracking-widest">
            {page.pageNumber}
          </span>
        </div>
      </div>
    );
  }

  // Page 12: Closing / Hotel Signature
  if (page.type === 'closing') {
    return (
      <div className="h-full w-full flex flex-col justify-between p-6 sm:p-10 bg-[#161616] relative text-[#F2EEE7] text-center">
        <div className="absolute inset-3 border border-[#2C2C2C] pointer-events-none" />

        {/* Header */}
        <div className="z-10 pt-4">
          <div className="w-8 h-8 border border-[#B59D77]/60 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="font-serif-luxury text-xs text-[#B59D77] font-semibold">10</span>
          </div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#B59D77] font-sans font-medium">
            TOP TEN HOTEL
          </span>
          <div className="text-[9px] tracking-[0.3em] uppercase text-stone-400 font-sans mt-0.5">
            ADDIS ABABA • ETHIOPIA
          </div>
          <div className="w-8 h-px bg-[#B59D77] mx-auto mt-3" />
        </div>

        {/* Core Content */}
        <div className="z-10 my-auto space-y-6 max-w-sm mx-auto">
          <p className="text-stone-300 font-sans text-xs sm:text-sm font-light leading-relaxed">
            {lang === 'am'
              ? 'ስለጎበኙን እናመሰግናለን። ለክፍል ማስያዣ ወይም ለየትኛውም ተጨማሪ መረጃ በቀጥታ ሪሴፕሽንን ማነጋገር ይችላሉ።'
              : 'Thank you for dining with us. We invite you to experience the comforting hospitality and quiet refinement of Top Ten Hotel.'}
          </p>

          <div className="space-y-3 pt-2">
            {/* BOOK YOUR STAY button */}
            <a
              href={HOTEL_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#B59D77] hover:bg-[#a68e68] text-[#121212] font-semibold py-3 px-5 text-xs tracking-[0.2em] uppercase font-sans inline-flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-lg"
              id="book-stay-menu-closing-btn"
            >
              <span>{lang === 'am' ? 'ክፍል ያስይዙ' : 'BOOK YOUR STAY'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Back to Hotel Website */}
            {onNavigateSite && (
              <button
                type="button"
                onClick={() => onNavigateSite('home')}
                className="w-full bg-[#1C1C1C] hover:bg-[#202020] text-stone-200 border border-[#2C2C2C] hover:border-[#B59D77] py-2.5 px-5 text-xs tracking-[0.18em] uppercase font-sans inline-flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                id="back-home-menu-closing-btn"
              >
                <span>{lang === 'am' ? 'ወደ ሆቴሉ ድረ-ገጽ ተመለስ' : '← HOTEL WEBSITE'}</span>
              </button>
            )}
          </div>

          {/* Direct telephone */}
          <div className="text-[11px] font-sans text-stone-400">
            Direct Desk: <span className="text-[#B59D77]">{HOTEL_INFO.phonePrimary}</span>
          </div>
        </div>

        {/* Footer Page Number */}
        <div className="z-10 pb-1">
          <span className="text-[10px] font-mono text-stone-500 tracking-widest">
            {page.pageNumber}
          </span>
        </div>
      </div>
    );
  }

  // Page 3-5, 7-11: Menu Category Pages
  return (
    <div className="h-full w-full flex flex-col justify-between p-4 sm:p-7 bg-[#161616] relative text-[#F2EEE7]">
      {/* Subtle page frame */}
      <div className="absolute inset-2 sm:inset-3 border border-[#2C2C2C] pointer-events-none" />

      {/* Category Section Header */}
      <div className="z-10 text-center pt-0.5 pb-2.5 border-b border-[#2C2C2C]">
        <span className="text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-[#B59D77] font-sans font-medium">
          DAMERA RESTAURANT
        </span>
        <h2 className="font-serif-luxury text-xl sm:text-2xl font-light text-[#F2EEE7] mt-0.5 tracking-wider uppercase">
          {lang === 'am' ? page.titleAm : page.title}
        </h2>
        {page.subtitle && (
          <p className="text-[10px] sm:text-[11px] font-sans text-stone-400 font-light mt-0.5">
            {lang === 'am' ? page.subtitleAm : page.subtitle}
          </p>
        )}
      </div>

      {/* Menu Dish Items List */}
      <div className="z-10 my-auto py-2 space-y-3 sm:space-y-3.5 overflow-y-auto max-h-[58vh] sm:max-h-[70vh] pr-1.5 touch-pan-y">
        {page.items?.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectDish(item)}
            className="group cursor-pointer pb-2 border-b border-[#252525] last:border-none hover:border-[#B59D77]/40 transition-colors active:opacity-80"
          >
            {/* Dish Name & Price Line */}
            <div className="flex items-baseline justify-between gap-2.5">
              <div className="flex items-center space-x-1.5">
                <span className="font-serif-luxury text-sm sm:text-base font-medium text-[#F2EEE7] group-hover:text-[#B59D77] transition-colors">
                  {lang === 'am' ? item.nameAm || item.name : item.name}
                </span>
                {item.dietary?.includes('vegetarian') && (
                  <span className="text-[9px] px-1 py-0.2 border border-emerald-500/40 text-emerald-400 uppercase font-sans">
                    V
                  </span>
                )}
                {item.dietary?.includes('spicy') && (
                  <span className="text-[9px] px-1 py-0.2 border border-amber-500/40 text-amber-400 uppercase font-sans">
                    🌶
                  </span>
                )}
              </div>
              {/* Dotted Leader & Price */}
              <div className="flex items-baseline shrink-0">
                <span className="font-serif-luxury text-sm sm:text-base text-[#B59D77] font-semibold">
                  {item.priceETB}
                </span>
                <span className="text-[9px] font-sans text-stone-400 ml-1">ETB</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[11px] sm:text-xs text-stone-400 font-sans font-light leading-relaxed mt-1 line-clamp-2 group-hover:text-stone-300 transition-colors">
              {lang === 'am' ? item.descriptionAm || item.description : item.description}
            </p>
          </div>
        ))}

        {/* Secondary Category Section if present (e.g. Desserts or Cold Beverages) */}
        {page.secondaryCategory && page.secondaryItems && page.secondaryItems.length > 0 && (
          <div className="pt-2">
            <div className="text-center py-1.5 border-b border-[#2C2C2C] mb-2.5">
              <h3 className="font-serif-luxury text-base sm:text-lg font-light text-[#F2EEE7] tracking-wider uppercase">
                {lang === 'am' ? page.secondaryTitleAm : page.secondaryTitle}
              </h3>
            </div>
            <div className="space-y-2.5">
              {page.secondaryItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectDish(item)}
                  className="group cursor-pointer pb-2 border-b border-[#252525] last:border-none hover:border-[#B59D77]/40 transition-colors active:opacity-80"
                >
                  <div className="flex items-baseline justify-between gap-2.5">
                    <span className="font-serif-luxury text-sm sm:text-base font-medium text-[#F2EEE7] group-hover:text-[#B59D77] transition-colors">
                      {lang === 'am' ? item.nameAm || item.name : item.name}
                    </span>
                    <div className="flex items-baseline shrink-0">
                      <span className="font-serif-luxury text-sm sm:text-base text-[#B59D77] font-semibold">
                        {item.priceETB}
                      </span>
                      <span className="text-[9px] font-sans text-stone-400 ml-1">ETB</span>
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-400 font-sans font-light leading-relaxed mt-0.5 line-clamp-1 group-hover:text-stone-300">
                    {lang === 'am' ? item.descriptionAm || item.description : item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Page Number */}
      <div className="z-10 text-center pt-1.5 border-t border-[#252525]">
        <span className="text-[10px] font-mono text-stone-500 tracking-widest">
          PAGE {page.pageNumber} / 12
        </span>
      </div>
    </div>
  );
};
