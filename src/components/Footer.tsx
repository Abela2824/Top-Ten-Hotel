import React from 'react';
import { MapPin, Phone, Mail, ArrowUpRight, Globe } from 'lucide-react';
import { Language, PageRoute } from '../types';
import { translations } from '../translations';
import { HOTEL_INFO } from '../data';

interface FooterProps {
  lang: Language;
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];

  return (
    <footer className="bg-[#0b0b0b] text-stone-400 border-t border-stone-800/80 pt-16 sm:pt-20 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          {/* Col 1: Brand & Statement (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-serif-luxury text-2xl tracking-[0.2em] text-[#F3F1EC] uppercase font-light">
                {lang === 'am' ? HOTEL_INFO.nameAm : HOTEL_INFO.name}
              </span>
              <div className="text-[10px] tracking-[0.35em] text-[#C5A880] uppercase font-sans mt-0.5">
                ADDIS ABABA • ETHIOPIA
              </div>
            </div>
            <p className="text-xs sm:text-sm font-sans text-stone-300 font-light leading-relaxed max-w-sm">
              {t.footer.brandDesc}
            </p>
            <div className="pt-2 text-[11px] text-stone-300 font-sans">
              48 Rooms • Damera Restaurant • Complimentary Airport Shuttle
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold">
              {t.footer.quickLinks}
            </div>
            <div className="flex flex-col space-y-2.5 text-xs tracking-wider uppercase font-sans">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-left text-stone-300 hover:text-[#C5A880] transition-colors cursor-pointer"
              >
                {t.nav.home}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('rooms')}
                className="text-left text-stone-300 hover:text-[#C5A880] transition-colors cursor-pointer"
              >
                {t.nav.rooms}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('dining')}
                className="text-left text-stone-300 hover:text-[#C5A880] transition-colors cursor-pointer"
              >
                {t.nav.dining}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('gallery')}
                className="text-left text-stone-300 hover:text-[#C5A880] transition-colors cursor-pointer"
              >
                {t.nav.gallery}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="text-left text-stone-300 hover:text-[#C5A880] transition-colors cursor-pointer"
              >
                {t.nav.contact}
              </button>
            </div>
          </div>

          {/* Col 3: Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold">
              {t.footer.contactTitle}
            </div>
            <div className="space-y-2.5 text-xs font-sans text-stone-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>
                  {lang === 'am' ? HOTEL_INFO.addressAm : HOTEL_INFO.address},{' '}
                  {lang === 'am' ? HOTEL_INFO.cityAm : HOTEL_INFO.city}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`tel:${HOTEL_INFO.phonePrimary}`} className="hover:text-[#C5A880] transition-colors">
                  {HOTEL_INFO.phonePrimary}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`tel:${HOTEL_INFO.phoneSecondary}`} className="hover:text-[#C5A880] transition-colors">
                  {HOTEL_INFO.phoneSecondary}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-[#C5A880] transition-colors">
                  {HOTEL_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Verified External Booking Badge (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold">
              {t.footer.verifiedBooking}
            </div>
            <p className="text-[11px] font-sans text-stone-400 leading-relaxed">
              {t.footer.verifiedBookingDesc}
            </p>
            <a
              href={HOTEL_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#161616] border border-stone-700 hover:border-[#C5A880] text-stone-200 hover:text-white px-4 py-2.5 text-[11px] tracking-wider uppercase font-sans transition-colors cursor-pointer"
            >
              <span>Booking.com</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-stone-400 gap-4">
          <div>
            © {new Date().getFullYear()} Top Ten Hotel. {t.footer.rights}
          </div>
          <div className="flex items-center space-x-4">
            <span>Gurd Shola, Asmara Road, Yeka</span>
            <span>•</span>
            <span>Bole Airport 4.8 km</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
