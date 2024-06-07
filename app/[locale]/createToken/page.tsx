"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokensPrices } from "@/utils/TokenPrices";
import { Loader } from "lucide-react";
import { useState } from "react";
import { CreateNFT } from "@/components/blockchainFunctions/writeTx";
import { WalletButton } from "@/components/wallet";
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

  //const { mutateAsync: upload } = useStorageUpload();

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   // Get any data that you want to upload
  //   const dataToUpload = [token.baseURI];

  //   // And upload the data with the upload function
  //   const uris = await upload({ data: dataToUpload });
  // };

  const createToken = async () => {
    const baseUri = "https://ipfs.io/ipfs/QmZ";
    const { tx } = await CreateNFT({
      baseURI: baseUri,
      price: token.price,
      description: token.description,
      totalSupply: token.totalSupply,
      owner: "0x123",
      name: token.name,
      userId: "123",
    });
  };

  return (
    <>
      {btcPrice ? (
        <section className="text-gray-600 body-font">
          <h2 className="text-2xl font-bold text-center">Create Token</h2>
          <WalletButton />
          <div className="flex m-auto  flex-col w-6/12 gap-4 items-center justify-center ">
            <Input placeholder="Item Name" className="w-4/12 text-white" />
            <Input
              placeholder="Item Description"
              className="w-4/12 text-white"
            />
            <Label htmlFor="price" className="w-4/12 text-white">
              Item Price in USD
            </Label>

            {btcPrice && (
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
            )}
            <Input
              placeholder="Item Image"
              type="file"
              className="w-4/12 text-white"
            />
            <Input placeholder="Item Quantity" className="w-4/12 text-white" />
            <Button className="w-4/12 m-auto" onClick={createToken}>
              Create Token
            </Button>
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      )}
    </>
  );
}
