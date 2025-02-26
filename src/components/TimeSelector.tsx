"use client";

export default function TimeSelector({
    times,
    selected,
    onClick,
}: {
    times: string[];
    selected: string;
    onClick: (value: string) => void;
}) {
    return (
        <div className="inline-flex items-center rounded-md bg-white p-1.5 dark:bg-bodydark border border-gray-300">
            {times.map((time) => (
                <button
                    className={
                        time === selected
                            ? "rounded py-1 px-3 text-xs font-medium text-black dark:text-white bg-gray-300 dark:bg-gray-600"
                            : "rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white dark:bg-bodydark dark:text-white"
                    }
                    onClick={() => onClick(time)}
                >
                    {time}
                </button>
            ))}
        </div>
    );
}
