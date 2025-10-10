import { NextResponse } from 'next/server';
import { getLatestPosts } from '@/lib/wp';

export async function GET() {
  const startTime = Date.now();
  
  try {
    console.log('🏥 Health check: verificando contenuti WordPress...');
    const posts = await getLatestPosts(3);
    const duration = Date.now() - startTime;
    
    return NextResponse.json({ 
      ok: true, 
      count: posts.length,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });
  } catch (e: any) {
    const duration = Date.now() - startTime;
    console.error('🏥 Health check failed:', e.message);
    
    return NextResponse.json({ 
      ok: false, 
      error: e.message,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
