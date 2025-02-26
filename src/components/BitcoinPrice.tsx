"use client";

import { useState } from "react";
import { GetCandles, GetTickerPrice } from "@/utils/binance";

export default function BitcoinPrice() {
    const [oldPrice, setOldPrice] = useState<number>(0);
    const [currentPrice, setCurrentPrice] = useState<number>(0);

    const fetchBitcoinPrice = async () => {
        try {
            const price = await GetTickerPrice("BTCUSDT");
            setCurrentPrice(price);

            const data = await GetCandles("1m", "BTCUSDT", 2);
            setOldPrice(data[0].close);
        } catch (error) {
            console.error("Error fetching Bitcoin prices:", error);
        }
    };

    return (
        <div className="p-4 text-center">
            <button
                className="bg-blue-800 py-2 px-4 text-white"
                onClick={fetchBitcoinPrice}
            >
                Fetch Bitcoin price
            </button>
            {!!currentPrice && !!oldPrice && (
                <div className="mt-4 text-black dark:text-white">
                    <p>Bitcoin price 1 minute ago: ${oldPrice}</p>
                    <p>Current Bitcoin price: ${currentPrice}</p>
                </div>
            )}
        </div>
    );
}
