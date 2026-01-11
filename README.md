# Ray Group Website

A premium, cinematic website for Ray Group, built with Next.js, Tailwind CSS, and React Three Fiber.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + Custom "Liquid Glass" Design System
- **Animation**: Framer Motion, GSAP
- **3D**: React Three Fiber, Drei
- **Smooth Scroll**: Lenis

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run local server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/content/projects.ts` -> **Single Source of Truth** for detailed project data.
- `src/app/globals.css` -> Design system tokens (colors, animations, noise).
- `src/components/home` -> Homepage sections (Hero, Principles, Gallery).
- `src/components/layout` -> Shared layout (Header, Footer, Scroll).

## Customization

### Adding a Project
Edit `src/content/projects.ts` and add a new object to the `projects` array.

### Design System
Adjust colors and glass parameters in `src/app/globals.css` inside the `:root` and `@theme` blocks.

## Deployment

Deploy to Vercel or any Next.js compatible host.
```bash
npm run build
```
