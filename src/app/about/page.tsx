'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useTheme } from '@/app/providers';
import { MDXProvider } from '@mdx-js/react';

// Import data
import data from './data.json';
// Import the new color system
import { ColorName, getColorClasses, getColorArray, getHexColors } from '@/lib/colors';

const { projects, passions, about, contact } = data;

// Define type for modalColors state
type ColorArray = string[];

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function Grid() {
  const router = useRouter();
  const { theme } = useTheme();
  const [activeCard, setActiveCard] = useState<null | { section: string; idx: number }>(null);
  const [hoveredCard, setHoveredCard] = useState<null | string>(null);
  const [MDXContent, setMDXContent] = useState<null | React.ComponentType<any>>(null);
  const [meta, setMeta] = useState<any>(null);
  const [modalColors, setModalColors] = useState<string[] | null>(null);
  const { section: modalSection, idx: modalIdx } = activeCard || { section: '', idx: -1 };
  const mdxComponents = {
    h1: (props: any) => (
      <h1 className="font-sans font-black uppercase tracking-tight text-4xl md:text-6xl mb-2 mt-0 leading-tight">{props.children}</h1>
    ),
    h2: (props: any) => (
      <h2 className="font-sans font-bold uppercase tracking-tight text-2xl md:text-3xl mb-2 mt-8">{props.children}</h2>
    ),
    h3: (props: any) => (
      <h3 className="font-sans font-bold uppercase tracking-tight text-xl md:text-2xl mb-2 mt-6">{props.children}</h3>
    ),
    h4: (props: any) => (
      <h4 className="font-sans font-bold uppercase tracking-tight text-lg md:text-xl mb-2 mt-4">{props.children}</h4>
    ),
    p: (props: any) => (
      <p className="font-sans text-base md:text-lg mb-3 leading-relaxed">{props.children}</p>
    ),
    ul: (props: any) => (
      <ul className="list-none pl-0 mb-3 flex flex-col gap-1">{props.children}</ul>
    ),
    ol: (props: any) => (
      <ol className="list-decimal pl-6 mb-3 flex flex-col gap-1">{props.children}</ol>
    ),
    li: (props: any) => (
      <li className="pl-0 font-sans text-base md:text-lg mb-1 leading-relaxed">- {props.children}</li>
    ),
    blockquote: (props: any) => (
      <blockquote className="border-l-4 border-current pl-4 italic opacity-80 my-4 font-serif text-lg">{props.children}</blockquote>
    ),
    code: (props: any) => (
      <code className="font-mono bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded text-sm">{props.children}</code>
    ),
    pre: (props: any) => (
      <pre className="font-mono bg-black/10 dark:bg-white/10 p-4 rounded mb-4 overflow-x-auto text-sm">{props.children}</pre>
    ),
    a: (props: any) => (
      <a className="underline underline-offset-2 hover:text-accent-navy transition-colors" {...props} />
    ),
    hr: () => <hr className="border-t border-white/40 dark:border-black/40 my-6" />,
    strong: (props: any) => (
      <strong className="font-bold text-white dark:text-black bg-black/10 dark:bg-white/10 px-1">{props.children}</strong>
    ),
    em: (props: any) => (
      <em className="italic font-serif">{props.children}</em>
    ),
    img: (props: any) => (
      <img className="my-4 rounded shadow max-w-full h-auto" {...props} />
    ),
    table: (props: any) => (
      <table className="w-full border-collapse my-6 text-left text-base">
        {props.children}
      </table>
    ),
    th: (props: any) => (
      <th className="border-b-2 border-current px-3 py-2 font-bold">{props.children}</th>
    ),
    td: (props: any) => (
      <td className="border-b border-current px-3 py-2">{props.children}</td>
    ),
    tbody: (props: any) => <tbody>{props.children}</tbody>,
    thead: (props: any) => <thead>{props.children}</thead>,
    tr: (props: any) => <tr>{props.children}</tr>,
  };
  const modalOpenedRef = useRef(false);

  useEffect(() => {
    if (activeCard) {
      const { section, idx } = activeCard;
      import(`./${section}/${idx}.mdx`).then(mod => {
        setMDXContent(() => mod.default);
        setMeta(mod.meta || mod.frontmatter || {});
        const card = getCard(section, idx);
        if (card && card.color) {
          const colorName = card.color as ColorName;
          const colors = getColorArray(colorName);
          if (colors) {
            setModalColors(colors);
          } else {
            setModalColors(null);
          }
        } else {
          setModalColors(null);
        }
      }).catch(() => {
        setMDXContent(null);
        setMeta(null);
        setModalColors(null);
      });
    } else {
      setMDXContent(null);
      setMeta(null);
      setModalColors(null);
    }
  }, [activeCard]);

  // Listen for browser back (popstate) to close modal
  useEffect(() => {
    const onPopState = () => {
      if (activeCard) {
        setActiveCard(null);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [activeCard]);

  const getColors = (color: string): [string, string, string] => {
    // Cast color to our type system as a safety measure
    const colorName = color as ColorName;
    
    // Use our getColorArray utility - this returns colors in the same format as before
    // to ensure compatibility with existing code
    const colors = getColorArray(colorName);
    
    // Get hex colors for styling
    const hexColors = getHexColors(colorName);
    
    // Debug log the color values
    console.log("getColors for", colorName, "returns", colors, "theme:", theme);
    
    // Use the right colors based on theme
    return theme === 'dark' ? 
      [colors[2], colors[3], hexColors.darkBg] : 
      [colors[0], colors[1], hexColors.lightBg];
  };
  
  const highlight = theme === 'dark' ? 'bg-[#222]' : 'bg-[#f3f3f3]';

  // Helper to get card data by section and index
  const getCard = (section: string, idx: number) => {
    if (section === 'projects' && idx >= 0 && idx < projects.length) 
      return projects[idx];
    if (section === 'passions' && idx >= 0 && idx < passions.length) 
      return passions[idx];
    if (section === 'about' && idx >= 0 && idx < about.length) 
      return about[idx];
    if (section === 'contact' && idx >= 0 && idx < contact.length) 
      return contact[idx];
    return null;
  };

  const getZIndex = (id: string) => {
    if (activeCard && `${activeCard.section}-${activeCard.idx}` === id) return 'z-20';
    if (hoveredCard === id) return 'z-20';
    return 'z-10';
  };

  // Gray base color depending on theme
  const grayBg = theme === 'dark' ? 'bg-[#232323]' : 'bg-[#eaeaea]';
  const grayText = theme === 'dark' ? 'text-[#eaeaea]' : 'text-[#232323]';

  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="min-h-screen w-full px-2 sm:px-6 md:px-12 pb-12 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
    >
      {/* Header */}
      <motion.div
        variants={cardVariants}
        className="flex items-center justify-between w-full max-w-[1800px] mx-auto h-28 mb-4"
      >
        <button onClick={() => router.push('/')} className="w-9 h-9 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black transition-colors duration-200"><ArrowLeftIcon className="w-6 h-6" /></button>
        <h1 className="text-2xl md:text-4xl font-sans font-black tracking-tight text-center flex-1 mx-4 text-text-light dark:text-text-dark">get to know me</h1>
        <ThemeToggle />
      </motion.div>
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Section 00 Hero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div
            className="relative col-span-1 sm:col-span-2 md:col-span-4 aspect-square md:aspect-[4/1] flex items-center justify-center cursor-pointer overflow-hidden group"
            style={{ backgroundImage: "url('/img/elias.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
            onClick={() => router.push('/intro')}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
            <span className="relative z-10 font-sans font-black text-2xl md:text-4xl lg:text-6xl text-white drop-shadow-lg text-center px-4">
              Nice to meet you, I'm Elias!
            </span>
          </div>
        </div>
        {/* Projects */}
        <div className="flex items-end gap-4 mb-4">
          <span className="font-sans text-2xl md:text-3xl font-light text-text-light dark:text-text-dark">01</span>
          <span className="font-sans text-2xl md:text-3xl font-black uppercase text-text-light dark:text-text-dark">Projects</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {projects.map((p, i) => {
            const [bg, text, bgHex] = getColors(p.color);
            const layoutId = `projects-${p.slug}`;
            const isActive = activeCard && `${activeCard.section}-${activeCard.idx}` === layoutId;
            const isHovered = hoveredCard === layoutId;
            return (
              <motion.div
                key={i}
                layoutId={layoutId}
                variants={cardVariants}
                className={`relative flex flex-col items-center justify-center aspect-square text-center p-6 select-none transition-colors duration-200 cursor-pointer overflow-hidden ${getZIndex(layoutId)}`}
                onMouseEnter={() => setHoveredCard(layoutId)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => router.push(`/about/projects/${p.slug}`)}
              >
                <div className={`absolute inset-0 ${grayBg} transition-colors duration-200`} />
                <motion.div
                  initial={false}
                  animate={isActive || isHovered ? { height: '100%' } : { height: '0%' }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className={`${bg} absolute left-0 top-0 w-full z-10`}
                  style={{ 
                    pointerEvents: 'none',
                    backgroundColor: isActive || isHovered ? bgHex : 'transparent' 
                  }}
                />
                <span
                  className={`font-sans font-black text-xl md:text-2xl lg:text-3xl uppercase mb-2 relative z-20 transition-colors duration-200 ${isActive || isHovered ? text : grayText}`}
                >
                  {p.title}
                </span>
                <span
                  className={`font-serif italic text-lg md:text-xl lg:text-2xl relative z-20 transition-colors duration-200 ${isActive || isHovered ? text : grayText}`}
                >
                  &quot;{p.tagline}&quot;
                </span>
              </motion.div>
            );
          })}
        </div>
        {/* Passions */}
        <div className="flex items-end gap-4 mb-4 mt-8">
          <span className="font-sans text-2xl md:text-3xl font-light text-text-light dark:text-text-dark">02</span>
          <span className="font-sans text-2xl md:text-3xl font-black uppercase text-text-light dark:text-text-dark">Passion</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {passions.map((p, i) => {
            const [bg, text, bgHex] = getColors(p.color);
            const layoutId = `passions-${p.slug}`;
            const isActive = activeCard && `${activeCard.section}-${activeCard.idx}` === layoutId;
            const isHovered = hoveredCard === layoutId;
            return (
              <motion.div
                key={i}
                layoutId={layoutId}
                variants={cardVariants}
                className={`relative flex flex-col items-center justify-center aspect-square text-center p-6 select-none transition-colors duration-200 cursor-pointer overflow-hidden ${getZIndex(layoutId)}`}
                onMouseEnter={() => setHoveredCard(layoutId)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => router.push(`/about/passions/${p.slug}`)}
              >
                <div className={`absolute inset-0 ${grayBg} transition-colors duration-200`} />
                <motion.div
                  initial={false}
                  animate={isActive || isHovered ? { height: '100%' } : { height: '0%' }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className={`${bg} absolute left-0 top-0 w-full z-10`}
                  style={{ 
                    pointerEvents: 'none',
                    backgroundColor: isActive || isHovered ? bgHex : 'transparent' 
                  }}
                />
                <span
                  className={`font-sans font-black text-xl md:text-2xl lg:text-3xl uppercase mb-2 relative z-20 transition-colors duration-200 ${isActive || isHovered ? text : grayText}`}
                >
                  {p.title}
                </span>
                <span
                  className={`font-serif italic text-lg md:text-xl lg:text-2xl relative z-20 transition-colors duration-200 ${isActive || isHovered ? text : grayText}`}
                >
                  &quot;{p.subline}&quot;
                </span>
              </motion.div>
            );
          })}
        </div>
        {/* About Me */}
        <div className="flex items-end gap-4 mb-4 mt-8">
          <span className="font-sans text-2xl md:text-3xl font-light text-text-light dark:text-text-dark">03</span>
          <span className="font-sans text-2xl md:text-3xl font-black uppercase text-text-light dark:text-text-dark">About Me</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {about.map((a, i) => {
            const [bg, text, bgHex] = getColors(a.color);
            const layoutId = `about-${a.slug}`;
            const isActive = activeCard && `${activeCard.section}-${activeCard.idx}` === layoutId;
            const isHovered = hoveredCard === layoutId;
            return (
              <motion.div
                key={i}
                layoutId={layoutId}
                variants={cardVariants}
                className={`relative flex flex-col items-center justify-center aspect-square md:aspect-auto text-center p-6 select-none transition-colors duration-200 cursor-pointer overflow-hidden ${a.wide ? 'md:col-span-2' : ''} ${getZIndex(layoutId)}`}
                onMouseEnter={() => setHoveredCard(layoutId)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => router.push(`/about/about/${a.slug}`)}
              >
                <div className={`absolute inset-0 ${grayBg} transition-colors duration-200`} />
                <motion.div
                  initial={false}
                  animate={isActive || isHovered ? { height: '100%' } : { height: '0%' }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className={`${bg} absolute left-0 top-0 w-full z-10`}
                  style={{ 
                    pointerEvents: 'none',
                    backgroundColor: isActive || isHovered ? bgHex : 'transparent' 
                  }}
                />
                <span
                  className={`font-sans font-black text-xl md:text-2xl lg:text-3xl uppercase mb-2 relative z-20 transition-colors duration-200 ${isActive || isHovered ? text : grayText}`}
                >
                  {a.title}
                </span>
                <ul className={`font-serif italic text-lg md:text-xl lg:text-2xl space-y-1 relative z-20 transition-colors duration-200 ${isActive || isHovered ? text : grayText}`}>
                  {a.points.map((pt, j) => <li key={j}>{pt}</li>)}
                </ul>
              </motion.div>
            );
          })}
        </div>
        {/* Contact */}
        <div className="flex items-end gap-4 mb-4 mt-8">
          <span className="font-sans text-2xl md:text-3xl font-light text-text-light dark:text-text-dark">04</span>
          <span className="font-sans text-2xl md:text-3xl font-black uppercase text-text-light dark:text-text-dark">Contact</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {contact.map((c, i) => {
            const [bg, text, bgHex] = getColors(c.color);
            const layoutId = `contact-${c.slug}`;
            const isActive = activeCard && `${activeCard.section}-${activeCard.idx}` === layoutId;
            const isHovered = hoveredCard === layoutId;
            return (
              <motion.div
                key={i}
                layoutId={layoutId}
                variants={cardVariants}
                className={`relative flex flex-col items-center justify-center aspect-square md:aspect-auto text-center p-6 select-none transition-colors duration-200 cursor-pointer overflow-hidden ${c.wide ? 'md:col-span-2' : ''} ${getZIndex(layoutId)}`}
                onMouseEnter={() => setHoveredCard(layoutId)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => router.push(`/about/contact/${c.slug}`)}
              >
                <div className={`absolute inset-0 ${grayBg} transition-colors duration-200`} />
                <motion.div
                  initial={false}
                  animate={isActive || isHovered ? { height: '100%' } : { height: '0%' }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className={`${bg} absolute left-0 top-0 w-full z-10`}
                  style={{ 
                    pointerEvents: 'none',
                    backgroundColor: isActive || isHovered ? bgHex : 'transparent' 
                  }}
                />
                <span
                  className={`font-sans font-black text-xl md:text-2xl lg:text-3xl uppercase mb-2 relative z-20 transition-colors duration-200 ${isActive || isHovered ? text : grayText}`}
                >
                  {c.title}
                </span>
                <ul className={`font-serif italic text-lg md:text-xl lg:text-2xl space-y-1 relative z-20 transition-colors duration-200 ${isActive || isHovered ? text : grayText}`}>
                  {c.elements.map((el, j) => <li key={j}>{el}</li>)}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* Modal overlay for detail view */}
      <AnimatePresence>
        {activeCard && MDXContent && modalColors && (
          <motion.div
            key="modal"
            layoutId={`${activeCard.section}-${activeCard.idx}`}
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed inset-0 flex flex-col items-center justify-center ${modalColors[theme === 'dark' ? 2 : 0]} ${modalColors[theme === 'dark' ? 3 : 1]} z-50`}
            style={{ minHeight: '100vh', minWidth: '100vw' }}
          >
            <div className="fixed top-8 left-8 z-50">
              <button onClick={() => {
                setActiveCard(null);
                if (modalOpenedRef.current) {
                  window.history.back();
                  modalOpenedRef.current = false;
                }
              }} className={`w-9 h-9 flex items-center justify-center ${modalColors[theme === 'dark' ? 3 : 1].replace('text-', 'bg-')} ${modalColors[theme === 'dark' ? 2 : 0].replace('bg-', 'text-')} transition-colors duration-200`}><ArrowLeftIcon className="w-6 h-6" /></button>
            </div>
            <ThemeToggle className={`fixed top-8 right-8 z-50 ${modalColors[theme === 'dark' ? 3 : 1].replace('text-', 'bg-')} ${modalColors[theme === 'dark' ? 2 : 0].replace('bg-', 'text-')}`} />
            <div className="w-full flex justify-center overflow-y-auto max-h-screen">
              <div className="w-full max-w-3xl md:max-w-4xl px-4 md:px-12 py-16 md:py-32 flex flex-col items-start md:items-start bg-transparent">
                {meta.title && (
                  <h1 className="font-sans font-black uppercase tracking-tight text-4xl md:text-6xl mb-2 mt-0 leading-tight">{meta.title}</h1>
                )}
                {meta.tagline && (
                  <span className="font-serif italic text-xl md:text-2xl mb-6 -mt-2 block">{meta.tagline}</span>
                )}
                <MDXProvider components={mdxComponents}>
                  <MDXContent />
                </MDXProvider>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
} 