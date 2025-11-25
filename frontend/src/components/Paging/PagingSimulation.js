import React, { useState } from "react";

function PagingSimulation() {
  const [pageReferenceString, setPageReferenceString] = useState("");
  const [frameCount, setFrameCount] = useState(3);
  const [algorithm, setAlgorithm] = useState("FIFO");
  const [frames, setFrames] = useState(new Array(frameCount).fill(null));
  const [currentStep, setCurrentStep] = useState(0);
  const [pageFaults, setPageFaults] = useState(0);
  const [pageHistory, setPageHistory] = useState([]);
  const [faultLog, setFaultLog] = useState([]);
  const [historyLog, setHistoryLog] = useState([]); // New array to store frame history for each step
  const [fifoQueue, setFifoQueue] = useState([]);


  const startSimulation = () => {
    const initialFrames = new Array(frameCount).fill(null);
    setFrames(initialFrames);
    setHistoryLog([]); // Clear history log on start
    setPageHistory(pageReferenceString.split(",").map((num) => parseInt(num.trim())));
    setCurrentStep(0);
    setPageFaults(0);
    setFaultLog([]);
  };

  const applyAlgorithm = (page) => {
    switch (algorithm) {
      case "FIFO":
        applyFIFO(page);
        break;
      // Additional cases for other algorithms can be added here
      default:
        break;
    }
  };

  const applyFIFO = (page) => {
    let newFrames = [...frames];
    let fault = false;
  
    // Check if the page is already in frames (hit)
    if (!newFrames.includes(page)) {
      fault = true; // Page fault occurs
      setPageFaults((prevFaults) => prevFaults + 1);
  
      // Check for an empty frame
      const emptyIndex = newFrames.findIndex((frame) => frame === null);
      if (emptyIndex !== -1) {
        // Insert the page in the first empty frame
        newFrames[emptyIndex] = page;
        setFifoQueue((prevQueue) => [...prevQueue, page]); // Add the page to the FIFO queue
      } else {
        // All frames are full, remove the first-inserted page (FIFO)
        setFifoQueue((prevQueue) => {
          const updatedQueue = [...prevQueue];
          const pageToRemove = updatedQueue.shift(); // Remove the oldest page
          const indexToReplace = newFrames.indexOf(pageToRemove); // Find its index
          if (indexToReplace !== -1) {
            newFrames[indexToReplace] = page; // Replace it with the new page
          }
          updatedQueue.push(page); // Add the new page to the end of the queue
          return updatedQueue; // Update the FIFO queue state
        });
      }
    }

    // Update the state
    setFrames(newFrames);
    setFaultLog([...faultLog, fault ? "Y" : "N"]);
    setHistoryLog((prevHistory) => [...prevHistory, [...newFrames]]);
  };
  
  const nextStep = () => {
    if (currentStep < pageHistory.length) {
      const currentPage = pageHistory[currentStep];
      applyAlgorithm(currentPage);
      setCurrentStep(currentStep + 1);
    }
  };

  const resetSimulation = () => {
    setFrames(new Array(frameCount).fill(null));
    setCurrentStep(0);
    setPageFaults(0);
    setPageHistory([]);
    setFaultLog([]);
    setHistoryLog([]); // Clear history log
    setPageReferenceString("");
    setFifoQueue([]);
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-black-600 mb-6">Paging Simulation</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Page Reference String:</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={pageReferenceString}
            onChange={(e) => setPageReferenceString(e.target.value)}
            placeholder="Enter pages separated by commas, e.g., 7, 0, 1, 2, ..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Frame Count:</label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={frameCount}
            onChange={(e) => setFrameCount(parseInt(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Algorithm:</label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="FIFO">FIFO</option>
            <option value="LRU">LRU</option>
            <option value="Optimal">Optimal</option>
            <option value="Second-Chance">Second-Chance</option>
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={startSimulation}
          >
            Start Simulation
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            onClick={resetSimulation}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-8 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Frames</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1">Frames</th>
              {pageHistory.map((page, index) => (
                <th key={index} className="border px-2 py-1">
                  {page}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: frameCount }).map((_, frameIndex) => (
              <tr key={frameIndex}>
                <td className="border px-2 py-1 font-semibold">Frame {frameIndex}</td>
                {historyLog.map((stepFrames, stepIndex) => (
                  <td
                  key={stepIndex}
                  className={`border px-2 py-1 ${
                    faultLog[stepIndex] === "Y" &&
                    stepFrames[frameIndex] === pageHistory[stepIndex]
                      ? "bg-yellow-200 font-bold"
                      : ""
                  }`}
                >
                    {stepFrames[frameIndex] !== undefined ? stepFrames[frameIndex] : "-"}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="border px-2 py-1 font-semibold">Fault</td>
              {faultLog.map((fault, index) => (
                <td key={index} className="border px-2 py-1">
                  {fault}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <p className="text-gray-700 font-semibold mt-4">Total Page Faults: {pageFaults}</p>
        <button
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PagingSimulation;
