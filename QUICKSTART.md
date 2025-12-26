# Portfolio Website - Quick Start Guide

## ⚡ Getting Started (5 minutes)

### 1. Install Dependencies
```bash
cd portfolio
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio live.

---

## 🎨 Customization (Priority Order)

### Step 1: Update Hero Section (5 min)
**File**: `src/components/sections/Hero.tsx`

```typescript
// Change these values:
- Personal opening statement (line ~55)
- Animated words (line ~97)
- Subtitle/description (line ~108)
- Button text/links (line ~114-120)
```

### Step 2: Update Software Engineer Info (10 min)
**File**: `src/components/sections/SoftwareEngineer.tsx`

```typescript
// Update:
- Professional summary (line ~80-82)
- Stats: Years, Papers, Patents (line ~88-90)
- Skills by category (line ~104-116)
- Timeline events (line ~147-174)
- Achievements (line ~204-209)
```

### Step 3: Update Projects (15 min)
**File**: `src/components/sections/Projects.tsx`

```typescript
// Modify projects array (line ~27-95):
- Project title, description, problem, impact
- Technology stack
- GitHub/Live links
- Set featured: true/false
```

### Step 4: Update Navigation & Footer (5 min)
**Files**: 
- `src/components/Navigation.tsx` (line ~26-30)
- `src/components/Footer.tsx` (line ~40-60)

```typescript
// Update:
- Your name/logo
- Social media links
- Email
- Copyright year
```

### Step 5: Personalize Gym & Sports (Optional, 5 min)
**File**: `src/components/sections/GymAndSports.tsx`

```typescript
// Update:
- Section description (line ~108)
- Discipline points (line ~132-139)
- Statistics (line ~153-159)
```

---

## 🎯 Key Customization Points

### Colors
**File**: `tailwind.config.ts` (line ~11-20)

Change the color palette:
```typescript
colors: {
  'midnight': '#000000',  // Your black
  'cloud': '#ffffff',     // Your white
  // ... etc
}
```

### Typography
**File**: `src/styles/globals.css`

Modify font families and sizes for your preference.

### Animation Speed
**Files**: Individual component files

Change `duration` values:
```typescript
transition: { duration: 0.8 }  // Adjust 0.8 to your preference
```

---

## 📊 Content Structure

### Hero Section
- **What it says**: Your professional identity
- **Why it matters**: First impression (5 seconds)
- **Best practice**: Bold, authentic, memorable

### Software Engineer Section
- **What it says**: Your professional credibility
- **Why it matters**: Establishes expertise
- **Best practice**: Story-focused, achievement-backed

### Projects Section
- **What it says**: Quality of your work
- **Why it matters**: Proof of capability
- **Best practice**: Problem → Solution → Impact

### Gym & Sports Section
- **What it says**: Your character and discipline
- **Why it matters**: Differentiates you
- **Best practice**: Honest, relatable, shows depth

### Media Gallery
- **What it says**: Visual proof
- **Why it matters**: Makes achievements tangible
- **Best practice**: High-quality, curated content

---

## 🖼️ Adding Images

### Hero Section Background
Update gradient colors in Hero.tsx (line ~35-42)

### Project Images
1. Add images to `public/projects/` folder
2. Update `image` field in projects array
3. Use Next.js Image component for optimization

### Media Gallery
1. Add images to `public/media/` folder
2. Update mediaItems array (line ~33-68)
3. Images auto-display as placeholder with emoji

---

## 🔗 Adding Links

### Update Navigation
**File**: `src/components/Navigation.tsx`

```typescript
const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Engineer', href: '#engineer' },
  // Add more sections as needed
];
```

### Update Social Links
**File**: `src/components/Footer.tsx`

```typescript
{ label: 'GitHub', href: 'https://github.com/yourname' },
{ label: 'LinkedIn', href: 'https://linkedin.com/in/yourname' },
// Add your actual links
```

---

## 📱 Testing & QA

### Desktop Testing
- [ ] All sections load correctly
- [ ] Animations are smooth (60fps)
- [ ] All links work
- [ ] Hover states visible

### Mobile Testing
- [ ] Responsive layout correct
- [ ] Text readable (no overflow)
- [ ] Touch interactions work
- [ ] Navigation accessible

### Animation Testing
- [ ] Scroll animations trigger properly
- [ ] No janky transitions
- [ ] Performance is smooth
- [ ] Parallax effects work

### Accessibility
- [ ] Tab through entire site
- [ ] Keyboard navigation works
- [ ] Color contrast sufficient
- [ ] Alt text on images

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create `.env.local` if needed (for API keys, etc.)

---

## 🎬 Animation Tips

### Make Animations Faster
```typescript
transition: { duration: 0.4 }  // Reduce from 0.6-0.8
```

### Make Animations Slower
```typescript
transition: { duration: 1.2 }  // Increase from 0.6-0.8
```

### Disable Animations (for testing)
```typescript
// In individual component:
if (preferReducedMotion) {
  return <div>{content}</div>; // No animation version
}
```

---

## 🐛 Common Issues & Fixes

### Animations Not Showing
- Check if component has `isInView` state
- Verify intersection observer threshold
- Check console for errors

### Layout Shift
- Use `Framer Motion` layout prop
- Avoid dynamic width/height changes
- Set fixed dimensions when possible

### Performance Issues
- Reduce number of animated elements
- Use `transform` instead of position changes
- Profile in Chrome DevTools

### Images Not Loading
- Check `public/` folder structure
- Verify image paths in components
- Check file names (case-sensitive)

---

## 📚 File Structure Reference

```
portfolio/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   ├── sections/     # Page sections
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and constants
│   ├── styles/          # Global styles
│   └── ...
├── public/              # Static assets (images, etc.)
├── package.json         # Dependencies
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # Documentation
```

---

## 💡 Pro Tips

1. **Keep it authentic** - Your personal voice > polished but generic
2. **Tell stories** - "I led a team that..." > "Led team"
3. **Show impact** - "Saved $500K" > "Optimized costs"
4. **Use data** - "5+ years" > "Very experienced"
5. **Be specific** - "PyTorch + Kubernetes" > "Full stack"
6. **Update regularly** - Keep projects and info current
7. **Mobile-first** - Test on phones early
8. **Performance matters** - Watch your Lighthouse score

---

## 🎯 Next Steps

1. ✅ Customize all text content
2. ✅ Add your images
3. ✅ Update all links
4. ✅ Test on mobile
5. ✅ Deploy to Vercel
6. ✅ Share and iterate based on feedback

---

## 📞 Support

- Framer Motion: https://framer.com/motion
- Tailwind CSS: https://tailwindcss.com/docs
- Next.js: https://nextjs.org/docs
- TypeScript: https://www.typescriptlang.org/docs

---

**Built for winners. Designed for impact. Ready to ship.**
