// SimulationStep.js
import React from 'react';
import MemoryLevel from './MemoryLevel';
import FormulaDisplay from './FormulaDisplay';

const SimulationStep = ({ step, configs }) => {
  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <h2 className="text-lg font-semibold">Step {step + 1}: Building the Hierarchy</h2>

      {/* Show each level up to the current step */}
      {configs.slice(0, step + 1).map((config, index) => (
        <MemoryLevel key={index} config={config} level={index + 1} />
      ))}

      {/* Show the formula calculation for the current step */}
      {step < configs.length && (
        <FormulaDisplay config={configs[step]} step={step} />
      )}
    </div>
  );
};

export default SimulationStep;
