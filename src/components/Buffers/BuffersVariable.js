import React, { useState, useEffect } from 'react';

const BuffersVariable = () => {
  const [bufferSize, setBufferSize] = useState(0);
  const [burstInputRate, setBurstInputRate] = useState(0);
  const [averageOutputRate, setAverageOutputRate] = useState(0);
  const [usefulTime, setUsefulTime] = useState(0);

  const [inputRateGuess, setInputRateGuess] = useState('');
  const [feedback, setFeedback] = useState('');

  const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    setBufferSize(getRandomValue(50, 200)); 
    setBurstInputRate(getRandomValue(30, 100)); 
    setAverageOutputRate(getRandomValue(20, 70)); 
    setUsefulTime(getRandomValue(5, 15)); 
  }, []);

  const handleInputRateChange = (e) => {
    const inputRate = parseFloat(e.target.value);
    setInputRateGuess(e.target.value);

    if (isNaN(inputRate)) {
      setFeedback('Please enter a valid number.');
    } else if (inputRate > averageOutputRate) {
      setFeedback('Incorrect! Average Input Rate must be less than or equal to Average Output Rate.');
    } else {
      setFeedback('Correct! The input rate is safe for the system.');
    }
  };

  return (
    
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Variable Question: Find the Maximum Average Input Rate</h1>

      <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
        <p><strong>Problem Statement:</strong> The system has the following known values:</p>
        <ul className="list-disc list-inside">
          <li>Buffer Size: {bufferSize} GB</li>
          <li>Burst Input Rate: {burstInputRate} GB/sec</li>
          <li>Average Output Rate: {averageOutputRate} GB/sec</li>
          <li>Useful Time: {usefulTime} seconds</li>
        </ul>
        <p>Your task is to determine a safe <strong>Maximum Average Input Rate</strong></p>
      </div>

      <div className="p-4">
        <label className="block mb-2 font-semibold">Maximum Average Input Rate (GB/sec):</label>
        <input
          type="number"
          value={inputRateGuess}
          onChange={handleInputRateChange}
          className="border border-gray-300 p-2 rounded-md"
          placeholder="Enter your guess"
        />
      </div>
      <div className={`mt-4 p-4 rounded-md ${feedback.includes('Correct') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {feedback}
      </div>
    </div>
  );
};

export default BuffersVariable;
