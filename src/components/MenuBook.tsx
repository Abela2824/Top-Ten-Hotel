import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookPageDefinition, BOOK_PAGES } from '../data/bookSpreads';
import { BookPageContent } from './BookPageContent';
import { Language, MenuItem, PageRoute } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Bookmark,
  Sparkles,
  Maximize2,
  RotateCcw,
} from 'lucide-react';

interface MenuBookProps {
  lang: Language;
  onSelectDish: (item: MenuItem) => void;
  onNavigateSite?: (route: PageRoute) => void;
}

export const MenuBook: React.FC<MenuBookProps> = ({
  lang,
  onSelectDish,
  onNavigateSite,
}) => {
  // Mobile check
  const [isMobile, setIsMobile] = useState(false);
  // Current page number (1 to 12)
  // On desktop, currentPage represents the left page of the spread (or 1 for closed cover)
  const [currentPage, setCurrentPage] = useState(1);
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev'>('next');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  // Touch gesture state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Responsive screen listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 820);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isMobile, isTurning]);

  const totalPages = BOOK_PAGES.length; // 12 pages

  // Navigation handlers
  const goToNext = useCallback(() => {
    if (isTurning) return;
    if (isMobile) {
      if (currentPage < totalPages) {
        setTurnDirection('next');
        setIsTurning(true);
        setCurrentPage((prev) => prev + 1);
        setTimeout(() => setIsTurning(false), 500);
      }
    } else {
      // Desktop spread logic:
      // Page 1 is cover (solo)
      // Next moves to Page 2 (showing 2 & 3)
      // Then 4 (showing 4 & 5), 6 (6 & 7), 8 (8 & 9), 10 (10 & 11), 12 (closing)
      if (currentPage === 1) {
        setTurnDirection('next');
        setIsTurning(true);
        setCurrentPage(2);
        setTimeout(() => setIsTurning(false), 600);
      } else if (currentPage < 12) {
        setTurnDirection('next');
        setIsTurning(true);
        setCurrentPage((prev) => Math.min(12, prev + 2));
        setTimeout(() => setIsTurning(false), 600);
      }
    }
  }, [currentPage, isMobile, isTurning, totalPages]);

  const goToPrev = useCallback(() => {
    if (isTurning) return;
    if (isMobile) {
      if (currentPage > 1) {
        setTurnDirection('prev');
        setIsTurning(true);
        setCurrentPage((prev) => prev - 1);
        setTimeout(() => setIsTurning(false), 500);
      }
    } else {
      // Desktop spread logic:
      if (currentPage === 2) {
        setTurnDirection('prev');
        setIsTurning(true);
        setCurrentPage(1); // Return to closed cover
        setTimeout(() => setIsTurning(false), 600);
      } else if (currentPage > 2) {
        setTurnDirection('prev');
        setIsTurning(true);
        setCurrentPage((prev) => Math.max(2, prev - 2));
        setTimeout(() => setIsTurning(false), 600);
      }
    }
  }, [currentPage, isMobile, isTurning]);

  // Jump to specific page
  const jumpToPage = (targetPage: number) => {
    if (isTurning || targetPage === currentPage) return;
    setTurnDirection(targetPage > currentPage ? 'next' : 'prev');
    setIsTurning(true);
    if (!isMobile && targetPage > 1) {
      // On desktop, snap to even left page
      const evenPage = targetPage % 2 === 0 ? targetPage : targetPage - 1;
      setCurrentPage(Math.min(12, Math.max(2, evenPage)));
    } else {
      setCurrentPage(targetPage);
    }
    setTimeout(() => setIsTurning(false), 600);
    setIsCategoryMenuOpen(false);
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Horizontal swipe threshold: 45px, more than vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Categories jump list
  const categoryShortcuts = [
    { label: 'Cover', labelAm: 'ሽፋን', page: 1 },
    { label: 'Welcome', labelAm: 'እንኳን መጡ', page: 2 },
    { label: 'Breakfast', labelAm: 'ቁርስ', page: 3 },
    { label: 'Starters', labelAm: 'መክሰስ', page: 4 },
    { label: 'Main Course', labelAm: 'ዋና ምግቦች', page: 5 },
    { label: "Chef's Feature", labelAm: 'ልዩ ምርጫ', page: 6 },
    { label: 'Ethiopian', labelAm: 'ባህል ምግቦች', page: 7 },
    { label: 'Pizza & Pasta', labelAm: 'ፒዛ እና ፓስታ', page: 8 },
    { label: 'Burgers & Sandwiches', labelAm: 'በርገርና ሳንድዊች', page: 9 },
    { label: 'Sides & Desserts', labelAm: 'ተጨማሪና ጣፋጭ', page: 10 },
    { label: 'Coffee & Drinks', labelAm: 'ቡና እና መጠጦች', page: 11 },
    { label: 'Stay / Info', labelAm: 'ማጠቃለያ', page: 12 },
  ];

  // Get active spread pages for desktop
  const leftPageDef = BOOK_PAGES.find((p) => p.pageNumber === currentPage);
  const rightPageDef = BOOK_PAGES.find((p) => p.pageNumber === currentPage + 1);

  // Single page for mobile or cover
  const isCover = currentPage === 1;
  const isClosing = !isMobile && currentPage === 12;

  return (
    <div className="w-full flex flex-col items-center select-none bg-[#0A0A0A] py-6 sm:py-10 px-2 sm:px-6">
      {/* 1. Tasteful Sample Menu Disclaimer Banner */}
      <div className="mb-4 sm:mb-6 flex items-center space-x-2 px-3.5 py-1.5 bg-[#161616] border border-[#B59D77]/30 text-[10px] tracking-[0.25em] uppercase text-[#B59D77] font-sans">
        <Sparkles className="w-3 h-3 text-[#B59D77]" />
        <span>SAMPLE MENU • ITEMS AND PRICES ARE FOR DEMONSTRATION ONLY</span>
      </div>

      {/* 2. Discreet Category Index Strip */}
      <div className="w-full max-w-4xl mb-6 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1 px-2 border-b border-[#1C1C1C]">
        <div className="flex items-center space-x-1.5 shrink-0">
          <Bookmark className="w-3.5 h-3.5 text-[#B59D77]" />
          <span className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-sans">
            INDEX:
          </span>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
          {categoryShortcuts.map((cat) => {
            const isActive =
              isMobile
                ? currentPage === cat.page
                : (currentPage === cat.page || currentPage + 1 === cat.page) &&
                  !(cat.page === 1 && currentPage !== 1);

            return (
              <button
                key={cat.page}
                type="button"
                onClick={() => jumpToPage(cat.page)}
                className={`text-[10px] sm:text-[11px] font-sans px-2.5 py-1 transition-all uppercase tracking-wider cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-[#B59D77] border-b border-[#B59D77] font-semibold bg-[#161616]'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-[#141414]'
                }`}
              >
                {lang === 'am' ? cat.labelAm : cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. The 3D Digital Book Stage */}
      <div
        className="relative perspective-[2200px] flex items-center justify-center my-2 sm:my-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ambient shadow underneath the book for realistic physical grounding */}
        <div className="absolute -bottom-8 w-[92%] h-12 bg-black/90 blur-2xl rounded-full pointer-events-none" />

        {/* ============================================================== */}
        {/* DESKTOP TWO-PAGE SPREAD VIEW (Width >= 820px)                  */}
        {/* ============================================================== */}
        {!isMobile ? (
          <div className="relative">
            {/* If on Cover (Page 1): Centered Closed Hardcover with opening animation */}
            {isCover ? (
              <div className="relative group">
                <div
                  className="w-[440px] sm:w-[480px] h-[640px] sm:h-[680px] rounded-r-md transition-all duration-700 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] cursor-pointer"
                  onClick={goToNext}
                  title="Click to Open Menu Book"
                >
                  {/* Closed Book Edge Spine (Left side thickness) */}
                  <div className="absolute -left-3 top-0 bottom-0 w-3 bg-gradient-to-r from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d] rounded-l-sm border-l border-t border-b border-[#2C2C2C]" />

                  {/* Render Cover Page */}
                  <BookPageContent
                    page={BOOK_PAGES[0]}
                    lang={lang}
                    onSelectDish={onSelectDish}
                    onNavigateSite={onNavigateSite}
                  />

                  {/* Interactive "Open Menu" Prompt Ribbon */}
                  <div className="absolute bottom-6 right-6 flex items-center space-x-2 bg-[#121212]/90 border border-[#B59D77] px-4 py-2 text-[10px] tracking-[0.25em] uppercase text-[#B59D77] group-hover:bg-[#B59D77] group-hover:text-[#121212] transition-colors shadow-xl">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>OPEN MENU BOOK</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ) : (
              /* Two-Page Spread Layout: LEFT PAGE | CENTER SPINE | RIGHT PAGE */
              <div className="flex items-center justify-center">
                {/* Book Spread Outer Container */}
                <div className="relative flex w-[880px] sm:w-[960px] h-[640px] sm:h-[680px] bg-[#121212] shadow-[0_30px_70px_rgba(0,0,0,0.95)] rounded-sm border border-[#252525]">
                  {/* Left Page Outer Thickness (Page stack illusion) */}
                  <div className="absolute -left-2 top-1 bottom-1 w-2 bg-gradient-to-r from-[#111] to-[#1c1c1c] border-l border-t border-b border-[#252525] rounded-l-xs pointer-events-none" />

                  {/* LEFT PAGE */}
                  <div
                    className="relative w-1/2 h-full bg-[#161616] overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      // Click left margin to go prev
                      const rect = e.currentTarget.getBoundingClientRect();
                      if (e.clientX - rect.left < 80) {
                        goToPrev();
                      }
                    }}
                  >
                    {leftPageDef && (
                      <BookPageContent
                        page={leftPageDef}
                        lang={lang}
                        onSelectDish={onSelectDish}
                        onNavigateSite={onNavigateSite}
                        isRightPage={false}
                      />
                    )}
                    {/* Left Page Corner Crease shadow */}
                    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />
                  </div>

                  {/* CENTER SPINE (Binding shadow & physical crease) */}
                  <div className="relative w-4 h-full bg-gradient-to-r from-black/80 via-[#0a0a0a] to-black/80 z-20 shadow-inner flex items-center justify-center pointer-events-none">
                    <div className="w-[1px] h-[95%] bg-[#B59D77]/20" />
                  </div>

                  {/* RIGHT PAGE */}
                  <div
                    className="relative w-1/2 h-full bg-[#161616] overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      // Click right margin to go next
                      const rect = e.currentTarget.getBoundingClientRect();
                      if (rect.right - e.clientX < 80) {
                        goToNext();
                      }
                    }}
                  >
                    {rightPageDef ? (
                      <BookPageContent
                        page={rightPageDef}
                        lang={lang}
                        onSelectDish={onSelectDish}
                        onNavigateSite={onNavigateSite}
                        isRightPage={true}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center p-8 bg-[#161616] text-stone-600 font-serif-luxury text-sm">
                        TOP TEN HOTEL
                      </div>
                    )}
                    {/* Right Page Center Spine shadow */}
                    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
                  </div>

                  {/* Right Page Outer Thickness */}
                  <div className="absolute -right-2 top-1 bottom-1 w-2 bg-gradient-to-l from-[#111] to-[#1c1c1c] border-r border-t border-b border-[#252525] rounded-r-xs pointer-events-none" />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ============================================================== */
          /* MOBILE SINGLE-PAGE BOOK VIEW (< 820px)                        */
          /* ============================================================== */
          <div className="relative w-full max-w-[390px] sm:max-w-[430px] h-[580px] sm:h-[620px] bg-[#161616] shadow-2xl border border-[#2C2C2C] overflow-hidden rounded-sm">
            {/* Mobile Touch Navigation Tap Hotspots */}
            <div
              className="absolute left-0 top-0 bottom-0 w-12 z-20 cursor-pointer"
              onClick={goToPrev}
              title="Tap for Previous Page"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-12 z-20 cursor-pointer"
              onClick={goToNext}
              title="Tap for Next Page"
            />

            {/* Render single current page */}
            {leftPageDef && (
              <BookPageContent
                page={leftPageDef}
                lang={lang}
                onSelectDish={onSelectDish}
                onNavigateSite={onNavigateSite}
                isRightPage={false}
              />
            )}
          </div>
        )}
      </div>

      {/* 4. Navigation Controls & Page Counter */}
      <div className="w-full max-w-xl mt-6 flex items-center justify-between px-4 py-2 bg-[#121212] border border-[#252525] shadow-lg">
        {/* Previous Button */}
        <button
          type="button"
          onClick={goToPrev}
          disabled={currentPage === 1 || isTurning}
          className={`inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-sans py-2 px-3 transition-colors ${
            currentPage === 1
              ? 'text-stone-600 cursor-not-allowed'
              : 'text-[#B59D77] hover:text-stone-100 cursor-pointer'
          }`}
          id="menu-book-prev-btn"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">PREVIOUS</span>
        </button>

        {/* Central Page Indicator */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-mono tracking-widest text-[#F2EEE7]">
            {isMobile ? (
              <span>PAGE {currentPage} / {totalPages}</span>
            ) : isCover ? (
              <span>COVER</span>
            ) : (
              <span>
                PAGES {currentPage} – {Math.min(totalPages, currentPage + 1)} / {totalPages}
              </span>
            )}
          </div>
          <span className="text-[9px] tracking-[0.2em] uppercase text-stone-500 font-sans -mt-0.5">
            USE ARROWS OR SWIPE
          </span>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={goToNext}
          disabled={currentPage >= (isMobile ? totalPages : totalPages - 1) || isTurning}
          className={`inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-sans py-2 px-3 transition-colors ${
            currentPage >= (isMobile ? totalPages : totalPages - 1)
              ? 'text-stone-600 cursor-not-allowed'
              : 'text-[#B59D77] hover:text-stone-100 cursor-pointer'
          }`}
          id="menu-book-next-btn"
          aria-label="Next Page"
        >
          <span className="hidden sm:inline">NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Return to Cover button if deep in book */}
      {!isCover && (
        <button
          type="button"
          onClick={() => jumpToPage(1)}
          className="mt-4 text-[10px] tracking-[0.2em] uppercase text-stone-400 hover:text-[#B59D77] inline-flex items-center space-x-1.5 transition-colors cursor-pointer py-1"
        >
          <RotateCcw className="w-3 h-3 text-[#B59D77]" />
          <span>RETURN TO COVER</span>
        </button>
      )}
    </div>
  );
};
