import React, { useState } from 'react';
import { Bed, Users, Wifi, ArrowUpRight, Eye, Check } from 'lucide-react';
import { Room, Language } from '../types';
import { translations } from '../translations';
import { ROOMS, HOTEL_INFO } from '../data';
import { RoomDetailModal } from './RoomDetailModal';

interface RoomShowcaseProps {
  lang: Language;
}

export const RoomShowcase: React.FC<RoomShowcaseProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenRoomDetail = (room: Room) => {
    setSelectedRoom(room);
    setIsDetailOpen(true);
  };

  return (
    <section id="rooms" className="py-24 sm:py-32 px-4 sm:px-8 bg-[#121212] border-b border-stone-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-sans font-medium mb-3">
            <span className="w-4 h-px bg-[#C5A880]" />
            <span>{t.rooms.badge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#F3F1EC] tracking-tight mb-4">
            {t.rooms.title}
          </h2>
          <p className="text-stone-300 font-sans text-sm sm:text-base font-light leading-relaxed">
            {t.rooms.subtitle}
          </p>
        </div>

        {/* Large Horizontal Room Sections (Not Tiny Cards) */}
        <div className="space-y-16 sm:space-y-20">
          {ROOMS.map((room, idx) => {
            const title = lang === 'am' ? room.nameAm : room.name;
            const description = lang === 'am' ? room.descriptionAm : room.description;
            const bedType = lang === 'am' ? room.bedTypeAm : room.bedType;
            const capacity = lang === 'am' ? room.capacityAm : room.capacity;
            const features = lang === 'am' ? room.featuresAm : room.features;
            const tag = room.tag ? (lang === 'am' ? room.tagAm : room.tag) : null;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={room.id}
                className={`bg-[#161616] border border-stone-800/90 grid grid-cols-1 lg:grid-cols-12 overflow-hidden group hover:border-stone-700 transition-colors duration-300 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
                id={`room-card-${room.id}`}
              >
                {/* Large Photography Column (7 cols on large) */}
                <div
                  className={`relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto overflow-hidden bg-stone-900 ${
                    isReversed ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'
                  }`}
                >
                  <img
                    src={room.images[0]}
                    alt={title}
                    className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-95 group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent lg:hidden" />

                  {/* Room Tag Badge */}
                  {tag && (
                    <div className="absolute top-5 left-5 bg-[#121212]/90 border border-[#C5A880]/60 px-3.5 py-1 text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans">
                      {tag}
                    </div>
                  )}
                </div>

                {/* Editorial Details & Action Column (5 cols on large) */}
                <div
                  className={`p-6 sm:p-8 lg:p-12 flex flex-col justify-between space-y-6 ${
                    isReversed ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Key Verified Specs: Bed & Capacity */}
                    <div className="flex flex-wrap items-center gap-4 text-[11px] tracking-wider uppercase text-stone-300 font-sans pb-4 border-b border-stone-800">
                      <div className="flex items-center space-x-2">
                        <Bed className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{bedType}</span>
                      </div>
                      <span className="text-stone-700">•</span>
                      <div className="flex items-center space-x-2">
                        <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{capacity}</span>
                      </div>
                    </div>

                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#F3F1EC] leading-snug">
                      {title}
                    </h3>

                    <p className="text-stone-300 text-sm font-sans leading-relaxed">
                      {description}
                    </p>

                    {/* Clean Key Features */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-xs text-stone-300 font-sans">
                      {features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-center space-x-1.5">
                          <Check className="w-3 h-3 text-[#C5A880] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions: View Details & Book Now */}
                  <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenRoomDetail(room)}
                      className="border border-stone-700 hover:border-[#C5A880] text-stone-200 hover:text-white px-5 py-3 text-xs tracking-[0.2em] uppercase font-sans flex items-center justify-center space-x-2 transition-colors cursor-pointer bg-[#121212]/50"
                      id={`view-room-btn-${room.id}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.rooms.viewRoom}</span>
                    </button>

                    <a
                      href={HOTEL_INFO.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#C5A880] hover:bg-[#B8976C] text-[#121212] font-semibold px-6 py-3 text-xs tracking-[0.2em] uppercase font-sans flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                      id={`book-room-btn-${room.id}`}
                    >
                      <span>{t.rooms.bookNow}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Room Detail Modal */}
      <RoomDetailModal
        room={selectedRoom}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        lang={lang}
      />
    </section>
  );
};
