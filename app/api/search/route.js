import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

// Initialize clients
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const geminiAI = new GoogleGenerativeAI(geminiApiKey);
const geminiModel = geminiAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Simple text-to-vector function (basic approach for testing)
// In production, you'd want to use proper embeddings
function simpleTextEmbedding(text, dimensions = 384) {
    const words = text.toLowerCase().split(/\s+/);
    const embedding = new Array(dimensions).fill(0);
    
    // Simple hash-based embedding for testing
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        for (let j = 0; j < word.length; j++) {
            const charCode = word.charCodeAt(j);
            const index = (charCode + i + j) % dimensions;
            embedding[index] += Math.sin(charCode * 0.01) * 0.1;
        }
    }
    
    // Normalize the embedding
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => magnitude > 0 ? val / magnitude : 0);
}

export async function POST(req) {
    try {
        console.log('Starting RAG search request...');
        
        const { query } = await req.json();
        console.log('Query received:', query);

        if (!query) {
            return NextResponse.json({ error: 'Query is required.' }, { status: 400 });
        }

        // Check environment variables
        if (!supabaseUrl || !supabaseKey || !geminiApiKey) {
            console.error('Missing environment variables:', {
                hasSupabaseUrl: !!supabaseUrl,
                hasSupabaseKey: !!supabaseKey,
                hasGeminiApiKey: !!geminiApiKey
            });
            return NextResponse.json({ 
                error: 'Server configuration error: Missing required environment variables.' 
            }, { status: 500 });
        }

        console.log('Environment variables check passed');

        // 1. Generate embedding for the user query
        console.log('Generating embeddings...');
        let userEmbedding;
        try {
            // Using simple text embedding for now (replace with proper embeddings in production)
            userEmbedding = simpleTextEmbedding(query);
            console.log('Embeddings generated, length:', userEmbedding.length);
        } catch (embeddingError) {
            console.error('Embedding generation failed:', embeddingError);
            return NextResponse.json({ 
                error: 'Failed to generate embeddings. This might be due to model loading issues.' 
            }, { status: 500 });
        }

        // 2. Retrieve relevant opportunities from Supabase
        console.log('Querying Supabase...');
        let retrievedOpportunities;
        try {
            // Try to query Supabase, but fallback to mock data if it fails
            const { data, error: rpcError } = await supabase.rpc('match_opportunities', {
                query_embedding: userEmbedding,
                match_count: 5,
            });
            
            if (rpcError) {
                console.warn('Supabase RPC error, using mock data:', rpcError);
                console.warn('Error details:', JSON.stringify(rpcError, null, 2));
                
                // Let's try a simple query first to test the connection
                const { data: testData, error: testError } = await supabase
                    .from('opportunities')
                    .select('*')
                    .limit(5);
                
                if (testError) {
                    console.error('Simple query also failed:', testError);
                    // Mock data for testing when database is not set up
                    retrievedOpportunities = [
                        {
                            opportunity_title: "Software Development Internship",
                            description: "A great opportunity for aspiring developers to gain hands-on experience in modern web technologies.",
                            link: "https://example.com/internship1"
                        },
                        {
                            opportunity_title: "AI Research Fellowship",
                            description: "Research fellowship focusing on machine learning and artificial intelligence applications.",
                            link: "https://example.com/fellowship1"
                        }
                    ];
                } else {
                    console.log('Found data in opportunities table:', testData);
                    retrievedOpportunities = testData.map(item => ({
                        opportunity_title: item.opportunity_title,
                        description: item.description,
                        link: item.link
                    }));
                }
            } else {
                retrievedOpportunities = data;
            }
            
            console.log('Retrieved opportunities:', retrievedOpportunities?.length || 0);
        } catch (supabaseError) {
            console.warn('Supabase connection error, using mock data:', supabaseError);
            // Mock data fallback
            retrievedOpportunities = [
                {
                    opportunity_title: "Test Opportunity 1",
                    description: "This is a test opportunity since the database is not yet configured.",
                    link: "https://example.com/test1"
                },
                {
                    opportunity_title: "Test Opportunity 2", 
                    description: "Another test opportunity for demonstration purposes.",
                    link: "https://example.com/test2"
                }
            ];
        }

        // 3. Create the sophisticated prompt for the Gemini API
        const context = retrievedOpportunities?.map(opp => 
            `Title: ${opp.opportunity_title || 'N/A'}\nDescription: ${opp.description || 'N/A'}\nLink: ${opp.link || 'N/A'}\n`
        ).join('\n') || 'No opportunities found.';

        const prompt = (
            `You are a highly knowledgeable and professional career advisor. ` +
            `Your goal is to provide a comprehensive and helpful response to the user's query based **only** on the provided context.\n\n` +
            `Please follow these instructions to structure your response:\n\n` +
            `### Summary\n` +
            `Start with a brief, high-level summary of the findings, including the total number of relevant opportunities found and the types of opportunities they are.\n\n` +
            `### Detailed Opportunity Overview\n` +
            `For each opportunity listed in the context, provide a detailed breakdown. Use the following format for each one:\n` +
            `- **Title:** [The title of the opportunity]\n` +
            `- **Explanation:** Explain why this specific opportunity is relevant to the user's query.\n` +
            `- **Link:** [The URL to the opportunity]\n\n` +
            `### Comparative Analysis\n` +
            `Provide a brief comparative analysis of the opportunities. Highlight any key similarities or differences, such as the focus (e.g., graduate vs. undergraduate), location (e.g., local vs. international), or subject area (e.g., science vs. general).\n\n` +
            `### Next Steps and Actionable Advice\n` +
            `Conclude with a section of clear, actionable advice. Advise the user on what to do next to learn more about the opportunities. Suggest they carefully review eligibility requirements and application deadlines on the provided links.\n\n` +
            `If no opportunities are relevant to the user's query, state clearly that you could not find any matching opportunities and provide a helpful, polite closing statement.\n\n` +
            `**Context:**\n` +
            `${context}\n\n` +
            `**User's question:** ${query}`
        );

        // 4. Generate the final response using Gemini
        console.log('Generating AI response...');
        try {
            const result = await geminiModel.generateContent(prompt);
            const finalAnswer = result.response.text();
            console.log('AI response generated successfully');
            
            return NextResponse.json({ 
                answer: finalAnswer,
                timestamp: new Date().toISOString()
            }, { 
                status: 200,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                    'Pragma': 'no-cache'
                }
            });
        } catch (geminiError) {
            console.error('Gemini API error:', geminiError);
            return NextResponse.json({ 
                error: 'AI response generation failed. Please check your Gemini API key and quota.' 
            }, { status: 500 });
        }

    } catch (e) {
        console.error(`Unexpected error during RAG process:`, e);
        return NextResponse.json({ 
            error: `An unexpected error occurred: ${e.message}` 
        }, { status: 500 });
    }
}
