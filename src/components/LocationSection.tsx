import React from 'react';
import { MapPin, Navigation, Plane, ExternalLink, Clock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { HOTEL_INFO, LANDMARKS } from '../data';

interface LocationSectionProps {
  lang: Language;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="location" className="py-24 sm:py-32 px-4 sm:px-8 bg-[#121212] border-b border-stone-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-sans font-medium mb-3">
            <span className="w-4 h-px bg-[#C5A880]" />
            <span>{t.location.badge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#F3F1EC] tracking-tight mb-4">
            {t.location.title}
          </h2>
          <p className="text-stone-300 font-sans text-sm sm:text-base font-light leading-relaxed">
            {t.location.subtitle}
          </p>
        </div>

        {/* Split Layout: Left Info / Right Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Location Information (5 cols) */}
          <div className="lg:col-span-5 bg-[#161616] border border-stone-800 p-6 sm:p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Hotel Address Card */}
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold mb-2">
                  {t.location.addressLabel}
                </div>
                <div className="flex items-start space-x-3 text-stone-200">
                  <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-base sm:text-lg text-[#F3F1EC]">
                      {lang === 'am' ? HOTEL_INFO.addressAm : HOTEL_INFO.address}
                    </div>
                    <div className="text-sm text-stone-400">
                      {lang === 'am' ? HOTEL_INFO.cityAm : HOTEL_INFO.city}
                    </div>
                  </div>
                </div>
              </div>

              {/* Free Airport Shuttle Callout */}
              <div className="p-4 bg-[#121212] border border-stone-800/80 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#C5A880] uppercase tracking-wider">
                  <Plane className="w-4 h-4" />
                  <span>
                    {lang === 'am' ? 'ነፃ የኤርፖርት መጓጓዣ (4.8 ኪ.ሜ)' : 'Free Airport Shuttle (4.8 km)'}
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  {t.location.airportTransferNote}
                </p>
              </div>

              {/* Verified Landmarks */}
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold mb-3">
                  {t.location.nearbyHighlights}
                </div>
                <div className="space-y-3">
                  {LANDMARKS.slice(0, 4).map((item, idx) => {
                    const name = lang === 'am' ? item.nameAm : item.name;
                    const type = lang === 'am' ? item.typeAm : item.type;
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2 border-b border-stone-800/70 text-xs font-sans"
                      >
                        <div>
                          <div className="font-medium text-stone-200">{name}</div>
                          <div className="text-[11px] text-stone-300">{type}</div>
                        </div>
                        <div className="text-right shrink-0 pl-4">
                          <span className="text-[#C5A880] font-medium">{item.distance}</span>
                          <div className="text-[10px] text-stone-300">{item.duration}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row gap-3">
              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C5A880] hover:bg-[#B8976C] text-[#121212] font-semibold px-6 py-3.5 text-xs tracking-[0.2em] uppercase font-sans flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                id="get-directions-btn"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.location.getDirections}</span>
              </a>

              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white px-5 py-3.5 text-xs tracking-[0.18em] uppercase font-sans flex items-center justify-center space-x-2 transition-colors cursor-pointer bg-stone-900/40"
                id="open-google-maps-btn"
              >
                <span>{t.location.openGoogleMaps}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Interactive Map (7 cols) */}
          <div className="lg:col-span-7 bg-[#161616] border border-stone-800 overflow-hidden relative min-h-[420px] sm:min-h-[500px]">
            {/* Embedded Interactive Map with Explicit Dropped Pinpoint */}
            <iframe
              src={HOTEL_INFO.googleMapsEmbed}
              title="Top Ten Hotel Pinpoint Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[420px] sm:min-h-[500px]"
            />

            {/* Floating Pinpoint Location Overlay Badge */}
            <div className="absolute top-5 left-5 bg-[#121212]/95 border border-stone-800 p-4 shadow-2xl max-w-xs backdrop-blur-md">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold">
                  PINPOINT LOCATION
                </span>
              </div>
              <p className="font-serif-luxury text-base text-[#F3F1EC] font-light mt-1">
                Top Ten Hotel
              </p>
              <p className="text-xs text-stone-300 font-sans mt-0.5">
                {lang === 'am' ? HOTEL_INFO.addressAm : HOTEL_INFO.address}
              </p>
              <div className="text-[11px] text-[#C5A880] font-mono mt-1.5 flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>9.0192° N, 38.8220° E</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
