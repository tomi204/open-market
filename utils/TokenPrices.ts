import { useEffect, useState } from "react";

export const TokensPrices = () => {
  const [prices, setPrices] = useState<{
    btcPrice: string | null;
  }>({
    btcPrice: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const btcResponse = await fetch(
          "https://api.coinlore.net/api/ticker/?id=90"
        );
        const btcData = await btcResponse.json();
        const btcPrice = btcData[0].price_usd;

        setPrices({
          btcPrice: btcPrice,
        });
      } catch (error) {
        console.error("Error fetching token prices:", error);
      }
    };

    fetchData();
  }, []);

  return prices;
};
