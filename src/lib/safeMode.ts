'use client'

/**
 * safeMode.ts
 * 
 * Centralized Safe Mode controller.
 * Safe Mode forces visibility and disables risky systems (intro, background).
 * 
 * Triggers when URL has: ?safe=1 OR ?intro=0 OR ?bg=0 OR ?debug=1
 */

export function getSafeModeParams(): {
    safe: boolean
    debug: boolean
    introDisabled: boolean
    bgDisabled: boolean
} {
    if (typeof window === 'undefined') {
        return { safe: false, debug: false, introDisabled: false, bgDisabled: false }
    }

    const params = new URLSearchParams(window.location.search)

    const safe = params.get('safe') === '1'
    const debug = params.get('debug') === '1'
    const introDisabled = params.get('intro') === '0'
    const bgDisabled = params.get('bg') === '0'

    return { safe, debug, introDisabled, bgDisabled }
}

/**
 * Returns true if we're in Safe Mode (any safety flag is set).
 * In Safe Mode:
 * - Intro/preloader is disabled
 * - Background system is disabled
 * - Content renders with opacity:1, transform:none
 */
export function isSafeMode(): boolean {
    const { safe, debug, introDisabled, bgDisabled } = getSafeModeParams()
    return safe || debug || introDisabled || bgDisabled
}

/**
 * Returns true if Debug HUD should be shown
 */
export function isDebugMode(): boolean {
    const { debug } = getSafeModeParams()
    return debug
}

/**
 * Returns true if intro should be disabled
 */
export function isIntroDisabled(): boolean {
    const { safe, debug, introDisabled } = getSafeModeParams()
    return safe || debug || introDisabled
}

/**
 * Returns true if background should be disabled
 */
export function isBgDisabled(): boolean {
    const { safe, bgDisabled } = getSafeModeParams()
    return safe || bgDisabled
}
