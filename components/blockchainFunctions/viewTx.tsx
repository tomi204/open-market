import { ERC721Abi } from "@/contracts/ABI/ERC721";
import { ethers } from "ethers";

export async function ViewTx(txHash: string) {
  const provider = new ethers.providers.WebSocketProvider(
    "https://public-node.testnet.rsk.co"
  );

  const tx = await provider.getTransaction(txHash);

  return tx;
}

export async function getBaseUri(address: string) {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://public-node.testnet.rsk.co"
  );
  const contract = new ethers.Contract(address, ERC721Abi, provider);
  const baseUri = await contract._baseURI();
  return baseUri;
}
