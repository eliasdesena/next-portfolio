export const colorMap: Record<string, [string, string, string, string]> = {
  'Deep Purple':    ['bg-[#ecd9fa]', 'text-[#2d0a4b]', 'bg-[#2d0a4b]', 'text-[#ecd9fa]'],
  'Antique Gold':   ['bg-[#faecd9]', 'text-[#7a5a2f]', 'bg-[#7a5a2f]', 'text-[#faecd9]'],
  'Midnight Blue':  ['bg-[#d9eafa]', 'text-[#1a3360]', 'bg-[#1a3360]', 'text-[#d9eafa]'],
  'Burgundy':       ['bg-[#fad9df]', 'text-[#5a2323]', 'bg-[#5a2323]', 'text-[#fad9df]'],
  'Forest Green':   ['bg-[#e0f5e9]', 'text-[#1b4d3e]', 'bg-[#1b4d3e]', 'text-[#e0f5e9]'],
  'Charcoal Gray':  ['bg-[#e5e5e5]', 'text-[#232323]', 'bg-[#232323]', 'text-[#e5e5e5]'],
  'Slate Teal':     ['bg-[#d6f0f2]', 'text-[#2a4d4f]', 'bg-[#2a4d4f]', 'text-[#d6f0f2]'],
  'Steel Blue':     ['bg-[#dbe7fa]', 'text-[#2a3a4d]', 'bg-[#2a3a4d]', 'text-[#dbe7fa]'],
  'Royal Purple':   ['bg-[#ecd9fa]', 'text-[#4b2d7a]', 'bg-[#4b2d7a]', 'text-[#ecd9fa]'],
  'Warm Bronze':    ['bg-[#f5e6d0]', 'text-[#8c6a3f]', 'bg-[#8c6a3f]', 'text-[#f5e6d0]'],
  'Electric Orange':['bg-[#ffe5d0]', 'text-[#ff6600]', 'bg-[#ff6600]', 'text-[#ffe5d0]'],
  'Pure White':     ['bg-[#fff]', 'text-[#111]', 'bg-[#111]', 'text-[#fff]'],
  'Jet Black':      ['bg-[#232323]', 'text-[#fff]', 'bg-[#fff]', 'text-[#232323]'],
  'Canary Yellow':  ['bg-[#fff9d0]', 'text-[#bfa800]', 'bg-[#bfa800]', 'text-[#fff9d0]'],
  'Alpine Green':   ['bg-[#e0f5e9]', 'text-[#1b4d3e]', 'bg-[#1b4d3e]', 'text-[#e0f5e9]'],
  'Cobalt Blue':    ['bg-[#dbe7fa]', 'text-[#1a3360]', 'bg-[#1a3360]', 'text-[#dbe7fa]'],
  'Stone Gray':     ['bg-[#eaeaea]', 'text-[#232323]', 'bg-[#232323]', 'text-[#eaeaea]'],
  'Blush Pink':     ['bg-[#fad9df]', 'text-[#5a2323]', 'bg-[#5a2323]', 'text-[#fad9df]'],
  'Oil Black':      ['bg-[#232323]', 'text-[#fff]', 'bg-[#fff]', 'text-[#232323]'],
  'Snow White':     ['bg-[#fff]', 'text-[#232323]', 'bg-[#232323]', 'text-[#fff]'],
  'Charcoal Black': ['bg-[#232323]', 'text-[#fff]', 'bg-[#fff]', 'text-[#232323]'],
};

export const projects = [
  { slug: 'luxsignals', title: 'LUXSIGNALS', tagline: 'Empowering Traders with AI', color: 'Deep Purple' },
  { slug: 'parfums-d-heritage', title: "Parfums d'Héritage", tagline: 'A New Kind of Luxury Fragrance', color: 'Antique Gold' },
  { slug: 'music-production', title: 'Music Production', tagline: 'Crafting Auditory Experiences', color: 'Midnight Blue' },
  { slug: 'study-with-filo', title: 'Study with Filo', tagline: 'Making Studying Easier', color: 'Burgundy' },
  { slug: 'traders-edge', title: "Trader's Edge", tagline: 'Custom TradingView Indicators', color: 'Forest Green' },
  { slug: 'luxsignals-blog-automation', title: 'LuxSignals Blog Automation', tagline: 'SEO-Driven Content on Autopilot', color: 'Charcoal Gray' },
  { slug: 'ai-trading-bot-prototype', title: 'AI Trading Bot Prototype', tagline: 'Realtime Quant Models', color: 'Slate Teal' },
  { slug: 'nicotine-free-vape-concept', title: 'Nicotine-Free Vape Concept', tagline: 'Smoking Cessation Innovation', color: 'Steel Blue' },
];

export const passions = [
  { slug: 'music', title: 'Music', subline: 'Sound as Storytelling', color: 'Royal Purple' },
  { slug: 'perfumery', title: 'Perfumery', subline: 'Swiss Elegance in a Bottle', color: 'Warm Bronze' },
  { slug: 'running', title: 'Running', subline: '4AM 5K Daily, Fog & All', color: 'Electric Orange' },
  { slug: 'faith', title: 'Faith', subline: 'Kingdom Capitalism & Grace', color: 'Pure White' },
  { slug: 'graphic-design', title: 'Graphic Design', subline: 'Affinity & Figma Mastery', color: 'Jet Black' },
  { slug: 'videography', title: 'Videography', subline: 'Frame by Frame Storytelling', color: 'Canary Yellow' },
  { slug: 'photography', title: 'Photography', subline: 'Capturing Swiss Landscapes', color: 'Alpine Green' },
  { slug: 'debate-research', title: 'Debate & Research', subline: 'Data-Driven Persuasion', color: 'Cobalt Blue' },
];

export const about = [
  { slug: 'about-elias', title: 'ABOUT ELIAS', points: [
    '17-year-old entrepreneur & Gymnasium student',
    "Co-founder of LuxSignals & Parfums d'Héritage",
    'Python, JavaScript, Java & Pine Script coder',
    'Early riser: 4AM runs & disciplined grind',
    'Devout Christian (ICF Zürich / FEG Wallisellen)',
  ], color: 'Stone Gray', wide: true },
  { slug: 'milestones', title: 'MILESTONES', points: [
    'First SaaS launch at 16',
    'Spotify producer since 15',
    'GmbH set-up with Leo',
  ], color: 'Blush Pink' },
  { slug: 'toolkit', title: 'TOOLKIT', points: [
    'Next.js, Tailwind CSS, Framer Motion',
    'React Native, Figma, Affinity Designer',
    'SEO, EmailJS, Vercel Deploys',
    'Branding, Marketing, Automation',
  ], color: 'Oil Black' },
];

export const contact = [
  { slug: 'lets-connect', title: "LET'S CONNECT", elements: [
    'Email form (EmailJS)',
    'Social icons: Spotify, GitHub, Instagram',
    'elias@example.com',
  ], color: 'Snow White', wide: true },
  { slug: 'quick-links', title: 'QUICK LINKS', elements: [
    'Resume PDF',
    'LinkedIn Profile',
    'DistroKid Music Page',
  ], color: 'Charcoal Black' },
]; 