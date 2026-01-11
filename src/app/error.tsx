'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('[Error Boundary]', error)
    }, [error])

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                backgroundColor: '#0a0a0a',
                color: 'white',
                fontFamily: 'system-ui, sans-serif',
            }}
        >
            <h1
                style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                }}
            >
                Something went wrong
            </h1>
            <p
                style={{
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    maxWidth: '500px',
                }}
            >
                An unexpected error occurred. This has been logged.
            </p>
            <pre
                style={{
                    padding: '16px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    maxWidth: '100%',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    marginBottom: '1.5rem',
                }}
            >
                {error.message}
                {error.digest && `\n\nDigest: ${error.digest}`}
            </pre>
            <button
                onClick={reset}
                style={{
                    padding: '12px 24px',
                    backgroundColor: 'white',
                    color: 'black',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }}
            >
                Try again
            </button>
        </div>
    )
}
