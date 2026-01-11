"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DebugHud() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [mounted, setMounted] = useState(false)
    const [blockers, setBlockers] = useState(0)
    const [time, setTime] = useState(0)

    useEffect(() => {
        setMounted(true)
        const interval = setInterval(() => {
            setTime(Date.now())

            // Count potential fullscreen blockers
            // We look for fixed/absolute elements with inset-0 or full width/height
            const allElements = document.querySelectorAll('*')
            let count = 0
            allElements.forEach((el) => {
                const style = window.getComputedStyle(el)
                if (style.position === 'fixed' && style.zIndex !== 'auto' && parseInt(style.zIndex) > 10) {
                    // Primitive check for full screen coverage
                    const rect = el.getBoundingClientRect()
                    if (rect.width >= window.innerWidth && rect.height >= window.innerHeight) {
                        // Ignore self
                        if (!el.textContent?.includes('Debug')) {
                            count++
                        }
                    }
                }
            })

            // Also check for specific classes the user mentioned
            const explicitFixed = document.querySelectorAll('.fixed.inset-0, canvas').length

            setBlockers(explicitFixed)
        }, 500)

        return () => clearInterval(interval)
    }, [])

    if (!mounted) return null

    return (
        <div
            style={{
                position: 'fixed',
                top: '8px',
                left: '8px',
                zIndex: 99999,
                padding: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#00ff00',
                fontFamily: 'monospace',
                fontSize: '10px',
                borderRadius: '4px',
                pointerEvents: 'none',
                border: '1px solid #00ff00',
                whiteSpace: 'pre-wrap',
                maxWidth: '300px'
            }}
        >
            <div><strong>DEBUG HUD</strong></div>
            <div>Path: {pathname}</div>
            <div>Params: {searchParams.toString() || 'none'}</div>
            <div>Blockers (canvas/fixed.inset-0): {blockers}</div>
            <div>Time: {time}</div>
            <div style={{ marginTop: '4px', color: '#fff' }}>
                Status: <span style={{ color: '#00ff00' }}>LIVE</span>
            </div>
        </div>
    )
}
