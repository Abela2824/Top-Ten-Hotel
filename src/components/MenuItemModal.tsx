import React, { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { MenuItem, Language } from '../types';

interface MenuItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  lang: Language;
}

export const MenuItemModal: React.FC<MenuItemModalProps> = ({
  item,
  onClose,
  lang,
}) => {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const dishName = lang === 'am' && item.nameAm ? item.nameAm : item.name;
  const description =
    lang === 'am' && item.descriptionAm ? item.descriptionAm : item.description;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-item-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal / Mobile Bottom Sheet Container */}
      <div
        className="w-full sm:max-w-lg bg-[#161616] border-t sm:border border-[#2C2C2C] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-2 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Handle for mobile */}
        <div className="sm:hidden w-12 h-1 bg-stone-700 mx-auto mt-2.5 rounded-full" />

        {/* Dish Image */}
        {item.imageUrl && (
          <div className="relative aspect-[16/9] w-full bg-stone-950 overflow-hidden shrink-0">
            <img
              src={item.imageUrl}
              alt={dishName}
              className="w-full h-full object-cover filter brightness-95 contrast-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent pointer-events-none" />

            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 p-2 bg-[#161616]/80 backdrop-blur-md text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer"
              aria-label="Close dish preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content Details */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#B59D77] font-sans font-medium">
                {item.category}
              </span>
              <h3
                id="menu-item-title"
                className="font-serif-luxury text-2xl sm:text-3xl text-[#F2EEE7] font-light mt-1"
              >
                {dishName}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <span className="font-serif-luxury text-2xl text-[#B59D77] font-normal">
                {item.priceETB}
              </span>
              <span className="text-xs font-sans text-stone-400 ml-1.5 tracking-wider">
                ETB
              </span>
            </div>
          </div>

          <p className="text-sm font-sans text-[#B8B1A6] font-light leading-relaxed">
            {description}
          </p>

          {/* Dietary tags: subtle text labels rather than colorful badges */}
          {item.dietary && item.dietary.length > 0 && (
            <div className="pt-2 flex flex-wrap gap-2">
              {item.dietary.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-[0.2em] uppercase font-sans text-stone-300 border border-[#2C2C2C] bg-[#1C1C1C] px-2.5 py-1"
                >
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          )}

          {/* Note */}
          <div className="pt-4 border-t border-[#2C2C2C] flex items-center justify-between text-[11px] text-stone-500 font-sans">
            <span>Prepared fresh daily by Top Ten Hotel kitchen.</span>
            <button
              type="button"
              onClick={onClose}
              className="text-[#B59D77] hover:text-[#e4cfb0] tracking-[0.18em] uppercase transition-colors cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
