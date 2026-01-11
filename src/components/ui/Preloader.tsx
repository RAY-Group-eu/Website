'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true)
    const hasRunRef = useRef(false)
    const searchParams = useSearchParams()

    useEffect(() => {
        // 1. Debug Toggle Check
        const debugIntro = searchParams.get('intro')
        if (debugIntro === '0') {
            setIsLoading(false)
            return
        }

        // 2. Strict Mode Guard: If already ran, do nothing
        if (hasRunRef.current) return
        hasRunRef.current = true

        let timer: NodeJS.Timeout

        // 3. Failsafe & Logic wrapped in try/finally (conceptually)
        // We use a robust timeout sequence
        try {
            document.body.style.overflow = 'hidden'

            timer = setTimeout(() => {
                setIsLoading(false)
                document.body.style.overflow = ''
            }, 2000) // 2.0s intro duration

        } catch (e) {
            console.error("Intro Error:", e)
            // Error failsafe
            setIsLoading(false)
            document.body.style.overflow = ''
        }

        // 4. Cleanup
        return () => {
            clearTimeout(timer)
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
