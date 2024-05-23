"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type User = {
  address: string;
  balance: string;
  setAddress: (address: string) => void;
  setBalance: (balance: string) => void;
};

let UserContext = createContext<User | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0");

  return (
    <UserContext.Provider
      value={{
        address,
        balance,
        setAddress,
        setBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
