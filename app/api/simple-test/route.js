import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
    try {
        console.log('Simple test API called');
        const { query } = await req.json();
        
        if (!query) {
            return NextResponse.json({ error: 'Query is required.' }, { status: 400 });
        }

        // Check if Gemini API key exists
        const geminiApiKey = process.env.GEMINI_API_KEY;
        if (!geminiApiKey) {
            return NextResponse.json({ 
                answer: `Test response for query: "${query}". Gemini API key not configured, so this is a mock response.` 
            });
        }

        // Try to use Gemini
        try {
            const geminiAI = new GoogleGenerativeAI(geminiApiKey);
            const geminiModel = geminiAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            
            const prompt = `You are a helpful assistant. The user asked: "${query}". Please provide a brief, helpful response.`;
            
            const result = await geminiModel.generateContent(prompt);
            const answer = result.response.text();
            
            return NextResponse.json({ answer });
        } catch (geminiError) {
            console.error('Gemini error:', geminiError);
            return NextResponse.json({ 
                answer: `Test response for query: "${query}". Gemini API encountered an error: ${geminiError.message}` 
            });
        }

    } catch (e) {
        console.error('API Error:', e);
        return NextResponse.json({ 
            error: `API Error: ${e.message}`,
            stack: e.stack 
        }, { status: 500 });
    }
}
