import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { BookPageDefinition, BOOK_PAGES } from '../data/bookSpreads';
import { BookPageContent } from './BookPageContent';
import { Language, MenuItem, PageRoute } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  RotateCcw,
  Sparkles,
  Hand,
} from 'lucide-react';

interface BookFlipProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (newPage: number) => void;
  lang: Language;
  onSelectDish: (item: MenuItem) => void;
  onNavigateSite?: (route: PageRoute) => void;
}

type FlipDirection = 'next' | 'prev';

interface FlipAnimation {
  direction: FlipDirection;
  turningFront: BookPageDefinition;
  turningBack: BookPageDefinition;
  baseLeft?: BookPageDefinition;
  baseRight?: BookPageDefinition;
}

export const BookFlip: React.FC<BookFlipProps> = ({
  currentPage,
  totalPages = BOOK_PAGES.length,
  onPageChange,
  lang,
  onSelectDish,
  onNavigateSite,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFlip, setActiveFlip] = useState<FlipAnimation | null>(null);
  const [cornerHover, setCornerHover] = useState<'right' | 'left' | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 860);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide swipe hint after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isMobile, isAnimating]);

  // Turn to Next Page / Spread
  const handleNext = useCallback(() => {
    if (isAnimating) return;

    if (isMobile) {
      if (currentPage >= totalPages) return;
      const nextPage = currentPage + 1;
      const front = BOOK_PAGES.find((p) => p.pageNumber === currentPage);
      const back = BOOK_PAGES.find((p) => p.pageNumber === nextPage);
      if (!front || !back) return;

      setIsAnimating(true);
      setActiveFlip({
        direction: 'next',
        turningFront: front,
        turningBack: back,
      });

      setTimeout(() => {
        onPageChange(nextPage);
        setActiveFlip(null);
        setIsAnimating(false);
      }, 650);
    } else {
      // Desktop Spread
      if (currentPage === 1) {
        // Open Cover (Page 1 -> Spread 2 & 3)
        const front = BOOK_PAGES[0];
        const back = BOOK_PAGES[1];
        const rightBase = BOOK_PAGES[2];

        setIsAnimating(true);
        setActiveFlip({
          direction: 'next',
          turningFront: front,
          turningBack: back,
          baseRight: rightBase,
        });

        setTimeout(() => {
          onPageChange(2);
          setActiveFlip(null);
          setIsAnimating(false);
        }, 750);
      } else if (currentPage < totalPages) {
        // Spread to Spread
        const currentRight = BOOK_PAGES.find((p) => p.pageNumber === currentPage + 1);
        const newLeft = BOOK_PAGES.find((p) => p.pageNumber === currentPage + 2);
        const currentLeft = BOOK_PAGES.find((p) => p.pageNumber === currentPage);
        const newRight = BOOK_PAGES.find((p) => p.pageNumber === currentPage + 3);

        if (!currentRight || !newLeft) return;

        setIsAnimating(true);
        setActiveFlip({
          direction: 'next',
          turningFront: currentRight,
          turningBack: newLeft,
          baseLeft: currentLeft,
          baseRight: newRight,
        });

        setTimeout(() => {
          onPageChange(Math.min(totalPages, currentPage + 2));
          setActiveFlip(null);
          setIsAnimating(false);
        }, 700);
      }
    }
  }, [currentPage, isMobile, isAnimating, totalPages, onPageChange]);

  // Turn to Previous Page / Spread
  const handlePrev = useCallback(() => {
    if (isAnimating) return;

    if (isMobile) {
      if (currentPage <= 1) return;
      const prevPage = currentPage - 1;
      const front = BOOK_PAGES.find((p) => p.pageNumber === currentPage);
      const back = BOOK_PAGES.find((p) => p.pageNumber === prevPage);
      if (!front || !back) return;

      setIsAnimating(true);
      setActiveFlip({
        direction: 'prev',
        turningFront: front,
        turningBack: back,
      });

      setTimeout(() => {
        onPageChange(prevPage);
        setActiveFlip(null);
        setIsAnimating(false);
      }, 650);
    } else {
      // Desktop Spread
      if (currentPage === 2) {
        // Return to Cover
        const front = BOOK_PAGES[1];
        const back = BOOK_PAGES[0];
        const rightBase = BOOK_PAGES[2];

        setIsAnimating(true);
        setActiveFlip({
          direction: 'prev',
          turningFront: front,
          turningBack: back,
          baseRight: rightBase,
        });

        setTimeout(() => {
          onPageChange(1);
          setActiveFlip(null);
          setIsAnimating(false);
        }, 750);
      } else if (currentPage > 2) {
        const currentLeft = BOOK_PAGES.find((p) => p.pageNumber === currentPage);
        const newRight = BOOK_PAGES.find((p) => p.pageNumber === currentPage - 1);
        const newLeft = BOOK_PAGES.find((p) => p.pageNumber === currentPage - 2);
        const currentRight = BOOK_PAGES.find((p) => p.pageNumber === currentPage + 1);

        if (!currentLeft || !newRight) return;

        setIsAnimating(true);
        setActiveFlip({
          direction: 'prev',
          turningFront: currentLeft,
          turningBack: newRight,
          baseLeft: newLeft,
          baseRight: currentRight,
        });

        setTimeout(() => {
          onPageChange(Math.max(2, currentPage - 2));
          setActiveFlip(null);
          setIsAnimating(false);
        }, 700);
      }
    }
  }, [currentPage, isMobile, isAnimating, onPageChange]);

  // Framer Motion Drag/Swipe handler
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const velocityThreshold = 200;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      // Swiped Left -> Go Next
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      // Swiped Right -> Go Prev
      handlePrev();
    }
  };

  const leftPageDef = BOOK_PAGES.find((p) => p.pageNumber === currentPage);
  const rightPageDef = BOOK_PAGES.find((p) => p.pageNumber === currentPage + 1);
  const isCover = currentPage === 1;

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Mobile Swipe Gesture Hint Banner */}
      {isMobile && showSwipeHint && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-3 flex items-center space-x-2 px-3 py-1 bg-[#181818] border border-[#B59D77]/40 text-[10px] tracking-widest uppercase text-[#B59D77] rounded-full"
        >
          <Hand className="w-3 h-3 text-[#B59D77] animate-pulse" />
          <span>SWIPE OR TAP TO TURN PAGES</span>
        </motion.div>
      )}

      {/* 3D BOOK STAGE WITH PERSPECTIVE */}
      <div className="relative perspective-book flex items-center justify-center my-2 sm:my-4 w-full">
        {/* Ambient Ground Shadow */}
        <div className="absolute -bottom-7 w-[90%] max-w-4xl h-12 bg-black/95 blur-2xl rounded-full pointer-events-none" />

        {/* ============================================================== */}
        {/* DESKTOP TWO-PAGE SPREAD                                        */}
        {/* ============================================================== */}
        {!isMobile ? (
          <div className="relative">
            {/* CLOSED COVER (Page 1) */}
            {isCover && !activeFlip ? (
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="relative w-[450px] sm:w-[480px] h-[650px] sm:h-[690px] leather-binder rounded-r-lg p-3 sm:p-4 cursor-pointer transition-shadow shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
                  onClick={handleNext}
                  title="Click to Open Menu Book"
                >
                  {/* Embossed gold perimeter stitch line */}
                  <div className="absolute inset-2 sm:inset-3 gold-stitch-border rounded-r-md pointer-events-none" />

                  {/* Left Spine Thickness */}
                  <div className="absolute -left-3.5 top-0 bottom-0 w-3.5 bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0d0d0d] rounded-l-md border-l border-t border-b border-[#B59D77]/30 shadow-lg flex flex-col justify-around py-8 items-center pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B59D77]/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B59D77]/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B59D77]/60" />
                  </div>

                  {/* Stacked Paper Edge (Right side) */}
                  <div className="absolute -right-2 top-2 bottom-2 w-2 page-edge-right rounded-r-xs border-r border-t border-b border-[#2C2C2C] shadow-md pointer-events-none" />

                  {/* Antique Brass Corner Brackets */}
                  <div className="absolute top-2 right-2 w-7 h-7 border-t-2 border-r-2 border-[#B59D77] rounded-tr-sm pointer-events-none flex items-start justify-end p-0.5">
                    <div className="w-1 h-1 rounded-full bg-[#B59D77]" />
                  </div>
                  <div className="absolute bottom-2 right-2 w-7 h-7 border-b-2 border-r-2 border-[#B59D77] rounded-br-sm pointer-events-none flex items-end justify-end p-0.5">
                    <div className="w-1 h-1 rounded-full bg-[#B59D77]" />
                  </div>

                  {/* Cover Content */}
                  <div className="w-full h-full rounded-r-sm overflow-hidden bg-[#161616] relative shadow-inner">
                    <BookPageContent
                      page={BOOK_PAGES[0]}
                      lang={lang}
                      onSelectDish={onSelectDish}
                      onNavigateSite={onNavigateSite}
                    />

                    {/* Dog-Ear Curl Hint */}
                    <div className="absolute bottom-0 right-0 w-14 h-14 overflow-hidden pointer-events-none">
                      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#B59D77]/40 via-[#1C1C1C] to-transparent transform rotate-45 translate-x-8 translate-y-8 shadow-md border-t border-l border-[#B59D77]/50 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-300" />
                    </div>

                    {/* Open Menu Book Button */}
                    <div className="absolute bottom-6 right-6 flex items-center space-x-2 bg-[#121212]/95 border border-[#B59D77] px-4 py-2 text-[10px] tracking-[0.25em] uppercase text-[#B59D77] group-hover:bg-[#B59D77] group-hover:text-[#121212] transition-all shadow-2xl">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>OPEN MENU BOOK</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* OPEN TWO-PAGE SPREAD */
              <div className="relative flex items-center justify-center">
                {/* Physical Padded Leather Binder */}
                <div className="relative flex w-[920px] sm:w-[1000px] h-[660px] sm:h-[700px] leather-binder rounded-lg p-3 sm:p-4 shadow-[0_35px_80px_rgba(0,0,0,0.98)] border border-[#2A2A2A]">
                  {/* Embossed gold perimeter stitch line */}
                  <div className="absolute inset-2 sm:inset-3 gold-stitch-border rounded-md pointer-events-none" />

                  {/* Antique Brass Corner Brackets */}
                  <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#B59D77] rounded-tl-sm pointer-events-none flex items-start justify-start p-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B59D77]" />
                  </div>
                  <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#B59D77] rounded-tr-sm pointer-events-none flex items-start justify-end p-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B59D77]" />
                  </div>
                  <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#B59D77] rounded-bl-sm pointer-events-none flex items-end justify-start p-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B59D77]" />
                  </div>
                  <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#B59D77] rounded-br-sm pointer-events-none flex items-end justify-end p-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B59D77]" />
                  </div>

                  {/* Stacked Paper Page Edges */}
                  <div className="absolute -left-2.5 top-4 bottom-4 w-2.5 page-edge-left border-l border-t border-b border-[#2C2C2C] rounded-l-xs shadow-md pointer-events-none" />
                  <div className="absolute -right-2.5 top-4 bottom-4 w-2.5 page-edge-right border-r border-t border-b border-[#2C2C2C] rounded-r-xs shadow-md pointer-events-none" />

                  {/* Inner Spread Pages Container */}
                  <div className="relative w-full h-full flex rounded-sm overflow-hidden preserve-3d">
                    {/* LEFT PAGE (BASE) */}
                    <div
                      className="relative w-1/2 h-full bg-[#161616] overflow-hidden cursor-pointer select-none"
                      onClick={() => {
                        if (!isAnimating && currentPage > 1) {
                          handlePrev();
                        }
                      }}
                    >
                      {activeFlip && activeFlip.direction === 'prev' && activeFlip.baseLeft ? (
                        <BookPageContent
                          page={activeFlip.baseLeft}
                          lang={lang}
                          onSelectDish={onSelectDish}
                          onNavigateSite={onNavigateSite}
                          isRightPage={false}
                        />
                      ) : leftPageDef ? (
                        <BookPageContent
                          page={leftPageDef}
                          lang={lang}
                          onSelectDish={onSelectDish}
                          onNavigateSite={onNavigateSite}
                          isRightPage={false}
                        />
                      ) : null}

                      {/* Spine gutter shadow */}
                      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/60 via-black/25 to-transparent pointer-events-none" />

                      {/* Left Dog-Ear Peel */}
                      {currentPage > 1 && (
                        <div
                          className="absolute bottom-0 left-0 w-12 h-12 overflow-hidden pointer-events-auto cursor-pointer"
                          onMouseEnter={() => setCornerHover('left')}
                          onMouseLeave={() => setCornerHover(null)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                          }}
                          title="Click to turn to previous page"
                        >
                          <div
                            className={`absolute bottom-0 left-0 w-14 h-14 bg-gradient-to-tr from-[#B59D77]/40 via-[#1C1C1C] to-transparent transform -rotate-45 -translate-x-7 translate-y-7 shadow-md border-t border-r border-[#B59D77]/50 transition-transform duration-300 ${
                              cornerHover === 'left' ? '-translate-x-5 translate-y-5' : ''
                            }`}
                          />
                        </div>
                      )}
                    </div>

                    {/* CENTER SPINE */}
                    <div className="relative w-5 h-full bg-gradient-to-r from-black/85 via-[#0d0d0d] to-black/85 z-20 shadow-[0_0_15px_rgba(0,0,0,0.9)] flex items-center justify-center pointer-events-none">
                      <div className="w-[1px] h-[96%] bg-[#B59D77]/25" />
                      <div className="absolute top-10 w-1 h-3 bg-[#B59D77]/40 rounded-full" />
                      <div className="absolute bottom-10 w-1 h-3 bg-[#B59D77]/40 rounded-full" />
                    </div>

                    {/* RIGHT PAGE (BASE) */}
                    <div
                      className="relative w-1/2 h-full bg-[#161616] overflow-hidden cursor-pointer select-none"
                      onClick={() => {
                        if (!isAnimating && currentPage < totalPages) {
                          handleNext();
                        }
                      }}
                    >
                      {activeFlip && activeFlip.direction === 'next' && activeFlip.baseRight ? (
                        <BookPageContent
                          page={activeFlip.baseRight}
                          lang={lang}
                          onSelectDish={onSelectDish}
                          onNavigateSite={onNavigateSite}
                          isRightPage={true}
                        />
                      ) : rightPageDef ? (
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

                      {/* Spine gutter shadow */}
                      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />

                      {/* Right Dog-Ear Peel */}
                      {currentPage < totalPages && (
                        <div
                          className="absolute bottom-0 right-0 w-14 h-14 overflow-hidden pointer-events-auto cursor-pointer"
                          onMouseEnter={() => setCornerHover('right')}
                          onMouseLeave={() => setCornerHover(null)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                          }}
                          title="Click to turn to next page"
                        >
                          <div
                            className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#B59D77]/50 via-[#1C1C1C] to-transparent transform rotate-45 translate-x-8 translate-y-8 shadow-lg border-t border-l border-[#B59D77]/60 transition-transform duration-300 ${
                              cornerHover === 'right' ? 'translate-x-6 translate-y-6' : ''
                            }`}
                          />
                          <span className="absolute bottom-1 right-1 text-[8px] tracking-wider text-[#B59D77] font-sans font-semibold">
                            TURN
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 3D TURNING PAGE LEAF (FRAMER MOTION) */}
                    <AnimatePresence>
                      {activeFlip && (
                        <motion.div
                          key={`desktop-leaf-${activeFlip.direction}-${currentPage}`}
                          className={`absolute top-0 bottom-0 w-1/2 h-full z-30 preserve-3d pointer-events-none ${
                            activeFlip.direction === 'next' ? 'left-1/2' : 'left-0'
                          }`}
                          style={{
                            transformOrigin:
                              activeFlip.direction === 'next'
                                ? 'left center'
                                : 'right center',
                          }}
                          initial={{ rotateY: 0 }}
                          animate={{
                            rotateY: activeFlip.direction === 'next' ? -180 : 180,
                          }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.7,
                            ease: [0.25, 1, 0.5, 1],
                          }}
                        >
                          {/* Front side of leaf */}
                          <div className="absolute inset-0 w-full h-full backface-hidden bg-[#161616] overflow-hidden shadow-2xl border-r border-[#2C2C2C]">
                            <BookPageContent
                              page={activeFlip.turningFront}
                              lang={lang}
                              onSelectDish={onSelectDish}
                              onNavigateSite={onNavigateSite}
                              isRightPage={activeFlip.direction === 'next'}
                            />
                            {/* Moving light/shadow */}
                            <motion.div
                              className="absolute inset-0 pointer-events-none"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 0.5, 0.9, 0] }}
                              transition={{ duration: 0.7 }}
                              style={{
                                background:
                                  activeFlip.direction === 'next'
                                    ? 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(255,255,255,0.05), rgba(0,0,0,0.8))'
                                    : 'linear-gradient(to left, rgba(0,0,0,0.8), rgba(255,255,255,0.05), rgba(0,0,0,0.8))',
                              }}
                            />
                          </div>

                          {/* Back side of leaf */}
                          <div
                            className="absolute inset-0 w-full h-full backface-hidden bg-[#161616] overflow-hidden shadow-2xl border-l border-[#2C2C2C]"
                            style={{
                              transform:
                                activeFlip.direction === 'next'
                                  ? 'rotateY(180deg)'
                                  : 'rotateY(-180deg)',
                            }}
                          >
                            <BookPageContent
                              page={activeFlip.turningBack}
                              lang={lang}
                              onSelectDish={onSelectDish}
                              onNavigateSite={onNavigateSite}
                              isRightPage={activeFlip.direction === 'prev'}
                            />
                            <motion.div
                              className="absolute inset-0 pointer-events-none"
                              initial={{ opacity: 0.9 }}
                              animate={{ opacity: [0.9, 0.3, 0] }}
                              transition={{ duration: 0.7 }}
                              style={{
                                background:
                                  activeFlip.direction === 'next'
                                    ? 'linear-gradient(to left, rgba(0,0,0,0.7), transparent)'
                                    : 'linear-gradient(to right, rgba(0,0,0,0.7), transparent)',
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ============================================================== */
          /* MOBILE SINGLE-PAGE VIEW (RESPONSIVE & TOUCH/SWIPE ENABLED)     */
          /* ============================================================== */
          <motion.div
            className="relative w-full max-w-[420px] mx-auto min-h-[580px] sm:min-h-[640px] leather-binder rounded-md p-2.5 sm:p-3 shadow-2xl border border-[#2A2A2A] touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
          >
            {/* Embossed gold perimeter stitch line */}
            <div className="absolute inset-1.5 sm:inset-2 gold-stitch-border rounded-sm pointer-events-none" />

            {/* Left Binding Spine Edge */}
            <div className="absolute -left-2 top-2 bottom-2 w-2 bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0d0d0d] rounded-l-xs border-l border-t border-b border-[#B59D77]/30 shadow-md pointer-events-none" />

            {/* Right Paper Stack Thickness */}
            <div className="absolute -right-1.5 top-2 bottom-2 w-1.5 page-edge-right border-r border-t border-b border-[#2C2C2C] shadow-md pointer-events-none" />

            {/* Brass Corner Brackets */}
            <div className="absolute top-1 left-1 w-5 h-5 border-t border-l border-[#B59D77] pointer-events-none" />
            <div className="absolute top-1 right-1 w-5 h-5 border-t border-r border-[#B59D77] pointer-events-none" />
            <div className="absolute bottom-1 left-1 w-5 h-5 border-b border-l border-[#B59D77] pointer-events-none" />
            <div className="absolute bottom-1 right-1 w-5 h-5 border-b border-r border-[#B59D77] pointer-events-none" />

            {/* Page Display Area */}
            <div className="relative w-full min-h-[540px] sm:min-h-[600px] h-full bg-[#161616] overflow-hidden rounded-xs preserve-3d flex flex-col justify-between">
              {/* Base Page Content */}
              {activeFlip && activeFlip.turningBack ? (
                <div className="w-full h-full">
                  <BookPageContent
                    page={activeFlip.turningBack}
                    lang={lang}
                    onSelectDish={onSelectDish}
                    onNavigateSite={onNavigateSite}
                    isRightPage={false}
                  />
                </div>
              ) : leftPageDef ? (
                <div className="w-full h-full">
                  <BookPageContent
                    page={leftPageDef}
                    lang={lang}
                    onSelectDish={onSelectDish}
                    onNavigateSite={onNavigateSite}
                    isRightPage={false}
                  />
                </div>
              ) : null}

              {/* Mobile 3D Turning Page Leaf (Framer Motion) */}
              <AnimatePresence>
                {activeFlip && (
                  <motion.div
                    key={`mobile-leaf-${currentPage}-${activeFlip.direction}`}
                    className="absolute inset-0 w-full h-full z-30 preserve-3d pointer-events-none"
                    style={{ transformOrigin: 'left center' }}
                    initial={{
                      rotateY: activeFlip.direction === 'next' ? 0 : -140,
                    }}
                    animate={{
                      rotateY: activeFlip.direction === 'next' ? -140 : 0,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                  >
                    {/* Front side of flipping page */}
                    <div className="absolute inset-0 w-full h-full backface-hidden bg-[#161616] overflow-hidden shadow-2xl">
                      <BookPageContent
                        page={activeFlip.turningFront}
                        lang={lang}
                        onSelectDish={onSelectDish}
                        onNavigateSite={onNavigateSite}
                        isRightPage={false}
                      />
                      <motion.div
                        className="absolute inset-0 bg-black/60 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.7, 0.9] }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>

                    {/* Back side of flipping leaf */}
                    <div
                      className="absolute inset-0 w-full h-full backface-hidden bg-[#131313] overflow-hidden shadow-2xl"
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center border border-[#B59D77]/20 p-8 text-center bg-gradient-to-br from-[#1c1c1c] to-[#0f0f0f]">
                        <div className="w-10 h-10 rounded-full border border-[#B59D77]/40 flex items-center justify-center mb-2">
                          <span className="font-serif-luxury text-sm text-[#B59D77]">10</span>
                        </div>
                        <span className="text-[10px] tracking-[0.3em] uppercase text-[#B59D77] font-sans">
                          TOP TEN HOTEL
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dog-Ear Curl Hint on Mobile Bottom Right */}
              {currentPage < totalPages && (
                <div
                  className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden pointer-events-auto cursor-pointer z-20"
                  onClick={handleNext}
                  title="Turn to next page"
                >
                  <div className="absolute bottom-0 right-0 w-14 h-14 bg-gradient-to-tl from-[#B59D77]/40 via-[#1C1C1C] to-transparent transform rotate-45 translate-x-7 translate-y-7 shadow-md border-t border-l border-[#B59D77]/50" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* NAVIGATION CONTROLS & PAGE INDICATOR */}
      <div className="w-full max-w-xl mt-5 flex items-center justify-between px-4 py-2.5 bg-[#121212] border border-[#252525] shadow-xl rounded-sm">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 1 || isAnimating}
          className={`inline-flex items-center space-x-1.5 text-xs tracking-[0.18em] uppercase font-sans py-2 px-3 transition-colors min-h-[44px] ${
            currentPage === 1
              ? 'text-stone-600 cursor-not-allowed'
              : 'text-[#B59D77] hover:text-stone-100 cursor-pointer active:scale-95'
          }`}
          id="book-flip-prev-btn"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>PREVIOUS</span>
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
            {isMobile ? 'SWIPE • TAP • BUTTONS' : 'CLICK EDGES • ARROWS'}
          </span>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage >= (isMobile ? totalPages : totalPages - 1) || isAnimating}
          className={`inline-flex items-center space-x-1.5 text-xs tracking-[0.18em] uppercase font-sans py-2 px-3 transition-colors min-h-[44px] ${
            currentPage >= (isMobile ? totalPages : totalPages - 1)
              ? 'text-stone-600 cursor-not-allowed'
              : 'text-[#B59D77] hover:text-stone-100 cursor-pointer active:scale-95'
          }`}
          id="book-flip-next-btn"
          aria-label="Next Page"
        >
          <span>NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Return to Cover button if deep in book */}
      {!isCover && (
        <button
          type="button"
          onClick={() => onPageChange(1)}
          className="mt-4 text-[10px] tracking-[0.2em] uppercase text-stone-400 hover:text-[#B59D77] inline-flex items-center space-x-1.5 transition-colors cursor-pointer py-1.5 px-3 border border-transparent hover:border-[#2C2C2C]"
        >
          <RotateCcw className="w-3 h-3 text-[#B59D77]" />
          <span>RETURN TO COVER</span>
        </button>
      )}
    </div>
  );
};
