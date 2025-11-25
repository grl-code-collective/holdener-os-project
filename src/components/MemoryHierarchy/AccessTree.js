// AccessTree.js
import React from 'react';

const AccessTree = ({ configs, initialConfigs,addLevel, removeLevel, updateConfig }) => {
  // Function to calculate the total access time
  const calculateAccessTime = () => {
    let totalAccessTime = 0;
    configs.forEach((config, index) => {
      const previousCHR = index > 0 ? configs[index - 1].CHR / 100 : 1;
      totalAccessTime += config.accessTime * previousCHR;
    });
    return totalAccessTime.toFixed(2);
  };

  // Function to calculate access time for a specific level
  const calculateLevelAccessTime = (config) => {
    return (config.accessTime * (1 - config.CHR / 100)).toFixed(2);
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Access Tree</h2>

      <ul className="flex flex-col items-center space-y-6">
        {configs.map((config, index) => (
          <li key={index} className="flex flex-col items-center">
            <div className="flex items-center space-x-2">
              <div className="w-24 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-semibold">
                {config.name}
              </div>
              <button
                onClick={() => removeLevel(index)}
                className="px-2 py-1 bg-gray-500 text-white rounded"
              >
                X
              </button>
            </div>

            {/* Editable fields for access time and CHR */}
            <div className="mt-2 text-center text-sm">
              <label className="block">
                Access Time (ns):
                <input
                  type="number"
                  value={config.accessTime}
                  onChange={(e) =>
                    updateConfig(index, { ...config, accessTime: parseInt(e.target.value) })
                  }
                  className="ml-2 border p-1 w-16 text-center"
                />
              </label>
              <label className="block mt-2">
                CHR (%):
                <input
                  type="number"
                  value={config.CHR}
                  onChange={(e) =>
                    updateConfig(index, { ...config, CHR: parseFloat(e.target.value) })
                  }
                  className="ml-2 border p-1 w-16 text-center"
                />
              </label>

              {/* Formula and Result */}
              <p className="mt-2">{config.accessTime} * (1 - {config.CHR / 100})<span className="text-blue-600 font-medium">= {calculateLevelAccessTime(config)} ns</span></p>

            </div>

            {index < configs.length - 1 && (
              <span className="w-px h-8 bg-red-500 mt-2"></span>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={addLevel}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        disabled={configs.length >= initialConfigs.length}
      >
        Add Level
      </button>

      <p className="mt-6 text-md font-medium">
        Total Access Time: {calculateAccessTime()} ns
      </p>
    </div>
  );
};

export default AccessTree;
