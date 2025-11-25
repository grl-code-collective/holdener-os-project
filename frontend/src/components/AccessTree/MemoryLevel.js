// MemoryLevel.js
import React from 'react';

const MemoryLevel = ({ config, level }) => {
  return (
    <div className="w-full p-4 border rounded-md shadow-sm">
      <h3 className="text-md font-medium mb-2">
        Level {level}: {config.name}
      </h3>

      <div className="flex justify-between">
        <p>Access Time: {config.accessTime} ns</p>
        <p>CHR: {config.CHR}%</p>
        <p>(1 - CHR): {(100 - config.CHR).toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default MemoryLevel;
