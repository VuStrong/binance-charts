"use client";

import { useEffect, useState } from "react";

import { GetCandles, ICandleStick } from "@/utils/binance";
import BinanceChart from "@/components/BinanceChart";
import Loader from "@/components/Loader";
import BitcoinPrice from "@/components/BitcoinPrice";
import TimeSelector from "@/components/TimeSelector";

export default function Home() {
    const [data, setData] = useState<ICandleStick[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [time, setTime] = useState<string>("1m");

    useEffect(() => {
		if (isLoading) return;

        (async () => {
            setIsLoading(true);

            const results = await GetCandles(time, "BTCUSDT");

            setData(results);
            setIsLoading(false);
        })();
    }, [time]);

	const onSelectTime = (value: string) => {
		if (isLoading) return;
		setTime(value);
	}

    return (
        <div className="mx-2 md:mx-10 my-5">
            <div className="flex justify-end mb-5">
				<TimeSelector 
					times={["1m", "5m", "30m", "1h", "4h", "1d"]}
					selected={time}
					onClick={onSelectTime}
				/>
			</div>

            <div className="h-[400px]">
                {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <BinanceChart data={data} height={400} />
                )}
            </div>

            <div className="mt-10">
                <BitcoinPrice />
            </div>
        </div>
    );
}
