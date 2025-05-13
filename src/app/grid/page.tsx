'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useTheme } from '@/app/providers';
import { MDXProvider } from '@mdx-js/react';
import { colorMap, projects, passions, about, contact } from './data';

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
  const [modalColors, setModalColors] = useState<[string, string, string, string] | null>(null);
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
        setModalColors(card && colorMap[card.color] ? colorMap[card.color] : null);
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

  useEffect(() => {
    const onPopState = () => {
      setActiveCard(null);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const getColors = (color: string): [string, string] => {
    const [lightBg, lightText, darkBg, darkText] = colorMap[color] || ['bg-white', 'text-black', 'bg-black', 'text-white'];
    return theme === 'light' ? [lightBg, lightText] : [darkBg, darkText];
  };

  const getCard = (section: string, idx: number) => {
    switch (section) {
      case 'projects': return projects[idx];
      case 'passions': return passions[idx];
      case 'about': return about[idx];
      case 'contact': return contact[idx];
      default: return null;
    }
  };

  const getZIndex = (id: string) => {
    if (activeCard && `${activeCard.section}-${activeCard.idx}` === id) return 50;
    if (hoveredCard === id) return 40;
    return 30;
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white">
      <ThemeToggle className="fixed top-8 right-8 z-50" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full min-h-screen p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {projects.map((card, idx) => (
          <motion.div
            key={`projects-${idx}`}
            variants={cardVariants}
            className={`relative rounded-lg overflow-hidden cursor-pointer ${getColors(card.color)[0]} ${getColors(card.color)[1]}`}
            style={{ zIndex: getZIndex(`projects-${idx}`) }}
            onClick={() => {
              setActiveCard({ section: 'projects', idx });
              router.push(`/grid/projects/${idx}`);
            }}
            onHoverStart={() => setHoveredCard(`projects-${idx}`)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
              <p className="text-lg">{card.tagline}</p>
            </div>
          </motion.div>
        ))}
        {passions.map((card, idx) => (
          <motion.div
            key={`passions-${idx}`}
            variants={cardVariants}
            className={`relative rounded-lg overflow-hidden cursor-pointer ${getColors(card.color)[0]} ${getColors(card.color)[1]}`}
            style={{ zIndex: getZIndex(`passions-${idx}`) }}
            onClick={() => {
              setActiveCard({ section: 'passions', idx });
              router.push(`/grid/passions/${idx}`);
            }}
            onHoverStart={() => setHoveredCard(`passions-${idx}`)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
              <p className="text-lg">{card.subline}</p>
            </div>
          </motion.div>
        ))}
        {about.map((card, idx) => (
          <motion.div
            key={`about-${idx}`}
            variants={cardVariants}
            className={`relative rounded-lg overflow-hidden cursor-pointer ${getColors(card.color)[0]} ${getColors(card.color)[1]} ${card.wide ? 'md:col-span-2' : ''}`}
            style={{ zIndex: getZIndex(`about-${idx}`) }}
            onClick={() => {
              setActiveCard({ section: 'about', idx });
              router.push(`/grid/about/${idx}`);
            }}
            onHoverStart={() => setHoveredCard(`about-${idx}`)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
              {card.points && (
                <ul className="list-none pl-0">
                  {card.points.map((point, i) => (
                    <li key={i} className="mb-1">• {point}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
        {contact.map((card, idx) => (
          <motion.div
            key={`contact-${idx}`}
            variants={cardVariants}
            className={`relative rounded-lg overflow-hidden cursor-pointer ${getColors(card.color)[0]} ${getColors(card.color)[1]} ${card.wide ? 'md:col-span-2' : ''}`}
            style={{ zIndex: getZIndex(`contact-${idx}`) }}
            onClick={() => {
              setActiveCard({ section: 'contact', idx });
              router.push(`/grid/contact/${idx}`);
            }}
            onHoverStart={() => setHoveredCard(`contact-${idx}`)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
              {card.elements && (
                <ul className="list-none pl-0">
                  {card.elements.map((element, i) => (
                    <li key={i} className="mb-1">• {element}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-4xl rounded-lg overflow-hidden ${modalColors ? modalColors[0] : 'bg-white dark:bg-black'} ${modalColors ? modalColors[1] : 'text-black dark:text-white'}`}
            >
              <button
                onClick={() => {
                  setActiveCard(null);
                  router.back();
                }}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
              >
                <span className="sr-only">Close</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-6 md:p-8">
                {MDXContent && meta ? (
                  <MDXProvider components={mdxComponents}>
                    <MDXContent />
                  </MDXProvider>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-lg">Loading content...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 