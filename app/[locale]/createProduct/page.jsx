"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import axios from "axios";
import { createClient } from "@/utils/supabase/client";
import { NavBarFinal } from "@/components/NavBar";
import { CreateNFT } from "@/components/blockchainFunctions/writeTx";
import { useActiveAccount } from "thirdweb/react";
import { CreatorContractAddress } from "@/contracts/Addresses";
import { ethers } from "ethers";

export default function CreateAsset() {
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Cars");
  const [productPrice, setProductPrice] = useState("");
  const [tokenType, setTokenType] = useState("");
  const [tokenQuantity, setTokenQuantity] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [shippingOption, setShippingOption] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [contractAddress, setContractAddress] = useState("");
  const account = useActiveAccount();
  const supabase = createClient();
  const owner_address = account?.address;
  const ABI = ["event crowCreated(address indexed newCrow, string _owner)"];
  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
    const previewImages = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImages(previewImages);
  };

  useEffect(() => {
    // Cleanup object URLs when component unmounts or when selected files change
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [selectedFiles]);

  const handleSub = async (e) => {
    e.preventDefault();

    const productData = {
      productName,
      productDescription,
      productCategory,
      productPrice,
      shippingOption,
      stockQuantity,
      owner_address,
      selectedFiles,
      productBrand,
      contract_address: contractAddress,
    };

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const { tx } = await CreateNFT({
      price: Number(productPrice),
      totalSupply: Number(stockQuantity),
      userAddress: owner_address,
    });
    console.log(tx, "tx");

    // Esperar a que la transacción sea minada y obtener el recibo
    const receipt = await provider.waitForTransaction(tx.hash);
    console.log(receipt, "receipt");

    // ABI del contrato que incluye el evento crowCreated
    const ABI = [
      "event crowCreated(address indexed crow, address _owner)",
      // Añadir aquí otros eventos del contrato si es necesario
    ];

    const iface = new ethers.utils.Interface(ABI);

    // Decodificar los logs del recibo
    const decodedEvents = receipt.logs
      .map((log) => {
        try {
          return iface.parseLog(log);
        } catch (e) {
          return null; // Ignorar logs que no coinciden con el ABI
        }
      })
      .filter((event) => event !== null);

    // Filtrar y manejar el evento crowCreated
    decodedEvents.forEach((event) => {
      if (event && event.name === "crowCreated") {
        const { crow, _owner } = event.args;
        console.log(`Nuevo crow creado: ${crow}`);
        console.log(`Propietario: ${_owner}`);
        setContractAddress(crow);
      }
    });

    try {
      const response = await fetch("/api/products/create", {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data, "data");
    } catch (error) {
      console.error(error);
    }

    // resetFormFields();
  };

  const resetFormFields = () => {
    setProductName("");
    setProductBrand("");
    setProductDescription("");
    setProductCategory("Cars"); // Reset to default value
    setProductPrice("");
    setTokenType("");
    setTokenQuantity("");
    setStockQuantity("");
    setShippingOption("");
    setReturnPolicy("");
    setSelectedFiles([]);
    setPreviewImages([]);
  };

  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">

            <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="#"
              >
                <PackageIcon className="h-4 w-4" />
                Products
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <WalletIcon className="h-4 w-4" />
                Marketplace
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <UsersIcon className="h-4 w-4" />
                Customers
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <LineChartIcon className="h-4 w-4" />
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <NavBarFinal />
        {/* <div className="w-full flex-1">

					<form>
						<div className="relative">
								<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
								<Input
									className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
									placeholder="Search products..."
									type="search"
								/>
							</div>
					</form>
				</div> */}
        {/* <DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
								size="icon"
								variant="ghost">
								<img
									alt="Avatar"
									className="rounded-full"
									height="32"
									src="/placeholder.svg"
									style={{
										aspectRatio: "32/32",
										objectFit: "cover",
									}}
									width="32"
								/>
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu> */}
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <form onSubmit={handleSub}>
            <div className="flex items-center">
              <h1 className="font-semibold text-lg md:text-3xl">
                Create Product
              </h1>
              {/* <Button className="ml-auto" size="sm">
								List on Marketplace
							</Button> */}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                </CardHeader>

                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="product-name"> Name</Label>
                    <Input
                      id="product-name"
                      placeholder="Enter product name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-brand">BRAND</Label>
                    <Input
                      id="product-brand"
                      placeholder="Enter product name"
                      value={productBrand}
                      onChange={(e) => setProductBrand(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-description">Description</Label>
                    <Textarea
                      id="product-description"
                      placeholder="Enter product description"
                      rows={3}
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-category">Category</Label>
                    <Select onValueChange={setProductCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="cars">Cars</SelectItem>
                        <SelectItem value="real state">Real State</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="medicine">Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Product Images</Label>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      <label htmlFor="file-input" className="cursor-pointer">
                        <PlusIcon className="aspect-square h-8 w-8" />
                        <span className="sr-only">Add image</span>
                      </label>
                      <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: "none" }} // Hide the original file input
                      />
                      {previewImages.map((imageSrc, index) => (
                        <img
                          key={index}
                          alt={`Product image ${index + 1}`}
                          className="aspect-square object-cover rounded-md flex-1"
                          height={100}
                          src={imageSrc}
                          width={100}
                        />
                      ))}
                    </div>
                    {/* <Button

											size="sm"
											variant="outline"
											className="mt-5"
											onClick={handleUpload}>
											Upload Selected Images
										</Button> */}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tokenization</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="token-type">Token Type</Label>
                    <Select defaultValue="erc721" id="token-type">
                      <SelectTrigger>
                        <SelectValue placeholder="Select token type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="erc721">ERC-721- RBTC</SelectItem>
                        {/* <SelectItem value="erc1155">ERC-1155</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-price">Crypto Price</Label>
                    <Input
                      id="product-price"
                      placeholder="Enter product price"
                      type="number"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                    />
                  </div>
                  {/* 

									<div className="grid gap-2">
										<Label htmlFor="token-quantity">Quantity</Label>
										<Input
											id="token-quantity"
											placeholder="Enter token quantity"
											type="number"
											value={tokenQuantity}
											onChange={(e) => setTokenQuantity(e.target.value)}
										/>
									</div> */}
                </CardContent>
                <CardHeader>
                  <CardTitle>Additional Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="stock-quantity">Stock Quantity</Label>
                    <Input
                      id="stock-quantity"
                      placeholder="Enter stock quantity"
                      type="number"
                      value={stockQuantity}
                      onChange={(e) => setStockQuantity(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="shipping-options">Shipping Options</Label>
                    <Select onValueChange={setShippingOption}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select shipping option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="express">Express</SelectItem>
                        <SelectItem value="free">Free Shipping</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="return-policy" />
                      <Label htmlFor="return-policy">
                        Return Policy By Aproval p2p
                      </Label>
                      {/* <Textarea
										id="return-policy"
										placeholder="Enter return policy details"
										rows={3}
									/> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex mt-10   justify-end p-6 gap-2">
              <Button size="lg" variant="outline">
                Cancel
              </Button>
              <Button size="lg">Save Product</Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LineChartIcon(props) {
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
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function PackageIcon(props) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function WalletIcon(props) {
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
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}
