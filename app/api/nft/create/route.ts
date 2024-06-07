import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

  const supabase = createClient();
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

  

      const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name: req.body.productName,
          description: req.body.productDescription,
          category: req.body.productCategory,
          price: req.body.productPrice,
          images: req.body.productImages,
          tokenType: req.body.tokenType,
          tokenQuantity: req.body.tokenQuantity,
          stockQuantity: req.body.stockQuantity,
          shippingOptions: req.body.shippingOptions,
          returnPolicy: req.body.returnPolicy
        },
      ])
    if (error) {
      throw error;
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the request
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


async function uploadImage(file:any) {
	const filePath = `public/${file.name}`;
	const { error } = await supabase.storage
		.from("your_bucket_name")
		.upload(filePath, file);
	if (error) console.error("Error uploading file:", error);
	else console.log("File uploaded successfully");
}