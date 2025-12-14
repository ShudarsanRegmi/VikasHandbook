import React from 'react';

export const BookTexture: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.5] z-0 paper-texture rounded-r-md" style={{ mixBlendMode: 'multiply' }} />
  );
};

export const BookSpineShadow: React.FC = () => {
  return (
    <>
        {/* Inner spine shadow (depth) */}
        <div 
        className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none opacity-30"
        style={{
            background: 'linear-gradient(to right, rgba(20,10,0,0.3) 0%, rgba(20,10,0,0.1) 40%, rgba(0,0,0,0) 100%)'
        }}
        />
        {/* Page binding crease */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-stone-900 opacity-20 z-20" />
    </>
  );
};

export const LightingOverlay: React.FC<{ direction: number }> = ({ direction }) => {
    return (
        <div 
            className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay transition-opacity duration-500"
            style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 100%)'
            }}
        />
    )
}