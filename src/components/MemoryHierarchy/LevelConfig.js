// LevelConfig.js
import React from 'react';

const LevelConfig = ({ index, config, updateConfig }) => {
  const handleAccessTimeChange = (e) => {
    updateConfig(index, { ...config, accessTime: parseInt(e.target.value) });
  };

  const handleCHRChange = (e) => {
    updateConfig(index, { ...config, CHR: parseFloat(e.target.value) });
  };

  return (
    <div className="border p-2 mb-2 rounded-md shadow-sm">
      <h2 className="text-md font-medium mb-1">{config.name}</h2>

      <label className="block text-sm mb-1">
        Access Time (ns): <span>{config.accessTime}</span>
      </label>
      <input
        type="range"
        min="1"
        max="200"
        value={config.accessTime}
        onChange={handleAccessTimeChange}
        className="w-full mb-2"
      />

      <label className="block text-sm mb-1">
        CHR (%): <span>{config.CHR.toFixed(2)}</span>
      </label>
      <input
        type="range"
        min="80"
        max="99.99999"
        step="0.1"
        value={config.CHR}
        onChange={handleCHRChange}
        className="w-full"
      />
    </div>
  );
};

export default LevelConfig;
