"use client";

import { useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define content for vibe-specific slides (Expanded Content)
const vibeContent = {
    'Hustle': [
      { title: 'Why I Hustle', text: 'Ever since I realized that ideas can become real things people love, I\'ve been hooked on the entrepreneurial grind. It\'s not just about making money—it\'s about solving problems, telling stories through branding, and creating experiences that resonate. Watching a concept evolve from a sketch on paper to a living, breathing project fuels my curiosity and keeps me up at night (in a good way).' },
      { title: 'My Stance', text: 'I believe in authenticity over flash. Branding should reflect the soul of a project—its values, its voice, and its vibe. I\'m not about gimmicks or empty hype; I want every logo, color palette, and tagline to feel like a genuine conversation with the audience. Real connection > viral one-offs, always.' },
      { title: 'Where I\'m Involved', text: 'On the branding side, I\'ve collaborated with local startups in Bülach to craft cohesive visual identities—everything from logo design and typography exploration to social media templates and merch mockups. Beyond that, I run my own ventures: releasing music on Spotify through DistroKid, dropping limited-edition merch lines, and even consulting classmates on building their personal brands from scratch.' },
      { title: 'Projects I\'m Proud Of', text: 'One highlight was rebranding a skate-wear startup—redesigned their logo, revamped product packaging, and launched an Instagram campaign that tripled their engagement. I also built a small e-commerce site for my own merch, handled everything end-to-end, and sold out the first drop in under 24 hours. Plus, my micro-consulting service has helped five classmates land internships by sharpening their resumes and online presence.' },
    ],
    'Tech': [
      { title: 'Coding & Web Dev', text: 'I geek out on translating ideas into functional, pixel-perfect web apps. My daily driver is the T3 stack—Next.js for SSR and routing, tRPC for seamless type-safe APIs, Tailwind for utility-first styling, and TypeScript to catch bugs before they happen. Shipping features that users rave about is my definition of satisfaction.' },
      { title: 'Learning Curve', text: 'Tech never stops evolving, and neither do I. Lately I\'ve been diving into WebAssembly modules to supercharge performance-critical parts of my apps, as well as exploring decentralized protocols like IPFS to build more resilient, censorship-resistant experiences. Every new concept is another tool in my creative toolbox.' },
      { title: 'DIY Workflow', text: 'With ADHD bouncing around, I rely on automation to stay focused—VSCode snippets, boilerplate generators, and custom CLI scripts that scaffold entire feature folders in seconds. The less time I spend on setup, the more I can dive into solving real problems and experimenting with fresh ideas.' },
      { title: 'Tech Mindset', text: 'Good tech should feel invisible—intuitive interfaces, lightning-fast load times, and thoughtful accessibility. I aim to build digital tools that empower creativity and connection rather than distract or complicate. If users forget they\'re even using "tech," I know I\'ve done my job right.' },
    ],
    'Creative': [
      { title: 'My Dearest Passion: Music', text: 'Music is the core of who I am—my way of speaking when words don\'t cut it. I craft beats late into the night in Ableton Live, layering custom Serum patches, vintage Rhodes samples, and field recordings from foggy Swiss mornings to create immersive soundscapes. Then I push each track through DistroKid to Spotify, chasing every playlist add like a milestone.' },
      { title: 'Beyond Beats: Design & Video', text: 'When I\'m not in the studio, I\'m in Photoshop or Illustrator whipping up cover art, social graphics, and merch mockups. I also edit promo videos in Premiere and After Effects—cutting together visuals that sync with my tracks\' energy, adding motion graphics for a polished, professional feel.' },
      { title: 'Current Vibes', text: 'Right now I\'m deep into granular synthesis—manipulating tiny audio grains to conjure ethereal pads—and experimenting with analog drum machine samples run through tape emulation plugins. I\'m also obsessed with capturing raw ambiences on weekend hikes in the Alps and weaving them into my tracks for that organic touch.' },
      { title: 'Creative Work', text: 'Whether it\'s a four-bar loop, a 16-second promo clip, or a full album rollout, I believe in telling a cohesive story across sound, sight, and motion. Every element should reinforce the emotional core of the project and leave people feeling something real.' },
    ],
    'Personal': [
      { title: 'Role of Faith', text: 'My Christian faith anchors everything I do. Being plugged into ICF Zürich and FEG Wallisellen gives me community, accountability, and the grace to keep asking questions and growing. Faith informs my art, my work ethic, and how I treat the people around me.' },
      { title: 'Mind & Body Rituals', text: 'I start most days at 4 AM with a run through misty Zurich streets—praying, planning, and soaking in the quiet energy before school. On weekends, I hit the trails in the Alps for multi-hour hikes that reset my mind and remind me of the bigger picture.' },
      { title: 'ADHD & Discipline', text: 'Living with ADHD means my focus can sprint in a hundred directions at once. I counter that with strict routines—time-blocked schedules, gratitude journaling, and templated workflows that keep distractions at bay so I can channel my energy into creative output.' },
      { title: 'Constant Growth', text: 'I\'m on a mission to level up in faith, fitness, school, and financial savvy. Every week I set micro-goals—finishing a coding tutorial, hitting a new PR in calisthenics, or reading a chapter of scripture—and celebrate the small wins that add up to big change.' },
    ],
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
  const [userQuestion, setUserQuestion] = useState('');
  const [eliasReply, setEliasReply] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prevIndex) => prevIndex + 1);
      setError(null); // Clear error on step change
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
          // Finished vibe slides, return to the Your Vibe step
          setCurrentStepIndex(steps.indexOf('yourVibe'));
          setCurrentVibeSlideIndex(0); // Reset vibe slide index
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
            className="flex flex-col items-center justify-center h-full w-full font-sans text-center p-4"
          >
            <h2 className="text-5xl font-bold mb-8 font-serif italic tracking-[-0.04em]">Hey there, I'm Elias – let's get to know each other.</h2>
            <button
              onClick={nextStep}
              className="mt-12 px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors tracking-[-0.04em] uppercase"
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
            className="flex flex-col items-center justify-center h-full w-full font-sans text-center p-4"
          >
            <h2 className="text-5xl font-bold mb-8 font-serif italic tracking-[-0.04em]">Your Name</h2>
            {greeting ? (
              <>
                <p className="text-2xl mb-8">{greeting}</p>
                 <button
                  onClick={nextStep}
                  className="px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors uppercase tracking-[-0.04em]"
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
                  className="px-6 py-3 mb-6 text-center border-2 border-black focus:outline-none font-sans text-xl w-full max-w-sm"
                  disabled={loading}
                />
                 {error && <p className="text-red-500 mb-4 text-sm font-sans">{error}</p>}
                <button
                  onClick={handleNameSubmit}
                  className="px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors disabled:opacity-50 uppercase tracking-[-0.04em]"
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
                className="flex flex-col items-center justify-center h-full w-full font-sans text-center p-4"
              >
                <h2 className="text-5xl font-bold mb-8 font-serif italic tracking-[-0.04em]">Fun Fact</h2>
                 {funFactReaction ? (
                    <>
                      <p className="text-2xl mb-8 max-w-prose">{funFactReaction}</p>
                       <button
                        onClick={nextStep}
                        className="px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors uppercase tracking-[-0.04em]"
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
                          className="px-6 py-3 mb-6 text-center border-2 border-black focus:outline-none font-sans text-xl w-full max-w-sm"
                           disabled={loading}
                        />
                         {error && <p className="text-red-500 mb-4 text-sm font-sans">{error}</p>}
                        <button
                          onClick={handleFunFactSubmit}
                          className="px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors disabled:opacity-50 uppercase tracking-[-0.04em]"
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
            className="flex flex-col items-center justify-center h-full w-full font-sans text-center p-4"
          >
            <h2 className="text-5xl font-bold mb-8 font-serif italic tracking-[-0.04em]">Your Vibe</h2>
            <p className="text-2xl mb-12">Pick one thing you're into right now.</p>
            <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
              {vibeOptions.map((vibe) => (
                <div
                  key={vibe}
                  onClick={() => handleVibeSelect(vibe)}
                  className={`border-2 border-black p-6 cursor-pointer transition-colors font-sans font-bold text-3xl flex items-center justify-center min-h-[10rem] ${selectedVibe === vibe ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'} tracking-[-0.04em] text-center text-wrap break-words uppercase`}
                >
                  {vibe}
                </div>
              ))}
            </div>
             {selectedVibe && (
                <button
                  onClick={() => goToStep(steps.indexOf('endQuestion'))}
                  className="mt-12 px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors uppercase tracking-[-0.04em]"
                >
                  Continue ➔
                </button>
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
                     className="relative flex flex-col items-center justify-center h-screen w-screen font-sans text-black bg-white p-8"
                >
                   {/* Geometric layout elements can be added here using divs with background/borders */}
                    <div className={`flex ${mobileOrder} ${desktopOrder} items-center justify-center w-full h-full border-2 border-black`}>
                        {/* Title Section with Background Image */}
                        <div
                           className="relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-black p-8 md:p-12 overflow-hidden"
                        >
                            {/* Background Image Placeholder */}
                            {backgroundImage && (
                                <div
                                    className="absolute bg-black bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${backgroundImage})`,
                                        opacity: 1, // Lower opacity for background effec
                                        filter: 'blur(5px)',
                                        top: '-10px', // Extend beyond the top edge
                                        right: '-10px', // Extend beyond the right edge
                                        bottom: '-10px', // Extend beyond the bottom edge
                                        left: '-10px', // Extend beyond the left edge
                                    }}
                                ></div>
                            )}
                            {/* Semi-transparent overlay to help with text legibility */}
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            {/* Content overlay */}
                            <div className="relative z-10 flex shadow-lg flex-col mix-blend-exclusion items-start justify-center text-left w-full">
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
                        className="absolute bottom-8 right-8 px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors z-20 uppercase tracking-[-0.04em]"
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
            className="flex flex-col items-center justify-center h-full w-full font-sans text-center p-4"
          >
            {eliasReply ? (
              <>
                <h2 className="text-5xl font-bold mb-8 font-serif italic tracking-[-0.04em]">Elias's Reply</h2>
                <p className="text-2xl mb-8 max-w-2xl leading-relaxed">{eliasReply}</p>
                <button
                  onClick={() => window.location.href = 'https://eliasdesena.me/about'} // Replace with actual portfolio link
                  className="mt-8 px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors uppercase tracking-[-0.04em]"
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
                   className="px-6 py-3 mb-6 text-center border-2 border-black focus:outline-none font-sans text-xl w-full max-w-sm h-32 resize-none"
                   disabled={loading}
                 />
                {error && <p className="text-red-500 mb-4 text-sm font-sans">{error}</p>}
                <button
                  onClick={handleQuestionSubmit}
                  className="px-10 py-5 bg-black text-white font-sans font-bold uppercase tracking-wider text-lg border border-black hover:bg-gray-800 transition-colors disabled:opacity-50 uppercase tracking-[-0.04em]"
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
    <div className="relative w-full h-screen overflow-hidden bg-white text-black">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-300"> {/* Moved to top */}
        <motion.div
          className="h-full bg-black"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

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
