import { ERC721Abi } from "@/contracts/ABI/ERC721";
import { CreatorContractAddress } from "@/contracts/Addresses";
import { ethers } from "ethers";

export async function CreateNFT(
  owner: string,
  name: string,
  userId: string,
  price: number,
  totalSupply: number,
  baseURI: string
) {
  const provider = new ethers.WebSocketProvider(
    "wss://public-node.testnet.rsk.co"
  );
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    CreatorContractAddress,
    ERC721Abi,
    signer
  );

  const tx = contract.createCrow(
    baseURI,
    price,
    totalSupply,
    owner,
    name,
    userId
  );

  return { tx };
}

export async function MintNative(
  amount: number,
  address: string,
  contractAddress: string
) {
  const provider = new ethers.WebSocketProvider(
    "wss://public-node.testnet.rsk.co"
  );
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, ERC721Abi, signer);

  const tx = contract.mintNative(address, amount);

  return { tx };
}
