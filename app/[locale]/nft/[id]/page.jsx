"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";
import { MintNative } from "@/components/blockchainFunctions/writeTx";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { NavBarFinal } from "@/components/NavBar";

export default function NFTDetails() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log(pathname, "path");
  const { data: nfts } = useSWR("/api/products/get", fetcher);

  function extractIdFromUrl(url) {
    const regex = /nft\/([a-zA-Z0-9-]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  }
  const id = extractIdFromUrl(pathname);
  const nft = nfts?.products.find((nft) => nft.id === id);

  const mintNFT = async () => {
    setLoading(true);
    const { tx } = await MintNative(1, "0x123", "0x123");
    setLoading(false);
  };
  console.log(nft, "nft");

  if (!nft) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold">NFT Not Found</p>
      </div>
    );
  }
  function maxQuantity() {
    let quantity = [];
    for (let i = 1; i <= nft.stock_quantity; i++) {
      quantity.push(i);
    }
    return quantity;
  }
  console.log(maxQuantity(), "quantity");
  return (
    <>
      <NavBarFinal />
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4">
        <div>
          <Image
            src={nft?.image || "/placeholder.svg"}
            alt="NFT Image"
            width={600}
            height={400}
            className="rounded-lg w-full object-cover"
          />
          <div className="flex items-center gap-4 mt-4">
            <Avatar>
              <img src="/placeholder.svg" alt="NFT image" />
            </Avatar>
            <Avatar>
              <img src="/placeholder.svg" alt="NFT image" />
            </Avatar>
            <Avatar>
              <img src="/placeholder.svg" alt="NFT image" />
            </Avatar>
            <Avatar>
              <img src="/placeholder.svg" alt="NFT image" />
            </Avatar>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{nft.product_name}</h1>

            <p className="text-gray-500 dark:text-gray-400">
              {nft.product_description}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {nft.product_category}
            </p>
          </div>
          <div className="text-4xl font-bold">
            $ {"  "}
            {nft.product_price}
          </div>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="seller-address" className="text-base">
                Seller Address
              </Label>
              <div className="flex items-center gap-2">
                <Label id="seller-address">{nft.owner_address}</Label>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 hover:bg-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <CopyIcon className="w-4 h-4" />
                  <span className="sr-only">Copy Seller Address</span>
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contract-address" className="text-base">
                Contract Address
              </Label>
              <div className="flex items-center gap-2">
                <Label id="contract-address">{nft.contract_address}</Label>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 hover:bg-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <CopyIcon className="w-4 h-4" />
                  <span className="sr-only">Copy Contract Address</span>
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity" className="text-base">
                Quantity
              </Label>
              <Select defaultValue="1">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {maxQuantity().map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                onClick={() => {
                  mintNFT();
                }}
              >
                Buy Now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function CopyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
