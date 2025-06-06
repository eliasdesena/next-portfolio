# How to Use Next.js Image Component in MDX Files

## ✅ What's Implemented

Your MDX files now support Next.js optimized Image component with:
- Automatic WebP/AVIF conversion
- Lazy loading
- Responsive sizing
- Blur placeholder support
- Multiple usage patterns
- Dark/light mode adaptations

## 📁 Image Directory Structure

Place your images in:
```
public/
├── images/
│   ├── projects/
│   │   ├── luxsignals-logo-concepts.jpg
│   │   ├── luxsignals-website.jpg
│   │   └── ...
│   ├── passions/
│   │   └── ...
│   └── about/
│       └── ...
```

## 🖼️ Usage Examples in MDX

### 1. Basic Usage (Recommended)
```mdx
<Image 
  src="/images/projects/luxsignals-logo.jpg" 
  alt="LuxSignals Logo Design" 
  width={800} 
  height={400} 
/>
```

### 2. Dark/Light Mode Adaptable Images
```mdx
<!-- Invert colors in dark mode (perfect for logos) -->
<Image 
  src="/images/projects/logo.jpg" 
  alt="Logo Design" 
  width={800} 
  height={400} 
  className="dark:invert"
/>

<!-- Reduce opacity in dark mode -->
<Image 
  src="/images/projects/screenshot.jpg" 
  alt="App Screenshot" 
  width={1200} 
  height={675} 
  className="dark:opacity-80"
/>

<!-- Different brightness for dark mode -->
<Image 
  src="/images/projects/mockup.jpg" 
  alt="Product Mockup" 
  width={800} 
  height={600} 
  className="dark:brightness-90"
/>
```

### 3. Large Hero Images
```mdx
<Image 
  src="/images/projects/hero-image.jpg" 
  alt="Project Hero Image" 
  width={1200} 
  height={675} 
  priority={true}
/>
```

### 4. Small Inline Images
```mdx
<Image 
  src="/images/projects/icon.png" 
  alt="App Icon" 
  width={100} 
  height={100} 
/>
```

### 5. Responsive Images (Auto-sized)
```mdx
<Image 
  src="/images/projects/responsive-image.jpg" 
  alt="Responsive Design" 
  width={1000} 
  height={600} 
/>
```

### 6. Images with Custom Styling
```mdx
<Image 
  src="/images/projects/styled-image.jpg" 
  alt="Custom Styled Image" 
  width={800} 
  height={400} 
  className="rounded-lg border-2 border-white/20 shadow-lg"
/>
```

### 7. Traditional Markdown (Also Works)
```mdx
![Alt text](/images/projects/traditional.jpg)
```

## 🌓 Dark/Light Mode Adaptations

### Available Tailwind Classes:
- `dark:invert` - Inverts colors in dark mode (perfect for logos)
- `dark:opacity-80` - Reduces opacity in dark mode  
- `dark:brightness-90` - Adjusts brightness in dark mode
- `dark:contrast-110` - Increases contrast in dark mode
- `dark:saturate-110` - Adjusts saturation in dark mode
- `dark:sepia` - Applies sepia filter in dark mode
- `dark:grayscale` - Makes image grayscale in dark mode

### When to Use Each:
- **`dark:invert`**: Black logos on white backgrounds
- **`dark:opacity-80`**: Screenshots that are too bright in dark mode
- **`dark:brightness-90`**: Images that need subtle dimming
- **`dark:contrast-110`**: Images that look washed out in dark mode

## 🎨 Image Optimization Features

- **Format Conversion**: Automatically serves WebP/AVIF when supported
- **Responsive Loading**: Only loads images when they enter viewport
- **Size Optimization**: Automatically generates multiple sizes
- **Blur Placeholder**: Shows blur while loading (add `placeholder="blur"`)
- **Priority Loading**: Use `priority={true}` for above-the-fold images

## 📋 Best Practices

1. **Use specific dimensions** when you know them for better performance
2. **Add meaningful alt text** for accessibility
3. **Use `priority={true}** for images above the fold
4. **Organize images** in folders by section (projects, passions, etc.)
5. **Use modern formats** (WebP, AVIF) - Next.js will auto-convert
6. **Optimize file sizes** before uploading (aim for <500KB for web)
7. **Test in both light and dark modes** when using filter classes
8. **Use `dark:invert` sparingly** - only for logos/icons that need it 