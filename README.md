# Tonik Design Studio — Next.js

A recreation of the Tonik design studio website, built with Next.js 15, Tailwind CSS v4, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Stack

- **Next.js 15** — App Router
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — scroll-reveal animations
- **Radix UI** — headless accordion component
- **Lucide React** — icons
- **React Icons** — brand logos

## Project Structure

```
app/
  layout.tsx       # Root layout with metadata
  page.tsx         # Home page
  globals.css      # Global styles & Tailwind theme
components/
  layout/
    Navbar.tsx     # Sticky navigation bar
    Footer.tsx     # Footer with large wordmark
  sections/
    Hero.tsx       # Full-viewport hero
    ClientLogos.tsx  # Client logo grid
    CaseStudies.tsx  # Case study portfolio grid
    Services.tsx   # Services accordion
    Studio.tsx     # Team & studio section
    ContactCTA.tsx # Get in touch CTA
    Blog.tsx       # Blog post cards
  ui/
    accordion.tsx  # Radix UI accordion wrapper
lib/
  utils.ts         # cn() utility
public/
  hero-emblem.png  # Hero 3D emblem image
  case-*.png/jpg   # Case study images
  team-*.jpg       # Studio team photos
```

## Build for Production

```bash
npm run build
npm run start
```
