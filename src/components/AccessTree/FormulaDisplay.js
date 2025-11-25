// FormulaDisplay.js
import React from 'react';

const FormulaDisplay = ({ config, step }) => {
  const calculateLevelAccessTime = () => {
    const previousCHR = step > 0 ? config.CHR / 100 : 1;
    return (config.accessTime * previousCHR).toFixed(2);
  };

  return (
    <div className="mt-4 text-center">
      <h4 className="text-md font-medium">Formula for Level {step + 1}</h4>
      <p className="text-sm">
        {config.accessTime} x (1 - {config.CHR}%) = {calculateLevelAccessTime()} ns
      </p>
    </div>
  );
};

export default FormulaDisplay;
