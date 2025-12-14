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
                            <span className="relative z-10 bg-[#fdfbf7] pl-2 font-display text-sm text-stone-500">{idx + 2}</span>
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
    return (
      <div className="h-full flex flex-col px-6 md:px-10 py-6 md:py-10">
        <header className="mb-4 text-center">
            <h2 className="font-heading text-2xl md:text-3xl text-stone-900">{content.title}</h2>
            <p className="font-body italic text-stone-500 mt-1 text-sm">{content.subtitle}</p>
        </header>

        <div className="flex-1 grid grid-cols-2 gap-4 auto-rows-min content-start p-2 overflow-y-auto no-scrollbar">
            {content.images?.map((src, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className={`relative p-2 bg-white shadow-md border border-stone-100 ${idx % 2 !== 0 ? 'rotate-2 mt-4' : '-rotate-1'}`}
                >
                    <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative grayscale-[20%] hover:grayscale-0 transition-all duration-500">
                        <img src={src} alt="Memory" className="w-full h-full object-cover" />
                    </div>
                </motion.div>
            ))}
        </div>

        <div className="mt-4 text-center">
            <ul className="inline-flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-body text-stone-600 italic">
                {content.listItems?.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                ))}
            </ul>
        </div>
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