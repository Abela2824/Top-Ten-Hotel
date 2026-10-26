import React, { useState, useEffect, useCallback } from 'react';
import { Language, PageRoute } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IntroSection } from './components/IntroSection';
import { RoomShowcase } from './components/RoomShowcase';
import { DiningSection } from './components/DiningSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { BookingCTA } from './components/BookingCTA';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MenuPage } from './components/MenuPage';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { HOTEL_INFO } from './data';
import { translations } from './translations';

export function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeRoute, setActiveRoute] = useState<PageRoute>('home');
  const t = translations[lang];

  // Map window.location.pathname to PageRoute
  const getRouteFromPath = useCallback((): PageRoute => {
    if (typeof window === 'undefined') return 'home';
    const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    switch (cleanPath) {
      case 'menu':
        return 'menu';
      case 'rooms':
        return 'rooms';
      case 'dining':
        return 'dining';
      case 'experience':
      case 'gallery':
        return 'gallery';
      case 'location':
      case 'contact':
        return 'contact';
      default:
        return 'home';
    }
  }, []);

  // Initialize route from current browser URL & handle popstate
  useEffect(() => {
    setActiveRoute(getRouteFromPath());

    const handlePopState = () => {
      setActiveRoute(getRouteFromPath());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getRouteFromPath]);

  // Sync html lang attribute and direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Navigation handler that manages browser history
  const handleNavigate = (route: PageRoute) => {
    setActiveRoute(route);
    const targetPath = route === 'home' ? '/' : `/${route}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExplore = () => {
    const introEl = document.getElementById('about');
    if (introEl) {
      introEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  // Dedicated Luxury Digital Restaurant Menu (/menu)
  if (activeRoute === 'menu') {
    return (
      <MenuPage
        lang={lang}
        setLang={setLang}
        onNavigateSite={handleNavigate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#F3F1EC] font-sans selection:bg-[#C5A880] selection:text-[#121212] antialiased flex flex-col justify-between">
      {/* 1. Global Sticky Navigation (Maintains: Home, Rooms, Dining, Experience, Gallery, Location, Contact, Book Now) */}
      <Navbar
        lang={lang}
        setLang={setLang}
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeRoute === 'home' && (
          <>
            {/* 2. Hero Section */}
            <Hero lang={lang} onExplore={handleExplore} />

            {/* 3. Introduction Section */}
            <IntroSection lang={lang} />

            {/* 4. Rooms & Suites */}
            <RoomShowcase lang={lang} />

            {/* 5. Dining Section with VIEW DIGITAL MENU ↗ & SCAN TO VIEW MENU */}
            <DiningSection
              lang={lang}
              onNavigate={handleNavigate}
            />

            {/* 6. Gallery */}
            <GallerySection lang={lang} />

            {/* 8. Location */}
            <LocationSection lang={lang} />

            {/* 9. Verified Guest Reviews */}
            <ReviewsSection lang={lang} />

            {/* 10. Booking CTA */}
            <BookingCTA lang={lang} />

            {/* 11. Contact & Inquiries */}
            <ContactSection lang={lang} />
          </>
        )}

        {/* Dedicated Page View for Rooms */}
        {activeRoute === 'rooms' && (
          <div>
            <div className="pt-24 sm:pt-28 pb-4 px-4 sm:px-8 bg-[#121212] border-b border-stone-800/60">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase text-[#C5A880] hover:text-stone-200 transition-colors cursor-pointer py-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{lang === 'am' ? 'ወደ መነሻ ገጽ' : 'Back to Home'}</span>
                </button>
                <a
                  href={HOTEL_INFO.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C5A880] hover:bg-[#B8976C] text-[#121212] font-semibold px-5 py-2 text-xs tracking-[0.15em] uppercase font-sans inline-flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>{t.nav.bookNow} (Booking.com)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <RoomShowcase lang={lang} />
            <BookingCTA lang={lang} />
          </div>
        )}

        {/* Dedicated Page View for Dining */}
        {activeRoute === 'dining' && (
          <div>
            <div className="pt-24 sm:pt-28 pb-4 px-4 sm:px-8 bg-[#121212] border-b border-stone-800/60">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase text-[#C5A880] hover:text-stone-200 transition-colors cursor-pointer py-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{lang === 'am' ? 'ወደ መነሻ ገጽ' : 'Back to Home'}</span>
                </button>
              </div>
            </div>
            <DiningSection
              lang={lang}
              onNavigate={handleNavigate}
              isStandalonePage={true}
            />
            <BookingCTA lang={lang} />
          </div>
        )}

        {/* Dedicated Page View for Gallery */}
        {(activeRoute === 'gallery' || activeRoute === 'experience') && (
          <div>
            <div className="pt-24 sm:pt-28 pb-4 px-4 sm:px-8 bg-[#121212] border-b border-stone-800/60">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase text-[#C5A880] hover:text-stone-200 transition-colors cursor-pointer py-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{lang === 'am' ? 'ወደ መነሻ ገጽ' : 'Back to Home'}</span>
                </button>
                <a
                  href={HOTEL_INFO.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C5A880] hover:bg-[#B8976C] text-[#121212] font-semibold px-5 py-2 text-xs tracking-[0.15em] uppercase font-sans inline-flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>{t.nav.bookNow} (Booking.com)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <GallerySection lang={lang} />
            <BookingCTA lang={lang} />
          </div>
        )}

        {/* Dedicated Page View for Contact (including Location & Map) */}
        {(activeRoute === 'contact' || activeRoute === 'location') && (
          <div>
            <div className="pt-24 sm:pt-28 pb-4 px-4 sm:px-8 bg-[#121212] border-b border-stone-800/60">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase text-[#C5A880] hover:text-stone-200 transition-colors cursor-pointer py-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{lang === 'am' ? 'ወደ መነሻ ገጽ' : 'Back to Home'}</span>
                </button>
                <a
                  href={HOTEL_INFO.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C5A880] hover:bg-[#B8976C] text-[#121212] font-semibold px-5 py-2 text-xs tracking-[0.15em] uppercase font-sans inline-flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>{t.nav.bookNow} (Booking.com)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <LocationSection lang={lang} />
            <ContactSection lang={lang} />
            <BookingCTA lang={lang} />
          </div>
        )}
      </main>

      {/* 12. Corporate Luxury Hotel Footer */}
      <Footer lang={lang} onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
