import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, description, price } = req.body;


    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('nft')
      .insert([{ name, description, price }])
      .single();

    if (error) {
      throw error;
    }
    // Return the inserted data as the response
    return NextResponse.json(
			{ data },
			{ status: 200 }
		);
  } catch (error) {
    // Handle any errors that occur during the request
    return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
  }
}
