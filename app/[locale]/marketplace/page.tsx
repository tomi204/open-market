import { createClient } from "@/utils/supabase/server";

export default async function Marketplace() {
	const supabase = createClient();
	const { data: product } = await supabase.from("products").select();

	console.log(product);
	return (
		<section className="text-gray-600 body-font">
			{JSON.stringify(product, null, 2)}
		</section>
	);
}
