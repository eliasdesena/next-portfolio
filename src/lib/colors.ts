// Define the color palette structure with better typing
export type ColorName = 
  | 'Deep Purple'
  | 'Antique Gold'
  | 'Midnight Blue'
  | 'Burgundy'
  | 'Forest Green'
  | 'Charcoal Gray'
  | 'Slate Teal'
  | 'Steel Blue'
  | 'Royal Purple'
  | 'Warm Bronze'
  | 'Electric Orange'
  | 'Pure White'
  | 'Jet Black'
  | 'Canary Yellow'
  | 'Alpine Green'
  | 'Cobalt Blue'
  | 'Stone Gray'
  | 'Blush Pink'
  | 'Oil Black'
  | 'Snow White'
  | 'Charcoal Black';

// Define color values with semantic meaning
export interface ColorSet {
  light: {
    bg: string;
    text: string;
  };
  dark: {
    bg: string;
    text: string;
  };
  hex: {
    lightBg: string;
    lightText: string;
    darkBg: string;
    darkText: string;
  };
}

// Create color palette with all the colors from your existing data
export const colorPalette: Record<ColorName, ColorSet> = {
  'Deep Purple': {
    light: { 
      bg: 'bg-[#ecd9fa]', 
      text: 'text-[#2d0a4b]' 
    },
    dark: { 
      bg: 'bg-[#2d0a4b]', 
      text: 'text-[#ecd9fa]' 
    },
    hex: {
      lightBg: '#ecd9fa',
      lightText: '#2d0a4b',
      darkBg: '#2d0a4b',
      darkText: '#ecd9fa'
    }
  },
  'Antique Gold': {
    light: { 
      bg: 'bg-[#faecd9]', 
      text: 'text-[#7a5a2f]' 
    },
    dark: { 
      bg: 'bg-[#7a5a2f]', 
      text: 'text-[#faecd9]' 
    },
    hex: {
      lightBg: '#faecd9',
      lightText: '#7a5a2f',
      darkBg: '#7a5a2f',
      darkText: '#faecd9'
    }
  },
  'Midnight Blue': {
    light: { 
      bg: 'bg-[#d9eafa]', 
      text: 'text-[#1a3360]' 
    },
    dark: { 
      bg: 'bg-[#1a3360]', 
      text: 'text-[#d9eafa]' 
    },
    hex: {
      lightBg: '#d9eafa',
      lightText: '#1a3360',
      darkBg: '#1a3360',
      darkText: '#d9eafa'
    }
  },
  'Burgundy': {
    light: { 
      bg: 'bg-[#fad9df]', 
      text: 'text-[#5a2323]' 
    },
    dark: { 
      bg: 'bg-[#5a2323]', 
      text: 'text-[#fad9df]' 
    },
    hex: {
      lightBg: '#fad9df',
      lightText: '#5a2323',
      darkBg: '#5a2323',
      darkText: '#fad9df'
    }
  },
  'Forest Green': {
    light: { 
      bg: 'bg-[#e0f5e9]', 
      text: 'text-[#1b4d3e]' 
    },
    dark: { 
      bg: 'bg-[#1b4d3e]', 
      text: 'text-[#e0f5e9]' 
    },
    hex: {
      lightBg: '#e0f5e9',
      lightText: '#1b4d3e',
      darkBg: '#1b4d3e',
      darkText: '#e0f5e9'
    }
  },
  'Charcoal Gray': {
    light: { 
      bg: 'bg-[#e5e5e5]', 
      text: 'text-[#232323]' 
    },
    dark: { 
      bg: 'bg-[#232323]', 
      text: 'text-[#e5e5e5]' 
    },
    hex: {
      lightBg: '#e5e5e5',
      lightText: '#232323',
      darkBg: '#232323',
      darkText: '#e5e5e5'
    }
  },
  'Slate Teal': {
    light: { 
      bg: 'bg-[#d6f0f2]', 
      text: 'text-[#2a4d4f]' 
    },
    dark: { 
      bg: 'bg-[#2a4d4f]', 
      text: 'text-[#d6f0f2]' 
    },
    hex: {
      lightBg: '#d6f0f2',
      lightText: '#2a4d4f',
      darkBg: '#2a4d4f',
      darkText: '#d6f0f2'
    }
  },
  'Steel Blue': {
    light: { 
      bg: 'bg-[#dbe7fa]', 
      text: 'text-[#2a3a4d]' 
    },
    dark: { 
      bg: 'bg-[#2a3a4d]', 
      text: 'text-[#dbe7fa]' 
    },
    hex: {
      lightBg: '#dbe7fa',
      lightText: '#2a3a4d',
      darkBg: '#2a3a4d',
      darkText: '#dbe7fa'
    }
  },
  'Royal Purple': {
    light: { 
      bg: 'bg-[#ecd9fa]', 
      text: 'text-[#4b2d7a]' 
    },
    dark: { 
      bg: 'bg-[#4b2d7a]', 
      text: 'text-[#ecd9fa]' 
    },
    hex: {
      lightBg: '#ecd9fa',
      lightText: '#4b2d7a',
      darkBg: '#4b2d7a',
      darkText: '#ecd9fa'
    }
  },
  'Warm Bronze': {
    light: { 
      bg: 'bg-[#f5e6d0]', 
      text: 'text-[#8c6a3f]' 
    },
    dark: { 
      bg: 'bg-[#8c6a3f]', 
      text: 'text-[#f5e6d0]' 
    },
    hex: {
      lightBg: '#f5e6d0',
      lightText: '#8c6a3f',
      darkBg: '#8c6a3f',
      darkText: '#f5e6d0'
    }
  },
  'Electric Orange': {
    light: { 
      bg: 'bg-[#ffe5d0]', 
      text: 'text-[#ff6600]' 
    },
    dark: { 
      bg: 'bg-[#ff6600]', 
      text: 'text-[#ffe5d0]' 
    },
    hex: {
      lightBg: '#ffe5d0',
      lightText: '#ff6600',
      darkBg: '#ff6600',
      darkText: '#ffe5d0'
    }
  },
  'Pure White': {
    light: { 
      bg: 'bg-[#fff]', 
      text: 'text-[#111]' 
    },
    dark: { 
      bg: 'bg-[#111]', 
      text: 'text-[#fff]' 
    },
    hex: {
      lightBg: '#fff',
      lightText: '#111',
      darkBg: '#111',
      darkText: '#fff'
    }
  },
  'Jet Black': {
    light: { 
      bg: 'bg-[#232323]', 
      text: 'text-[#fff]' 
    },
    dark: { 
      bg: 'bg-[#fff]', 
      text: 'text-[#232323]' 
    },
    hex: {
      lightBg: '#232323',
      lightText: '#fff',
      darkBg: '#fff',
      darkText: '#232323'
    }
  },
  'Canary Yellow': {
    light: { 
      bg: 'bg-[#fff9d0]', 
      text: 'text-[#bfa800]' 
    },
    dark: { 
      bg: 'bg-[#bfa800]', 
      text: 'text-[#fff9d0]' 
    },
    hex: {
      lightBg: '#fff9d0',
      lightText: '#bfa800',
      darkBg: '#bfa800',
      darkText: '#fff9d0'
    }
  },
  'Alpine Green': {
    light: { 
      bg: 'bg-[#e0f5e9]', 
      text: 'text-[#1b4d3e]' 
    },
    dark: { 
      bg: 'bg-[#1b4d3e]', 
      text: 'text-[#e0f5e9]' 
    },
    hex: {
      lightBg: '#e0f5e9',
      lightText: '#1b4d3e',
      darkBg: '#1b4d3e',
      darkText: '#e0f5e9'
    }
  },
  'Cobalt Blue': {
    light: { 
      bg: 'bg-[#dbe7fa]', 
      text: 'text-[#1a3360]' 
    },
    dark: { 
      bg: 'bg-[#1a3360]', 
      text: 'text-[#dbe7fa]' 
    },
    hex: {
      lightBg: '#dbe7fa',
      lightText: '#1a3360',
      darkBg: '#1a3360',
      darkText: '#dbe7fa'
    }
  },
  'Stone Gray': {
    light: { 
      bg: 'bg-[#eaeaea]', 
      text: 'text-[#232323]' 
    },
    dark: { 
      bg: 'bg-[#232323]', 
      text: 'text-[#eaeaea]' 
    },
    hex: {
      lightBg: '#eaeaea',
      lightText: '#232323',
      darkBg: '#232323',
      darkText: '#eaeaea'
    }
  },
  'Blush Pink': {
    light: { 
      bg: 'bg-[#fad9df]', 
      text: 'text-[#5a2323]' 
    },
    dark: { 
      bg: 'bg-[#5a2323]', 
      text: 'text-[#fad9df]' 
    },
    hex: {
      lightBg: '#fad9df',
      lightText: '#5a2323',
      darkBg: '#5a2323',
      darkText: '#fad9df'
    }
  },
  'Oil Black': {
    light: { 
      bg: 'bg-[#232323]', 
      text: 'text-[#fff]' 
    },
    dark: { 
      bg: 'bg-[#fff]', 
      text: 'text-[#232323]' 
    },
    hex: {
      lightBg: '#232323',
      lightText: '#fff',
      darkBg: '#fff',
      darkText: '#232323'
    }
  },
  'Snow White': {
    light: { 
      bg: 'bg-[#fff]', 
      text: 'text-[#232323]' 
    },
    dark: { 
      bg: 'bg-[#232323]', 
      text: 'text-[#fff]' 
    },
    hex: {
      lightBg: '#fff',
      lightText: '#232323',
      darkBg: '#232323',
      darkText: '#fff'
    }
  },
  'Charcoal Black': {
    light: { 
      bg: 'bg-[#232323]', 
      text: 'text-[#fff]' 
    },
    dark: { 
      bg: 'bg-[#fff]', 
      text: 'text-[#232323]' 
    },
    hex: {
      lightBg: '#232323',
      lightText: '#fff',
      darkBg: '#fff',
      darkText: '#232323'
    }
  }
};

// Helper function to get color classes based on theme
export function getColorClasses(colorName: ColorName, isDarkTheme: boolean): { bg: string; text: string } {
  const colorSet = colorPalette[colorName] || colorPalette['Deep Purple']; // Fallback to Deep Purple
  return isDarkTheme ? colorSet.dark : colorSet.light;
}

// Convert to array format for compatibility with existing code
export function getColorArray(colorName: ColorName): string[] {
  const colorSet = colorPalette[colorName] || colorPalette['Deep Purple']; // Fallback to Deep Purple
  const result = [
    colorSet.light.bg,
    colorSet.light.text,
    colorSet.dark.bg,
    colorSet.dark.text
  ];
  console.log("getColorArray for", colorName, "returns", result);
  return result;
}

// For use with styled-components or direct CSS-in-JS
export function getHexColors(colorName: ColorName): {
  lightBg: string;
  lightText: string;
  darkBg: string;
  darkText: string;
} {
  const colorSet = colorPalette[colorName] || colorPalette['Deep Purple']; // Fallback to Deep Purple
  return colorSet.hex;
}

// Default color for the app
export const defaultColor: ColorName = 'Deep Purple'; 