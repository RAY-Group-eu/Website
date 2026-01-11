'use client'

import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
            {/* Foreground Content (Z-10) */}
            <div className="container relative z-10 px-6 text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                        Venture Studio
                    </span>
                    <h1 className="text-[3.5rem] leading-[1.0] md:text-8xl lg:text-[10rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 tracking-tighter mb-8 drop-shadow-2xl">
                        RAY GROUP
                    </h1>
                    <p className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto font-light tracking-wide px-4 leading-relaxed mix-blend-plus-lighter">
                        Building trustworthy digital products, consulting, and <br className="hidden md:block" /> research-driven media.
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none z-20">
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent overflow-hidden">
                    <motion.div
                        animate={{ y: [-20, 20] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-full h-[50%] bg-white/30 blur-[1px]"
                    />
                </div>
            </div>
        </section>
    )
}


