# Premium Portfolio Website

A world-class, award-winning portfolio website for a high-performing software engineer and ML researcher. Built with Next.js, React, Tailwind CSS, and Framer Motion.

## 🎨 Design Philosophy

- **Dark-mode-first**, cinematic, minimal luxury aesthetic
- **Black & white** primary palette with rich shades (jet black, charcoal, graphite, off-white)
- **Apple / Nike / Awwwards-level** polish and attention to detail
- **Zero clutter, maximum impact** - every element serves a purpose
- **Scroll-based storytelling** with smooth, intentional transitions

## 🏗️ Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout with global setup
│   ├── page.tsx            # Main page combining all sections
│   └── globals.css         # Global styles and animations
├── components/
│   ├── Navigation.tsx      # Sticky navigation with scroll detection
│   ├── ScrollProgress.tsx  # Progress bar indicator
│   ├── Footer.tsx          # Premium footer with links
│   ├── SectionDivider.tsx  # Smooth section transitions
│   └── sections/
│       ├── Hero.tsx        # Cinematic landing with animated typography
│       ├── SoftwareEngineer.tsx  # Professional journey & skills
│       ├── Projects.tsx    # Featured work showcase
│       ├── GymAndSports.tsx # Character & discipline section
│       └── Media.tsx       # Gallery with filters
```

## 🎬 Key Features

### 1. **Hero Section**
- Animated title with rotating words
- Cinematic background with mouse-tracked parallax
- Strong opening statement
- Scroll indicator with smooth animation
- Premium button states

### 2. **Software Engineer Section**
- Professional timeline with scroll animations
- Skill cards organized by category (ML, Full Stack, Core CS)
- Achievement statistics
- Research experience showcase
- NASA award highlight

### 3. **Projects Section**
- Featured projects grid with detailed cards
- Problem → Impact storytelling
- Technology stack badges
- GitHub and live demo links
- Other notable work in list format

### 4. **Gym & Sports Section**
- **Signature Feature**: Basketball → Dumbbell morphing animation
- Scroll-synced motion effects
- Discipline philosophy messaging
- Training statistics
- Communicates consistency and mental toughness

### 5. **Media Gallery**
- Category filtering (Awards, Research, Sports, Speaking, Engineering)
- Cinematic hover zoom effects
- Modal lightbox for detailed view
- Responsive grid layout

### 6. **Global Features**
- Smooth scroll progress indicator
- Sticky navigation with blur effect
- Scroll-based intersection animations
- Premium footer with full navigation
- Accessibility-first design

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion, GSAP-ready
- **State**: Zustand (optional, for complex state)
- **Quality**: ESLint, Prettier, TypeScript strict mode

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Navigate to project
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Configuration

### Update Personal Information

Edit the following files to personalize:

1. **Navigation** - `src/components/Navigation.tsx`
   - Logo/name
   - Navigation items
   - Contact button

2. **Hero** - `src/components/sections/Hero.tsx`
   - Opening statement
   - Animated words
   - Subtitle
   - Call-to-action buttons

3. **Software Engineer** - `src/components/sections/SoftwareEngineer.tsx`
   - Timeline events
   - Skills by category
   - Achievements
   - Statistics

4. **Projects** - `src/components/sections/Projects.tsx`
   - Project details
   - Tech stacks
   - GitHub/Live links
   - Featured selection

5. **Media** - `src/components/sections/Media.tsx`
   - Gallery items
   - Categories
   - Descriptions

6. **Footer** - `src/components/Footer.tsx`
   - Social links
   - Contact information
   - Copyright year

### Customize Colors

Edit `tailwind.config.ts` to modify the color palette:

```typescript
colors: {
  'midnight': '#0a0a0a',    // Adjust as needed
  'charcoal': '#1a1a1a',
  'graphite': '#2a2a2a',
  // ... etc
}
```

### Animation Tuning

- **Framer Motion**: Edit transition durations in individual components
- **Global CSS**: Modify animation keyframes in `src/styles/globals.css`
- **Scroll Effects**: Adjust intersection observer thresholds

## 📱 Responsive Design

- Mobile-first approach
- Tailwind responsive utilities
- Touch-friendly interactive elements
- Optimized for all screen sizes

## ♿ Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Prefers-reduced-motion respect
- High contrast ratios
- Focus indicators

## 🚀 Performance

- Code splitting and lazy loading
- Next.js image optimization (when images added)
- CSS minification
- Dynamic imports for heavy components
- Animation performance monitoring

### Optimization Tips

1. **Images**: Use Next.js `Image` component with proper sizing
2. **Animations**: Use `will-change` carefully, prefer transforms
3. **Fonts**: Optimize font-display strategy
4. **Bundle**: Monitor with `npm run build`

## 📝 Content Guidelines

### Writing for Impact

- **Hero**: Bold, confident, personality-driven
- **Engineer**: Story-focused, not resume-like
- **Projects**: Problem → Solution → Impact structure
- **Media**: Aspirational and achievement-focused

### SEO Best Practices

- Semantic HTML (`<h1>`, `<section>`, `<article>`)
- Meta descriptions (in layout)
- Open Graph tags (add to layout)
- Structured data (JSON-LD recommended)

## 🎨 Customization Examples

### Change Animation Duration

```typescript
// In any component
transition={{ duration: 1.2 }}  // Change from 0.8
```

### Add New Section

```typescript
// Create src/components/sections/NewSection.tsx
// Export in src/app/page.tsx
// Add to navigation in Navigation.tsx
```

### Modify Color Scheme

Update Tailwind config with your palette:

```typescript
colors: {
  'primary': '#yourcolor',
  'secondary': '#yourcolor',
}
```

## 📊 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

- **Netlify**: `npm run build` → deploy `out/`
- **GitHub Pages**: Configure next.config.js for static export
- **Traditional Hosting**: Build and serve via `npm run build` + `npm start`

## 🧪 Testing

### Manual Testing Checklist

- [ ] All sections load correctly
- [ ] Animations are smooth (60fps)
- [ ] Mobile responsiveness
- [ ] Navigation links work
- [ ] Forms submit correctly
- [ ] Images load properly
- [ ] Accessibility: Tab through entire site
- [ ] Cross-browser compatibility

## 🐛 Troubleshooting

### Animations Stuttering
- Check for layout shifts
- Reduce animation complexity
- Use `transform` instead of `top/left/width/height`

### Images Not Loading
- Ensure public folder structure
- Update image paths in components
- Check browser console for 404s

### Performance Issues
- Use Chrome DevTools Performance tab
- Check for unnecessary re-renders
- Profile animations with Framer Motion DevTools

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Web Vitals](https://web.dev/vitals/)

## 📄 License

MIT License - Feel free to use and modify.

## 👨‍💻 Author

Built with precision and attention to detail for high-performing engineers.

---

**Last Updated**: December 2025

**Version**: 1.0.0

**Status**: Production-ready
# shubranshu-portfolio
