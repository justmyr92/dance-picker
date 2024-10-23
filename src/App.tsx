import React, { useState } from "react";

// Define the shape of a dance object
interface DanceCraze {
    name: string;
    link: string;
}

const App: React.FC = () => {
    const danceCrazes: DanceCraze[] = [
        {
            name: "Ice Cream Yummy",
            link: "https://www.youtube.com/embed/sxqrLc5S0Ao",
        },
        {
            name: "Maybe This Time",
            link: "https://www.youtube.com/embed/ZtXlh7LlfoI",
        },
        {
            name: "Rock With You",
            link: "https://www.youtube.com/embed/dgxHAjNgUeA",
        },
    ];

    const [selectedDance, setSelectedDance] = useState<DanceCraze | null>(null);
    const [isWaiting, setIsWaiting] = useState(false); // State to track waiting
    const [message, setMessage] = useState<string>(""); // State to track the message
    const [countdown, setCountdown] = useState<number | null>(null); // Countdown state

    const handleChooseDance = (): void => {
        setIsWaiting(true); // Set waiting state to true
        setMessage("Wait lang guyz"); // Initial message

        let elapsed = 0;

        const intervalId = setInterval(() => {
            elapsed += 1;

            // Change message based on elapsed time
            if (elapsed <= 4) {
                setMessage("Wait lang guyz");
            } else if (elapsed <= 7) {
                setMessage("Kunting Kembot pa");
            } else if (elapsed <= 10) {
                setMessage("Wait eto na talaga");
            } else if (elapsed > 10 && elapsed <= 15) {
                setCountdown(15 - elapsed); // Start countdown (5-1)
            }

            // After 15 seconds, reveal the dance and clear the interval
            if (elapsed === 15) {
                const randomDance =
                    danceCrazes[Math.floor(Math.random() * danceCrazes.length)];
                setSelectedDance(randomDance);
                setIsWaiting(false);
                clearInterval(intervalId); // Clear the interval once complete
            }
        }, 1000); // Run every second (1000ms)
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {isWaiting ? (
                <div>
                    {countdown === null ? (
                        <h1 className="text-4xl font-bold text-gray-800">
                            {message}
                        </h1>
                    ) : (
                        <h1 className="text-4xl font-bold text-gray-800">
                            Countdown: {countdown}
                        </h1>
                    )}
                </div>
            ) : (
                <>
                    {selectedDance && (
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-semibold text-gray-700">
                                You got: {selectedDance.name}!
                            </h2>
                            <div className="mt-6">
                                <iframe
                                    width="560"
                                    height="315"
                                    src={selectedDance.link}
                                    title={selectedDance.name}
                                    className="rounded-lg shadow-md"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">
                        Choose Your Dance Craze
                    </h1>
                    <button
                        onClick={handleChooseDance}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Pick a Dance Craze
                    </button>
                </>
            )}
        </div>
    );
};

export default App;
