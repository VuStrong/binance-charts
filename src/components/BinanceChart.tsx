"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import {
    createChart,
    CandlestickSeries,
    HistogramSeries,
    UTCTimestamp,
} from "lightweight-charts";
import { ICandleStick } from "@/utils/binance";

export default function BinanceChart({
    data,
    height = 400,
}: {
    data: ICandleStick[];
    height?: number;
}) {
    const { theme } = useTheme();
    const isDarkMode = theme === "dark";
    const chartContainerRef = useRef<HTMLDivElement>(null);

    const candlestickData = data.map((d) => ({
        ...d,
        time: d.openTime / 1000 as UTCTimestamp,
    }));
    const histogramData = data.map((d) => ({
        time: d.openTime / 1000 as UTCTimestamp,
        value: d.volume,
    }));

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current!.offsetWidth,
            });
        };

        const chart = createChart(chartContainerRef.current, {
            height: height,
            layout: {
                background: { color: isDarkMode ? "#1e1e1e" : "#ffffff" },
                textColor: isDarkMode ? "#ffffff" : "#000000",
                panes: {
                    separatorColor: "#f22c3d",
                    separatorHoverColor: "rgba(255, 0, 0, 0.1)",
                    enableResize: false,
                },
            },
            grid: {
                vertLines: { color: isDarkMode ? "#2a2a2a" : "#e0e0e0" },
                horzLines: { color: isDarkMode ? "#2a2a2a" : "#e0e0e0" },
            },
        });
        const candlestickSeries = chart.addSeries(CandlestickSeries);
        const histogramSeries = chart.addSeries(HistogramSeries, {}, 1);

        candlestickSeries.setData(candlestickData);
        histogramSeries.setData(histogramData);

        // Set the histogram's height to 30% of the chart's height
        const histogramPane = chart.panes()[1];
        histogramPane.setHeight(height * 0.3);

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);

            chart.remove();
        };
    }, [chartContainerRef.current, theme]);

    return <div ref={chartContainerRef} />;
}
