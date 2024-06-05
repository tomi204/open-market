"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface token {
  name: string;
  baseURI: string;
  price: number;
  description: string;
  totalSupply: number;
}

export const CreateTokenForm = () => {
  const [token, setToken] = useState<token>({
    name: "",
    baseURI: "",
    price: 0,
    description: "",
    totalSupply: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken({
      ...token,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={token.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="baseURI"
        value={token.baseURI}
        onChange={handleChange}
        placeholder="Base URI"
      />
      <input
        type="number"
        name="price"
        value={token.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        type="text"
        name="description"
        value={token.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="number"
        name="totalSupply"
        value={token.totalSupply}
        onChange={handleChange}
        placeholder="Total Supply"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
