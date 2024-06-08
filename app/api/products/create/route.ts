import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";



export async function POST(req: any, res:any) {
  try {
  
    const supabase = createClient();
    let product = await req.json();
		
      const { data, error } = await supabase.from("products").insert([
				{
					product_name: product.productName,
					product_description: product.productDescription,
					product_category: product.productCategory,
					product_price: product.productPrice,
					image_folder: "",
					stock_quantity: product.stockQuantity,
					shipping_option: product.shippingOption,
			
				},
			]);
		
		
     if (error) {
				return NextResponse.json({
					message: "Error inserting product",
					error: error.message,
				});
			}

    //  await uploadImagesToProductFolder(product.id, product.formData);

    return NextResponse.json({ data}, { status: 200 });
  } catch (error:any) {
    // Handle any errors that occur during the request
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


async function uploadImagesToProductFolder(productId:string, files:any) {


	    const supabase = createClient();
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
