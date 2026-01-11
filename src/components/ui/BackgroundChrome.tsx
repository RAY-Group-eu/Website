'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function BackgroundChrome() {
    const searchParams = useSearchParams()
    const debugBg = searchParams.get('bg')

    if (debugBg === '0') return null

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#020408]">
            {/* 1. Base Gradient - Deep Navy/Black */}
            <div
                className="absolute inset-0 opacity-40 mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle at 50% 30%, #0f1629 0%, #020408 60%)'
                }}
            />

            {/* 2. Delicate Noise Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* 3. Subtle Vignette */}
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, #000000 120%)'
                }}
            />

            {/* 4. Ultra-Subtle Top Glow (Studio Light) */}
            <div
                className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] opacity-10 blur-[100px] rounded-full bg-blue-900/40"
            />
        </div>
    )
}
