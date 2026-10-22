import React, { useState } from 'react';
import { X, Bed, Users, Wifi, ArrowUpRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Room, Language } from '../types';
import { HOTEL_INFO } from '../data';

interface RoomDetailModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen || !room) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const title = lang === 'am' ? room.nameAm : room.name;
  const description = lang === 'am' ? room.descriptionAm : room.description;
  const bedType = lang === 'am' ? room.bedTypeAm : room.bedType;
  const capacity = lang === 'am' ? room.capacityAm : room.capacity;
  const features = lang === 'am' ? room.featuresAm : room.features;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-[#161616] border border-stone-800 max-w-3xl w-full max-h-[92vh] overflow-y-auto text-[#F3F1EC] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#121212]/80 hover:bg-[#121212] border border-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close room details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Carousel */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-stone-900 overflow-hidden">
          <img
            src={room.images[activeImageIdx] || room.images[0]}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />

          {/* Image Navigation Arrows if multiple */}
          {room.images.length > 1 && (
            <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
              <button
                type="button"
                onClick={() =>
                  setActiveImageIdx((prev) => (prev === 0 ? room.images.length - 1 : prev - 1))
                }
                className="pointer-events-auto p-2 bg-[#121212]/70 hover:bg-[#121212] text-stone-300 hover:text-white border border-stone-800 cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveImageIdx((prev) => (prev === room.images.length - 1 ? 0 : prev + 1))
                }
                className="pointer-events-auto p-2 bg-[#121212]/70 hover:bg-[#121212] text-stone-300 hover:text-white border border-stone-800 cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Tag badge */}
          {room.tag && (
            <div className="absolute top-4 left-4 bg-[#121212]/90 border border-[#C5A880]/60 px-3 py-1 text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans">
              {lang === 'am' ? room.tagAm : room.tag}
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#F3F1EC] mb-3">
              {title}
            </h3>
            <p className="text-stone-300 text-sm font-sans leading-relaxed">
              {description}
            </p>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 py-4 border-y border-stone-800 text-xs sm:text-sm text-stone-300 font-sans">
            <div className="flex items-center space-x-2.5">
              <Bed className="w-4 h-4 text-[#C5A880]" />
              <span>{bedType}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Users className="w-4 h-4 text-[#C5A880]" />
              <span>{capacity}</span>
            </div>
          </div>

          {/* Verified Amenities */}
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold mb-3">
              {lang === 'am' ? 'የክፍሉ አገልግሎቶች' : 'VERIFIED ROOM AMENITIES'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-stone-300 font-sans">
                  <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-400 font-sans text-center sm:text-left">
              Real-time availability confirmed on Booking.com
            </div>
            <a
              href={HOTEL_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#C5A880] hover:bg-[#B8976C] text-[#121212] font-semibold px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-sans flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              id="modal-room-book-now-btn"
            >
              <span>{lang === 'am' ? 'በቡኪንግ ዶት ኮም ያስይዙ' : 'Book on Booking.com'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
