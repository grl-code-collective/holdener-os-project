import React, { useState } from 'react';
import arrowImage from '../../assets/arrow.png';
import './Buffers.css';
const BufferSimulation = () => {
  // State htmlFor input values
  const [averageInputRate, setAverageInputRate] = useState(0);
  const [averageOutputRate, setAverageOutputRate] = useState(0);
  const [burstInputRate, setBurstInputRate] = useState(0);
  const [bufferSize, setBufferSize] = useState(100);
  const [usefulTime, setUsefulTime] = useState(1);
  const [percentageFilled, setPercentageFilled] = useState(0);
  const [warningMessage, setwarningMessage] = useState('');
  const [unit,setUnit] = useState('GB');
  const resetVariable = () =>{
    setAverageInputRate(0);
    setAverageOutputRate(0);
    setBurstInputRate(0);
    setBufferSize(100);
    setUsefulTime(1)
    setPercentageFilled(0);
    setwarningMessage('');
  }
  const calculateBufferSize = () => {
    const storageRate = (burstInputRate - averageOutputRate) * usefulTime;
    const intialBufferFilled = (1 - percentageFilled / 100) * bufferSize;

    const isOverflow = intialBufferFilled < storageRate;
    const bufferSizeLeft = intialBufferFilled - storageRate;

    return {
      storageRate: storageRate,
      bufferSizeLeft:bufferSizeLeft,
      isOverflow,
    };
  };
  const handleAvgInputAvgOutput = (value) => {
    setAverageInputRate(value);
    if (value > averageOutputRate) {
      setwarningMessage('Average Input Rate must be less than or equal to Average Output Rate');
    } else {
      setwarningMessage('');
    }
  }
  const { storageRate, bufferSizeLeft, isOverflow } = calculateBufferSize();
  return (
    <div className="flex">
      {/* Inputs htmlFor Buffers Simulation */}
      <div className="flex-1 flex-col items-center justify-center">
        {warningMessage && (
          <div className="bg-red-300 text-red-700 p-2 mb-4 rounded">
            {warningMessage}
          </div>
        )}
        <div className="flex flex-row items-center">
          
          <div className="flex items-center mb-4 px-1">
              <input checked={unit === "GB"}
              id="default-radio-1" 
              type="radio" 
              value="GB" 
              name="default-radio" 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" 
              onChange={(e)=>setUnit(e.target.value)}
              />
              <label htmlFor="default-radio-1" className="ms-2 text-sm">GB</label>
          </div>
          <div className="flex items-center mb-4 px-1">
              <input
              checked={unit === "MB"}
               id="default-radio-2" 
               type="radio" 
               value="MB" 
               name="default-radio" 
               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" 
               onChange={(e)=>setUnit(e.target.value)}
               />
              <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium">MB</label>
          </div>
        </div>
        <div className="p-2">
          <label className="block mb-2 font-semibold">Percentage of Buffer Filled at Start</label>
          <input
            type="range"
            min="0"
            max="100"
            value={percentageFilled}
            onChange={(e) => setPercentageFilled(Number(e.target.value))}
            className="block w-8/12"
          />
          <span>{percentageFilled} %</span>
        </div>
        <div className="p-2">
          <label className="block mb-2 font-semibold">Buffer Size</label>
          <input
            type="range"
            min="0"
            max="100"
            value={bufferSize}
            onChange={(e) => setBufferSize(Number(e.target.value))}
            className="block w-8/12"
          />
          <span>{bufferSize} {unit}</span>
        </div>
        <div className="p-2">
          <label className="block mb-2 font-semibold">Average Output Rate</label>
          <input
            type="range"
            min="0"
            max="100"
            value={averageOutputRate}
            onChange={(e) => setAverageOutputRate(Number(e.target.value))}
            className="block w-8/12"
          />
          <span>{averageOutputRate} {unit}/sec</span>
        </div>
        <div className="p-2">
          <label className="block mb-2 font-semibold">Average Input Rate</label>
          <input
            type="range"
            min="0"
            max="100"
            value={averageInputRate}
            onChange={(e) => handleAvgInputAvgOutput(Number(e.target.value))}
            className="block w-8/12"
          />
          <span>{averageInputRate} {unit}/sec</span>
        </div>


        {/* Burst Input Rate */}
        <div className="p-2">
          <label className="block mb-2 font-semibold">Burst Input Rate</label>
          <input
            type="range"
            min="0"
            max="100"
            value={burstInputRate}
            onChange={(e) => setBurstInputRate(Number(e.target.value))}
            className="block w-8/12"
          />
          <span>{burstInputRate} {unit}/sec</span>
        </div>

        {/* Useful Time */}
        <div className="p-2">
          <label className="block mb-2 font-semibold">Useful Time (Burst Duration)</label>
          <input
            type="range"
            min="1"
            max="100"
            value={usefulTime}
            onChange={(e) => setUsefulTime(Number(e.target.value))}
            className="block w-8/12"
          />
          <span>{usefulTime} seconds</span>
        </div>
        <div className="p-2">
        <button className="border px-6 py-1 bg-navbar-blue text-white rounded-md" onClick={(e)=>resetVariable()}>Reset</button>
        </div>
      </div>
      {/* Buffer Visusalization Code */}
      <div className="w-52 h-80 mt-14">
        <div className="relative p-1">
        <img
              src={arrowImage} // Update with the actual path of your arrow image
              alt="Overflow Arrow"
              className="absolute -top-10 right-1/2 transhtmlForm translate-x-1/2"
              style={{
                top: '-50px', // Position above the buffer
                right: '100%',
                width: '100px', // Adjust size accordingly
                height: '50px',
                opacity: isOverflow ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            />
        </div>
        <div className="relative bg-gray-300 h-80 w-52 border border-4 border-t-0 border-black -ml-6">
          <div
            className="absolute bottom-0 bg-green-500"
            style={{
              height: `${(percentageFilled / 100) * 100}%`, // Initial fill percentage
              width: '100%',
              transition: 'height 1s ease-out',
            }}
          ></div>
          <div
            className="absolute bg-red-500"
            style={{
              height: `${Math.min(100, (storageRate) * 100 / bufferSize)}%`,
              width: '100%',
              transition: 'height 1s ease-out',
              bottom:`${percentageFilled}%`
            }}
          ></div>
        </div>
        
         
        <div className="mt-6 -ml-6">
          <h2 className="text-lg font-semibold font-semibold">Results</h2>
          <p> Total Data: {storageRate} {unit}</p>
          <p>Buffer Size Left: {bufferSizeLeft} {unit}</p>
          <div>{isOverflow ? 
          <div style={{color:'red'}}>Buffer Overflowed at {usefulTime} secs</div>
          : 
          <div style={{color:'blue'}}>Buffer is Safe</div>
          }</div>
        </div>
      </div>
      
    </div>
  );
};

export default BufferSimulation;
