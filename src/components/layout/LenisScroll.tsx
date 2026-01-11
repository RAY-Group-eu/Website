'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'

export default function LenisScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        })

        let animationId: number

        function raf(time: number) {
            lenis.raf(time)
            animationId = requestAnimationFrame(raf)
        }

        animationId = requestAnimationFrame(raf)

        return () => {
            cancelAnimationFrame(animationId)
            lenis.destroy()
        }
    }, [])

    return <>{children}</>
}
