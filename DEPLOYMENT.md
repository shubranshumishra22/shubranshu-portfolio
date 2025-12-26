# Deployment Guide

## 🚀 Quick Deploy to Vercel (Recommended)

### Step 1: Prepare Repository
```bash
# Initialize Git if not already done
git init
git add .
git commit -m "Initial portfolio commit"
```

### Step 2: Push to GitHub
```bash
# Create repo on github.com
# Then push:
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**That's it!** Vercel will:
- Detect Next.js project
- Automatically optimize
- Provide HTTPS, CDN, analytics
- Set up preview deployments

---

## 🌐 Domain Setup

### Connect Custom Domain
1. Log in to Vercel dashboard
2. Go to Settings → Domains
3. Add your domain
4. Follow DNS instructions
5. Deploy automatically to domain

### Recommended Domains
- `yourname.dev`
- `your-portfolio.com`
- `yourname.io`

---

## 📊 Post-Deployment Checklist

### Performance
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Monitor bundle size
- [ ] Test on slow network

### Functionality
- [ ] All links work
- [ ] Navigation correct
- [ ] Forms submit (if any)
- [ ] Animations smooth

### Mobile
- [ ] Responsive layout
- [ ] Touch interactions
- [ ] Performance on 4G
- [ ] Viewport settings

### SEO
- [ ] Meta tags set
- [ ] Open Graph tags added
- [ ] Sitemap generated
- [ ] robots.txt created

### Analytics
- [ ] Google Analytics set up
- [ ] Tracking events configured
- [ ] Conversion goals defined

---

## 🔧 Environment Setup

### Create `.env.local` (if needed)
```bash
# For API keys, etc.
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Environment-Specific Config
```typescript
// In your code:
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

---

## 📈 Monitoring & Maintenance

### Vercel Dashboard
- Real-time deployment logs
- Performance metrics
- Error tracking
- Analytics

### Google Analytics
1. Create account at analytics.google.com
2. Add measurement ID
3. Create `lib/gtag.ts`:

```typescript
export const GA_ID = 'G-XXXXXXXXXX';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined') {
    (window as any).gtag?.('config', GA_ID, {
      page_path: url,
    });
  }
};
```

4. Add to `app/layout.tsx`:

```typescript
import { GA_ID } from '@/lib/gtag';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 🔐 Security Best Practices

### HTTPS
- ✅ Vercel provides automatic HTTPS
- All data encrypted in transit

### Headers
Add to `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        }
      ]
    }
  ]
}
```

### Dependencies
```bash
# Audit packages
npm audit

# Update packages
npm update

# Check for vulnerabilities
npm audit fix
```

---

## 📧 Email Setup (Optional)

### Add Contact Form
Install: `npm install react-hook-form`

```typescript
import { useForm } from 'react-hook-form';

export default function ContactForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    // Send to API endpoint or service
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      <input {...register('email')} />
      <textarea {...register('message')} />
      <button type="submit">Send</button>
    </form>
  );
}
```

### Email Service Options
- **Vercel Email**: Built-in
- **SendGrid**: Email API
- **Formspree**: Form handling
- **Netlify Forms**: If on Netlify

---

## 🔄 CI/CD Pipeline

### Automatic Deployments
Vercel automatically deploys on:
- Push to main branch
- Pull request creation (preview)
- Scheduled deployments (optional)

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
```

---

## 📦 Build Optimization

### Bundle Analysis
```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // your Next.js config
});

# Run analysis
ANALYZE=true npm run build
```

### Code Splitting
- Next.js does this automatically
- Monitor with bundle analyzer
- Split large components with dynamic imports

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <p>Loading...</p>,
});
```

---

## 🌍 Global CDN

### Vercel Edge Network
- Automatic with Vercel
- Deploy code to 280+ cities
- Ultra-low latency
- No configuration needed

### Image Optimization
Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority={false}
/>
```

---

## 📊 SEO Optimization

### Meta Tags
In `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Shubran - Software Engineer & ML Researcher',
  description: 'High-performing engineer building systems that matter',
  openGraph: {
    title: 'Shubran Portfolio',
    description: 'Software Engineer & ML Researcher',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubran Portfolio',
    description: 'High-performing engineer',
  },
};
```

### Robots & Sitemap
Create `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml
```

Create `app/sitemap.ts`:

```typescript
export default function sitemap() {
  return [
    {
      url: 'https://yoursite.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];
}
```

---

## 🚨 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next
npm run build
```

### Animations Stuttering
- Check console for errors
- Verify GPU acceleration
- Reduce animation complexity
- Check for layout shifts

### Performance Issues
```bash
# Check build output
npm run build

# Analyze bundle
ANALYZE=true npm run build

# Test locally
npm run dev
```

### Database Issues
- Check connection strings
- Verify database is running
- Check firewall rules

---

## 📱 Mobile Optimization

### Viewport Settings
Already in `app/layout.tsx`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### Touch-Friendly
- Buttons: 48x48px minimum
- Links: Proper spacing
- No hover-only interactions

### Performance
- Test on 4G network
- Check LCP, FID, CLS
- Monitor with Lighthouse

---

## 🎯 Post-Launch Tasks

### Week 1
- [ ] Monitor performance
- [ ] Fix any issues
- [ ] Check all links
- [ ] Test on various devices

### Month 1
- [ ] Analyze user behavior
- [ ] Get feedback
- [ ] Update content if needed
- [ ] Optimize based on analytics

### Ongoing
- [ ] Keep dependencies updated
- [ ] Monitor security alerts
- [ ] Regular backups
- [ ] Content updates

---

## 🆘 Emergency Rollback

If something breaks:

```bash
# Revert last commit
git revert HEAD
git push origin main

# Vercel will automatically redeploy previous version
```

---

## 📚 Additional Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Web Vitals**: https://web.dev/vitals
- **SEO Guide**: https://nextjs.org/learn/seo/introduction-to-seo

---

**Deployed and monitoring. Your portfolio is live! 🚀**
