import { ethers } from "ethers";
import { CreatorContractAddress } from "@/contracts/Addresses";
import { CreatorContractABI } from "@/contracts/ABI/CreatorContract";

const abi = [
  "event crowCreated(address indexed newCrow, string indexed userId)",
];

const providerUrl = "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID";

export async function listenToCrowCreatedEvent() {
  const provider = new ethers.JsonRpcProvider(providerUrl);

  const contract = new ethers.Contract(CreatorContractAddress, abi, provider);

  contract.on("crowCreated", (newCrow: string, userId: string, event: any) => {
    console.log("Nuevo crow creado!");
    console.log("Dirección del nuevo crow:", newCrow);
    console.log("ID del usuario:", userId);
    console.log("Detalles del evento:", event);
  });

  console.log(
    `Escuchando eventos 'crowCreated' en el contrato en la dirección: ${CreatorContractAddress}`
  );
}

export async function listenToNftMintedEvent() {
  const provider = new ethers.JsonRpcProvider(providerUrl);

  const contract = new ethers.Contract(CreatorContractAddress, abi, provider);

  contract.on("NftMinted", (requester: string, quantity: any, event: any) => {
    console.log("Nuevo NFT minteado!");
    console.log("Solicitante:", requester);
    console.log("Cantidad:", quantity.toString());
    console.log("Detalles del evento:", event);
  });

  console.log(
    `Escuchando eventos 'NftMinted' en el contrato en la dirección: ${CreatorContractAddress}`
  );
}
