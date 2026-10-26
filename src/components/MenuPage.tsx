import React, { useState } from 'react';
import { ArrowLeft, Globe, ChevronDown } from 'lucide-react';
import { Language, MenuItem, PageRoute } from '../types';
import { MenuBook } from './MenuBook';
import { MenuItemModal } from './MenuItemModal';

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
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2EEE7] font-sans selection:bg-[#B59D77]/30 selection:text-[#F2EEE7] flex flex-col justify-between">
      {/* 1. Simplified Sticky Digital Menu Header */}
      <header className="sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-md border-b border-[#252525] px-4 sm:px-8 py-3.5 transition-all shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Back to main site */}
          <button
            type="button"
            onClick={() => onNavigateSite('home')}
            className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase text-[#B59D77] hover:text-stone-100 transition-colors cursor-pointer py-1"
            id="menu-back-to-website-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">
              {lang === 'am' ? 'ወደ ሆቴሉ ድረ-ገጽ' : 'HOTEL WEBSITE'}
            </span>
            <span className="sm:hidden">{lang === 'am' ? 'ተመለስ' : 'BACK'}</span>
          </button>

          {/* Central Simplified Brand Header */}
          <div className="flex flex-col items-center text-center">
            <span className="font-serif-luxury text-base sm:text-lg tracking-[0.25em] text-[#F2EEE7] uppercase font-light">
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
              className="flex items-center space-x-1.5 px-3 py-1.5 border border-[#2C2C2C] bg-[#161616] text-stone-300 hover:text-[#B59D77] text-xs font-mono uppercase cursor-pointer"
              id="menu-lang-dropdown-btn"
              aria-label="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#B59D77]" />
              <span className="font-semibold">{lang.toUpperCase()}</span>
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

      {/* 2. Interactive Digital Menu Book Core Experience */}
      <main className="flex-grow flex flex-col items-center justify-center py-4 sm:py-8">
        <MenuBook
          lang={lang}
          onSelectDish={(item) => setActiveItemModal(item)}
          onNavigateSite={onNavigateSite}
        />
      </main>

      {/* 3. Dish Item Detail Modal */}
      <MenuItemModal
        item={activeItemModal}
        onClose={() => setActiveItemModal(null)}
        lang={lang}
      />
    </div>
  );
};
