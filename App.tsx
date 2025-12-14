import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Star, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BOOK_PAGES } from './constants';
import { PageType } from './types';
import { BookTexture, BookSpineShadow, LightingOverlay } from './components/BookTexture';
import { CoverTemplate, TextTemplate, GalleryTemplate, BackCoverTemplate, TocTemplate, ClosingTemplate } from './components/PageTemplates';
import { playPageTurnSound } from './utils/audio';

const preloadImages = (images: string[]) => {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const App: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const totalPages = BOOK_PAGES.length;
  const currentPageContent = BOOK_PAGES[pageIndex];

  useEffect(() => {
    const galleryPage = BOOK_PAGES.find(p => p.type === PageType.GALLERY);
    if (galleryPage && galleryPage.images) {
      preloadImages(galleryPage.images);
    }
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard Navigation
  const handleNext = useCallback(() => {
    if (pageIndex < totalPages - 1) {
      playPageTurnSound();
      setDirection(1);
      setPageIndex(prev => prev + 1);
    }
  }, [pageIndex, totalPages]);

  const handlePrev = useCallback(() => {
    if (pageIndex > 0) {
      playPageTurnSound();
      setDirection(-1);
      setPageIndex(prev => prev - 1);
    } else {
      // Close the book if on the first page
      setIsBookOpen(false);
    }
  }, [pageIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isBookOpen) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
             handleOpenBook();
        }
        return;
      }
      
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setIsBookOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBookOpen, handleNext, handlePrev]);

  // Confetti effect wrapper
  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleOpenBook = () => {
    playPageTurnSound();
    setIsBookOpen(true);
    setTimeout(() => triggerConfetti(), 500);
  };

  const renderPageContent = () => {
    switch (currentPageContent.type) {
      case PageType.COVER:
        return <CoverTemplate content={currentPageContent} />;
      case PageType.TOC:
        return <TocTemplate content={currentPageContent} />;
      case PageType.GALLERY:
        return <GalleryTemplate content={currentPageContent} />;
      case PageType.BACK_COVER:
        return <BackCoverTemplate content={currentPageContent} />;
      case PageType.CLOSING:
        return <ClosingTemplate content={currentPageContent} />;
      default:
        return <TextTemplate content={currentPageContent} />;
    }
  };

  // 3D Flip Variants
  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 180 : -180, // Start rotated away
      opacity: 0,
      zIndex: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      zIndex: 1,
      transition: {
        duration: 0.8,
        type: "spring" as const,
        stiffness: 60,
        damping: 15
      }
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 180 : -180, // Rotate away
      opacity: 0,
      zIndex: 0,
      transition: {
        duration: 0.6,
      }
    })
  };

  if (!isBookOpen) {
    return (
      <div className="min-h-screen w-full bg-[#1a1a1a] flex flex-col items-center justify-center p-4">
        {/* Closed Book State */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative group cursor-pointer perspective-[1000px]"
          onClick={handleOpenBook}
        >
          {/* The Book Cover Object - Sized to match a single page width */}
          <div className="relative w-[400px] h-[520px] md:w-[550px] md:h-[700px] bg-[#3e2b2b] rounded-r-lg rounded-l-sm shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-x-2 border-l-4 border-[#2a1d1d]">
            {/* Leather Texture */}
            <div className="absolute inset-0 leather-texture rounded-r-lg opacity-80" />
            
            {/* Decorative Gold Border */}
            <div className="absolute inset-8 border-2 border-[#cfc09f] opacity-30 rounded-r-sm" />
            <div className="absolute inset-10 border border-[#cfc09f] opacity-20 rounded-r-sm" />

            {/* Title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
               <div className="w-20 h-20 mb-8 border-2 border-[#cfc09f] rounded-full flex items-center justify-center opacity-80">
                  <span className="font-display text-4xl gold-text">V</span>
               </div>
               <h1 className="font-display text-4xl md:text-6xl gold-text mb-6 tracking-wider leading-tight">The Vikas<br/>Handbook</h1>
               <div className="w-32 h-0.5 bg-[#cfc09f] opacity-50 mb-6" />
               <p className="font-heading text-[#cfc09f] italic opacity-80 text-xl">Volume 1</p>
            </div>
            
            {/* Spine Highlight */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
          </div>
          
          <div className="mt-12 text-center">
             <motion.p 
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="text-stone-400 font-display tracking-[0.2em] text-sm"
             >
                TAP TO OPEN
             </motion.p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Left column width (Spine side)
  const LEFT_COL_WIDTH = "180px";
  // Right content page width - matches cover page
  const RIGHT_PAGE_WIDTH = "670px";

  return (
    <div className="min-h-screen w-full bg-[#151515] flex items-center justify-center p-2 md:p-4 overflow-hidden relative">
      
      {/* Wooden Desk Texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-stone-900" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")' }}>
      </div>
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-80 pointer-events-none" />

      <div className="relative z-10 w-full flex items-center justify-center h-full">
        
        {/* Left Navigation Button */}
        <button 
          onClick={handlePrev} 
          title={pageIndex === 0 ? "Close Book" : "Previous Page"}
          className="hidden md:flex p-3 rounded-full hover:bg-white/10 hover:text-white transition-all cursor-pointer text-stone-400 mr-6"
        >
          {pageIndex === 0 ? <X size={32} /> : <ChevronLeft size={32} />}
        </button>

        {/* Book Container - Same size as cover: 550px × 700px */}
        <div className="relative w-[400px] h-[520px] md:w-[550px] md:h-[700px]" style={{ perspective: '2500px' }}>
          
          {/* Left Decorative Spine - Positioned outside the main content */}
          <div className="hidden md:block absolute top-0 bottom-0 -left-[120px] w-[120px] bg-[#f8f5f0] rounded-l-md shadow-2xl border-r border-stone-200 overflow-hidden">
            <BookTexture />
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <div className="font-display text-[8rem] text-stone-800 rotate-12">V</div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
          </div>

          {/* Back Cover (Static depth layer) */}
          <div 
             className="absolute top-2 left-2 right-2 bottom-2 md:top-4 md:left-0 md:right-0 md:bottom-0 bg-[#e8e6e1] rounded-r-md -z-10 shadow-xl border-r border-stone-300 transform rotate-y-2 origin-left" 
          />
          
          {/* Main Content Page - Full 550px × 700px */}
          <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
             <AnimatePresence initial={false} custom={direction} mode="popLayout">
                 <motion.div
                 key={pageIndex}
                 custom={direction}
                 variants={variants}
                 initial="enter"
                 animate="center"
                 exit="exit"
                 style={{ transformOrigin: 'left center' }}
                 className="absolute inset-0 w-full h-full bg-[#fdfbf7] rounded-r-md rounded-l-sm shadow-2xl overflow-hidden origin-left backface-hidden"
                 >
                        {/* Lighting Glare */}
                        <LightingOverlay direction={direction} />
                        
                        {/* Spine Shadow */}
                        <BookSpineShadow />
                        
                        {/* Paper Texture */}
                        <BookTexture />

                        {/* Content */}
                        <div className="relative z-10 w-full h-full overflow-hidden">
                            {renderPageContent()}
                        </div>

                        {/* Page Number */}
                        {currentPageContent.type !== PageType.COVER && currentPageContent.type !== PageType.BACK_COVER && currentPageContent.type !== PageType.CLOSING && (
                            <div className="absolute bottom-6 right-8 text-stone-400 font-heading text-xs tracking-widest">
                                {pageIndex}
                            </div>
                        )}
                 </motion.div>
             </AnimatePresence>
          </div>

          {/* Book Thickness / Pages Stack (visual only) */}
          <div className="absolute right-0 top-1 bottom-1 w-2 md:w-5 bg-[#f0eee9] border-l border-stone-200 rounded-r-sm shadow-lg -z-20 translate-x-1 translate-y-1" />

        </div>

        {/* Right Navigation Button */}
        <button 
          onClick={handleNext} 
          disabled={pageIndex === totalPages - 1}
          title="Next Page"
          className="hidden md:flex p-3 rounded-full hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer text-stone-400 ml-6"
        >
          <ChevronRight size={32} />
        </button>

      </div>

      {/* Mobile Controls - Bottom */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 flex items-center justify-center gap-12 text-stone-400 z-50">
         <button 
           onClick={handlePrev} 
           title={pageIndex === 0 ? "Close Book" : "Previous Page"}
           className="p-3 rounded-full hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
           {pageIndex === 0 ? <X size={32} /> : <ChevronLeft size={32} />}
         </button>

         <div className="font-display text-xs tracking-[0.2em] opacity-50 select-none">
            {pageIndex === 0 ? 'COVER' : `${pageIndex} / ${totalPages - 1}`}
         </div>

         <button 
           onClick={handleNext} 
           disabled={pageIndex === totalPages - 1}
           title="Next Page"
           className="p-3 rounded-full hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
          >
           <ChevronRight size={32} />
         </button>
      </div>
    </div>
  );
};

export default App;