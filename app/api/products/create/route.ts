import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

  const supabase = createClient();
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
	if ( req.method !== "POST" ) {
	  return res.status( 405 ).json( { error: "Method Not Allowed" } );
		}
		
		 const cookieStore = cookies();
	let product = req.body ;
  
		console.log("esooo", product.data );
		
	  const { data, error } = await supabase.from("products").insert([
				{
					name: product.productName,
					description: product.productDescription,
					category: product.productCategory,
					price: product.productPrice,
					image_folder: "",
					tokenQuantity: product.tokenQuantity,
					stockQuantity: product.stockQuantity,
					shippingOptions: product.shippingOptions,
					
				},
			]);
    if (error) {
      throw error;
    }

     await uploadImagesToProductFolder(product.id, product.formData);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the request
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


async function uploadImagesToProductFolder(productId:string, files:any) {
	const folderPath = `products/${productId}/`;
	for (let file of files) {
		const fileName = `${Date.now()}-${file.name}`; // Generate a unique file name
		const filePath = `${folderPath}${fileName}`;
		const { error } = await supabase.storage
			.from("image_products") // Replace with your bucket name
			.upload(filePath, file);

		if (error) {
			console.error(`Error uploading ${file.name}:`, error);
		} else {
			console.log(`${file.name} uploaded successfully`);
			// Update your database with the new image path
		}
	}
}
