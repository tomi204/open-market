import { CreatorContractABI } from "@/contracts/ABI/CreatorContract";
import { ERC721Abi } from "@/contracts/ABI/ERC721";
import { CreatorContractAddress } from "@/contracts/Addresses";
import { ethers } from "ethers";

interface token {
  price: number;
  userAddress: string;
  totalSupply: number;
}

export async function CreateNFT({
	price,
	totalSupply,
	userAddress,
}: token) {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const contract = new ethers.Contract(
		CreatorContractAddress,
		CreatorContractABI,
		signer
	);

	const tx = await contract.createCrow(
		price,
		totalSupply,
		userAddress
	);

	const receipt = await tx.wait();

	if (receipt.status === 1) {
		console.log("Transacción exitosa");
	} else {
		console.log("Transacción fallida");
	}

	return { tx };

}

////////////////////////////////////////

export async function MintNative(
  amount: number,
  address: string,
  contractAddress: string
) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, ERC721Abi, signer);

  const tx = contract.mintNative(address, amount);

  return { tx };
}
