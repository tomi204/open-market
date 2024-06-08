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

export default function NFTDetails() {
  const [loading, setLoading] = useState(false);
  const mintNFT = async () => {
    setLoading(true);
    const { tx } = await MintNative(1, "0x123", "0x123");
    setLoading(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4">
      <div>
        <Image
          src="/placeholder.svg"
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
          <h1 className="text-3xl font-bold">Acme Prism NFT</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Unique digital artwork on the blockchain.
          </p>
        </div>
        <div className="text-4xl font-bold">$99</div>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="seller-address" className="text-base">
              Seller Address
            </Label>
            <div className="flex items-center gap-2">
              <Label id="seller-address">0x123456789abcdef</Label>
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
              <Label id="contract-address">0x987654321fedcba</Label>
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
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg">Buy Now</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CopyIcon(props: any) {
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

function HeartIcon(props: any) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function StarIcon(props: any) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
