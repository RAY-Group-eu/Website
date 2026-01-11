'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { canStartIntro, markIntroStarted, markIntroCompleted, isIntroCompleted } from '@/lib/introController'
import { isIntroDisabled } from '@/lib/safeMode'

export default function Preloader() {
    const searchParams = useSearchParams()

    // Initialize state based on module-level check
    // IMPORTANT: Do NOT return early before hooks - violates React rules
    const [isLoading, setIsLoading] = useState(() => {
        // Initial state: show loading if intro hasn't completed yet
        // This runs once during initialization
        if (typeof window === 'undefined') return false
        return !isIntroCompleted()
    })

    useEffect(() => {
        // Safe Mode check - immediately complete if intro is disabled
        if (isIntroDisabled()) {
            markIntroCompleted()
            setIsLoading(false)
            return
        }

        // Full logic check
        const shouldStart = canStartIntro()

        if (!shouldStart) {
            setIsLoading(false)
            return
        }

        // Start Intro
        markIntroStarted()
        document.body.style.overflow = 'hidden'

        let timer: NodeJS.Timeout
        let failsafe: NodeJS.Timeout
        let completed = false

        function handleComplete() {
            if (completed) return
            completed = true
            markIntroCompleted()
            setIsLoading(false)
            document.body.style.overflow = ''
            clearTimeout(timer)
            clearTimeout(failsafe)
        }

        timer = setTimeout(() => {
            handleComplete()
        }, 2000) // 2.0s intro duration

        // Failsafe: force complete after 4s
        failsafe = setTimeout(() => {
            console.warn('[Preloader] Failsafe triggered after 4s')
            handleComplete()
        }, 4000)

        return () => {
            clearTimeout(timer)
            clearTimeout(failsafe)
            document.body.style.overflow = ''
        }
    }, [searchParams])

    // After hooks, we can conditionally render
    // Only render if isLoading is true
    if (!isLoading) return null

    return (
        <AnimatePresence mode="wait">
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
        </AnimatePresence>
    )
}
