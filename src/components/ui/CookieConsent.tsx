'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Check, ChevronDown, Shield, BarChart3, Zap } from 'lucide-react'
import clsx from 'clsx'

export default function CookieConsent() {
    const [isOpen, setIsOpen] = useState(false)
    const [showPreferences, setShowPreferences] = useState(false)

    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: false,
        functional: false
    })

    useEffect(() => {
        const saved = localStorage.getItem('ray-cookie-consent')
        if (!saved) {
            const timer = setTimeout(() => setIsOpen(true), 1500)
            return () => clearTimeout(timer)
        } else {
            setPreferences(JSON.parse(saved))
        }

        const handleReopen = () => {
            const savedPrefs = localStorage.getItem('ray-cookie-consent')
            if (savedPrefs) {
                setPreferences(JSON.parse(savedPrefs))
            }
            setIsOpen(true)
            setShowPreferences(true)
        }

        window.addEventListener('open-cookie-settings', handleReopen)
        return () => window.removeEventListener('open-cookie-settings', handleReopen)
    }, [])

    const handleAcceptAll = () => {
        const newPrefs = { essential: true, analytics: true, functional: true }
        save(newPrefs)
    }

    const handleDecline = () => {
        const newPrefs = { essential: true, analytics: false, functional: false }
        save(newPrefs)
    }

    const handleSavePreferences = () => {
        save(preferences)
    }

    const save = (prefs: typeof preferences) => {
        setPreferences(prefs)
        localStorage.setItem('ray-cookie-consent', JSON.stringify(prefs))
        // Here you would trigger analytics initialization based on prefs.analytics
        setIsOpen(false)
        setShowPreferences(false)
    }

    const togglePreference = (key: 'analytics' | 'functional') => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 z-[100] p-4 flex justify-center items-end pointer-events-none"
            >
                <div className="w-full max-w-2xl pointer-events-auto">
                    <div className="glass backdrop-blur-2xl bg-[#050A14]/90 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

                        {/* Header Content */}
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-4 md:items-start justify-between">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-display font-medium text-white flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-ray-blue shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                        <span>Cookie Preferences</span>
                                    </h3>
                                    <p className="text-sm text-gray-400 text-balance leading-relaxed max-w-md">
                                        We use cookies to enhance your experience.
                                        Analytics are only loaded after your explicit consent.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2 min-w-fit">
                                    <button
                                        onClick={() => setShowPreferences(!showPreferences)}
                                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 flex items-center gap-2"
                                    >
                                        <Settings className="w-4 h-4" />
                                        {showPreferences ? 'Hide' : 'Customize'}
                                        <ChevronDown className={clsx("w-3 h-3 transition-transform", showPreferences && "rotate-180")} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Collapsible Preferences */}
                        <motion.div
                            initial={false}
                            animate={{ height: showPreferences ? 'auto' : 0, opacity: showPreferences ? 1 : 0 }}
                            className="overflow-hidden border-t border-white/5 bg-black/20"
                        >
                            <div className="p-6 space-y-4">
                                {/* Essential */}
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                                            <Shield className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Essential</p>
                                            <p className="text-xs text-gray-500">Required for the site to function.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                        <span className="text-xs text-gray-300 font-medium">Always Active</span>
                                    </div>
                                </div>

                                {/* Analytics */}
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-start gap-3">
                                        <div className={clsx("p-2 rounded-lg transition-colors", preferences.analytics ? "bg-ray-blue/10 text-ray-blue" : "bg-white/5 text-gray-400")}>
                                            <BarChart3 className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Analytics</p>
                                            <p className="text-xs text-gray-500">Help us improve our website.</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => togglePreference('analytics')}
                                        className={clsx(
                                            "w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-ray-blue/50",
                                            preferences.analytics ? "bg-ray-blue" : "bg-white/10 hover:bg-white/20"
                                        )}
                                    >
                                        <motion.div
                                            animate={{ x: preferences.analytics ? 22 : 2 }}
                                            className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                                        />
                                    </button>
                                </div>

                                {/* Functional */}
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-start gap-3">
                                        <div className={clsx("p-2 rounded-lg transition-colors", preferences.functional ? "bg-purple-500/10 text-purple-400" : "bg-white/5 text-gray-400")}>
                                            <Zap className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Functional</p>
                                            <p className="text-xs text-gray-500">Enhanced features and personalization.</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => togglePreference('functional')}
                                        className={clsx(
                                            "w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-purple-500/50",
                                            preferences.functional ? "bg-purple-600" : "bg-white/10 hover:bg-white/20"
                                        )}
                                    >
                                        <motion.div
                                            animate={{ x: preferences.functional ? 22 : 2 }}
                                            className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                                        />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Actions */}
                        <div className="p-4 bg-white/5 flex gap-3">
                            <button
                                onClick={handleAcceptAll}
                                className="flex-1 bg-white text-black hover:bg-gray-100 text-sm font-medium py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]"
                            >
                                Accept All
                            </button>
                            {showPreferences ? (
                                <button
                                    onClick={handleSavePreferences}
                                    className="flex-1 bg-white/10 hover:bg-white/15 text-white text-sm font-medium py-2.5 rounded-xl transition-all border border-white/10 active:scale-[0.98]"
                                >
                                    Save Preferences
                                </button>
                            ) : (
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium py-2.5 rounded-xl transition-all border border-white/10 active:scale-[0.98]"
                                >
                                    Decline
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
