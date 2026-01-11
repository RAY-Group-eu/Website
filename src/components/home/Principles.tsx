'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { principles } from '@/content/config'
import { Lock, Fingerprint, ArrowRight } from 'lucide-react'
import clsx from 'clsx'

export default function Principles() {
  const containerRef = useRef<HTMLElement>(null)
  const [activeChapter, setActiveChapter] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ['start start', 'end end']
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Breakpoints for 3 chapters: 0-0.33, 0.33-0.66, 0.66-1
    const index = Math.min(Math.floor(latest * 3), 2)
    if (index !== activeChapter) setActiveChapter(index)
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Transform progress for specific indicators
  const activeChapterProgress = useTransform(smoothProgress, [0, 1], [0, 3])

  return (
    <section id="principles" ref={containerRef} className="relative h-[300vh] bg-ray-dark">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

        {/* Background Ambient Layers */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            animate={{
              opacity: activeChapter === 0 ? 0.4 : 0.2,
              scale: activeChapter === 0 ? 1.1 : 1,
            }}
            transition={{ duration: 1 }}
            className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-ray-blue/10 rounded-full blur-[80px] md:blur-[120px]"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full content-center">

          {/* Left: Text Content - Staggered Appearance */}
          <div className="order-2 lg:order-1 relative h-48 md:h-64 lg:h-auto flex flex-col justify-center min-h-[300px]">
            {principles.map((chapter, i) => (
              <div
                key={chapter.id}
                className={clsx(
                  "transition-all duration-700 absolute top-1/2 -translate-y-1/2 left-0 w-full max-w-xl",
                  activeChapter === i
                    ? "opacity-100 translate-y-0 relative pointer-events-auto"
                    : "opacity-0 translate-y-8 absolute pointer-events-none"
                )}
                aria-hidden={activeChapter !== i}
              >
                <div className="flex items-center gap-3 mb-4 md:mb-6 text-ray-blue">
                  <chapter.icon className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-widest font-mono">
                    0{i + 1} // {chapter.id}
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-medium text-white mb-4 md:mb-6 leading-[1.1] tracking-tight">
                  {chapter.title}
                </h2>
                <p className="text-base md:text-xl text-white/70 leading-relaxed text-balance font-light">
                  {chapter.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Visuals */}
          <div className="order-1 lg:order-2 flex items-center justify-center relative h-[400px] md:h-[500px] lg:h-[700px] w-full perspective-1000">

            {/* Visual 1: Trust (Refined Glass + Scanning Light) */}
            <VisualWrapper active={activeChapter === 0}>
              <div className="relative w-64 h-80 md:w-80 md:h-96 glass bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Grid Texture */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Center Core */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center relative">
                    <Lock className="w-8 h-8 text-white/40" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, ease: 'circOut' }} // Run once
                      className="absolute inset-0 border-t border-r border-transparent border-t-ray-blue border-r-ray-blue rounded-full"
                    />
                    {/* Added Layer 1: Static Pulse Ring */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1.4, opacity: 0.2 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="absolute inset-0 border border-white rounded-full bg-white/5"
                    />
                    {/* Added Layer 2: Glow Accent */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.8 }}
                      className="absolute inset-0 bg-ray-blue/20 blur-xl rounded-full"
                    />
                  </div>
                </div>

                {/* Scanning Beam - Runs Once */}
                {!shouldReduceMotion && (
                  <motion.div
                    initial={{ top: '-20%' }}
                    whileInView={{ top: '120%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.2 }}
                    className="absolute left-0 w-full h-1 bg-ray-blue/50 blur-sm shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  />
                )}
              </div>
            </VisualWrapper>

            {/* Visual 2: AI (Council Debate -> Chairman -> Synthesis) */}
            <VisualWrapper active={activeChapter === 1}>
              <div className="relative w-full h-full flex items-center justify-center">
                {/* 1. The Debate: Models debating (Orbiting nodes) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-8 h-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center z-10"
                      initial={{ opacity: 0, x: 0, y: 0 }}
                      whileInView={{
                        opacity: [0, 1, 0.5],
                        x: Math.cos((angle * Math.PI) / 180) * 120, // Move OUT to ring
                        y: Math.sin((angle * Math.PI) / 180) * 120,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        ease: "circOut",
                        delay: i * 0.1,
                      }}
                    >
                      {/* Message particles shooting to center */}
                      <motion.div
                        className="absolute w-1 h-1 bg-ray-blue rounded-full"
                        initial={{ opacity: 0, x: 0, y: 0 }}
                        whileInView={{
                          opacity: [0, 1, 0],
                          x: -Math.cos((angle * Math.PI) / 180) * 120, // Shoot IN to center
                          y: -Math.sin((angle * Math.PI) / 180) * 120,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 1.5 + (i * 0.1), // After nodes settle
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* 2. The Chairman: Central ring processing */}
                <motion.div
                  className="absolute z-20 w-32 h-32 rounded-full border border-ray-blue/30 bg-ray-blue/5 backdrop-blur-lg flex items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{
                    scale: 1,
                    opacity: 1,
                    borderColor: "rgba(96,165,250,0.6)"
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 2.2 }} // Appears as messages arrive
                >
                  <div className="absolute inset-0 rounded-full border border-ray-blue/20 animate-ping opacity-20" />
                  <span className="text-[10px] font-mono text-ray-blue tracking-widest uppercase opacity-80">CHAIRMAN</span>
                </motion.div>

                {/* 3. Synthesis: Final output beam */}
                <motion.div
                  className="absolute z-30 flex items-center gap-2 bg-ray-blue/10 border border-ray-blue/40 px-4 py-2 rounded-lg backdrop-blur-xl"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 80, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 3.2 }}
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs text-emerald-200 font-mono tracking-wide">CONFIFIED SYNTHESIS</span>
                </motion.div>

                {/* Timeline Labels (Subtle) */}
                <motion.div
                  className="absolute bottom-0 w-full flex justify-between px-10 text-[10px] uppercase tracking-widest text-white/20 font-mono"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                >
                  <span>Debate</span>
                  <span>Review</span>
                  <span>Truth</span>
                </motion.div>
              </div>
            </VisualWrapper>

            {/* Visual 3: Design (Micro-interaction Showcase) */}
            <VisualWrapper active={activeChapter === 2}>
              <div className="relative flex flex-col gap-3 md:gap-4 w-60 md:w-72">
                {/* Card 1: Toggle Switch */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="glass p-3 md:p-4 rounded-xl border border-white/10 flex items-center justify-between"
                >
                  <span className="text-xs md:text-sm text-white/70">Notifications</span>
                  <div className="w-8 h-5 md:w-10 md:h-6 bg-ray-blue rounded-full relative p-0.5 md:p-1">
                    <motion.div
                      animate={{ x: [0, 14, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                      className="w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </div>
                </motion.div>

                {/* Card 2: Interactive Button */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="glass p-3 md:p-4 rounded-xl border border-white/10 flex flex-col gap-3"
                >
                  <div className="h-2 w-1/2 bg-white/10 rounded" />
                  <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-white transition-colors border border-white/5 flex items-center justify-center gap-2 group">
                    <span>Confirm</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                {/* Card 3: Slider */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="glass p-3 md:p-4 rounded-xl border border-white/10"
                >
                  <div className="flex justify-between text-xs text-white/50 mb-2">
                    <span>Intensity</span>
                    <span>80%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: ["0%", "80%", "60%", "90%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-ray-blue to-purple-400"
                    />
                  </div>
                </motion.div>

                {/* Touch Indicator - Floating Fingerprint */}
                <motion.div
                  className="absolute -right-4 bottom-10 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                  animate={{
                    scale: [1, 0.9, 1],
                    boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.2)", "0 0 0px rgba(255,255,255,0)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Fingerprint className="w-5 h-5 text-white/80" />
                </motion.div>
              </div>
            </VisualWrapper>

          </div>
        </div>

        {/* Cinematic Progress Indicator */}
        <div className="absolute bottom-8 left-0 w-full z-20">
          <div className="container mx-auto px-6">
            <div className="flex items-end gap-4 border-t border-white/10 pt-4">
              <span className="text-4xl font-display font-bold text-white/20 leading-none">
                0{activeChapter + 1}
              </span>

              <div className="flex-1 h-[2px] bg-white/5 relative top-[-6px] overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-ray-blue"
                  style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                />
              </div>

              <span className="text-sm font-mono text-white/30 leading-none pb-1">
                / 03
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VisualWrapper({ children, active }: { children: React.ReactNode, active: boolean }) {
  return (
    <div
      className={clsx(
        "absolute inset-0 flex items-center justify-center transition-all duration-700",
        active ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm delay-0 pointer-events-none"
      )}
    >
      {children}
    </div>
  )
}
