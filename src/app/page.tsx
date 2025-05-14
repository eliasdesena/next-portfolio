'use client';

import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Fade out the overlay after mount
    if (overlayRef.current) {
      overlayRef.current.classList.add('fade-out');
    }
  }, []);

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center relative bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Overlay for fade-in effect */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 pointer-events-none bg-white dark:bg-black opacity-100 transition-opacity duration-700"
        style={{ transitionProperty: 'opacity' }}
      />
      <ThemeToggle className="fixed top-8 right-8 z-40" />
      <div className="text-center flex flex-col items-center justify-center relative select-none h-full">
        <AnimatePresence>
          {!exiting && (
            <motion.div
              key="poster"
              initial={{ y: 40, opacity: 0.7 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="relative inline-block flex flex-col items-center justify-center"
            >
              <h1 className="inline-block text-[2.8rem] md:text-8xl lg:text-9xl font-sans font-black uppercase tracking-tighter leading-none z-10 text-black dark:text-white">
                &ldquo;ELIAS DE SENA&ldquo;
              </h1>
              <span className="font-serif italic -mt-4 md:-mt-5 lg:-mt-8 text-3xl md:text-4xl lg:text-6xl text-black dark:text-white mix-blend-difference whitespace-nowrap z-20 pointer-events-none">
                Creating worlds through Branding
              </span>
              <button
                onClick={() => {
                  setExiting(true);
                  setTimeout(() => router.push('/about'), 300);
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="mt-4 md:mt-8 px-6 py-2 relative font-sans font-normal uppercase tracking-wide text-lg overflow-hidden border-none outline-none"
                style={{ border: 'none' }}
                disabled={exiting}
              >
                {/* Gray base */}
                <div className={`absolute inset-0 transition-colors duration-200 ${
                  hovered
                    ? ''
                    : 'bg-[#eaeaea] text-[#232323] dark:bg-[#232323] dark:text-[#eaeaea]'
                }`} />
                {/* Color overlay */}
                <motion.div
                  initial={false}
                  animate={hovered ? { height: '100%' } : { height: '0%' }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className={`absolute left-0 top-0 w-full z-10 bg-black dark:bg-white`}
                  style={{ pointerEvents: 'none' }}
                />
                <span
                  className={`relative z-20 transition-colors duration-200 ${
                    hovered ? 'text-white dark:text-black' : 'text-[#232323] dark:text-[#eaeaea]'
                  }`}
                >
                  ENTER ELIAS
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style jsx global>{`
        .fade-out {
          opacity: 0 !important;
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
      {/* Home-only noise overlay */}
    </main>
  );
} 