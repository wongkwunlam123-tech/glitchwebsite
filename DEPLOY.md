# GLITCH Robotics Website Deployment

## Local development

```bash
cd "/Users/wkl/Desktop/Glitch Offical Website Zip/meoo3"
npm install
npm run dev
```

Open http://localhost:3015

## Deploy to Vercel

1. Push this folder to GitHub
2. Open https://vercel.com
3. Import the repository
4. Use the default settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Deploy

## Deploy to Netlify

1. Push this folder to GitHub
2. Open https://netlify.com
3. Import the repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy

This project already includes SPA redirects for React Router routing:
- `vercel.json`
- `public/_redirects`
- `netlify.toml`

## Production readiness

The website is built successfully and is ready for static hosting.
The only remaining requirement for real form submissions is a valid backend or Supabase configuration if you want contact/application forms to save data.
