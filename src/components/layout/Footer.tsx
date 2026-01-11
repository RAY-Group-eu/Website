'use client'

import Link from 'next/link'
import { siteConfig } from '@/content/config'
import { motion } from 'framer-motion'

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#020408] border-t border-white/5 pt-20 pb-10 overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">

                    {/* Brand Column */}
                    <div className="md:col-span-2 pr-0 md:pr-12">
                        <Link href="/" className="inline-block mb-6 group">
                            <span className="font-display text-3xl font-bold tracking-tight text-white group-hover:text-ray-blue transition-colors">
                                RAY <span className="text-white/30 group-hover:text-ray-blue/50">GROUP</span>
                            </span>
                        </Link>
                        <p className="text-lg text-white/50 leading-relaxed text-balance max-w-md">
                            {siteConfig.shortDescription}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Explore</h4>
                        <ul className="space-y-4">
                            {siteConfig.nav.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/60 hover:text-white transition-colors relative group inline-flex items-center gap-2">
                                        {link.name}
                                        <span className="w-1 h-1 rounded-full bg-ray-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Legal</h4>
                        <ul className="space-y-4">
                            {siteConfig.footer.legal.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/60 hover:text-white transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                {/* This will trigger the existing cookie consent modal if implemented globally, 
                                    or redirect to a page. Flagship request said "Cookie settings link that opens existing consent UI"
                                    Assuming the Consent UI listens for a specific event or hash. 
                                    For now linking to policy or #settings 
                                */}
                                <button
                                    onClick={() => document.dispatchEvent(new CustomEvent('open-cookie-settings'))}
                                    className="text-white/60 hover:text-white transition-colors text-sm text-left"
                                >
                                    Cookie Settings
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-white/30 text-sm">
                        &copy; {currentYear} {siteConfig.name}. All rights reserved.
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-white/30 text-sm font-mono">
                            {siteConfig.domain}
                        </div>
                        <div className="h-4 w-[1px] bg-white/10" />
                        <div className="text-white/30 text-sm">
                            Founded by <span className="text-white/60">{siteConfig.founder}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
