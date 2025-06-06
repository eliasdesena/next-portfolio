"use client";

import { useState, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

// Define content for vibe-specific slides (Expanded Content)
const vibeContent = {
    'Hustle': [
      { title: 'Why I Hustle', text: 'Ever since I realized that ideas can become real things people love, I\'ve been hooked on the entrepreneurial grind. It\'s not just about making money—it\'s about solving problems, telling stories through branding, and creating experiences that resonate. Watching a concept evolve from a sketch on paper to a living, breathing project fuels my curiosity and keeps me up at night (in a good way).' },
      { title: 'My Stance', text: 'I believe in authenticity over flash. Branding should reflect the soul of a project—its values, its voice, and its vibe. I\'m not about gimmicks or empty hype; I want every logo, color palette, and tagline to feel like a genuine conversation with the audience. Real connection > viral one-offs, always.' },
      { title: 'Where I\'m Involved', text: 'On the branding side, I\'ve collaborated with local startups in Bülach to craft cohesive visual identities—everything from logo design and typography exploration to social media templates and merch mockups. Beyond that, I run my own ventures: releasing music on Spotify through DistroKid, dropping limited-edition merch lines, and even consulting classmates on building their personal brands from scratch.' },
      { title: 'Projects I\'m Proud Of', text: 'One highlight was rebranding a skate-wear startup—redesigned their logo, revamped product packaging, and launched an Instagram campaign that tripled their engagement. I also built a small e-commerce site for my own merch, handled everything end-to-end, and sold out the first drop in under 24 hours. Plus, my micro-consulting service has helped five classmates land internships by sharpening their resumes and online presence.' },
    ],
    'Tech': [
      { title: 'Coding & Web Dev', text: 'I\'m not the most technically advanced developer, but I can get things done. My approach is design-first coding—I start with mockups and prototypes, then teach myself whatever I need to build them. Usually that means React, Next.js, and Tailwind CSS. I focus on clean, responsive interfaces rather than complex backend architecture.' },
      { title: 'Learning Curve', text: 'My learning process is very project-driven. I don\'t study algorithms or data structures in isolation—I learn new technologies when I need them for a specific design I want to implement. Currently teaching myself more about databases and APIs because my projects are getting more interactive and need real data management.' },
      { title: 'DIY Workflow', text: 'I lean heavily on design tools like Figma to plan everything first, then use component libraries and frameworks to speed up development. I\'m not reinventing the wheel—I\'m focused on assembly and customization to match my designs. Tools like Shadcn/ui and Framer Motion are lifesavers for getting professional results without being a CSS wizard.' },
      { title: 'Tech Mindset', text: 'I see code as a tool to bring designs to life, not an end in itself. My goal is always to build interfaces that feel smooth and intuitive. I\'d rather have a simple, well-designed app that works perfectly than a complex system that\'s hard to use. User experience always wins over technical complexity in my book.' },
    ],
    'Creative': [
      { title: 'My Dearest Passion: Music', text: 'Music is where my creative journey started. I spend nights in FL Studio crafting beats and melodies, always thinking about rhythm, flow, and emotional progression. Then I push each track through DistroKid to Spotify, chasing every playlist add like a milestone.' },
      { title: 'Beyond Beats: Design & Video', text: 'Visual design is my other creative outlet. I work in Figma for web designs and the Affinity suite for graphics and photo editing, always thinking about typography, color harmony, and visual hierarchy. I also edit videos in Premiere Pro and After Effects, which taught me about pacing and storytelling—skills that transfer directly to designing user journeys and website narratives.' },
      { title: 'Current Vibes', text: 'Right now I\'m obsessed with granular synthesis and advanced sound design. I\'m also exploring new ways to use AI in consumer apps and websites. Another project I\'m working on is the UI and UX design for a new revolutionary Trading Academy App called luxacademy.io' },
      { title: 'Creative Work', text: 'Everything I create—whether it\'s a song, a website, or a brand identity—should tell a cohesive story and evoke specific emotions. I believe in creating experiences that feel intentional and crafted, where every detail serves the bigger picture. Creativity isn\'t just how it looks or how it sounds, it\'s how the whole thing feels.' },
    ],
    'Personal': [
      { title: 'Role of Faith', text: 'My Christian faith anchors everything I do. Being plugged into ICF Zürich and FEG Wallisellen gives me community, accountability, and the grace to keep asking questions and growing. Faith informs my art, my work ethic, and how I treat the people around me.' },
      { title: 'Mind & Body Rituals', text: 'I start most days at 4 AM with a run through misty Zurich streets—praying, planning, and soaking in the quiet energy before school. On weekends, I hit the trails in the Alps for multi-hour hikes that reset my mind and remind me of the bigger picture.' },
      { title: 'ADHD & Discipline', text: 'Living with ADHD means my focus can sprint in a hundred directions at once. I counter that with strict routines—time-blocked schedules, gratitude journaling, and templated workflows that keep distractions at bay so I can channel my energy into creative output.' },
      { title: 'Constant Growth', text: 'I\'m on a mission to level up in faith, fitness, school, and financial savvy. Every week I set micro-goals—finishing a coding tutorial, hitting a new PR in calisthenics, or reading a chapter of scripture—and celebrate the small wins that add up to big change.' },
    ],
  };

// Helper function to generate all image paths for pre-loading
const getAllImagePaths = () => {
  const vibes = Object.keys(vibeContent) as (keyof typeof vibeContent)[];
  const imagePaths: string[] = [];
  
  vibes.forEach(vibe => {
    vibeContent[vibe].forEach((_, index) => {
      imagePaths.push(`/img/vibe-${vibe.toLowerCase()}-${index + 1}.jpg`);
    });
  });
  
  return imagePaths;
};

// Pre-load images function
const preloadImages = (imagePaths: string[]) => {
  imagePaths.forEach(path => {
    const img = new window.Image();
    img.src = path;
  });
};

// Define the flow of steps
const steps = [
    'welcome',
    'yourName',
    'funFact',
    'yourVibe',
    'vibeSlides', // This step represents the sequence of 4 slides
    'endQuestion',
];

const IntroFlow = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // Start at the welcome slide
  const currentStep = steps[currentStepIndex];

  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [funFact, setFunFact] = useState('');
  const [funFactReaction, setFunFactReaction] = useState('');
  const [selectedVibe, setSelectedVibe] = useState<keyof typeof vibeContent | null>(null);
  const [currentVibeSlideIndex, setCurrentVibeSlideIndex] = useState(0); // To track progress within vibe slides
  const [completedVibes, setCompletedVibes] = useState<Set<keyof typeof vibeContent>>(new Set()); // Track completed vibes
  const [userQuestion, setUserQuestion] = useState('');
  const [eliasReply, setEliasReply] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const router = useRouter();

  // Effect to read initial dark mode state from local storage and pre-load images
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true');
      document.documentElement.classList.toggle('dark', savedMode === 'true');
    } else {
       // Default to light mode or detect system preference if desired
       document.documentElement.classList.remove('dark');
    }

    // Pre-load all vibe slide images for better performance
    const imagePaths = getAllImagePaths();
    preloadImages(imagePaths);
  }, []);

  // Effect to update local storage and HTML class when mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Effect for mouse forward/back button navigation
  useEffect(() => {
    const handleMouseNavigation = (event: MouseEvent) => {
      console.log('Mouse button pressed:', event.button, 'buttons:', event.buttons);
      
      // Try multiple button detection methods for better browser compatibility
      if (event.button === 3 || event.button === 8) { // Back button (different browsers use different values)
        event.preventDefault();
        event.stopPropagation();
        console.log('Back button detected');
        goBack();
      } else if (event.button === 4 || event.button === 16) { // Forward button
        event.preventDefault();
        event.stopPropagation();
        console.log('Forward button detected');
        goForward();
      }
    };

    const handleAuxClick = (event: MouseEvent) => {
      console.log('Auxclick - button:', event.button);
      if (event.button === 3 || event.button === 1) { // Back button
        event.preventDefault();
        event.stopPropagation();
        console.log('Auxclick back button');
        goBack();
      } else if (event.button === 4 || event.button === 2) { // Forward button  
        event.preventDefault();
        event.stopPropagation();
        console.log('Auxclick forward button');
        goForward();
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleMouseNavigation);
    document.addEventListener('auxclick', handleAuxClick);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleMouseNavigation);
      document.removeEventListener('auxclick', handleAuxClick);
    };
  }, [currentStepIndex, currentStep, selectedVibe, currentVibeSlideIndex]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prevIndex) => prevIndex + 1);
      setError(null); // Clear error on step change
    }
  };

  const goForward = () => {
    if (currentStep === 'vibeSlides') {
      nextVibeSlide();
    } else {
      nextStep();
    }
  };

   const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
        setCurrentStepIndex(stepIndex);
        setError(null); // Clear error on step change
         if (steps[stepIndex] === 'vibeSlides' && selectedVibe === null) {
             // If navigating directly to vibe slides, but no vibe selected, go to vibe selection instead
             setCurrentStepIndex(steps.indexOf('yourVibe'));
         }
    }
  };

  const goBack = () => {
       if (currentStep === 'vibeSlides') {
           if (selectedVibe && currentVibeSlideIndex > 0) {
               setCurrentVibeSlideIndex(prevIndex => prevIndex - 1);
           } else {
               // From first vibe slide, go back to vibe selection
               setCurrentStepIndex(steps.indexOf('yourVibe'));
               setCurrentVibeSlideIndex(0); // Reset vibe slide index when leaving
           }
       } else if (currentStepIndex > 0) {
            // Go back to previous main step
           setCurrentStepIndex(prevIndex => prevIndex - 1);
           setCurrentVibeSlideIndex(0); // Reset vibe slide index when going back from a non-vibe slide step
       } else {
           // On the first step, navigate to /about
           router.push('/about');
       }
        setError(null); // Clear error on back navigation
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleFunFactChange = (event: ChangeEvent<HTMLInputElement>) => {
      setFunFact(event.target.value);
  };

  const handleUserQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
      setUserQuestion(event.target.value);
  };

  // API Call Handlers
  const handleNameSubmit = async () => {
      if (!userName) {
          setError('Please enter your name.');
          return;
      }
      setLoading(true);
      setError(null);
      try {
          const response = await fetch('/api/generate-greeting', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: userName }),
          });
          const data = await response.json();
          if (response.ok) {
              setGreeting(data.greeting);
          } else {
              throw new Error(data.error || 'Failed to generate greeting');
          }
      } catch (err: any) {
          console.error('Error fetching greeting:', err);
          setError(`Failed to get greeting: ${err.message}`);
      } finally {
          setLoading(false);
      }
  };

  const handleFunFactSubmit = async () => {
       if (!funFact) {
          setError('Please enter a fun fact.');
          return;
      }
      setLoading(true);
      setError(null);
       try {
          const response = await fetch('/api/generate-fun-fact-reaction', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ funFact: funFact }),
          });
          const data = await response.json();
           if (response.ok) {
              setFunFactReaction(data.reaction);
          } else {
              throw new Error(data.error || 'Failed to generate reaction');
          }
      } catch (err: any) {
          console.error('Error fetching fun fact reaction:', err);
          setError(`Failed to get fun fact reaction: ${err.message}`);
      } finally {
          setLoading(false);
      }
  };

   const handleQuestionSubmit = async () => {
        if (!userQuestion) {
          setError('Please enter a question.');
          return;
      }
      setLoading(true);
      setError(null);
       try {
           const response = await fetch('/api/generate-elias-reply', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userQuestion: userQuestion, userName: userName, selectedVibe: selectedVibe }),
          });
           const data = await response.json();
            if (response.ok) {
               setEliasReply(data.reply);
           } else {
              throw new Error(data.error || 'Failed to get Elias reply');
           }
      } catch (err: any) {
          console.error('Error fetching Elias reply:', err);
          setError(`Failed to get Elias's reply: ${err.message}`);
      } finally {
          setLoading(false);
      }
   };

  const handleVibeSelect = (vibe: keyof typeof vibeContent) => {
    setSelectedVibe(vibe);
    setCurrentVibeSlideIndex(0); // Start at the first vibe slide
    nextStep(); // Move to the vibe slides step
  };

  const nextVibeSlide = () => {
      if (selectedVibe && currentVibeSlideIndex < vibeContent[selectedVibe].length - 1) {
          setCurrentVibeSlideIndex(prevIndex => prevIndex + 1);
      } else {
          // Finished vibe slides, mark this vibe as completed and return to vibe selection
          if (selectedVibe) {
              setCompletedVibes(prev => {
                  const newSet = new Set(prev);
                  newSet.add(selectedVibe);
                  return newSet;
              });
          }
          setCurrentStepIndex(steps.indexOf('yourVibe'));
          setCurrentVibeSlideIndex(0); // Reset vibe slide index after completing
          setSelectedVibe(null); // Clear selected vibe to show vibe selection again
      }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full w-full font-sans text-center p-4 dark:text-white"
          >
            <h2 className="text-5xl font-bold mb-8 font-serif italic tracking-[-0.04em]">Hey there, I'm Elias – let's get to know each other.</h2>
            <button
              onClick={nextStep}
              className="mt-12 px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors tracking-[-0.04em] uppercase dark:bg-white dark:text-black dark:border-white dark:hover:bg-gray-300"
            >
              Start ➔
            </button>
          </motion.div>
        );
      case 'yourName':
        return (
          <motion.div
            key="yourName"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full w-full font-sans text-center p-4 dark:text-white"
          >
            <h2 className="text-5xl font-bold mb-8 font-serif italic tracking-[-0.04em]">Your Name</h2>
            {greeting ? (
              <>
                <div className="text-2xl mb-8 prose dark:prose-invert">
                  <ReactMarkdown>{greeting}</ReactMarkdown>
                </div>
                 <button
                  onClick={nextStep}
                  className="px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors uppercase tracking-[-0.04em] dark:bg-white dark:text-black dark:border-white dark:hover:bg-gray-300"
                >
                  Continue
                </button>
              </>
            ) : (
              <>
                <p className="text-2xl mb-6">What should I call you?</p>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={handleNameChange}
                  className="px-6 py-3 mb-6 text-center border-2 border-black focus:outline-none font-sans text-xl w-full max-w-sm dark:bg-gray-800 dark:text-white dark:border-white"
                  disabled={loading}
                />
                 {error && <p className="text-red-500 mb-4 text-sm font-sans">{error}</p>}
                <button
                  onClick={handleNameSubmit}
                  className="px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors disabled:opacity-50 uppercase tracking-[-0.04em] dark:bg-white dark:text-black dark:border-white dark:hover:bg-gray-300"
                  disabled={loading}
                >
                  {loading ? 'Thinking...' : 'Submit'}
                </button>
              </>
            )}
          </motion.div>
        );
      case 'funFact':
          return (
               <motion.div
                key="funFact"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center h-full w-full font-sans text-center p-4 dark:text-white"
              >
                <h2 className="text-5xl font-bold mb-8 font-serif italic tracking-[-0.04em]">Fun Fact</h2>
                 {funFactReaction ? (
                    <>
                      <div className="text-2xl mb-8 max-w-prose prose dark:prose-invert">
                        <ReactMarkdown>{funFactReaction}</ReactMarkdown>
                      </div>
                       <button
                        onClick={nextStep}
                        className="px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors uppercase tracking-[-0.04em] dark:bg-white dark:text-black dark:border-white dark:hover:bg-gray-300"
                      >
                        Continue
                      </button>
                    </>
                 ) : (
                   <>
                      <p className="text-2xl mb-6">Tell me one fun fact about yourself.</p>
                        <input
                          type="text"
                          placeholder="Your fun fact"
                          value={funFact}
                          onChange={handleFunFactChange}
                          className="px-6 py-3 mb-6 text-center border-2 border-black focus:outline-none font-sans text-xl w-full max-w-sm dark:bg-gray-800 dark:text-white dark:border-white"
                           disabled={loading}
                        />
                         {error && <p className="text-red-500 mb-4 text-sm font-sans">{error}</p>}
                        <button
                          onClick={handleFunFactSubmit}
                          className="px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors disabled:opacity-50 uppercase tracking-[-0.04em] dark:bg-white dark:text-black dark:border-white dark:hover:bg-gray-300"
                           disabled={loading}
                        >
                           {loading ? 'Thinking...' : 'React!'}
                        </button>
                   </>
                 )}
              </motion.div>
          );
      case 'yourVibe':
        const vibeOptions = Object.keys(vibeContent) as (keyof typeof vibeContent)[];

        return (
          <motion.div
            key="yourVibe"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full w-full font-sans text-center p-4 dark:text-white"
          >
            <h2 className="text-5xl font-bold mb-8 font-serif italic tracking-[-0.04em]">Your Vibe</h2>
            <p className="text-2xl mb-12">Pick one thing you're into right now.</p>
            <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
              {vibeOptions.map((vibe) => (
                <div
                  key={vibe}
                  onClick={() => handleVibeSelect(vibe)}
                  className={`border-2 border-black p-6 cursor-pointer transition-colors font-sans font-bold text-3xl flex items-center justify-center min-h-[10rem] ${selectedVibe === vibe ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-gray-800'} tracking-[-0.04em] text-center text-wrap break-words uppercase`}
                >
                  {vibe}
                </div>
              ))}
            </div>
             {completedVibes.size > 0 && (
                <button
                  onClick={() => {
                      const endQuestionIndex = steps.indexOf('endQuestion');
                      if (endQuestionIndex !== -1) {
                           goToStep(endQuestionIndex);
                      }
                  }}
                  className="mt-12 px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors uppercase tracking-[-0.04em] dark:bg-white dark:text-black dark:border-white dark:hover:bg-gray-300"
                >
                  Continue to Next Step ➔
                </button>
             )}
             {completedVibes.size > 0 && (
               <p className="mt-4 text-lg opacity-70">
                 You've explored {completedVibes.size} vibe{completedVibes.size > 1 ? 's' : ''}. Feel free to explore more or continue!
               </p>
             )}
          </motion.div>
        );
       case 'vibeSlides':
           if (!selectedVibe) return null; // Should not happen if flow is correct
           const currentSlide = vibeContent[selectedVibe][currentVibeSlideIndex];
           const isLastSlide = currentVibeSlideIndex === vibeContent[selectedVibe].length - 1;

           // Determine layout order based on slide index for visual variation
           const isOddSlide = currentVibeSlideIndex % 2 !== 0;
           const desktopOrder = isOddSlide ? 'md:flex-row-reverse' : 'md:flex-row';
           const mobileOrder = isOddSlide ? 'flex-col-reverse' : 'flex-col'; // Swap top/bottom on mobile

           // Placeholder for potential background images based on vibe and slide index
           // In a real app, you'd map vibe/slide index to image URLs
           const backgroundImage = selectedVibe ? `/img/vibe-${selectedVibe.toLowerCase()}-${currentVibeSlideIndex + 1}.jpg` : ''; // Example path - you'll need to add these images

           return (
                <motion.div
                    key={`vibeSlide-${selectedVibe}-${currentVibeSlideIndex}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    // Added full-screen specific styles and padding/layout for geometric look
                     className="relative flex flex-col items-center justify-center h-screen w-screen font-sans text-black bg-white p-8 dark:bg-black dark:text-white"
                >
                   {/* Geometric layout elements can be added here using divs with background/borders */}
                    <div className={`flex ${mobileOrder} ${desktopOrder} items-center justify-center w-full h-full border-2 border-black dark:border-white`}>
                        {/* Title Section with Background Image */}
                        <div
                           className="relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-black dark:border-white p-8 md:p-12 overflow-hidden"
                        >
                            {/* Optimized Background Image with Next.js Image */}
                            {backgroundImage && (
                                <Image
                                    src={backgroundImage}
                                    alt={`${selectedVibe} vibe slide ${currentVibeSlideIndex + 1}`}
                                    fill
                                    className="object-cover"
                                    style={{
                                        filter: 'blur(5px)',
                                        transform: 'scale(1.1)', // Slight scale to prevent blur edge artifacts
                                    }}
                                    priority={currentVibeSlideIndex < 2} // Prioritize first 2 slides
                                    quality={85}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            )}
                            {/* Semi-transparent overlay to help with text legibility */}
                            <div className="absolute inset-0 bg-black opacity-50 dark:bg-white dark:opacity-20 z-10"></div>
                            {/* Content overlay */}
                            <div className="relative z-20 flex shadow-lg flex-col mix-blend-exclusion items-start justify-center text-left w-full">
                                 <h2 className="text-7xl text-white md:text-9xl uppercase lg:text-[100px] font-black font-sans leading-none not-italic text-wrap hyphenate-important break-words tracking-[-0.04em]">{currentSlide.title}</h2>
                                 {/* Display slide number here too for strong visual hierarchy */}
                                 <div className="text-lg uppercase text-white font-sans font-bold mt-4 tracking-[-0.04em]">
                                    {selectedVibe} | Slide {currentVibeSlideIndex + 1} of {vibeContent[selectedVibe].length}
                                </div>
                            </div>
                        </div>
                        {/* Text Content Section */}
                        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center p-8 md:p-12">
                            {/* Subtitle */}
                            <p className="text-2xl md:text-5xl font-serif font-bold italic mb-4 tracking-[-0.04em]">A thought on {currentSlide.title}:</p>
                            {/* Main Text Content */}
                            <p className="text-xl lg:text-2xl text-center max-w-prose leading-relaxed">{currentSlide.text}</p>
                        </div>
                    </div>
                     <button
                        onClick={nextVibeSlide}
                        className="absolute bottom-8 right-8 px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors z-20 uppercase tracking-[-0.04em] dark:bg-white dark:text-black dark:border-white dark:hover:bg-gray-300"
                      >
                        {isLastSlide ? `Back to Vibe Selection ➔` : `Next ${selectedVibe} Slide ➔`}
                      </button>
                    {/* Removed top-left slide number as it's now in the title section */}
                </motion.div>
           );
      case 'endQuestion':
        return (
          <motion.div
            key="endQuestion"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full w-full font-sans text-center p-4 dark:text-white"
          >
            {eliasReply ? (
              <>
                <h2 className="text-5xl font-bold mb-8 font-serif italic tracking-[-0.04em]">Elias's Reply</h2>
                <div className="text-2xl mb-8 max-w-2xl leading-relaxed prose dark:prose-invert">
                  <ReactMarkdown>{eliasReply}</ReactMarkdown>
                </div>
                <button
                  onClick={() => window.location.href = 'https://eliasdesena.me/about'} // Replace with actual portfolio link
                  className="mt-8 px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors uppercase tracking-[-0.04em] dark:bg-white dark:text-black dark:border-white dark:hover:bg-gray-300"
                >
                  Explore Elias's Portfolio
                </button>
              </>
            ) : (
              <>
                <h2 className="text-5xl font-bold mb-8 font-serif italic tracking-[-0.04em]">Your Question</h2>
                 <p className="text-2xl mb-6">Ask Elias anything:</p>
                <textarea
                   placeholder="Type your question here..."
                   value={userQuestion}
                   onChange={(e) => setUserQuestion(e.target.value)}
                   className="px-6 py-3 mb-6 text-center border-2 border-black focus:outline-none font-sans text-xl w-full max-w-sm h-32 resize-none dark:bg-gray-800 dark:text-white dark:border-white"
                   disabled={loading}
                 />
                {error && <p className="text-red-500 mb-4 text-sm font-sans">{error}</p>}
                <button
                  onClick={handleQuestionSubmit}
                  className="px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors disabled:opacity-50 uppercase tracking-[-0.04em] dark:bg-white dark:text-black dark:border-white dark:hover:bg-gray-300"
                  disabled={loading || !userQuestion}
                >
                  {loading ? 'Getting Reply...' : 'Submit Question'}
                </button>
              </>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Calculate progress based on main steps and vibe slides as sub-steps
  const mainSteps = steps.filter(step => step !== 'vibeSlides');
  const totalMainSteps = mainSteps.length;
  const currentMainStepIndex = mainSteps.indexOf(currentStep);

  let adjustedTotalSteps = totalMainSteps;
  let currentAdjustedStepIndex = currentMainStepIndex;

  if (currentStep === 'vibeSlides' && selectedVibe) {
      const vibeSlideCount = vibeContent[selectedVibe].length;
      adjustedTotalSteps = totalMainSteps + vibeSlideCount -1; // vibeSlides replaces one main step but adds multiple sub-steps
      currentAdjustedStepIndex = totalMainSteps - 1 + currentVibeSlideIndex + 1; // Position within vibe slides
  } else if (currentStep === 'endQuestion' && selectedVibe) {
       const vibeSlideCount = vibeContent[selectedVibe].length;
       // When in endQuestion, the progress should account for all vibe slides having been viewed
       adjustedTotalSteps = totalMainSteps + vibeSlideCount - 1;
       currentAdjustedStepIndex = totalMainSteps + vibeSlideCount - 1;
  } else if (selectedVibe) {
       // For steps after vibe selection but before vibe slides (e.g., endQuestion if logic changes)
       // This case might need adjustment based on how the flow evolves, but handles intermediate steps if any
        const vibeSlideCount = vibeContent[selectedVibe].length;
        adjustedTotalSteps = totalMainSteps + vibeSlideCount -1; // Account for potential future steps after vibeSlides but before endQuestion
        // currentAdjustedStepIndex logic might need refinement here
  }

  const progressPercentage = ((currentAdjustedStepIndex + (currentStep === 'welcome' ? 0 : 1)) / (adjustedTotalSteps + (currentStep === 'welcome' || (currentStep === 'vibeSlides' && selectedVibe && currentVibeSlideIndex < vibeContent[selectedVibe].length - 1) ? 1 : 0))) * 100;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white text-black dark:bg-black dark:text-white">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 dark:bg-gray-700"> {/* Moved to top */}
        <motion.div
          className="h-full bg-black dark:bg-white"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Back Button (visible only after the first step) */}
      {currentStepIndex > 0 && (
        <button
          onClick={goBack}
          className="absolute top-4 left-4 z-50 p-2 bg-gray-200 dark:bg-gray-700 dark:text-white"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      )}

       {/* Dark Mode Toggle Button */}
       <button
           onClick={toggleDarkMode}
           className="absolute top-4 right-4 z-50 p-2 bg-gray-200 dark:bg-gray-700 dark:text-white"
           aria-label="Toggle dark mode"
       >
           {isDarkMode ? (
               // Sun icon for light mode
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
           ) : (
               // Moon icon for dark mode
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
               </svg>
           )}
       </button>

      <AnimatePresence mode="wait">
        {renderStepContent()}
      </AnimatePresence>

       {/* Optional: Navigation for debugging */}
       {/* <div className="absolute top-4 left-4 z-50 flex space-x-2">
         {steps.map((step, index) => (
           <button key={step} onClick={() => goToStep(index)} className={`px-4 py-2 text-sm ${currentStepIndex === index ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
             {step} ({index})
           </button>
         ))}
       </div> */}
    </div>
  );
};

export default IntroFlow;
