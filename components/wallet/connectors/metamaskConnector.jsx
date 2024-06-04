"use client";
import { useState } from "react";
import { IProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

export function MetamaskConnector() {
  const [web3Modal, setWeb3Modal] = (useState < Web3Modal) | (null > null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const connectMetamask = async () => {
    if (!web3Modal) {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              31: "https://public-node.testnet.rsk.co",
            },
          },
        },
      };

      const supportedChains = [31]; // RSK testnet

      const modal = new Web3Modal({
        network: "testnet",
        cacheProvider: true,
        providerOptions,
        supportedChains,
      });

      setWeb3Modal(modal);
    }

    try {
      if (web3Modal) {
        const provider = await web3Modal.connect();
        console.log("Conectado a Metamask:", provider);
        // Ahora puedes utilizar el proveedor conectado para interactuar con la blockchain

        // get address from provider
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        console.log("Dirección de la cuenta:", accounts[0]);

        // Solicitar un cambio de cadena programáticamente
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x1F", // Cambiar a la cadena de red Ethereum mainnet (hexadecimal)
              chainName: "RSK Testnet",
              nativeCurrency: {
                name: "tRBTC",
                symbol: "tRBTC",
                decimals: 18,
              },
              rpcUrls: ["https://public-node.testnet.rsk.co"],
              blockExplorerUrls: ["https://explorer.testnet.rsk.co"],
            },
          ],
        });
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1F" }],
        });
      }
    } catch (error) {
      console.error("Error al conectar Metamask:", error);
    }
  };

  return connectMetamask;
}
