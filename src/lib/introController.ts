'use client'

/**
 * introController.ts
 * 
 * Module-scope singleton to track intro state.
 * Survives React component remounts in Strict Mode or during navigation
 * as long as the page is not hard-refreshed (module memory persists).
 */

const STORAGE_KEY = 'ray_intro_done_v1'

// Module-scope state
const moduleState = {
    hasStarted: false,
    hasCompleted: false
}

export function canStartIntro(): boolean {
    if (typeof window === 'undefined') return false

    const params = new URLSearchParams(window.location.search)
    const debugIntro = params.get('intro')

    // 1. debug=0: Skip immediately
    if (debugIntro === '0') {
        // "set done to prevent any logic from running"
        // We mark module state as completed so we don't try again this session
        moduleState.hasCompleted = true
        // We also persist it so it skips on future navigations if desired?
        // User spec: "skip intro immediately (also set done...)"
        // It's safer to just set module state for this session.
        return false
    }

    // 2. debug=1: Force allow (bypass storage check)
    // But we still respect moduleState to prevent loops on remount
    if (debugIntro === '1') {
        // If we already started THIS session, don't loop
        if (moduleState.hasStarted) return false
        return true
    }

    // 3. Normal checks
    // Must be on homepage
    if (window.location.pathname !== '/') return false

    // Must not have started in this module session
    if (moduleState.hasStarted) return false

    // Must not have completed in this module session
    if (moduleState.hasCompleted) return false

    // Must not be in sessionStorage
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) return false

    return true
}

export function isIntroCompleted(): boolean {
    return moduleState.hasCompleted
}

export function markIntroStarted(): void {
    moduleState.hasStarted = true
}

export function markIntroCompleted(): void {
    moduleState.hasCompleted = true
    sessionStorage.setItem(STORAGE_KEY, '1')
}

export function resetIntroForDebug(): void {
    moduleState.hasStarted = false
    moduleState.hasCompleted = false
    sessionStorage.removeItem(STORAGE_KEY)
}
