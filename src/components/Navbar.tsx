import React, { useState, useEffect } from 'react';
import { Phone, Globe, Menu, X, ArrowUpRight, ChevronDown, Check } from 'lucide-react';
import { Language, PageRoute } from '../types';
import { translations } from '../translations';
import { HOTEL_INFO } from '../data';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenInquiry?: () => void;
}

const LANGUAGES: { code: Language; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'am', label: 'አማ', name: 'አማርኛ' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'ar', label: 'AR', name: 'العربية' },
];

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  activeRoute,
  onNavigate,
  onOpenInquiry,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#lang-selector-container')) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navItems: { id: PageRoute; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'rooms', label: t.nav.rooms },
    { id: 'dining', label: t.nav.dining },
    { id: 'experience', label: t.nav.experience },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'location', label: t.nav.location },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleLinkClick = (route: PageRoute) => {
    setIsMobileMenuOpen(false);
    onNavigate(route);
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Main Sticky Navigation Bar (Transparent initially, solid & blurred when scrolled) */}
      <nav
        className={`transition-all duration-300 border-b ${
          isScrolled || isMobileMenuOpen
            ? 'bg-[#121212]/95 backdrop-blur-md py-3 sm:py-3.5 shadow-2xl border-stone-800/80'
            : 'bg-transparent border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <button
            type="button"
            onClick={() => handleLinkClick('home')}
            className="flex flex-col text-left group cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            id="brand-logo-btn"
          >
            <span className="font-serif-luxury text-xl sm:text-2xl tracking-[0.2em] text-[#F3F1EC] uppercase font-light group-hover:text-[#C5A880] transition-colors">
              {lang === 'am' ? HOTEL_INFO.nameAm : HOTEL_INFO.name}
            </span>
            <span className="text-[9px] tracking-[0.35em] text-[#C5A880] uppercase font-sans -mt-0.5">
              {lang === 'am' ? 'አዲስ አበባ • ኢትዮጵያ' : 'ADDIS ABABA • ETHIOPIA'}
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-7 text-[12px] tracking-[0.18em] uppercase text-stone-200 font-sans font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {navItems.map((item) => {
              const isActive = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.id)}
                  className={`py-1 transition-colors cursor-pointer relative ${
                    isActive ? 'text-[#C5A880]' : 'hover:text-[#C5A880]'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A880] transform translate-y-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action: Language Switcher + "BOOK NOW" Button */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Language Switcher Dropdown inside Navbar */}
            <div className="relative" id="lang-selector-container">
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className={`flex items-center space-x-1.5 px-3 py-2 border transition-all duration-300 cursor-pointer text-[11px] tracking-wider uppercase font-sans ${
                  isScrolled
                    ? 'border-stone-800 bg-[#181818]/90 hover:border-stone-700 text-stone-300 hover:text-[#C5A880]'
                    : 'border-white/20 bg-black/40 backdrop-blur-md hover:border-[#C5A880] text-stone-200 hover:text-[#C5A880]'
                }`}
                id="lang-dropdown-toggle-btn"
                aria-expanded={isLangDropdownOpen}
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="font-semibold text-stone-200">
                  {currentLangObj.label}
                </span>
                <span className="text-stone-400 text-[10px] hidden xl:inline">
                  {currentLangObj.name}
                </span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isLangDropdownOpen ? 'rotate-180 text-[#C5A880]' : 'text-stone-400'
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#141414] border border-stone-700/80 shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-stone-400 border-b border-stone-800/80 font-sans">
                    Language / ቋንቋ
                  </div>
                  {LANGUAGES.map((l) => {
                    const isSelected = lang === l.code;
                    return (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setLang(l.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'text-[#C5A880] bg-stone-900/90 font-medium'
                            : 'text-stone-300 hover:text-white hover:bg-stone-800/70'
                        }`}
                        id={`lang-select-${l.code}`}
                      >
                        <span className="flex items-center space-x-2.5">
                          <span className="text-[10px] font-mono text-[#C5A880] w-6 uppercase">
                            {l.label}
                          </span>
                          <span>{l.name}</span>
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#C5A880]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Book Now Button */}
            <a
              href={HOTEL_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C5A880] hover:bg-[#B8976C] text-[#121212] transition-colors duration-200 px-5 sm:px-6 py-2.5 text-[11px] tracking-[0.22em] uppercase font-sans font-semibold inline-flex items-center space-x-2 shadow-xl cursor-pointer"
              id="header-book-now-btn"
            >
              <span>{t.nav.bookNow}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Right Controls: Quick Lang + Book Now + Hamburger */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Quick Lang Pill on Mobile */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`sm:hidden flex items-center space-x-1 px-2 py-1.5 border text-[10px] uppercase tracking-wider font-mono cursor-pointer transition-colors ${
                isScrolled || isMobileMenuOpen
                  ? 'border-stone-800 bg-stone-900/80 text-stone-300'
                  : 'border-white/20 bg-black/40 backdrop-blur-md text-stone-200'
              }`}
              aria-label="Language selector in menu"
            >
              <Globe className="w-3 h-3 text-[#C5A880]" />
              <span className="text-[#C5A880] font-semibold">{currentLangObj.label}</span>
            </button>

            <a
              href={HOTEL_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden bg-[#C5A880] text-[#121212] px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase font-bold"
              id="mobile-quick-book-btn"
            >
              {t.nav.bookNow}
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors cursor-pointer border ${
                isScrolled || isMobileMenuOpen
                  ? 'p-2 text-stone-200 hover:text-white border-stone-800 bg-stone-900/50'
                  : 'p-2 text-stone-100 hover:text-white border-white/20 bg-black/40 backdrop-blur-md'
              }`}
              aria-label={isMobileMenuOpen ? t.nav.close : t.nav.menu}
              id="mobile-menu-toggle-btn"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#121212] border-t border-stone-800 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-3 text-xs tracking-[0.2em] uppercase text-stone-300">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-left py-2 border-b border-stone-900 flex justify-between items-center ${
                    activeRoute === item.id ? 'text-[#C5A880] font-semibold' : 'hover:text-[#C5A880]'
                  }`}
                  id={`mobile-nav-${item.id}`}
                >
                  <span>{item.label}</span>
                  {activeRoute === item.id && <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />}
                </button>
              ))}
            </div>

            <div className="pt-3 space-y-2">
              <a
                href={HOTEL_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#C5A880] hover:bg-[#B8976C] text-[#121212] py-3 text-[11px] tracking-[0.22em] uppercase font-sans font-semibold flex items-center justify-center space-x-2"
                id="mobile-drawer-book-btn"
              >
                <span>{t.nav.bookNow} (Booking.com)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:${HOTEL_INFO.phonePrimary}`}
                className="w-full border border-stone-800 text-stone-300 hover:text-white py-2.5 text-[11px] tracking-[0.18em] uppercase font-sans flex items-center justify-center space-x-2"
                id="mobile-drawer-call-btn"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{HOTEL_INFO.phonePrimary}</span>
              </a>
            </div>

            {/* Mobile Language Selection Grid */}
            <div className="pt-3 border-t border-stone-800/80">
              <div className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2 flex items-center space-x-1.5">
                <Globe className="w-3 h-3 text-[#C5A880]" />
                <span>Languages / ቋንቋ</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-sans">
                {LANGUAGES.map((l) => {
                  const isSelected = lang === l.code;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setLang(l.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`py-2 px-2 text-center border transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-[#C5A880] text-[#C5A880] bg-stone-900 font-medium'
                          : 'border-stone-800 text-stone-400 hover:text-stone-200 bg-stone-950/60'
                      }`}
                      id={`mobile-lang-select-${l.code}`}
                    >
                      <div className="text-xs font-serif-luxury">{l.name}</div>
                      <div className="text-[9px] uppercase tracking-wider text-[#C5A880]/80 mt-0.5">{l.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
