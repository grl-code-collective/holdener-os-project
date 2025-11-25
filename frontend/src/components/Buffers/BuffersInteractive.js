import React, { useState, useEffect } from 'react';

const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const BuffersInteractive = () => {
    const [bufferSize, setBufferSize] = useState(0);
    const [burstInputRate, setBurstInputRate] = useState(0);
    const [averageOutputRate, setAverageOutputRate] = useState(0);
    const [usefulTime, setUsefulTime] = useState(0);
    const [currentBufferFill, setCurrentBufferFill] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [missingVariable, setMissingVariable] = useState('');
    const [studentGuess, setStudentGuess] = useState(0);
    const [hints, setHints] = useState('');

    const generateNewProblem = () => {
        setBufferSize(getRandomValue(100, 200));
        setBurstInputRate(getRandomValue(80, 120));
        setAverageOutputRate(getRandomValue(40, 80));
        setUsefulTime(getRandomValue(5, 15));
        setCurrentBufferFill(getRandomValue(10, 50));
        const variables = ['bufferSize', 'burstInputRate', 'averageOutputRate', 'usefulTime'];
        const randomMissing = variables[Math.floor(Math.random() * variables.length)];
        setMissingVariable(randomMissing);
        setStudentGuess(0);
        setHints('');
        setShowAnswer(false);
    };

    useEffect(() => {
        generateNewProblem();
    }, []);

    const getCorrectAnswer = () => {
        const totalBufferSizeLeft = (1 - 0.01 * currentBufferFill) * bufferSize;
        switch (missingVariable) {
            case 'bufferSize':
                return ((burstInputRate - averageOutputRate) * usefulTime) / (1 - 0.01 * currentBufferFill);
            case 'burstInputRate':
                return (averageOutputRate + totalBufferSizeLeft / usefulTime);
            case 'averageOutputRate':
                return (burstInputRate - totalBufferSizeLeft / usefulTime);
            case 'usefulTime':
                return (totalBufferSizeLeft / (burstInputRate - averageOutputRate));
            default:
                return 0;
        }
    };

    const handleSliderChange = (value) => {
        setStudentGuess(value);
        const correctAnswer = getCorrectAnswer().toFixed(2);
        const difference = Math.abs(correctAnswer - value);

        if (difference === 0) {
            setHints(`Great job! You've found the correct value for the ${missingVariable}.`);
        } else if (difference <= 5) {
            setHints(`Hint: You're very close! Fine-tune the ${missingVariable}.`);
        } else if (difference <= 10) {
            setHints(`Hint: You're getting closer, but still off. Adjust the ${missingVariable} slightly.`);
        } else if (difference <= 20) {
            setHints(`Hint: Your ${missingVariable} is a bit off. Make larger adjustments.`);
        } else if (value > correctAnswer) {
            setHints(`Hint: Your ${missingVariable} is too high. Try reducing it significantly.`);
        } else if (value < correctAnswer) {
            setHints(`Hint: Your ${missingVariable} is too low. Try increasing it significantly.`);
        }
    };

    const renderBufferVisualization = () => {
        let fillPercentage = 0;
        let overflowHeight = 0;

        if (missingVariable !== 'bufferSize') {
            fillPercentage = (currentBufferFill / bufferSize) * 100;
        }

        if (burstInputRate > 0 && averageOutputRate > 0 && usefulTime > 0) {
            overflowHeight = Math.max(0, 
                (( 
                    (missingVariable === 'burstInputRate' ? getCorrectAnswer() : burstInputRate) - 
                    (missingVariable === 'averageOutputRate' ? getCorrectAnswer() : averageOutputRate)
                ) * 
                (missingVariable === 'usefulTime' ? getCorrectAnswer() : usefulTime)
                ) * 100 / (missingVariable === 'bufferSize' ? getCorrectAnswer() : bufferSize)
            );
        }

        return (
            <div className="buffer-container mt-6">
                <div className="relative bg-gray-300 h-80 w-52 border border-4 border-t-0 border-black">
                    {missingVariable !== 'bufferSize' ? (
                        <div
                            className="absolute bottom-0 bg-green-500"
                            style={{
                                height: `${fillPercentage}%`,
                                width: '100%',
                                transition: 'height 1s ease-out',
                            }}
                        ></div>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-500">Buffer Size is Missing</span>
                        </div>
                    )}

                    {missingVariable !== 'burstInputRate' && missingVariable !== 'averageOutputRate' && overflowHeight > 0 && (
                        <div
                            className="absolute bg-red-500"
                            style={{
                                height: `${overflowHeight}%`,
                                width: '100%',
                                transition: 'height 1s ease-out',
                                bottom: `${fillPercentage}%`,
                            }}
                        ></div>
                    )}

                    {missingVariable === 'burstInputRate' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-black-500">Burst Input Rate is Missing</span>
                        </div>
                    )}
                    {missingVariable === 'averageOutputRate' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-black-500">Avg Output Rate is Missing</span>
                        </div>
                    )}
                    {missingVariable === 'usefulTime' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-black-500">Useful Time is Missing</span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col md:flex-row items-start p-4 ml-36">
            <div className="flex flex-col md:w-1/2 md:mr-8"> {/* Add right margin for spacing */}
                <h1 className="text-2xl font-bold mb-4">Interactive Buffer Exercise</h1>
                <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
                    <p><strong>Problem Statement:</strong> The system has the following known values:</p>
                    <ul className="list-disc list-inside">
                        {missingVariable !== 'bufferSize' && <li>Total Buffer Size: {bufferSize} GB</li>}
                        {missingVariable !== 'burstInputRate' && <li>Burst Input Rate: {burstInputRate} GB/sec</li>}
                        {missingVariable !== 'averageOutputRate' && <li>Average Output Rate: {averageOutputRate} GB/sec</li>}
                        {missingVariable !== 'usefulTime' && <li>Useful Time: {usefulTime} seconds</li>}
                        <li>Current Buffer Fill: {currentBufferFill}%</li>
                    </ul>
                    <p>
                        Your task is to determine the missing variable: <strong>{missingVariable}</strong>.
                    </p>
                </div>
                <div className="p-4">
                    <label className="block mb-2 font-semibold">
                        Adjust the {missingVariable === 'bufferSize' ? 'Total Buffer Size (GB)' : missingVariable === 'burstInputRate' ? 'Burst Input Rate (GB/sec)' : missingVariable === 'averageOutputRate' ? 'Average Output Rate (GB/sec)' : 'Useful Time (seconds)'} (Up to 2 decimals)
                    </label>
                    <input
                        type="text"
                        value={studentGuess}
                        onChange={(e) => handleSliderChange((e.target.value))}
                        className="border border-gray-300 p-2 rounded-md"
                    />
                    <span className="ml-2">{missingVariable === 'bufferSize' ? 'GB' : missingVariable === 'usefulTime' ? 'seconds' : 'GB/sec'}</span>
                </div>
                <div className="mt-4">
                    <div className={`p-4 rounded-md ${hints.includes('Great') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {hints}
                    </div>
                </div>
                {hints.includes('Great') && (
                    <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded-md">
                        Well done! The correct value for the {missingVariable} is {getCorrectAnswer()}.
                    </div>
                )}

                <button
                    onClick={generateNewProblem}
                    className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Reset Exercise (New Question)
                </button>
                <button
                    onClick={() => setShowAnswer(true)}
                    className="mt-6 px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                    Show Answer
                </button>
                {showAnswer && (
                    <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded-md">
                        The correct value for the {missingVariable} is {getCorrectAnswer().toFixed(2)}.
                    </div>
                )}
            </div>
            {/* Right-side visualization */}
            <div className="md:w-1/2 md:ml-48"> {/* Add left margin for spacing */}
                {renderBufferVisualization()}
            </div>
        </div>
    );
};

export default BuffersInteractive;
