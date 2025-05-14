'use client';

import { notFound, useRouter } from 'next/navigation';
import data from '../../data.json';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useTheme } from '@/app/providers';
import { useEffect, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { use } from 'react';
import Head from 'next/head';
import { ColorName, getColorArray, getHexColors } from '@/lib/colors';

// Get data directly 
const { projects, passions, about, contact } = data;

// Create a record with the section name as key and the data as value
const sectionMap = {
  projects,
  passions,
  about,
  contact,
};

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

export default function CardDetail({ params }: { params: Promise<{ section: string; slug: string }> }) {
  const { section, slug } = use(params);
  const { theme } = useTheme();
  const router = useRouter();
  
  // Get the section data
  const sectionData = sectionMap[section];
  
  // Find the card data
  const card = sectionData ? sectionData.find((item) => item.slug === slug) : null;
  
  if (!sectionData || !card) return notFound();
  
  // Get the color data using our new system
  const defaultColors = ['bg-white', 'text-black', 'bg-black', 'text-white'];
  const colorName = card.color as ColorName;
  const colors = getColorArray(colorName) || defaultColors;
  const hexColors = getHexColors(colorName);
  
  // Choose light or dark colors based on theme
  const [bg, text] = theme === 'dark' ? [colors[2], colors[3]] : [colors[0], colors[1]];
  const bgHex = theme === 'dark' ? hexColors.darkBg : hexColors.lightBg;
  const textHex = theme === 'dark' ? hexColors.darkText : hexColors.lightText;
  
  // Log for debugging
  console.log("Detail page colors:", colorName, colors, bg, text, bgHex, textHex);
  
  const layoutId = `${section}-${slug}`;

  // Dynamic button colors for contrast
  const buttonText = '!' + text.replace('text-', 'bg-');
  const buttonBg = '!' + bg.replace('bg-', 'text-');

  // Try to dynamically import the MDX file for this card
  const [MDXContent, setMDXContent] = useState<null | React.ComponentType<any>>(null);
  const [meta, setMeta] = useState<any>(null);
  
  useEffect(() => {
    let cancelled = false;
    import(`../../${section}/${slug}.mdx`).then(mod => {
      if (!cancelled) {
        setMDXContent(() => mod.default);
        setMeta(mod.meta || mod.frontmatter || {});
      }
    }).catch(() => {
      setMDXContent(null);
      setMeta(null);
    });
    return () => { cancelled = true; };
  }, [section, slug]);

  // Helper functions to check if card has specific properties
  const hasTagline = (card) => 'tagline' in card;
  const hasSubline = (card) => 'subline' in card;
  const hasPoints = (card) => 'points' in card;
  const hasElements = (card) => 'elements' in card;

  return (
    <>
      {meta && (
        <Head>
          {meta.title && <title>{meta.title} | Portfolio</title>}
          {meta.description && <meta name="description" content={meta.description} />}
        </Head>
      )}
      <div className={`min-h-screen w-full ${bg} ${text}`} style={{ backgroundColor: bgHex, color: textHex }}>
        <div className="fixed top-8 left-8 z-50">
          <button 
            onClick={() => router.push('/about')} 
            className={`w-9 h-9 flex items-center justify-center rounded-full ${buttonBg} ${buttonText} transition-colors duration-200 hover:opacity-80`}
            aria-label="Go back to About"
            style={{ backgroundColor: textHex, color: bgHex }}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
        </div>
        <ThemeToggle className={`fixed top-8 right-8 z-50 ${buttonBg} ${buttonText}`} />
        <motion.div
          layoutId={layoutId}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className={`w-full min-h-screen ${bg} ${text}`}
          style={{ backgroundColor: bgHex, color: textHex }}
        >
          {MDXContent && meta ? (
            <div className="w-full">
              <div className="w-full max-w-3xl md:max-w-4xl mx-auto px-4 md:px-12 py-16 md:py-32 flex flex-col items-start md:items-start">
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
          ) : (
            <div className="w-full">
              <div className="w-full max-w-2xl mx-auto px-4 md:px-12 py-16 md:py-32 flex flex-col items-start md:items-start">
                {card.title && (
                  <h1 className="font-sans font-black uppercase tracking-tight text-4xl md:text-6xl mb-2 mt-0 leading-tight">{card.title}</h1>
                )}
                <hr className="border-t border-white/40 dark:border-black/40 my-4 w-full" />
                {hasTagline(card) && (
                  <span className="font-serif italic text-xl md:text-2xl mb-6 -mt-2 block">{card.tagline}</span>
                )}
                {hasSubline(card) && (
                  <span className="font-serif italic text-xl md:text-2xl mb-6 block">{card.subline}</span>
                )}
                {hasPoints(card) && (
                  <ul className="list-none pl-0 mb-3 flex flex-col gap-1">
                    {card.points.map((pt: string, j: number) => (
                      <li key={j} className="relative pl-5 before:content-['–'] before:absolute before:left-0 before:text-lg before:font-bold before:top-0 before:text-current">{pt}</li>
                    ))}
                  </ul>
                )}
                {hasElements(card) && (
                  <ul className="list-none pl-0 mb-3 flex flex-col gap-1">
                    {card.elements.map((el: string, j: number) => (
                      <li key={j} className="relative pl-5 before:content-['–'] before:absolute before:left-0 before:text-lg before:font-bold before:top-0 before:text-current">{el}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
} 