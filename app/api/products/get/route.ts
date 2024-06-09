import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";



export async function GET(req: NextApiRequest, res: NextApiResponse) {
	// Handle GET request here
	try {
		const supabase = createClient();
		// Fetch products from Supabase
		const { data, error } = await supabase.from("products").select("*");

		if (error) {
			throw new Error("Failed to fetch products");
		}
		console.log(data)

		return NextResponse.json({ data }, { status: 200 });
	} catch (error) {
		// Handle any errors that occur during the request
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
