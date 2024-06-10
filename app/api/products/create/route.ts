import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";
import { uuid } from "uuidv4";

export async function POST(req: any, res: any) {
  try {

  
 const supabase = createClient();
 const productPayload = await req.json();
 
		
		
 const product = {
		...productPayload,
		id: uuid(), // Generate a unique ID for the new product
 };
		
   const { data, error } = await supabase.from("products").insert([product]);
		
		
     if (error) {
				return NextResponse.json({
					message: "Error inserting product",
					error: error.message,
				});
			}
		const images = productPayload.selectedFiles;
		

  await Promise.all(
		images.map(async (image:any) => {
			const filePath = `public/products/${product.id}/${image.name}`; // Adjust the path as needed
			const { error: uploadError } = await supabase.storage
				.from("image_products") // Replace with your actual bucket name
				.upload(filePath, image.buffer); // Assuming images are sent as Buffer objects

    const { data, error } = await supabase.from("products").insert([product]);

    if (error) {
      return NextResponse.json({
        message: "Error inserting product",
        error: error.message,
      });
    }
    const images = productPayload.selectedFiles;

    await Promise.all(
      images.map(async (image: any) => {
        const filePath = `public/products/${product.id}/${image.originalname}`; // Adjust the path as needed
        const { error: uploadError } = await supabase.storage
          .from("image_products") // Replace with your actual bucket name
          .upload(filePath, image.buffer); // Assuming images are sent as Buffer objects

        if (uploadError) {
          throw new Error(
            `Error uploading image ${image.originalname}: ${uploadError.message}`
          );
        }
      })
    );

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
