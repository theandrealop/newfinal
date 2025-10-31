import { NextRequest, NextResponse } from 'next/server'

// Simple image proxy to handle expiring Jasper GCS signed URLs and unify caching
export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get('url')
    if (!url) {
      return new NextResponse('Missing url', { status: 400 })
    }

    // Basic allowlist: only proxy images
    const allowedHosts = [
      'storage.googleapis.com',
      'jasper-production-images-doc.storage.googleapis.com',
      'images.unsplash.com',
      'pff-815f04.ingress-florina.ewp.live',
      'puntifurbi.wasmer.app',
      'i0.wp.com'
    ]

    const parsed = new URL(url)
    if (!allowedHosts.some((h) => parsed.hostname.endsWith(h))) {
      return new NextResponse('Host not allowed', { status: 400 })
    }

    const upstream = await fetch(url, { cache: 'no-store' })
    if (!upstream.ok) {
      // Redirect to branded placeholder so it's visible when upstream fails/expired
      const placeholder = new URL('/placeholder.jpg', req.nextUrl.origin)
      return NextResponse.redirect(placeholder, 302)
    }

    const contentType = upstream.headers.get('content-type') || 'image/*'
    const arrayBuffer = await upstream.arrayBuffer()
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Cache proxied images for a day; adjust as needed
        'Cache-Control': 'public, max-age=86400',
      }
    })
  } catch (err) {
    return new NextResponse('Proxy error', { status: 500 })
  }
}


