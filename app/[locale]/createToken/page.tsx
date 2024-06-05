"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokensPrices } from "@/utils/TokenPrices";
import { useState } from "react";

interface token {
  name: string;
  baseURI: string;
  price: number;
  description: string;
  totalSupply: number;
}
export default function CreateToken() {
  const [token, setToken] = useState<token>({
    name: "",
    baseURI: "",
    price: 0,
    description: "",
    totalSupply: 0,
  });
  const { btcPrice } = TokensPrices();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setToken({
      ...token,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <section className="text-gray-600 body-font">
      <h2 className="text-2xl font-bold text-center">Create Token</h2>

      <div className="flex m-auto  flex-col w-6/12 gap-4 items-center justify-center">
        <Input placeholder="Item Name" className="w-4/12 text-white" />
        <Input placeholder="Item Description" className="w-4/12 text-white" />
        <Label htmlFor="price" className="w-4/12 text-white">
          Item Price in USD
        </Label>

        <div className="flex flex-row  gap-4 w-9/12 items-center justify-center">
          <Input
            placeholder="Item Price"
            type="number"
            name="price"
            value={token.price}
            onChange={handleChange}
            className=" text-white w-4/12 "
          />
          <Label
            htmlFor="price"
            className="flex flex-row items-center text-white  w-4/12"
          >
            $ {"  "}
            {(token.price / Number(btcPrice)).toFixed(8)} BTC
          </Label>
        </div>
        <Input
          placeholder="Item Image"
          type="file"
          className="w-4/12 text-white"
        />
        <Input placeholder="Item Quantity" className="w-4/12 text-white" />
      </div>
    </section>
  );
}
