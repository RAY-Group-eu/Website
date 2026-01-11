'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { siteConfig } from '@/content/config'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20)
    })

    // Scroll Spy Logic
    useEffect(() => {
        const handleScroll = () => {
            const sections = siteConfig.nav
                .map(item => item.href.startsWith('#') ? item.href.substring(1) : null)
                .filter(Boolean) as string[]

            // Default to first section when at top
            if (window.scrollY < 100) {
                setActiveSection('')
                return
            }

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    // If top of section is within viewport or close to it
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        setActiveSection(`#${sectionId}`)
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
                className={clsx(
                    'fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b',
                    isScrolled
                        ? 'border-white/5 bg-ray-dark/60 backdrop-blur-xl supports-[backdrop-filter]:bg-ray-dark/40 py-3'
                        : 'border-transparent bg-transparent py-6'
                )}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Brand Logo - Stable Implementation */}
                    <Link href="/" className="relative z-50 group flex items-center gap-2">
                        <div className="relative">
                            <span className="font-display text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-ray-blue">
                                RAY
                            </span>
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-ray-blue/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <span className={clsx(
                            "font-display text-2xl tracking-tight transition-all duration-500 font-light",
                            isScrolled ? "text-white/40 group-hover:text-white/80" : "text-white/40 group-hover:text-white/60"
                        )}>
                            GROUP
                        </span>
                    </Link>

                    {/* Desktop Nav - Smart Link Implementation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <div className={clsx(
                            "flex items-center gap-1 p-1 rounded-full border transition-all duration-500",
                            isScrolled ? "bg-white/5 border-white/5 backdrop-blur-md shadow-2xl shadow-black/20" : "bg-transparent border-transparent"
                        )}>
                            {siteConfig.nav.map((link) => {
                                const isActive = activeSection === link.href
                                const isHash = link.href.startsWith('#')

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => {
                                            if (isHash) {
                                                e.preventDefault()
                                                if (window.location.pathname !== '/') {
                                                    // Force navigation to home with hash
                                                    window.location.href = '/' + link.href
                                                } else {
                                                    // Smooth scroll on home
                                                    const target = document.querySelector(link.href)
                                                    if (target) {
                                                        const offset = 80 // Header height buffer
                                                        const elementPosition = target.getBoundingClientRect().top
                                                        const offsetPosition = elementPosition + window.scrollY - offset

                                                        window.scrollTo({
                                                            top: offsetPosition,
                                                            behavior: "smooth"
                                                        })
                                                        window.history.pushState(null, '', link.href)
                                                    }
                                                }
                                            }
                                        }}
                                        className={clsx(
                                            "relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300",
                                            isActive
                                                ? "text-white bg-white/10"
                                                : "text-white/60 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        {link.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute inset-0 rounded-full border border-white/10"
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden z-50 relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={20} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={20} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-30 bg-ray-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-8">
                            {siteConfig.nav.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={(e) => {
                                            setIsMobileMenuOpen(false)
                                            if (link.href.startsWith('#')) {
                                                e.preventDefault()
                                                if (window.location.pathname !== '/') {
                                                    window.location.href = '/' + link.href
                                                } else {
                                                    const target = document.querySelector(link.href)
                                                    if (target) {
                                                        setTimeout(() => {
                                                            const offset = 80
                                                            const elementPosition = target.getBoundingClientRect().top
                                                            const offsetPosition = elementPosition + window.scrollY - offset

                                                            window.scrollTo({
                                                                top: offsetPosition,
                                                                behavior: "smooth"
                                                            })
                                                        }, 300)
                                                    }
                                                }
                                            }
                                        }}
                                        className="text-4xl font-display font-medium text-white/50 hover:text-white hover:scale-105 transition-all duration-300 block"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-12 text-white/30 text-xs font-mono"
                        >
                            {siteConfig.domain}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
