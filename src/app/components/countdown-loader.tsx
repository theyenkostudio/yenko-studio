"use client"

import { useState, useEffect, ReactNode } from "react";

export default function MainPageWrapper({children}:{children:ReactNode}) {
  const [showLoader, setShowLoader] = useState(true);
  const [phase, setPhase] = useState(0);
  const [words] = useState([
    "ENGINEERING",
    "DESIGNING", 
    "EXCEPTIONAL",
    "SOLUTIONS"
  ]);

  useEffect(() => {
    const intervals = [800, 1200, 1000, 900];
    let currentPhase = 0;

    const advance = () => {
      if (currentPhase < words.length) {
        setTimeout(() => {
          setPhase(prev => prev + 1);
          currentPhase++;
          if (currentPhase < words.length) {
            advance();
          } else {
            setTimeout(() => setShowLoader(false), 600);
          }
        }, intervals[currentPhase]);
      }
    };

    advance();
  }, [words.length]);

  

  if (!showLoader) {
    return (
     <>{children}</>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center overflow-hidden">
      {/* Expanding Squares */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute border-2 border-black transition-all duration-700 ease-out"
            style={{
              width: phase > i ? `${(i + 1) * 20}vh` : '0',
              height: phase > i ? `${(i + 1) * 20}vh` : '0',
              opacity: phase > i ? 0.15 - (i * 0.03) : 0,
            }}
          />
        ))}
      </div>

      {/* Rotating Words */}
      <div className="relative z-10 px-4">
        <div className="relative h-24 md:h-32 flex items-center justify-center">
          {words.map((word, i) => (
            <div
              key={word}
              className="absolute transition-all duration-500"
              style={{
                opacity: phase === i + 1 ? 1 : 0,
                transform: phase === i + 1 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
              }}
            >
              <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black text-center">
                {word}
              </div>
            </div>
          ))}
        </div>
        
        {/* Studio Name - appears on last phase */}
        <div
          className="text-center mt-8 md:mt-12 transition-all duration-700"
          style={{
            opacity: phase === words.length ? 1 : 0,
            transform: phase === words.length ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div className="text-xs md:text-sm tracking-[0.3em] text-gray-400">
            YENKO STUDIO
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
        {words.map((_, i) => (
          <div
            key={i}
            className="transition-all duration-300"
            style={{
              width: phase > i ? '32px' : '8px',
              height: '8px',
              backgroundColor: 'black',
              opacity: phase > i ? 1 : 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
