import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log('🔄 Revalidating posts cache...');
    revalidateTag('posts');
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: 'Cache posts invalidata con successo'
    });
  } catch (error) {
    console.error('❌ Revalidation failed:', error);
    return NextResponse.json({ 
      revalidated: false, 
      error: error instanceof Error ? error.message : 'Errore sconosciuto',
      now: Date.now()
    }, { status: 500 });
  }
}
