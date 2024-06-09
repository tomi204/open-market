import { ethers } from "ethers";
import { CreatorContractAddress } from "@/contracts/Addresses";
import { CreatorContractABI } from "@/contracts/ABI/CreatorContract";

const address = [
  "event crowCreated(address indexed newCrow, string indexed _owner)",
];

//llama la funcion , escucha y devuelve el evento, comparas el owner con la wallet del user y te guardas el newcrow

export async function listenToCrowCreatedEvent() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const contract = new ethers.Contract(
    CreatorContractAddress,
    address,
    provider
  );

  contract.on("crowCreated", (newCrow: string, _owner: string, event: any) => {
    console.log("Nuevo crow creado!");
    console.log("Dirección del nuevo crow:", newCrow);
    console.log("ID del usuario:", _owner);
    console.log("Detalles del evento:", event);
  });

  console.log(
    `Escuchando eventos 'crowCreated' en el contrato en la dirección: ${CreatorContractAddress}`
  );
}

export async function listenToNftMintedEvent() {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  const contract = new ethers.Contract(
    CreatorContractAddress,
    address,
    provider
  );

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
