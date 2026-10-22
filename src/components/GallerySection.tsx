import React, { useState } from 'react';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem, Language } from '../types';
import { translations } from '../translations';
import { GALLERY_ITEMS } from '../data';
import { Lightbox } from './Lightbox';

interface GallerySectionProps {
  lang: Language;
}

const ITEMS_PER_PAGE = 8; // 2 rows of 4 columns to perfectly fill the space

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const categories = [
    { id: 'all', label: t.gallery.all },
    { id: 'hotel', label: t.gallery.hotel },
    { id: 'rooms', label: t.gallery.rooms },
    { id: 'dining', label: t.gallery.dining },
    { id: 'experience', label: t.gallery.experience },
    { id: 'addis', label: t.gallery.addis },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const displayedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
  };

  const handleNext = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 px-4 sm:px-8 bg-[#161616] border-b border-stone-800">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-sans font-medium mb-3">
              <span className="w-4 h-px bg-[#C5A880]" />
              <span>{t.gallery.badge}</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#F3F1EC] tracking-tight">
              {t.gallery.title}
            </h2>
            <p className="text-stone-300 font-sans text-sm sm:text-base font-light mt-3 leading-relaxed">
              {t.gallery.subtitle}
            </p>
          </div>

          {/* Gallery Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 text-xs tracking-[0.18em] uppercase font-sans">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? GALLERY_ITEMS.length
                  : GALLERY_ITEMS.filter((item) => item.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3.5 py-2 transition-colors cursor-pointer border flex items-center space-x-2 ${
                    isActive
                      ? 'border-[#C5A880] text-[#C5A880] bg-[#121212]'
                      : 'border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700 bg-stone-900/40'
                  }`}
                  id={`gallery-filter-${cat.id}`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-none font-mono ${
                    isActive ? 'bg-[#C5A880]/20 text-[#C5A880]' : 'bg-stone-800 text-stone-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cinematic Gallery Grid - 4 Columns on wide screens to fill up the space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {displayedItems.map((item) => {
            const title = lang === 'am' ? item.titleAm : item.title;
            return (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(item)}
                className="group relative aspect-[4/3] bg-stone-900 border border-stone-800/90 overflow-hidden cursor-pointer shadow-lg hover:border-[#C5A880]/50 transition-colors duration-300"
                id={`gallery-item-${item.id}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.alt || title}
                  className="w-full h-full object-cover filter contrast-[1.04] brightness-95 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Refined Dark Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/95 via-[#0e0e0e]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                  <div className="flex justify-end">
                    <span className="p-2 bg-[#121212]/90 text-[#C5A880] border border-stone-700/80 shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold">
                      {item.category.toUpperCase()}
                    </span>
                    <p className="font-serif-luxury text-base sm:text-lg text-[#F3F1EC] font-light mt-1 line-clamp-2">
                      {title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wide Gallery Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-12 sm:mt-14 pt-8 border-t border-stone-800/80 w-full flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Range and Count indicator */}
            <div className="text-xs tracking-[0.2em] uppercase font-sans text-stone-400">
              {lang === 'am' ? (
                <span>
                  ከ <span className="text-[#C5A880] font-medium">{filteredItems.length}</span> ፎቶዎች ውስጥ{' '}
                  <span className="text-[#C5A880] font-medium">{startIndex + 1}</span>–<span className="text-[#C5A880] font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, filteredItems.length)}</span> እየታዩ ነው
                </span>
              ) : (
                <span>
                  Showing <span className="text-[#C5A880] font-medium">{startIndex + 1}</span>–<span className="text-[#C5A880] font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, filteredItems.length)}</span> of{' '}
                  <span className="text-[#C5A880] font-medium">{filteredItems.length}</span> photographs
                </span>
              )}
            </div>

            {/* Right: Wide Luxury Pagination Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                type="button"
                onClick={() => handlePageChange(validCurrentPage - 1)}
                disabled={validCurrentPage === 1}
                className="inline-flex items-center space-x-2 px-4 py-2.5 text-xs font-sans tracking-[0.15em] uppercase border border-stone-800 bg-[#121212] text-stone-300 hover:text-[#C5A880] hover:border-[#C5A880] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{lang === 'am' ? 'የቀደመው' : 'Previous'}</span>
              </button>

              {/* Numbered page buttons */}
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                {Array.from({ length: totalPages }, (_, idx) => {
                  const pageNum = idx + 1;
                  const isActive = validCurrentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-xs font-sans font-medium transition-all cursor-pointer border ${
                        isActive
                          ? 'border-[#C5A880] bg-[#C5A880] text-[#121212] font-bold shadow-md'
                          : 'border-stone-800 bg-[#121212] text-stone-300 hover:border-stone-600 hover:text-white'
                      }`}
                      aria-label={`Go to page ${pageNum}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => handlePageChange(validCurrentPage + 1)}
                disabled={validCurrentPage === totalPages}
                className="inline-flex items-center space-x-2 px-4 py-2.5 text-xs font-sans tracking-[0.15em] uppercase border border-stone-800 bg-[#121212] text-stone-300 hover:text-[#C5A880] hover:border-[#C5A880] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                aria-label="Next page"
              >
                <span className="hidden sm:inline">{lang === 'am' ? 'ቀጣይ' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Lightbox - Passes all filtered items for complete fullscreen browsing */}
      <Lightbox
        item={selectedItem}
        items={filteredItems}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onSelectNext={handleNext}
        onSelectPrev={handlePrev}
        lang={lang}
      />
    </section>
  );
};
