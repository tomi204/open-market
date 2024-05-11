"use client";

import { Button } from "../ui/button";

interface ConnectWalletModalProps {
  open: boolean;
  onClose: () => void;
  metamaskConnect: () => void;
  walletConnectConnect: () => void;
  defiantConnect: () => void;
}
export const ConnectWalletModal = ({
  onClose,
  open,
  metamaskConnect,
  walletConnectConnect,
  defiantConnect,
}: ConnectWalletModalProps) => {
  return (
    <section className="w-full ">
      <div className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 z-50"></div>
      <div className="w-full h-full fixed top-0 left-0 z-50 flex justify-center items-center">
        <div className="bg-white w-96 h-96 p-8 rounded-xl">
          <div className="flex justify-between items-center text-black">
            <h3 className="text-2xl font-bold">Connect Wallet</h3>
            <button className="text-2xl" onClick={() => onClose()}>
              X
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              className="text-white p-2 rounded-md"
              onClick={metamaskConnect}
            >
              Connect with Metamask
            </Button>
            <Button
              className="text-white p-2 rounded-md"
              onClick={walletConnectConnect}
            >
              Connect with WalletConnect
            </Button>
            <Button
              className=" text-white p-2 rounded-md"
              onClick={defiantConnect}
            >
              Connect with Defiant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
