"use client";
import WalletConnectProvider from "@walletconnect/web3-provider";
export function WalletConnectConnector() {
  const provider = new WalletConnectProvider({
    infuraId: "+bvXccZjdLVBNIbPSpR9X42T0teYhM95Nu8CkxqzPJkDTOH9vWaDzg",
  });

  provider.on("connect", (error: string, payload: string) => {
    if (error) {
      console.error("Error al conectar:", error);
    } else {
      console.log("Conectado con éxito:", payload);
    }
  });

  provider.on("session_update", (error: string, payload: string) => {
    if (error) {
      console.error("Error al actualizar la sesión:", error);
    } else {
      console.log("Sesión actualizada:", payload);
    }
  });

  provider.on("disconnect", (error: string, payload: string) => {
    if (error) {
      console.error("Error al desconectar:", error);
    } else {
      console.log("Desconectado:", payload);
    }
  });

  async function connect() {
    try {
      await provider.enable();
      console.log("Proveedor habilitado");
    } catch (error) {
      console.error("Error al habilitar el proveedor:", error);
    }
  }

  connect();
}
