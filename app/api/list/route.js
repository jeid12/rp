import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    try {
        // Query Supabase for the first 60 opportunities, selecting specific columns
        const { data, error } = await supabase
            .from('opportunities')
            .select('id, opportunity_title, description, deadline, link, category')
            .order('crawled_at', { ascending: false })
            .limit(60);

        if (error) {
            console.error('Supabase fetch error:', error);
            throw new Error('Supabase fetch failed');
        }

        return NextResponse.json(data, { 
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
                'Pragma': 'no-cache'
            }
        });

    } catch (e) {
        console.error(`Error fetching opportunities: ${e.message}`);
        return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
    }
}
