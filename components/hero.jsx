import React from "react";
import Image from "next/image";
import heroImage from "@/public/openLogo.png";
import { WalletButton } from "@/components/wallet/index";

function HeroComponent() {
  return (
    <main className="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-12 md:pb-24 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ">
      <div className="px-4 lg:px-0 flex justify-center lg:justify-start items-center">
        <div className="text-left lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold lg:tracking-tight xl:tracking-tighter text-gray-300 mb-4 ">
            Open Market
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-xl">
            Discover, Trade, and Own Unique Digital Assets
          </p>
          <div style={{ marginTop: '2em' }}>
            <WalletButton />
          </div>
        </div>
      </div>
      <div className="py-6 md:order-1 md:block flex justify-center">
        <div className="w-64 h-64 relative">
          <Image src={heroImage} alt="A description of my image." layout="fill" objectFit="contain" />
        </div>
      </div>
    </main>
  );
}

export default HeroComponent;
