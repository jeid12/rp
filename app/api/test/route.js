import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { query } = await req.json();
        
        // Check environment variables
        const envCheck = {
            SUPABASE_URL: process.env.SUPABASE_URL || 'NOT_SET',
            SUPABASE_KEY: process.env.SUPABASE_KEY ? 'SET' : 'NOT_SET',
            GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'SET' : 'NOT_SET'
        };
        
        return NextResponse.json({
            message: 'Test endpoint working',
            query: query,
            environment: envCheck,
            timestamp: new Date().toISOString()
        });
        
    } catch (e) {
        return NextResponse.json({
            error: 'Test endpoint error',
            message: e.message,
            stack: e.stack
        }, { status: 500 });
    }
}
