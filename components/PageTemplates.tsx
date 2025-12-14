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
        <div className="h-full flex flex-col px-8 md:px-16 py-12 md:py-20">
            <header className="mb-12 text-center border-b-2 border-stone-900 pb-6">
                <h2 className="font-display text-3xl md:text-4xl text-stone-900 uppercase tracking-widest">{content.title}</h2>
            </header>
            
            <div className="flex-1 overflow-y-auto no-scrollbar">
                <ul className="space-y-6 font-heading text-lg md:text-xl text-stone-800">
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
    <div className="h-full flex flex-col px-6 md:px-16 py-10 md:py-20">
      <header className="mb-8 border-b border-stone-300 pb-4">
        <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-2">{content.title}</h2>
        {content.subtitle && (
            <h3 className="font-body italic text-lg text-stone-600">{content.subtitle}</h3>
        )}
      </header>

      <div className="font-body text-lg md:text-xl text-stone-800 leading-relaxed flex-1 overflow-y-auto no-scrollbar pr-2">
        {content.body}

        {content.listItems && (
          <ul className="space-y-4 my-6 pl-2">
            {content.listItems.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-3 text-stone-400 text-sm mt-1.5">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {content.quote && (
          <div className="my-8 relative pl-8 py-2">
            <Quote className="absolute left-0 top-0 text-stone-300 w-6 h-6 rotate-180 transform -translate-y-1/2" />
            <p className="font-heading italic text-xl md:text-2xl text-stone-700">
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
      <div className="h-full flex flex-col px-4 md:px-12 py-8 md:py-16">
        <header className="mb-6 text-center">
            <h2 className="font-heading text-3xl text-stone-900">{content.title}</h2>
            <p className="font-body italic text-stone-500 mt-2 text-sm">{content.subtitle}</p>
        </header>

        <div className="flex-1 grid grid-cols-2 gap-6 auto-rows-min content-start p-4 overflow-y-auto no-scrollbar">
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
        <div className="h-full flex flex-col justify-center px-6 md:px-16 py-12 relative overflow-y-auto no-scrollbar">
            <div className="absolute top-0 right-0 p-8 opacity-20">
                <Quote className="w-24 h-24 text-stone-900" />
            </div>

            <h2 className="font-heading text-3xl mb-8 text-stone-800">{content.title}</h2>
            
            <div className="font-body text-lg md:text-xl leading-loose text-stone-700 text-justify">
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

// --- Closing Page (Final End Paper) ---
export const ClosingTemplate: React.FC<{ content: PageContent }> = ({ content }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full border-4 border-double border-stone-800 p-8 relative overflow-hidden bg-stone-100">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900 to-transparent pointer-events-none" />
        
        <div className="flex-1 flex flex-col justify-center items-center text-stone-800">
            <div className="w-24 h-24 border-4 border-stone-800 rounded-full flex items-center justify-center mb-10">
                <span className="font-display text-5xl">V</span>
            </div>
            <h1 className="font-display text-2xl tracking-[0.3em] uppercase mb-2">{content.title}</h1>
            <p className="font-heading italic text-stone-500">{content.subtitle}</p>
        </div>
        
        <div className="flex flex-col items-center gap-2 mb-8">
            <div className="w-12 h-0.5 bg-stone-800"></div>
            <div className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">
                End of Volume 1
            </div>
        </div>
    </div>
  );
};