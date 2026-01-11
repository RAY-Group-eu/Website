'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/home/Hero'
import Principles from '@/components/home/Principles'
import ProjectsGallery from '@/components/home/ProjectsGallery'
import Founder from '@/components/home/Founder'

import Footer from '@/components/layout/Footer'
import LenisScroll from '@/components/layout/LenisScroll'
import CookieConsent from '@/components/ui/CookieConsent'

export default function Home() {
  return (
    <LenisScroll>
      <motion.div
        className="min-h-screen relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <main>
          <Hero />
          <Principles />
          <ProjectsGallery />
          <Founder />
        </main>
        <Footer />
        <CookieConsent />
      </motion.div>
    </LenisScroll>
  );
}
