"use client";
import { useState } from "react";
import { IProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { Button } from "../ui/button";
import { ConnectWalletModal } from "./Modal";
import { MetamaskConnector } from "./connectors/metamaskConnector";
import { WalletConnectConnector } from "./connectors/walletConnectConnector";
import { useUser } from "@/context/User";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/utils/CreateClientThirdweb";
import { createWallet, walletConnect } from "thirdweb/wallets";
import { defineChain } from "thirdweb";

export type ChainOptions = {
  id: number;
  name?: string;
  rpc?: string;
  icon?: Icon;
  nativeCurrency?: {
    name?: string;
    symbol?: string;
    decimals?: number;
  };
  blockExplorers?: Array<{
    name: string;
    url: string;
    apiUrl?: string;
  }>;
  testnet?: true;
};
type Icon = {
  url: string;
  width: number;
  height: number;
  format: string;
};

export const WalletButton = () => {
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("tech.defiantapp"),
    walletConnect(),
  ];
  const rootstock: ChainOptions = {
    id: 30,
    name: "RSK Mainnet",
    rpc: "https://public-node.rsk.co",
    icon: {
      url: "https://cryptologos.cc/logos/rsk-rbtc-logo.png",
      width: 32,
      height: 32,
      format: "png",
    },
    nativeCurrency: {
      name: "RSK",
      symbol: "RBTC",
      decimals: 18,
    },
    blockExplorers: [
      {
        name: "RSK Explorer",
        url: "https://explorer.rsk.co",
        apiUrl: "https://explorer.rsk.co",
      },
    ],
  };

  const roostockTestnet: ChainOptions = {
    id: 31,
    name: "RSK Testnet",
    rpc: "https://public-node.testnet.rsk.co",
    icon: {
      url: "https://cryptologos.cc/logos/rsk-rbtc-logo.png",
      width: 32,
      height: 32,
      format: "png",
    },
    nativeCurrency: {
      name: "RSK",
      symbol: "RBTC",
      decimals: 18,
    },
    blockExplorers: [
      {
        name: "RSK Testnet Explorer",
        url: "https://explorer.testnet.rsk.co",
        apiUrl: "https://explorer.testnet.rsk.co",
      },
    ],
    testnet: true,
  };

  const chain = defineChain(roostockTestnet);

  return (
    <section>
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={"dark"}
        chain={chain}
        connectModal={{ size: "wide" }}
      />
    </section>
  );
};
