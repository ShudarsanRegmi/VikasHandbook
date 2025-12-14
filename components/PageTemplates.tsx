import React from 'react';
import { PageContent } from '../types';
import { Quote, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Cover Page ---
export const CoverTemplate: React.FC<{ content: PageContent }> = ({ content }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full border-4 border-double border-stone-800 p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent pointer-events-none" />
        
        <div className="flex-1 flex flex-col justify-center items-center w-full text-center">
            <div className="mb-6 w-16 h-16 border-b-2 border-stone-800 flex items-center justify-center">
                <span className="font-display text-4xl text-stone-800">V</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl text-stone-900 tracking-tight leading-[1.1] mb-6">
                {content.title}
            </h1>
            
            <div className="h-1 w-24 bg-stone-800 mb-6"></div>
            
            <h2 className="font-heading italic text-xl md:text-2xl text-stone-700 font-light mb-12">
                {content.subtitle}
            </h2>

            <div className="mt-8 font-body text-stone-600">
                {content.body}
            </div>
        </div>

        <div className="mt-auto pb-4">
             <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400">Limited Edition</span>
        </div>
    </div>
  );
};

// --- Table of Contents ---
export const TocTemplate: React.FC<{ content: PageContent }> = ({ content }) => {
    // Page number mapping - accounts for gallery spanning multiple pages
    const getPageNumber = (idx: number): string => {
        // Pages: Acknowledgement(2), Core(3), Social(4), Campus(5), Discipline(6), 
        // Calm(7), Love(8), Humor(9), Aspirations(10), Gallery(11-14), Afterthought(15)
        if (idx < 9) return String(idx + 2); // Pages 2-10
        if (idx === 9) return '11-14'; // Gallery spans 4 pages
        return '15'; // Afterthought
    };
    
    return (
        <div className="h-full flex flex-col px-6 md:px-12 py-8 md:py-12">
            <header className="mb-8 text-center border-b-2 border-stone-900 pb-4">
                <h2 className="font-display text-2xl md:text-3xl text-stone-900 uppercase tracking-widest">{content.title}</h2>
            </header>
            
            <div className="flex-1 overflow-y-auto no-scrollbar pr-2">
                <ul className="space-y-4 font-heading text-base md:text-lg text-stone-800">
                    {content.listItems?.map((item, idx) => (
                        <li key={idx} className="flex items-baseline justify-between group cursor-default">
                            <span className="relative z-10 bg-[#fdfbf7] pr-2 font-bold">{item}</span>
                            <span className="flex-1 border-b border-dotted border-stone-400 mx-2 opacity-50 relative -top-1"></span>
                            <span className="relative z-10 bg-[#fdfbf7] pl-2 font-display text-sm text-stone-500">{getPageNumber(idx)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


// --- Standard Text Page ---
export const TextTemplate: React.FC<{ content: PageContent }> = ({ content }) => {
  return (
    <div className="h-full flex flex-col px-6 md:px-12 py-8 md:py-12">
      <header className="mb-6 border-b border-stone-300 pb-4">
        <h2 className="font-heading text-2xl md:text-3xl text-stone-900 mb-2">{content.title}</h2>
        {content.subtitle && (
            <h3 className="font-body italic text-base md:text-lg text-stone-600">{content.subtitle}</h3>
        )}
      </header>

      <div className="font-body text-base md:text-lg text-stone-800 leading-relaxed flex-1 overflow-y-auto no-scrollbar pr-2">
        {content.body}

        {content.listItems && (
          <ul className="space-y-3 my-4 pl-2">
            {content.listItems.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-3 text-stone-400 text-sm mt-1">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {content.quote && (
          <div className="my-6 relative pl-6 py-2">
            <Quote className="absolute left-0 top-0 text-stone-300 w-5 h-5 rotate-180 transform -translate-y-1/2" />
            <p className="font-heading italic text-lg md:text-xl text-stone-700">
              {content.quote}
            </p>
          </div>
        )}

        {content.warning && (
          <div className="my-8 bg-amber-50 border-l-4 border-amber-400 p-4 flex gap-4 items-start rounded-r">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
            <p className="text-stone-700 italic text-base">
              {content.warning}
            </p>
          </div>
        )}
      </div>

      <div className="mt-auto pt-8 flex justify-center text-stone-300 text-xs">
         ❦
      </div>
    </div>
  );
};

// --- Gallery Page ---
export const GalleryTemplate: React.FC<{ content: PageContent }> = ({ content }) => {
    const imageCount = content.images?.length || 0;
    
    // Determine layout based on number of images
    const getLayoutClass = () => {
        if (imageCount === 1) return 'single';
        if (imageCount === 2) return 'duo';
        if (imageCount === 3) return 'trio';
        return 'grid';
    };
    
    const layout = getLayoutClass();
    
    // Get decoration style based on page id
    const getDecorationStyle = () => {
      switch(content.id) {
        case 'gallery-1': return 'hearts';
        case 'gallery-2': return 'cosmic';
        case 'gallery-3': return 'nature';
        case 'gallery-4': return 'stickers';
        default: return 'hearts';
      }
    };
    
    const decorStyle = getDecorationStyle();
    
    return (
      <div className="h-full flex flex-col px-4 md:px-8 py-4 md:py-8 relative overflow-hidden">
        
        {/* Style 1: Hearts & Flowers - Romantic/Sweet */}
        {decorStyle === 'hearts' && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Hearts */}
            <div className="absolute top-16 right-16 text-2xl text-pink-300 opacity-60 rotate-12">♥</div>
            <div className="absolute bottom-20 left-12 text-xl text-rose-300 opacity-50 -rotate-6">♥</div>
            <div className="absolute top-1/3 right-8 text-lg text-pink-200 opacity-40 rotate-[-20deg]">♥</div>
            <div className="absolute top-44 right-20 text-rose-300 opacity-40 text-xs">♡</div>
            <div className="absolute bottom-32 left-28 text-pink-300 opacity-35 text-sm">♡</div>
            
            {/* Flowers */}
            <div className="absolute top-20 right-24 text-2xl opacity-50 rotate-12">🌸</div>
            <div className="absolute bottom-16 left-20 text-xl opacity-45 -rotate-12">🌼</div>
            <div className="absolute top-2/3 right-12 text-lg opacity-40">�</div>
            <div className="absolute top-12 left-16 text-xl opacity-45">�</div>
            <div className="absolute bottom-1/3 left-8 text-lg opacity-40 rotate-12">💐</div>
            
            {/* Butterflies */}
            <div className="absolute top-28 left-24 text-xl opacity-50 rotate-[-15deg]">🦋</div>
            <div className="absolute bottom-24 right-28 text-lg opacity-45 rotate-12">🦋</div>
            
            {/* Ribbons */}
            <div className="absolute top-12 left-1/3 text-lg opacity-40">🎀</div>
            <div className="absolute bottom-12 right-1/3 text-lg opacity-45 rotate-6">🎀</div>
            
            {/* Pink confetti */}
            <div className="absolute top-32 right-1/4 w-3 h-3 bg-pink-300 rounded-full opacity-50" />
            <div className="absolute top-40 left-1/4 w-2.5 h-2.5 bg-rose-300 rounded-full opacity-45" />
            <div className="absolute bottom-36 right-1/3 w-3 h-3 bg-pink-200 rounded-full opacity-40" />
            
            {/* Washi tape */}
            <div className="absolute top-8 left-1/4 w-16 h-4 bg-pink-200/60 rotate-[-5deg] rounded-sm" />
            <div className="absolute bottom-10 right-1/4 w-14 h-3.5 bg-rose-200/50 rotate-[8deg] rounded-sm" />
            
            {/* Corner flourishes */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-pink-200 opacity-50" />
            <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-pink-200 opacity-50" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-pink-200 opacity-50" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-pink-200 opacity-50" />
          </div>
        )}
        
        {/* Style 2: Cosmic - Stars & Sparkles */}
        {decorStyle === 'cosmic' && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Big sparkles */}
            <div className="absolute top-16 right-12 text-3xl text-amber-400 opacity-70">✨</div>
            <div className="absolute bottom-20 left-16 text-2xl text-yellow-400 opacity-60">✨</div>
            <div className="absolute top-1/2 right-20 text-xl text-amber-300 opacity-50">✨</div>
            
            {/* Stars */}
            <div className="absolute top-24 left-20 text-2xl text-yellow-400 opacity-65">⭐</div>
            <div className="absolute bottom-28 right-24 text-xl text-amber-400 opacity-55">⭐</div>
            <div className="absolute top-1/3 left-12 text-lg text-yellow-300 opacity-45">⭐</div>
            
            {/* Small stars */}
            <div className="absolute top-36 right-16 text-amber-400 opacity-60 text-lg">★</div>
            <div className="absolute bottom-40 left-24 text-yellow-400 opacity-55 text-base">★</div>
            <div className="absolute top-1/4 left-1/3 text-amber-300 opacity-45 text-sm">★</div>
            <div className="absolute bottom-1/4 right-1/3 text-yellow-300 opacity-50 text-lg">★</div>
            <div className="absolute top-2/3 right-8 text-amber-300 opacity-40 text-sm">★</div>
            
            {/* Moons */}
            <div className="absolute top-12 right-1/4 text-2xl text-amber-200 opacity-50">🌙</div>
            <div className="absolute bottom-16 left-1/4 text-xl text-yellow-200 opacity-45 -rotate-12">🌙</div>
            
            {/* Shooting stars */}
            <div className="absolute top-28 left-8 text-lg opacity-45">💫</div>
            <div className="absolute bottom-1/3 right-12 text-xl opacity-50">💫</div>
            
            {/* Glitter dots */}
            <div className="absolute top-32 right-1/4 w-2 h-2 bg-amber-300 rounded-full opacity-60" />
            <div className="absolute top-44 left-1/4 w-3 h-3 bg-yellow-300 rounded-full opacity-50" />
            <div className="absolute bottom-36 right-20 w-2.5 h-2.5 bg-amber-200 rounded-full opacity-45" />
            <div className="absolute bottom-48 left-16 w-2 h-2 bg-yellow-200 rounded-full opacity-55" />
            <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-amber-400 rounded-full opacity-50" />
            
            {/* Sparkle bursts */}
            <div className="absolute top-20 left-1/3 text-amber-300 opacity-40">✦</div>
            <div className="absolute bottom-24 right-1/4 text-yellow-300 opacity-45">✦</div>
            <div className="absolute top-3/4 left-20 text-amber-200 opacity-35">✧</div>
            
            {/* Golden corners */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-amber-200 opacity-50" />
            <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-amber-200 opacity-50" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-amber-200 opacity-50" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-amber-200 opacity-50" />
          </div>
        )}
        
        {/* Style 3: Geometric Doodles & Hand-drawn Lines */}
        {decorStyle === 'nature' && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Hand-drawn circles */}
            <svg className="absolute top-16 right-16 w-16 h-16 opacity-40" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="25" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,3"/>
            </svg>
            <svg className="absolute bottom-24 left-12 w-12 h-12 opacity-35" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="20" fill="none" stroke="#a78bfa" strokeWidth="1.5"/>
            </svg>
            <svg className="absolute top-1/2 right-8 w-10 h-10 opacity-30" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="22" fill="none" stroke="#67e8f9" strokeWidth="2" strokeDasharray="8,4"/>
            </svg>
            
            {/* Triangles */}
            <svg className="absolute top-24 left-20 w-14 h-14 opacity-40" viewBox="0 0 60 60">
              <polygon points="30,5 55,50 5,50" fill="none" stroke="#fb923c" strokeWidth="1.5"/>
            </svg>
            <svg className="absolute bottom-20 right-24 w-10 h-10 opacity-35 rotate-45" viewBox="0 0 60 60">
              <polygon points="30,5 55,50 5,50" fill="none" stroke="#a78bfa" strokeWidth="1.5"/>
            </svg>
            
            {/* Zigzag lines */}
            <svg className="absolute top-12 left-1/3 w-24 h-6 opacity-35" viewBox="0 0 100 20">
              <polyline points="0,10 15,2 30,18 45,2 60,18 75,2 90,18 100,10" fill="none" stroke="#94a3b8" strokeWidth="1.5"/>
            </svg>
            <svg className="absolute bottom-16 right-1/4 w-20 h-5 opacity-30" viewBox="0 0 100 20">
              <polyline points="0,10 15,2 30,18 45,2 60,18 75,2 90,18 100,10" fill="none" stroke="#67e8f9" strokeWidth="1.5"/>
            </svg>
            
            {/* Squiggly lines */}
            <svg className="absolute top-1/3 right-12 w-16 h-20 opacity-35" viewBox="0 0 40 60">
              <path d="M20 0 Q35 15 20 30 Q5 45 20 60" fill="none" stroke="#fb923c" strokeWidth="1.5"/>
            </svg>
            <svg className="absolute bottom-1/3 left-8 w-12 h-16 opacity-30" viewBox="0 0 40 60">
              <path d="M20 0 Q35 15 20 30 Q5 45 20 60" fill="none" stroke="#a78bfa" strokeWidth="1.5"/>
            </svg>
            
            {/* Dotted squares */}
            <svg className="absolute top-32 left-1/4 w-12 h-12 opacity-35 rotate-12" viewBox="0 0 50 50">
              <rect x="5" y="5" width="40" height="40" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4"/>
            </svg>
            <svg className="absolute bottom-36 right-1/3 w-10 h-10 opacity-30 -rotate-6" viewBox="0 0 50 50">
              <rect x="5" y="5" width="40" height="40" fill="none" stroke="#67e8f9" strokeWidth="1.5" strokeDasharray="3,3"/>
            </svg>
            
            {/* X marks */}
            <div className="absolute top-20 right-1/3 text-2xl text-slate-400 opacity-40 font-light">×</div>
            <div className="absolute bottom-28 left-1/4 text-xl text-violet-300 opacity-35 font-light">×</div>
            <div className="absolute top-2/3 right-20 text-lg text-cyan-300 opacity-30 font-light">×</div>
            
            {/* Plus signs */}
            <div className="absolute top-40 left-16 text-2xl text-orange-300 opacity-40 font-light">+</div>
            <div className="absolute bottom-1/4 right-12 text-xl text-slate-400 opacity-35 font-light">+</div>
            <div className="absolute top-1/4 left-1/3 text-lg text-violet-300 opacity-30 font-light">+</div>
            
            {/* Small dots pattern */}
            <div className="absolute top-44 right-1/4 w-2 h-2 bg-slate-300 rounded-full opacity-50" />
            <div className="absolute top-48 right-28 w-1.5 h-1.5 bg-violet-300 rounded-full opacity-45" />
            <div className="absolute bottom-40 left-20 w-2 h-2 bg-cyan-300 rounded-full opacity-40" />
            <div className="absolute bottom-44 left-28 w-1.5 h-1.5 bg-orange-300 rounded-full opacity-45" />
            
            {/* Colorful corners */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-slate-300 opacity-50" />
            <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-violet-200 opacity-50" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-cyan-200 opacity-50" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-orange-200 opacity-50" />
          </div>
        )}
        
        {/* Style 4: Vintage Scrapbook - Paper clips, stamps, postmarks */}
        {decorStyle === 'stickers' && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Paper clips */}
            <svg className="absolute top-12 right-16 w-8 h-16 opacity-50" viewBox="0 0 30 60">
              <path d="M15 5 L15 45 Q15 55 5 55 Q-5 55 5 45 L5 20 Q5 10 15 10" fill="none" stroke="#78716c" strokeWidth="2"/>
            </svg>
            <svg className="absolute bottom-16 left-12 w-6 h-12 opacity-45 rotate-[-20deg]" viewBox="0 0 30 60">
              <path d="M15 5 L15 45 Q15 55 5 55 Q-5 55 5 45 L5 20 Q5 10 15 10" fill="none" stroke="#a8a29e" strokeWidth="2"/>
            </svg>
            <svg className="absolute top-1/2 right-6 w-5 h-10 opacity-40 rotate-12" viewBox="0 0 30 60">
              <path d="M15 5 L15 45 Q15 55 5 55 Q-5 55 5 45 L5 20 Q5 10 15 10" fill="none" stroke="#78716c" strokeWidth="2"/>
            </svg>
            
            {/* Postage stamps */}
            <div className="absolute top-20 left-20 w-14 h-16 border-2 border-dashed border-stone-300 bg-amber-50/60 flex items-center justify-center opacity-50">
              <div className="text-xs text-stone-400 font-mono">2024</div>
            </div>
            <div className="absolute bottom-24 right-20 w-12 h-14 border-2 border-dashed border-stone-300 bg-rose-50/50 flex items-center justify-center opacity-45 rotate-6">
              <div className="text-xs text-stone-400">❦</div>
            </div>
            
            {/* Postmark circles */}
            <svg className="absolute top-28 right-1/4 w-16 h-16 opacity-30" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="25" fill="none" stroke="#78716c" strokeWidth="1"/>
              <circle cx="30" cy="30" r="20" fill="none" stroke="#78716c" strokeWidth="0.5"/>
              <line x1="5" y1="30" x2="55" y2="30" stroke="#78716c" strokeWidth="0.5"/>
            </svg>
            <svg className="absolute bottom-1/3 left-16 w-12 h-12 opacity-25 rotate-[-15deg]" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="25" fill="none" stroke="#a8a29e" strokeWidth="1"/>
              <circle cx="30" cy="30" r="20" fill="none" stroke="#a8a29e" strokeWidth="0.5"/>
            </svg>
            
            {/* Washi tape strips - varied */}
            <div className="absolute top-8 left-1/4 w-20 h-5 bg-gradient-to-r from-amber-100 to-amber-200 opacity-50 rotate-[-3deg] rounded-sm shadow-sm" />
            <div className="absolute bottom-12 right-1/4 w-16 h-4 bg-gradient-to-r from-stone-100 to-stone-200 opacity-45 rotate-[5deg] rounded-sm shadow-sm" />
            <div className="absolute top-1/3 left-6 w-14 h-4 bg-gradient-to-r from-rose-100 to-rose-200 opacity-40 rotate-[-8deg] rounded-sm shadow-sm" />
            
            {/* Torn paper edges */}
            <div className="absolute top-16 left-1/3 w-16 h-8 bg-stone-100 opacity-40 rotate-3" style={{clipPath: 'polygon(0 0, 100% 10%, 95% 100%, 5% 90%)'}} />
            <div className="absolute bottom-20 right-1/3 w-12 h-6 bg-amber-50 opacity-35 -rotate-2" style={{clipPath: 'polygon(5% 0, 95% 5%, 100% 100%, 0 95%)'}} />
            
            {/* String/twine decoration */}
            <svg className="absolute top-1/4 right-8 w-20 h-32 opacity-25" viewBox="0 0 40 80">
              <path d="M20 0 Q30 20 20 40 Q10 60 20 80" fill="none" stroke="#a8a29e" strokeWidth="1" strokeDasharray="4,2"/>
            </svg>
            
            {/* Decorative pins */}
            <div className="absolute top-36 right-16 w-3 h-3 bg-red-400 rounded-full opacity-50 shadow-sm" />
            <div className="absolute top-37 right-16.5 w-1 h-4 bg-stone-400 opacity-40" style={{marginTop: '10px', marginRight: '2px'}} />
            
            <div className="absolute bottom-32 left-24 w-2.5 h-2.5 bg-blue-400 rounded-full opacity-45 shadow-sm" />
            
            {/* Old photo corners */}
            <div className="absolute top-40 left-1/4 w-4 h-4 border-l-2 border-t-2 border-stone-400 opacity-40" />
            <div className="absolute top-40 left-32 w-4 h-4 border-r-2 border-t-2 border-stone-400 opacity-40" />
            <div className="absolute bottom-40 right-1/4 w-4 h-4 border-l-2 border-b-2 border-stone-400 opacity-35" />
            <div className="absolute bottom-40 right-32 w-4 h-4 border-r-2 border-b-2 border-stone-400 opacity-35" />
            
            {/* Vintage corners */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-stone-300 opacity-50" />
            <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-stone-300 opacity-50" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-stone-300 opacity-50" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-stone-300 opacity-50" />
          </div>
        )}

        {content.title && (
          <header className="mb-3 text-center relative z-10">
              <h2 className="font-heading text-xl md:text-2xl text-stone-900">{content.title}</h2>
              {content.subtitle && <p className="font-body italic text-stone-500 mt-1 text-xs md:text-sm">{content.subtitle}</p>}
          </header>
        )}

        {/* Single large image layout */}
        {layout === 'single' && content.images && (
          <div className="flex-1 flex items-center justify-center p-2 relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative p-3 bg-white shadow-lg border border-stone-100 rotate-1 max-w-full max-h-full"
            >
              {/* Tape effect on corners */}
              <div className="absolute -top-2 left-1/4 w-12 h-4 bg-amber-100/60 rotate-[-8deg] shadow-sm" />
              <div className="absolute -top-2 right-1/4 w-10 h-4 bg-amber-100/60 rotate-[5deg] shadow-sm" />
              <img 
                src={content.images[0]} 
                alt="Memory" 
                className="max-h-[420px] w-auto object-contain grayscale-[15%] hover:grayscale-0 transition-all duration-500"
              />
              {/* Photo caption line */}
              <div className="mt-2 text-center">
                <div className="h-px w-16 bg-stone-200 mx-auto" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Two image layout - side by side or stacked */}
        {layout === 'duo' && content.images && (
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 p-2 relative z-10">
            {content.images.map((src, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                className={`relative p-2 bg-white shadow-lg border border-stone-100 ${idx === 0 ? '-rotate-2' : 'rotate-2'}`}
              >
                {/* Tape effect */}
                <div className={`absolute -top-2 ${idx === 0 ? 'left-1/3' : 'right-1/3'} w-10 h-3 bg-amber-100/60 ${idx === 0 ? 'rotate-[-5deg]' : 'rotate-[5deg]'} shadow-sm`} />
                <img 
                  src={src} 
                  alt="Memory" 
                  className="max-h-[260px] md:max-h-[340px] w-auto object-contain grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Three image collage layout */}
        {layout === 'trio' && content.images && (
          <div className="flex-1 flex items-center justify-center p-2 relative z-10">
            <div className="relative w-full max-w-[500px]">
              {/* Large image on left */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white shadow-lg border border-stone-100 -rotate-3 z-10"
              >
                <div className="absolute -top-2 left-1/4 w-10 h-3 bg-amber-100/60 rotate-[-5deg] shadow-sm" />
                <img 
                  src={content.images[0]} 
                  alt="Memory" 
                  className="max-h-[300px] w-auto object-contain grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
              {/* Two smaller images stacked on right */}
              <div className="ml-auto w-1/2 flex flex-col gap-3">
                {content.images.slice(1).map((src, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + 0.1 * idx, duration: 0.5 }}
                    className={`relative p-2 bg-white shadow-lg border border-stone-100 ${idx === 0 ? 'rotate-2' : '-rotate-1'}`}
                  >
                    <img 
                      src={src} 
                      alt="Memory" 
                      className="max-h-[140px] w-auto object-contain grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grid layout for 4+ images */}
        {layout === 'grid' && content.images && (
          <div className="flex-1 grid grid-cols-2 gap-3 auto-rows-min content-start p-2 overflow-y-auto no-scrollbar relative z-10">
            {content.images.map((src, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className={`relative p-2 bg-white shadow-md border border-stone-100 ${idx % 2 !== 0 ? 'rotate-1 mt-2' : '-rotate-1'}`}
                >
                    <div className={`absolute -top-1.5 ${idx % 2 === 0 ? 'left-1/4' : 'right-1/4'} w-8 h-2.5 bg-amber-100/60 ${idx % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[3deg]'} shadow-sm`} />
                    <img 
                      src={src} 
                      alt="Memory" 
                      className="max-h-[180px] w-full object-contain grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                    />
                </motion.div>
            ))}
          </div>
        )}

        {content.listItems && content.listItems.length > 0 && (
          <div className="mt-3 text-center relative z-10">
              <ul className="inline-flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-body text-stone-600 italic">
                  {content.listItems.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                  ))}
              </ul>
          </div>
        )}
      </div>
    );
};

// --- Back Cover ---
export const BackCoverTemplate: React.FC<{ content: PageContent }> = ({ content }) => {
    return (
        <div className="h-full flex flex-col justify-center px-6 md:px-12 py-8 relative overflow-y-auto no-scrollbar">
            <div className="absolute top-0 right-0 p-6 opacity-20">
                <Quote className="w-16 h-16 text-stone-900" />
            </div>

            <h2 className="font-heading text-2xl md:text-3xl mb-6 text-stone-800">{content.title}</h2>
            
            <div className="font-body text-base md:text-lg leading-loose text-stone-700 text-justify">
                {content.body}
            </div>

            <div className="mt-16 flex justify-center">
                <div className="w-12 h-12 rounded-full border border-stone-400 flex items-center justify-center text-stone-400 text-xs">
                    ...
                </div>
            </div>
        </div>
    );
};

// --- Closing Page (Back Cover - matches front cover design) ---
export const ClosingTemplate: React.FC<{ content: PageContent }> = ({ content }) => {
  return (
    <div className="h-full w-full bg-[#3e2b2b] relative overflow-hidden rounded-md">
        {/* Leather Texture */}
        <div className="absolute inset-0 leather-texture opacity-80 rounded-md" />
        
        {/* 3D Page Thickness Effect - Left side */}
        <div className="absolute left-0 top-0 bottom-0 w-3 md:w-4 bg-gradient-to-r from-[#2a1d1d] via-[#3a2828] to-[#3e2b2b] rounded-l-md" />
        <div className="absolute left-1 top-1 bottom-1 w-[2px] bg-[#1a1212] opacity-40" />
        <div className="absolute left-2 top-2 bottom-2 w-[1px] bg-[#4a3535] opacity-30" />
        
        {/* Decorative Gold Border */}
        <div className="absolute top-6 right-6 bottom-6 left-8 border-2 border-[#cfc09f] opacity-30 rounded-sm" />
        <div className="absolute top-8 right-8 bottom-8 left-10 border border-[#cfc09f] opacity-20 rounded-sm" />
        
        {/* Main Content */}
        <div className="absolute top-0 right-0 bottom-0 left-6 flex flex-col p-6 md:p-8">
            
            {/* Top Section - Blurb */}
            <div className="flex-1 flex flex-col justify-start pt-4">
                <p className="font-heading text-[#d4c4a8] text-sm md:text-base leading-relaxed text-center italic max-w-[95%] mx-auto">
                    "A definitive guide to understanding the enigma that is Vikas — 
                    his quirks, his calm, and his quiet brilliance."
                </p>
                
                <div className="w-16 h-px bg-[#cfc09f] opacity-40 mx-auto my-4" />
                
                <div className="text-[#b8a88a] text-xs md:text-sm font-body text-center space-y-1 mt-2">
                    <p>✦ Comprehensive trait analysis</p>
                    <p>✦ Rare photographic evidence</p>
                    <p>✦ Certified friendship documentation</p>
                    <p>✦ Volume 1 of ∞</p>
                </div>
            </div>
            
            {/* Middle - V Logo */}
            <div className="flex justify-center my-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#cfc09f] flex items-center justify-center opacity-80">
                    <span className="font-display text-3xl md:text-4xl gold-text">V</span>
                </div>
            </div>
            
            {/* Bottom Section - Publisher Info */}
            <div className="mt-auto space-y-3">
                {/* Barcode Area */}
                <div className="flex items-end justify-between">
                    <div className="flex flex-col items-start">
                        {/* SVG Barcode */}
                        <svg className="w-20 h-10 md:w-24 md:h-12" viewBox="0 0 100 40">
                            <rect x="2" y="0" width="1.5" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="5" y="0" width="1" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="8" y="0" width="2" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="12" y="0" width="1" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="15" y="0" width="1.5" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="19" y="0" width="2.5" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="24" y="0" width="1" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="27" y="0" width="1.5" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="31" y="0" width="1" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="34" y="0" width="2" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="38" y="0" width="1.5" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="42" y="0" width="1" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="45" y="0" width="2.5" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="50" y="0" width="1" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="53" y="0" width="1.5" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="57" y="0" width="2" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="61" y="0" width="1" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="64" y="0" width="1.5" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="68" y="0" width="1" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="71" y="0" width="2" height="32" fill="#cfc09f" opacity="0.8"/>
                            <rect x="75" y="0" width="1.5" height="32" fill="#cfc09f" opacity="0.8"/>
                            <text x="40" y="38" textAnchor="middle" className="font-mono" fill="#cfc09f" opacity="0.6" fontSize="4">978-0-VIKAS-2025</text>
                        </svg>
                    </div>
                    
                    <div className="text-right">
                        <p className="font-display text-[#cfc09f] text-base md:text-lg tracking-wider">PRICELESS</p>
                        <p className="font-body text-[#a89878] text-[9px] italic">Value: Unlimited</p>
                    </div>
                </div>
                
                {/* Publisher Line */}
                <div className="border-t border-[#cfc09f] opacity-30 pt-2 flex justify-between items-center">
                    <div>
                        <p className="font-display text-[#cfc09f] text-[9px] md:text-[10px] tracking-[0.15em] uppercase">Published by</p>
                        <p className="font-heading text-[#d4c4a8] text-xs md:text-sm">Shudarsan Regmi</p>
                    </div>
                    <div className="text-right">
                        <p className="font-display text-[#cfc09f] text-[9px] tracking-widest">FIRST EDITION</p>
                        <p className="font-body text-[#a89878] text-[9px]">Published 2025</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};