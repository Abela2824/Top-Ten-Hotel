import React, { useState, useMemo, useRef } from 'react';
import {
  ArrowLeft,
  Search,
  X,
  Globe,
  ChevronDown,
  ArrowUpRight,
  ArrowUp,
  Sparkles,
} from 'lucide-react';
import { Language, MenuCategory, MenuItem, PageRoute } from '../types';
import { MENU_CATEGORIES, DEMO_MENU_ITEMS, CHEF_FEATURE } from '../menuData';
import { HOTEL_INFO } from '../data';
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
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter items by category & search query
  const filteredItems = useMemo(() => {
    return DEMO_MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.nameAm && item.nameAm.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Toggle search input
  const toggleSearch = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchQuery('');
    } else {
      setIsSearchOpen(true);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#161616] text-[#F2EEE7] font-sans selection:bg-[#B59D77]/30 selection:text-[#F2EEE7]">
      {/* 1. Simplified Sticky Digital Menu Header */}
      <header className="sticky top-0 z-40 bg-[#161616]/95 backdrop-blur-md border-b border-[#2C2C2C] px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {/* Back to main site */}
          <button
            type="button"
            onClick={() => onNavigateSite('home')}
            className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase text-[#B59D77] hover:text-stone-100 transition-colors cursor-pointer py-1"
            id="menu-back-to-website-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">
              {lang === 'am' ? 'ወደ ዋናው ድረ-ገጽ' : 'HOTEL WEBSITE'}
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

          {/* Right Controls: Search Toggle + Language Selector */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Icon */}
            <button
              type="button"
              onClick={toggleSearch}
              className={`p-2 transition-colors cursor-pointer border ${
                isSearchOpen || searchQuery
                  ? 'border-[#B59D77] text-[#B59D77] bg-[#1C1C1C]'
                  : 'border-[#2C2C2C] text-stone-300 hover:text-white bg-[#161616]'
              }`}
              aria-label="Toggle menu search"
              id="menu-search-toggle-btn"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 border border-[#2C2C2C] bg-[#1C1C1C] text-stone-300 hover:text-[#B59D77] text-xs font-mono uppercase cursor-pointer"
                id="menu-lang-dropdown-btn"
              >
                <Globe className="w-3 h-3 text-[#B59D77]" />
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
                    className={`w-full text-left px-3 py-1.5 text-xs font-sans flex items-center justify-between ${
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
                    className={`w-full text-left px-3 py-1.5 text-xs font-sans flex items-center justify-between ${
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
        </div>

        {/* Small Elegant Search Bar Drawer */}
        {isSearchOpen && (
          <div className="max-w-5xl mx-auto mt-3 pt-3 border-t border-[#2C2C2C] animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-stone-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'am' ? 'ሜኑን ይፈልጉ...' : 'Search menu...'}
                className="w-full bg-[#1C1C1C] border border-[#2C2C2C] text-[#F2EEE7] text-xs font-sans pl-9 pr-8 py-2.5 placeholder-stone-500 focus:outline-none focus:border-[#B59D77]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-1 text-stone-400 hover:text-stone-100 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 2. Minimal Digital Menu Hero */}
      <section className="border-b border-[#2C2C2C] bg-[#141414]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#B59D77] font-sans font-medium">
              {lang === 'am' ? 'ዳመራ ሬስቶራንት' : 'DAMERA RESTAURANT'}
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#F2EEE7] mt-1 mb-2 tracking-tight">
              {lang === 'am' ? 'ምግብና መጠጥ በቶፕ ቴን' : 'DINING AT TOP TEN'}
            </h1>
            <p className="text-[#B8B1A6] font-sans text-xs sm:text-sm font-light max-w-md leading-relaxed">
              {lang === 'am'
                ? 'በጥንቃቄ የተዘጋጁ ምግቦችና የኢትዮጵያ ሞቅ ያለ የእንግዳ ተቀባይነት መንፈስ።'
                : 'Thoughtfully prepared dishes and Ethiopian hospitality.'}
            </p>
          </div>

          <div className="md:col-span-5 aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-stone-900 border border-[#2C2C2C] shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85"
              alt="Dining at Top Ten Hotel"
              className="w-full h-full object-cover filter contrast-[1.03] brightness-95"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* 3. Chef's Feature (Non-repetitive, Elegant Editorial Spotlight) */}
      {!searchQuery && selectedCategory === 'ALL' && (
        <section className="border-b border-[#2C2C2C] bg-[#161616]">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-12">
            <div
              onClick={() => setActiveItemModal(CHEF_FEATURE)}
              className="bg-[#1C1C1C] border border-[#2C2C2C] hover:border-[#B59D77]/60 transition-colors p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center cursor-pointer group"
            >
              <div className="md:col-span-5 relative aspect-[4/3] bg-stone-900 overflow-hidden">
                <img
                  src={CHEF_FEATURE.imageUrl}
                  alt={CHEF_FEATURE.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />
                <div className="absolute top-3 left-3 bg-[#161616]/90 border border-[#B59D77] px-2.5 py-1 text-[9px] font-sans tracking-[0.2em] uppercase text-[#B59D77]">
                  CHEF'S FEATURE
                </div>
              </div>

              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase text-[#B59D77] font-sans">
                  <Sparkles className="w-3.5 h-3.5 text-[#B59D77]" />
                  <span>{lang === 'am' ? 'የዋና አዘጋጅ ምርጫ' : 'CHEF’S SIGNATURE'}</span>
                </div>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#F2EEE7]">
                  {lang === 'am' ? CHEF_FEATURE.nameAm : CHEF_FEATURE.name}
                </h2>
                <p className="italic text-stone-400 text-xs font-serif-luxury tracking-wide">
                  "{lang === 'am' ? 'የኢትዮጵያ ባህል ጣዕም' : 'A taste of Ethiopia.'}"
                </p>
                <p className="text-[#B8B1A6] text-xs font-sans leading-relaxed font-light">
                  {lang === 'am' ? CHEF_FEATURE.descriptionAm : CHEF_FEATURE.description}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-serif-luxury text-2xl text-[#B59D77]">
                    {CHEF_FEATURE.priceETB}{' '}
                    <span className="text-xs font-sans text-stone-400">ETB</span>
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 group-hover:text-[#B59D77] transition-colors inline-flex items-center space-x-1">
                    <span>VIEW DETAILS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Sticky Horizontally Scrollable Category Navigation */}
      <div className="sticky top-[53px] z-30 bg-[#161616] border-b border-[#2C2C2C] shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-3 scroll-smooth">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const label = lang === 'am' ? cat.labelAm : cat.label;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                  }}
                  className={`shrink-0 px-3.5 py-2 text-xs font-sans tracking-[0.15em] uppercase transition-colors cursor-pointer border ${
                    isActive
                      ? 'border-[#B59D77] text-[#B59D77] bg-[#1C1C1C] font-medium'
                      : 'border-transparent text-[#B8B1A6] hover:text-[#F2EEE7] hover:border-[#2C2C2C]'
                  }`}
                  id={`menu-category-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Editorial Restaurant Menu Items Layout */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-14 min-h-[500px]">
        {/* Results Info if searching */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between text-xs text-stone-400 border-b border-[#2C2C2C] pb-3">
            <span>
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found for "{searchQuery}"
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[#B59D77] hover:underline cursor-pointer"
            >
              Clear search
            </button>
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className="text-center py-20 border border-[#2C2C2C] bg-[#1C1C1C] p-8">
            <p className="font-serif-luxury text-xl text-stone-400">No dishes found</p>
            <p className="text-xs text-stone-500 font-sans mt-1">
              Try selecting a different category or clearing your search.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 border border-[#B59D77] text-[#B59D77] text-xs uppercase tracking-wider hover:bg-[#B59D77] hover:text-[#161616] transition-colors cursor-pointer"
            >
              View All Dishes
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#2C2C2C]">
            {filteredItems.map((item) => {
              const dishName = lang === 'am' && item.nameAm ? item.nameAm : item.name;
              const description =
                lang === 'am' && item.descriptionAm ? item.descriptionAm : item.description;

              return (
                <article
                  key={item.id}
                  onClick={() => setActiveItemModal(item)}
                  className="py-6 sm:py-7 group cursor-pointer transition-colors hover:bg-[#1C1C1C]/60 px-2 sm:px-4"
                  id={`dish-item-${item.id}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    {/* Dish Title */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#F2EEE7] font-light group-hover:text-[#B59D77] transition-colors tracking-wide">
                          {dishName}
                        </h3>
                        {item.dietary && item.dietary.length > 0 && (
                          <div className="hidden sm:flex items-center space-x-1.5">
                            {item.dietary.map((tag) => (
                              <span
                                key={tag}
                                className="text-[8px] tracking-[0.18em] uppercase font-sans text-stone-400 border border-[#2C2C2C] px-1.5 py-0.5"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* One Sentence Description */}
                      <p className="text-[#B8B1A6] font-sans text-xs sm:text-sm font-light mt-1.5 leading-relaxed max-w-2xl">
                        {description}
                      </p>

                      {/* Mobile Dietary Tags */}
                      {item.dietary && item.dietary.length > 0 && (
                        <div className="flex sm:hidden items-center space-x-1.5 mt-2">
                          {item.dietary.map((tag) => (
                            <span
                              key={tag}
                              className="text-[8px] tracking-[0.18em] uppercase font-sans text-stone-400 border border-[#2C2C2C] px-1.5 py-0.5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price - Visually prominent, classic editorial alignment */}
                    <div className="text-right shrink-0">
                      <span className="font-serif-luxury text-xl sm:text-2xl text-[#B59D77] font-normal">
                        {item.priceETB}
                      </span>
                      <span className="text-[10px] sm:text-xs font-sans text-stone-400 ml-1.5 tracking-wider">
                        ETB
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Floating Return to Top on Mobile */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.2em] uppercase text-stone-400 hover:text-[#B59D77] border border-[#2C2C2C] px-4 py-2 bg-[#1C1C1C] transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>RETURN TO TOP</span>
          </button>
        </div>
      </main>

      {/* 6. Footer / Menu Page Return */}
      <footer className="border-t border-[#2C2C2C] bg-[#121212] py-14 sm:py-16 px-4 sm:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <span className="font-serif-luxury text-xl sm:text-2xl tracking-[0.2em] text-[#F2EEE7] uppercase font-light">
              TOP TEN HOTEL
            </span>
            <div className="text-[9px] tracking-[0.35em] text-[#B59D77] uppercase font-sans mt-1">
              ADDIS ABABA • ETHIOPIA
            </div>
          </div>

          <p className="text-xs text-stone-400 font-sans max-w-md mx-auto">
            Damera Restaurant welcomes hotel residents and visiting diners daily from 06:30 to 23:00.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Link back to website */}
            <button
              type="button"
              onClick={() => onNavigateSite('home')}
              className="w-full sm:w-auto border border-[#2C2C2C] hover:border-[#B59D77] text-stone-300 hover:text-white px-6 py-3 text-xs tracking-[0.2em] uppercase font-sans inline-flex items-center justify-center space-x-2 transition-colors cursor-pointer bg-[#161616]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← HOTEL WEBSITE</span>
            </button>

            {/* Book Your Stay -> Booking.com */}
            <a
              href={HOTEL_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#B59D77] hover:bg-[#a68e69] text-[#121212] font-semibold px-6 py-3 text-xs tracking-[0.2em] uppercase font-sans inline-flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <span>BOOK YOUR STAY</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-6 border-t border-[#2C2C2C]/50 text-[11px] text-stone-500 font-sans">
            Demonstration digital menu for Top Ten Hotel Addis Ababa.
          </div>
        </div>
      </footer>

      {/* Item Detail Modal / Mobile Bottom Sheet */}
      <MenuItemModal
        item={activeItemModal}
        onClose={() => setActiveItemModal(null)}
        lang={lang}
      />
    </div>
  );
};
