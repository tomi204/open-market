import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";


interface ImageResult {
	success: boolean;
	message?: string;
}

export async function POST(req: any, res: any) {
  try {
    const supabase = createClient();
    const productPayload = await req.json();
    const {
      product_name,
      product_description,
      product_category,
      product_price,
      stock_quantity,
      shipping_option,
      owner_address,
      productBrand,
      contract_address,
      image_folder,
    } = productPayload;
    


    console.log( productPayload );

    const product = {
			product_name,
			product_description,
			product_category,
			product_price,
			stock_quantity,
			shipping_option,
			owner_address,
			productBrand,
			contract_address,
			id: uuidv4(), // Generate a unique ID for the new product
		};

    const { data, error } = await supabase.from( "products" ).insert( [product] );

    if ( error ) {
      return NextResponse.json( {
        message: "Error inserting product",
        error: error.message,
      } );
    }

    const images = productPayload.image_folder;

  const uploadImage = async (blob:any) => {
		return new Promise(async (resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = async () => {
				const base64data:any = reader.result;
				const base64String:any = base64data.split(",")[1];

				const filePath = `public/products/${product.id}/${blob.name}`;
				const { error: uploadError } = await supabase.storage
					.from("image_products")
					.upload(filePath, base64String);

				if (uploadError) {
					reject(
						new Error(
							`Error uploading image ${blob.name}: ${uploadError.message}`
						)
					);
				} else {
					resolve({ success: true, message: "Image uploaded successfully" });
				}
			};

			reader.onerror = () => {
				reject(new Error("Error reading file"));
			};
		});
	};

	// Usage with Promise.all
	try {
		const results = await Promise.all(images.map(uploadImage));
		console.log(results); // Process results
	} catch (error) {
		console.error(error);
	}

		return NextResponse.json({ data }, { status: 200 });
	} catch (error: any) {
		// Handle any errors that occur during the request
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

async function uploadImagesToProductFolder(productId: string, files: any) {
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
