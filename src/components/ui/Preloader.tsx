'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { canStartIntro, markIntroStarted, markIntroCompleted, isIntroCompleted } from '@/lib/introController'

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true)
    const searchParams = useSearchParams()

    // 1. Module-level Guard (Survives Remounts)
    // If intro is already done in this session, don't render anything (prevents flash)
    if (isIntroCompleted()) {
        return null
    }

    useEffect(() => {
        // 2. Logic Check
        const shouldStart = canStartIntro()

        if (!shouldStart) {
            setIsLoading(false)
            return
        }

        // 3. Start Intro
        markIntroStarted()
        document.body.style.overflow = 'hidden'

        const timer = setTimeout(() => {
            handleComplete()
        }, 2000) // 2.0s intro duration

        // Failsafe
        const failsafe = setTimeout(() => {
            handleComplete()
        }, 4000)

        function handleComplete() {
            markIntroCompleted()
            setIsLoading(false)
            document.body.style.overflow = ''
            clearTimeout(timer)
            clearTimeout(failsafe)
        }

        return () => {
            clearTimeout(timer)
            clearTimeout(failsafe)
            document.body.style.overflow = ''
        }
    }, [searchParams])

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-ray-dark"
                >
                    <div className="relative">
                        {/* Center Logo / Text */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="text-4xl font-display font-bold text-white tracking-widest relative">
                                RAY
                                <div className="absolute -inset-4 bg-ray-blue/20 blur-xl rounded-full opacity-50 animate-pulse" />
                            </div>
                        </motion.div>

                        {/* Loading Line */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 100, opacity: 1 }}
                            exit={{ width: 200, opacity: 0 }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-ray-blue to-transparent"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
