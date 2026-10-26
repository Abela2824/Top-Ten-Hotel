import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Globe, ChevronDown, Sparkles, Bookmark } from 'lucide-react';
import { Language, MenuItem, PageRoute } from '../types';
import { BookFlip } from './BookFlip';
import { MenuItemModal } from './MenuItemModal';
import { BOOK_PAGES } from '../data/bookSpreads';

interface MenuPageProps {
  lang: Language;
  setLang: (l: Language) => void;
  onNavigateSite: (route: PageRoute) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  lang,
  setLang,
  onNavigateSite,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // Category navigation shortcuts that map directly to book pages
  const categoryShortcuts = [
    { label: 'Cover', labelAm: 'ሽፋን', page: 1 },
    { label: 'Welcome', labelAm: 'እንኳን መጡ', page: 2 },
    { label: 'Breakfast', labelAm: 'ቁርስ', page: 3 },
    { label: 'Starters', labelAm: 'መክሰስ', page: 4 },
    { label: 'Main Course', labelAm: 'ዋና ምግቦች', page: 5 },
    { label: "Chef's Feature", labelAm: 'ልዩ ምርጫ', page: 6 },
    { label: 'Ethiopian', labelAm: 'ባህል ምግቦች', page: 7 },
    { label: 'Pizza & Pasta', labelAm: 'ፒዛ እና ፓስታ', page: 8 },
    { label: 'Burgers & Sandwiches', labelAm: 'በርገርና ሳንድዊች', page: 9 },
    { label: 'Sides & Desserts', labelAm: 'ተጨማሪና ጣፋጭ', page: 10 },
    { label: 'Coffee & Drinks', labelAm: 'ቡና እና መጠጦች', page: 11 },
    { label: 'Stay / Info', labelAm: 'ማጠቃለያ', page: 12 },
  ];

  // Auto-scroll active category tab into view on mobile
  useEffect(() => {
    if (categoryScrollRef.current) {
      const activeBtn = categoryScrollRef.current.querySelector('[data-active="true"]');
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentPage]);

  const handleCategorySelect = (targetPage: number) => {
    setCurrentPage(targetPage);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2EEE7] font-sans selection:bg-[#B59D77]/30 selection:text-[#F2EEE7] flex flex-col justify-between">
      {/* 1. Simplified Sticky Digital Menu Header */}
      <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-[#252525] px-3 sm:px-8 py-3 transition-all shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Back to main hotel website */}
          <button
            type="button"
            onClick={() => onNavigateSite('home')}
            className="inline-flex items-center space-x-1.5 sm:space-x-2 text-xs tracking-[0.2em] uppercase text-[#B59D77] hover:text-stone-100 transition-colors cursor-pointer py-1.5 px-1"
            id="menu-back-to-website-btn"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">
              {lang === 'am' ? 'ወደ ሆቴሉ ድረ-ገጽ' : 'HOTEL WEBSITE'}
            </span>
            <span className="sm:hidden text-[11px]">{lang === 'am' ? 'ተመለስ' : 'HOTEL'}</span>
          </button>

          {/* Central Simplified Brand Header */}
          <div className="flex flex-col items-center text-center">
            <span className="font-serif-luxury text-base sm:text-lg tracking-[0.22em] text-[#F2EEE7] uppercase font-light">
              TOP TEN HOTEL
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-[#B59D77] uppercase font-sans -mt-0.5">
              ADDIS ABABA • ETHIOPIA
            </span>
          </div>

          {/* Right Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 border border-[#2C2C2C] bg-[#161616] text-stone-300 hover:text-[#B59D77] text-xs font-mono uppercase cursor-pointer"
              id="menu-lang-dropdown-btn"
              aria-label="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#B59D77]" />
              <span className="font-semibold text-[11px] sm:text-xs">{lang.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[#161616] border border-[#2C2C2C] shadow-2xl py-1 z-50 animate-in fade-in duration-150">
                <button
                  type="button"
                  onClick={() => {
                    setLang('en');
                    setIsLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-sans flex items-center justify-between cursor-pointer ${
                    lang === 'en'
                      ? 'text-[#B59D77] bg-[#1C1C1C]'
                      : 'text-stone-300 hover:bg-[#1C1C1C]'
                  }`}
                >
                  <span>English</span>
                  <span className="text-[10px] font-mono text-stone-500">EN</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLang('am');
                    setIsLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-sans flex items-center justify-between cursor-pointer ${
                    lang === 'am'
                      ? 'text-[#B59D77] bg-[#1C1C1C]'
                      : 'text-stone-300 hover:bg-[#1C1C1C]'
                  }`}
                >
                  <span>አማርኛ</span>
                  <span className="text-[10px] font-mono text-stone-500">አማ</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. Top Interactive Bar: Disclaimer & Category Navigation */}
      <section className="w-full flex flex-col items-center pt-3 px-2 sm:px-6">
        {/* Sample Menu Disclaimer Banner */}
        <div className="mb-3 sm:mb-4 flex items-center space-x-2 px-3 py-1 bg-[#161616] border border-[#B59D77]/30 text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#B59D77] font-sans">
          <Sparkles className="w-3 h-3 text-[#B59D77] shrink-0" />
          <span className="text-center">
            SAMPLE MENU • ITEMS AND PRICES ARE FOR DEMONSTRATION ONLY
          </span>
        </div>

        {/* Category Index Navigation Strip */}
        <div
          ref={categoryScrollRef}
          className="w-full max-w-4xl flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-1.5 px-2 border-b border-[#1C1C1C] touch-pan-x"
        >
          <div className="flex items-center space-x-1.5 shrink-0 pr-2 border-r border-[#222]">
            <Bookmark className="w-3 h-3 text-[#B59D77]" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-stone-400 font-sans">
              INDEX:
            </span>
          </div>
          {categoryShortcuts.map((cat) => {
            const isActive =
              currentPage === cat.page ||
              (currentPage !== 1 && currentPage + 1 === cat.page);

            return (
              <button
                key={cat.page}
                type="button"
                data-active={isActive}
                onClick={() => handleCategorySelect(cat.page)}
                className={`text-[10px] sm:text-[11px] font-sans px-2.5 py-1.5 transition-all uppercase tracking-wider cursor-pointer whitespace-nowrap shrink-0 min-h-[34px] ${
                  isActive
                    ? 'text-[#B59D77] border-b-2 border-[#B59D77] font-semibold bg-[#161616]'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-[#141414]'
                }`}
              >
                {lang === 'am' ? cat.labelAm : cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. The 'book-flip' Component Wrapper */}
      <main className="flex-grow flex flex-col items-center justify-center py-3 sm:py-6 px-2 sm:px-4 w-full">
        <div className="w-full flex justify-center book-flip-wrapper" id="menu-book-flip-container">
          <BookFlip
            currentPage={currentPage}
            totalPages={BOOK_PAGES.length}
            onPageChange={setCurrentPage}
            lang={lang}
            onSelectDish={(item) => setActiveItemModal(item)}
            onNavigateSite={onNavigateSite}
          />
        </div>
      </main>

      {/* 4. Dish Item Detail Modal */}
      <MenuItemModal
        item={activeItemModal}
        onClose={() => setActiveItemModal(null)}
        lang={lang}
      />
    </div>
  );
};
