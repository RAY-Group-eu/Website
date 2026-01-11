'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Founder() {
    return (
        <section className="py-20 md:py-32 relative z-10 border-t border-white/5 bg-gradient-to-b from-ray-dark to-ray-navy">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <span className="text-sm font-medium text-ray-blue mb-4 block">Origin</span>

                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
                    Founded by Rezan Yalçin
                </h2>

                <p className="text-lg text-white/60 leading-relaxed mb-10 text-balance">
                    Ray Group represents a consolidated vision for digital excellence.
                    Bringing together years of experience in product strategy, engineering, and design to build
                    ventures that matter.
                </p>

                <Link
                    href="https://rezanyalcin.com"
                    target="_blank"
                    className="inline-flex items-center gap-2 text-white hover:text-ray-blue transition-colors font-medium group"
                >
                    More about Rezan
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    )
}
