"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { isIntroCompleted } from '@/lib/introController'

interface DebugState {
    blockers: number
    mainStyles: {
        opacity: string
        transform: string
        filter: string
        visibility: string
    } | null
    isSafeMode: boolean
    isIntroCompleted: boolean
    canvasCount: number
    time: number
}

export default function DebugHud() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [mounted, setMounted] = useState(false)
    const [state, setState] = useState<DebugState>({
        blockers: 0,
        mainStyles: null,
        isSafeMode: false,
        isIntroCompleted: false,
        canvasCount: 0,
        time: 0
    })

    // Check if debug mode is enabled
    const isDebugEnabled = searchParams.get('debug') === '1'

    // Check if any safe mode flag is set
    const checkSafeMode = useCallback(() => {
        const safe = searchParams.get('safe') === '1'
        const debug = searchParams.get('debug') === '1'
        const introOff = searchParams.get('intro') === '0'
        const bgOff = searchParams.get('bg') === '0'
        return safe || debug || introOff || bgOff
    }, [searchParams])

    useEffect(() => {
        setMounted(true)

        // Only run polling if debug mode is enabled
        if (!isDebugEnabled) return

        const updateState = () => {
            // Count fullscreen blockers
            const explicitFixed = document.querySelectorAll('.fixed.inset-0').length
            const canvasElements = document.querySelectorAll('canvas').length

            // Get computed style of main element
            const mainEl = document.querySelector('main')
            let mainStyles: DebugState['mainStyles'] = null
            if (mainEl) {
                const computed = window.getComputedStyle(mainEl)
                mainStyles = {
                    opacity: computed.opacity,
                    transform: computed.transform,
                    filter: computed.filter,
                    visibility: computed.visibility
                }
            }

            setState({
                blockers: explicitFixed,
                mainStyles,
                isSafeMode: checkSafeMode(),
                isIntroCompleted: isIntroCompleted(),
                canvasCount: canvasElements,
                time: Date.now()
            })
        }

        updateState()
        const interval = setInterval(updateState, 500)

        return () => clearInterval(interval)
    }, [isDebugEnabled, checkSafeMode])

    // Don't render if not mounted or debug mode is not enabled
    if (!mounted || !isDebugEnabled) return null

    return (
        <div
            style={{
                position: 'fixed',
                top: '8px',
                left: '8px',
                zIndex: 99999,
                padding: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: '#00ff00',
                fontFamily: 'monospace',
                fontSize: '10px',
                borderRadius: '6px',
                pointerEvents: 'none',
                border: '1px solid #00ff00',
                whiteSpace: 'pre-wrap',
                maxWidth: '320px',
                lineHeight: 1.4
            }}
        >
            <div style={{ marginBottom: '6px', fontSize: '11px' }}><strong>🔧 DEBUG HUD</strong></div>
            <div>Path: <span style={{ color: '#fff' }}>{pathname}</span></div>
            <div>Params: <span style={{ color: '#fff' }}>{searchParams.toString() || 'none'}</span></div>
            <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '6px 0' }} />
            <div>
                Safe Mode: <span style={{ color: state.isSafeMode ? '#00ff00' : '#ff6600' }}>
                    {state.isSafeMode ? 'ON' : 'OFF'}
                </span>
            </div>
            <div>
                Intro Done: <span style={{ color: state.isIntroCompleted ? '#00ff00' : '#ff6600' }}>
                    {state.isIntroCompleted ? 'YES' : 'NO'}
                </span>
            </div>
            <div>Blockers (fixed.inset-0): <span style={{ color: state.blockers > 0 ? '#ff0000' : '#00ff00' }}>{state.blockers}</span></div>
            <div>Canvas count: <span style={{ color: state.canvasCount > 0 ? '#ffff00' : '#00ff00' }}>{state.canvasCount}</span></div>
            <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '6px 0' }} />
            <div style={{ color: '#888' }}>Main element styles:</div>
            {state.mainStyles ? (
                <>
                    <div>  opacity: <span style={{ color: '#fff' }}>{state.mainStyles.opacity}</span></div>
                    <div>  transform: <span style={{ color: '#fff' }}>{state.mainStyles.transform === 'none' ? 'none' : '⚠️ ' + state.mainStyles.transform.slice(0, 20)}</span></div>
                    <div>  filter: <span style={{ color: '#fff' }}>{state.mainStyles.filter}</span></div>
                    <div>  visibility: <span style={{ color: '#fff' }}>{state.mainStyles.visibility}</span></div>
                </>
            ) : (
                <div style={{ color: '#ff6600' }}>  (no main element found)</div>
            )}
            <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '6px 0' }} />
            <div style={{ color: '#666' }}>Tick: {state.time}</div>
            <div style={{ marginTop: '4px', color: '#00ff00' }}>
                Status: <span>LIVE</span>
            </div>
        </div>
    )
}
