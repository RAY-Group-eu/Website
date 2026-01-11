'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ArrowRight, Check, Send } from 'lucide-react'
import clsx from 'clsx'
import LenisScroll from '@/components/layout/LenisScroll'

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')

        // Simulate sending
        setTimeout(() => {
            setStatus('success')
        }, 1500)
    }

    return (
        <LenisScroll>
            <Header />
            <main className="min-h-screen pt-32 pb-20 relative overflow-hidden flex flex-col items-center justify-center">
                {/* Backgrounds */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ray-blue/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10 max-w-2xl">
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-display font-medium text-white mb-6"
                        >
                            Start a Dialogue
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-white/50"
                        >
                            We are currently accepting new partnerships for Q3 2026.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
                    >
                        {status === 'success' ? (
                            <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/30"
                                >
                                    <Check className="w-10 h-10" />
                                </motion.div>
                                <h3 className="text-2xl font-display font-medium text-white mb-4">Message Received</h3>
                                <p className="text-white/50 max-w-sm mx-auto">
                                    Thank you for reaching out. We review all inquiries carefully and will respond if there is a potential fit.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70 ml-1">Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-ray-blue/50 focus:bg-black/40 transition-all"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70 ml-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-ray-blue/50 focus:bg-black/40 transition-all"
                                            placeholder="jane@company.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 ml-1">Topic</label>
                                    <select
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-ray-blue/50 focus:bg-black/40 transition-all appearance-none"
                                        defaultValue=""
                                    >
                                        <option value="" disabled className="bg-gray-900">Select a topic...</option>
                                        <option value="partnership" className="bg-gray-900">Partnership Inquiry</option>
                                        <option value="product" className="bg-gray-900">Product Demo</option>
                                        <option value="career" className="bg-gray-900">Career Opportunities</option>
                                        <option value="other" className="bg-gray-900">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 ml-1">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-ray-blue/50 focus:bg-black/40 transition-all resize-none"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 disabled:opacity-50 transition-all mt-4"
                                >
                                    {status === 'submitting' ? (
                                        <>Sending...</>
                                    ) : (
                                        <>Send Message <Send className="w-4 h-4" /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </main>
            <Footer />
        </LenisScroll>
    )
}
