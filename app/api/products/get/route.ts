import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Handle GET request here
  try {
    const supabase = createClient();
    // Fetch products from Supabase
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*");

    if (productsError) {
      throw new Error("Failed to fetch products");
    }

    console.log(products);
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const { data: images, error: imagesError } = await supabase.storage
          .from("image_products")
          .list(`public/products/${product.id}/`);

        if (imagesError) {
          throw new Error(`Failed to fetch images for product ${product.id}`);
        }

        // Construct image URLs for display
        const imageUrls = images
          .map(
            (image) =>
              `https://storage.your-supabase-url.supabase.co/image_products/public/products/${product.id}/${image.name}`
          )
          .join(", ");

        return { ...product, imageUrls }; // Add imageUrls to the product object
      })
    );
    console.log(products);
    // return NextResponse.json({ data: productsWithImages }, { status: 200 });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the request
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
