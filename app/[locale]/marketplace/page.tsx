
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0ZhZbJMdcei
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { NavBarFinal } from "@/components/NavBar"
import Footer from "@/components/footer"

interface NFT {
  id: number;
  title: string;
  artist: string;
  price: number;
  category: string;
  image: string;
}

interface Filters {
  category: string[];
  priceRange: [number, number];
  sortBy: string;
}

export default function Component() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filters, setFilters] = useState<Filters>({
    category: [],
    priceRange: [0, 1000],
    sortBy: "trending",
  })

  const nfts: NFT[] = [
    { id: 1, title: "Cosmic Explosion", artist: "Galactic Painter", price: 0.5, category: "Art", image: "/placeholder.svg" },
    { id: 2, title: "Cyberpunk Samurai", artist: "Neon Ninja", price: 0.8, category: "Art", image: "/placeholder.svg" },
    { id: 3, title: "Enchanted Forest", artist: "Woodland Wizard", price: 0.3, category: "Photography", image: "/placeholder.svg" },
    { id: 4, title: "Glitch Cityscape", artist: "Pixel Architect", price: 0.6, category: "Art", image: "/placeholder.svg" },
    { id: 5, title: "Ethereal Dancer", artist: "Holographic Muse", price: 0.4, category: "Art", image: "/placeholder.svg" },
    { id: 6, title: "Futuristic Mech", artist: "Cybernetic Visionary", price: 0.9, category: "Art", image: "/placeholder.svg" },
  ]

  const filteredNFTs = useMemo(() => {
    return nfts
      .filter((nft) => {
        const searchRegex = new RegExp(searchTerm, "i")
        return searchRegex.test(nft.title) || searchRegex.test(nft.artist) || filters.category.includes(nft.category)
      })
      .filter((nft) => nft.price >= filters.priceRange[0] && nft.price <= filters.priceRange[1])
      .sort((a, b) => {
        if (filters.sortBy === "trending") {
          return b.id - a.id
        } else if (filters.sortBy === "low") {
          return a.price - b.price
        } else {
          return b.price - a.price
        }
      })
  }, [searchTerm, filters])

  return (
    <div className="container mx-auto px-4 md:px-6 pb-24">
      <NavBarFinal/>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 pt-12">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">NFT Marketplace</h1>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Search NFTs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="w-5 h-5" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-4">
              <div className="grid gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Category</h3>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <Checkbox
                        checked={filters.category.includes("Art")}
                        onCheckedChange={(checked) => {
                          setFilters((prev) => ({
                            ...prev,
                            category: checked ? [...prev.category, "Art"] : prev.category.filter((c) => c !== "Art"),
                          }))
                        }}
                      />
                      Art
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox
                        checked={filters.category.includes("Photography")}
                        onCheckedChange={(checked) => {
                          setFilters((prev) => ({
                            ...prev,
                            category: checked
                              ? [...prev.category, "Photography"]
                              : prev.category.filter((c) => c !== "Photography"),
                          }))
                        }}
                      />
                      Photography
                    </Label>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Sort By</h3>
                  <RadioGroup
                    value={filters.sortBy}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
                  >
                    <Label className="flex items-center gap-2">
                      <RadioGroupItem value="trending" />
                      Trending
                    </Label>
                    <Label className="flex items-center gap-2">
                      <RadioGroupItem value="low" />
                      Price: Low to High
                    </Label>
                    <Label className="flex items-center gap-2">
                      <RadioGroupItem value="high" />
                      Price: High to Low
                    </Label>
                  </RadioGroup>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredNFTs.map((nft) => (
          <Link
            key={nft.id}
            href="#"
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            prefetch={false}
          >
            <img src="/placeholder.svg" alt={nft.title} width={400} height={400} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{nft.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">by {nft.artist}</p>
              <div className="flex items-center justify-between">
                <div className="text-primary font-semibold">{nft.price} ETH</div>
                <Button size="sm">
                  Buy
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )

}
