import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryItem, Language } from '../types';

interface LightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectNext: () => void;
  onSelectPrev: () => void;
  lang: Language;
}

export const Lightbox: React.FC<LightboxProps> = ({
  item,
  items,
  isOpen,
  onClose,
  onSelectNext,
  onSelectPrev,
  lang,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectNext();
      if (e.key === 'ArrowLeft') onSelectPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onSelectNext, onSelectPrev]);

  if (!isOpen || !item) return null;

  const title = lang === 'am' ? item.titleAm : item.title;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-lg animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar Controls */}
      <div className="absolute top-5 left-6 right-6 flex items-center justify-between z-20 pointer-events-none">
        <div className="pointer-events-auto bg-stone-900/80 px-4 py-1.5 border border-stone-800 text-[11px] tracking-[0.25em] uppercase text-[#C5A880] font-sans">
          {item.category.toUpperCase()} • TOP TEN HOTEL
        </div>

        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto p-2.5 bg-stone-900/80 hover:bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close lightbox"
          id="lightbox-close-btn"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.imageUrl}
          alt={item.alt || title}
          className="max-h-[75vh] w-auto max-w-full object-contain shadow-2xl border border-stone-800"
        />

        {/* Caption */}
        <div className="mt-4 text-center">
          <p className="font-serif-luxury text-lg sm:text-xl text-[#F3F1EC] font-light">
            {title}
          </p>
        </div>

        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={onSelectPrev}
              className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 p-3 bg-stone-900/80 hover:bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous image"
              id="lightbox-prev-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onSelectNext}
              className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 p-3 bg-stone-900/80 hover:bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Next image"
              id="lightbox-next-btn"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
