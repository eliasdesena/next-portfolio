'use client';

import data from './data.json';
import { ColorName, getColorArray, getHexColors, colorPalette } from '@/lib/colors';

export default function DebugColor() {
  // Use our new color utility 
  const colorName: ColorName = "Deep Purple";
  
  // Get colors in array format (for backward compatibility)
  const colors = getColorArray(colorName);
  console.log("Color Array:", colors);
  
  // Get hex colors (for more direct use)
  const hexColors = getHexColors(colorName);
  console.log("Hex Colors:", hexColors);
  
  // Get specific classes from the array
  const bgLight = colors[0];
  const textLight = colors[1];
  const bgDark = colors[2];
  const textDark = colors[3];
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Debug Color Information</h1>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">Test Color: {colorName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <p><strong>Background Light:</strong> {bgLight}</p>
          <p><strong>Text Light:</strong> {textLight}</p>
          <p><strong>Background Dark:</strong> {bgDark}</p>
          <p><strong>Text Dark:</strong> {textDark}</p>
        </div>
        <div>
          <p><strong>Light Hex BG:</strong> {hexColors.lightBg}</p>
          <p><strong>Light Hex Text:</strong> {hexColors.lightText}</p>
          <p><strong>Dark Hex BG:</strong> {hexColors.darkBg}</p>
          <p><strong>Dark Hex Text:</strong> {hexColors.darkText}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className={`p-8 ${bgLight} ${textLight}`}>
          <h3 className="text-lg font-bold mb-2">Light Mode Appearance</h3>
          <p>This shows how the color appears in light mode</p>
        </div>
        
                  <div className={`p-8 ${bgDark} ${textDark}`}>
          <h3 className="text-lg font-bold mb-2">Dark Mode Appearance</h3>
          <p>This shows how the color appears in dark mode</p>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">All Available Colors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(colorPalette).map(([name, colorSet]) => (
          <div key={name} className="border p-4">
            <h3 className="font-bold mb-2">{name}</h3>
            <div className="flex flex-col gap-2">
                              <div className={`p-2 ${colorSet.light.bg} ${colorSet.light.text}`}>
                Light Mode Sample
              </div>
                              <div className={`p-2 ${colorSet.dark.bg} ${colorSet.dark.text}`}>
                Dark Mode Sample
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 