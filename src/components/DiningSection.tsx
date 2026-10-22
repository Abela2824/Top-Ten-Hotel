import React, { useState } from 'react';
import { QrCode, ArrowUpRight, Clock, Check, Phone } from 'lucide-react';
import { Language, PageRoute } from '../types';
import { translations } from '../translations';
import { DINING_VENUES, HOTEL_INFO } from '../data';
import { QRModal } from './QRModal';

interface DiningSectionProps {
  lang: Language;
  onNavigate?: (route: PageRoute) => void;
  isStandalonePage?: boolean;
}

export const DiningSection: React.FC<DiningSectionProps> = ({
  lang,
  onNavigate,
  isStandalonePage = false,
}) => {
  const t = translations[lang];
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const dameraVenue = DINING_VENUES[0];

  const handleViewMenu = () => {
    if (onNavigate) {
      onNavigate('menu');
    } else {
      window.history.pushState({}, '', '/menu');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div id="dining" className="bg-[#161616] text-[#F2EEE7]">
      {/* 1. Cinematic Dining Hero (Always present on Dining page, with subtle reveal) */}
      <section className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-center justify-center px-4 sm:px-8 overflow-hidden bg-[#0e0e0e] border-b border-stone-800">
        {/* Background Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=85"
            alt="Dining at Top Ten Hotel Addis Ababa"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.05]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-black/40 to-black/60" />
        </div>

        {/* Hero Overlay Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center py-20 animate-in fade-in duration-700">
          <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#C5A880] font-sans font-medium mb-3">
            {lang === 'am' ? 'የቶፕ ቴን ሆቴል መስተንግዶ' : 'AUTHENTIC ETHIOPIAN & INTERNATIONAL'}
          </p>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-light text-[#F3F1EC] tracking-tight mb-4">
            {lang === 'am' ? 'ምግብና መስተንግዶ በቶፕ ቴን' : 'DINING AT TOP TEN'}
          </h1>
          <p className="text-stone-300 font-sans text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            {lang === 'am'
              ? 'ትኩስና ባህላዊ የሀበሻ ምግቦች፣ የጀበና ቡና እና ጥንቃቄ የተሞላበት የእንግዳ አቀባበል።'
              : 'Authentic Ethiopian flavors, fresh highland coffee, and quiet hospitality.'}
          </p>
        </div>
      </section>

      {/* 2. Main Restaurant Section: Damera Restaurant */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Large High-Resolution Restaurant Image */}
          <div className="lg:col-span-7 relative aspect-[16/10] bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden group">
            <img
              src={dameraVenue.image}
              alt="Damera Restaurant at Top Ten Hotel"
              className="w-full h-full object-cover filter brightness-95 contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-6">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold">
                {lang === 'am' ? dameraVenue.subtitleAm : dameraVenue.subtitle}
              </span>
            </div>
          </div>

          {/* Right: Restrained Description & Two Primary Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-sans font-medium">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{lang === 'am' ? dameraVenue.hoursAm : dameraVenue.hours}</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#F3F1EC]">
                {lang === 'am' ? 'ዳመራ ሬስቶራንት' : 'DAMERA RESTAURANT'}
              </h2>
              <p className="text-stone-300 text-sm font-sans leading-relaxed font-light">
                {lang === 'am' ? dameraVenue.descriptionAm : dameraVenue.description}
              </p>
            </div>

            {/* Verified Highlights */}
            <div className="space-y-2.5 pt-2 border-t border-stone-800">
              {(lang === 'am' ? dameraVenue.highlightsAm : dameraVenue.highlights)
                .slice(0, 3)
                .map((highlight, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-stone-300 font-sans">
                    <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
            </div>

            {/* 3. Digital Menu CTA: Two Visually Equal Primary Actions */}
            <div className="pt-6 border-t border-stone-800">
              <div className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-sans mb-3">
                {lang === 'am' ? 'የዲጂታል ሜኑ አማራጮች' : 'RESTAURANT MENU'}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Action 1: Solid Champagne Gold Button -> Navigates to /menu */}
                <button
                  type="button"
                  onClick={handleViewMenu}
                  className="flex-1 bg-[#C5A880] hover:bg-[#B8976C] text-[#121212] font-semibold py-3.5 px-5 text-xs tracking-[0.18em] uppercase font-sans inline-flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-lg"
                  id="dining-view-digital-menu-btn"
                >
                  <span>{lang === 'am' ? 'ዲጂታል ሜኑን ይመልከቱ' : 'VIEW DIGITAL MENU'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {/* Action 2: Dark Outlined Button with subtle gold border -> Opens QR Modal */}
                <button
                  type="button"
                  onClick={() => setIsQRModalOpen(true)}
                  className="flex-1 bg-[#121212] hover:bg-stone-900 text-stone-200 hover:text-[#C5A880] border border-[#C5A880]/50 hover:border-[#C5A880] font-medium py-3.5 px-5 text-xs tracking-[0.18em] uppercase font-sans inline-flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                  id="dining-scan-qr-menu-btn"
                >
                  <QrCode className="w-4 h-4 text-[#C5A880]" />
                  <span>{lang === 'am' ? 'በQR ሜኑን ይክፈቱ' : 'SCAN TO VIEW MENU'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dining Experience: Coffee Ceremony & Resident Comfort */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#121212] border-t border-b border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-sans font-medium">
              {lang === 'am' ? 'የኢትዮጵያ መስተንግዶ' : 'HOSPITALITY TRADITION'}
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-light text-[#F3F1EC] mt-2">
              {lang === 'am' ? 'ባህላዊ የቡና ሥነ-ሥርዓት' : 'Traditional Coffee Ceremony'}
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm font-sans mt-2 font-light">
              {lang === 'am'
                ? 'በእውነተኛ የሸክላ ጀበና የሚፈላ ትኩስ የሀበሻ ቡና ከዕጣን መዓዛ ጋር።'
                : 'Experience single-origin Arabica beans pan-roasted fresh with frankincense smoke.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1: Fresh Roasted Coffee */}
            <div className="p-6 bg-[#161616] border border-stone-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans">
                  01 / COFFEE
                </span>
                <h4 className="font-serif-luxury text-lg text-[#F3F1EC] mt-2 mb-2 font-light">
                  {lang === 'am' ? 'የጀበና ቡና' : 'Highland Arabica'}
                </h4>
                <p className="text-stone-400 text-xs font-sans leading-relaxed">
                  {lang === 'am'
                    ? 'በየቀኑ የሚቆላ ትኩስ የሀገር ውስጥ ቡና በመረጡት ሰዓት ይቀርባል።'
                    : 'Brewed fresh upon request following time-honored Ethiopian ceremonial steps.'}
                </p>
              </div>
            </div>

            {/* Feature 2: All-Day Service */}
            <div className="p-6 bg-[#161616] border border-stone-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans">
                  02 / HOURS
                </span>
                <h4 className="font-serif-luxury text-lg text-[#F3F1EC] mt-2 mb-2 font-light">
                  {lang === 'am' ? 'ቀኑን ሙሉ መስተንግዶ' : 'Breakfast to Late Dining'}
                </h4>
                <p className="text-stone-400 text-xs font-sans leading-relaxed">
                  {lang === 'am'
                    ? 'ከጧቱ 12:30 እስከ ምሽቱ 5:00 ድረስ ለክፍል እንግዶችና ጎብኚዎች ክፍት ነው።'
                    : 'Open daily from 06:30 to 23:00 for resident guests and visiting travelers.'}
                </p>
              </div>
            </div>

            {/* Feature 3: Dietary Accommodations */}
            <div className="p-6 bg-[#161616] border border-stone-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans">
                  03 / SELECTION
                </span>
                <h4 className="font-serif-luxury text-lg text-[#F3F1EC] mt-2 mb-2 font-light">
                  {lang === 'am' ? 'የፆም እና ቪጋን አማራጮች' : 'Vegetarian & Fasting Options'}
                </h4>
                <p className="text-stone-400 text-xs font-sans leading-relaxed">
                  {lang === 'am'
                    ? 'ባህላዊ የፆም በያይነቱ፣ ምስር፣ ሽሮ እና የአትክልት ምግቦች በየቀኑ ይዘጋጃሉ።'
                    : 'Rich assortment of traditional Ethiopian plant-based and vegetarian dishes.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact / Reservation Desk CTA */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-[#121212] border border-stone-800 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-sans font-medium">
              {lang === 'am' ? 'ጠረጴዛ ወይም ክፍል አገልግሎት' : 'TABLE INQUIRIES'}
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F3F1EC] font-light mt-1">
              {lang === 'am' ? 'ለሬስቶራንት ጥያቄዎች' : 'Reserve or Order to Room'}
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm font-sans mt-1">
              {lang === 'am'
                ? 'የቀጥታ ስልክ መስመሮቻችን 24 ሰዓት ክፍት ናቸው።'
                : 'Direct reception desk available 24/7 for hotel residents.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${HOTEL_INFO.phonePrimary}`}
              className="border border-stone-700 hover:border-[#C5A880] text-stone-300 hover:text-white px-5 py-3 text-xs tracking-[0.18em] uppercase font-sans inline-flex items-center space-x-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{HOTEL_INFO.phonePrimary}</span>
            </a>
            <a
              href="#contact"
              className="bg-[#C5A880] hover:bg-[#B8976C] text-[#121212] font-semibold px-6 py-3 text-xs tracking-[0.18em] uppercase font-sans inline-flex items-center space-x-1 transition-colors"
            >
              <span>{lang === 'am' ? 'መልእክት ይላኩ' : 'CONTACT DESK'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. QR Code Modal */}
      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  );
};
