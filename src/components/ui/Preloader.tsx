'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate initial load / wait for hydration
        // In a real app, you might wait for specific assets or document.readyState
        const timer = setTimeout(() => {
            setIsLoading(false)
            document.body.style.overflow = ''
        }, 1200) // 1.2s minimum load time for effect

        document.body.style.overflow = 'hidden'

        return () => {
            clearTimeout(timer)
            document.body.style.overflow = ''
        }
    }, [])

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-ray-dark"
                >
                    <div className="relative">
                        {/* Center Logo / Text */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="text-4xl font-display font-bold text-white tracking-widest relative">
                                RAY
                                <div className="absolute -inset-4 bg-ray-blue/20 blur-xl rounded-full opacity-50" />
                            </div>
                        </motion.div>

                        {/* Loading Line */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 100, opacity: 1 }}
                            exit={{ width: 200, opacity: 0 }}
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-ray-blue to-transparent"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
