/**
 * Health check route for deployment verification.
 * Helps distinguish "app not deployed" vs "home route broken".
 * 
 * Access at: /__health
 */

export async function GET() {
    return Response.json({
        status: 'ok',
        timestamp: Date.now(),
        env: process.env.NODE_ENV,
    })
}
