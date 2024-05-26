"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokensPrices } from "@/utils/TokenPrices";
import { useState } from "react";

export default function CreateToken() {
  const [price, setPrice] = useState(0);
  const { btcPrice } = TokensPrices();
  console.log(btcPrice);
  return (
    <section className="text-gray-600 body-font">
      <div className="flex m-auto  flex-col w-6/12">
        <Input placeholder="Item Name" className="w-4/12" />
        <Input placeholder="Item Description" className="w-7/12" />
        <Label htmlFor="price">Item Price in USD</Label>

        <div className="flex flex-row">
          <Input
            placeholder="Item Price"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Label htmlFor="price" className="flex flex-row items-center ">
            $ {"  "}
            {(price / Number(btcPrice)).toFixed(8)} BTC
          </Label>
        </div>
        <Input placeholder="Item Image" className="w-4/12" />
        <Input placeholder="Item Category" className="w-4/12" />
        <Input placeholder="Item Quantity" className="w-4/12" />
      </div>
    </section>
  );
}
