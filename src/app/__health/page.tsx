/**
 * Minimal diagnostic page to verify Vercel platform routing.
 * If you can reach this, Vercel is serving the app correctly.
 * 
 * Access at: https://ray-group.eu/__health
 */
export default function HealthPage() {
    return (
        <html>
            <body style={{ fontFamily: 'monospace', padding: '2rem' }}>
                <h1>✅ Platform OK</h1>
                <p>Timestamp: {new Date().toISOString()}</p>
                <p>Node: {process.version}</p>
                <p>Env: {process.env.NODE_ENV}</p>
            </body>
        </html>
    )
}
