// MemoryHierarchySimulation.js
import React, { useState } from 'react';
import MemoryLevel from './MemoryLevel';
import FormulaDisplay from './FormulaDisplay';
import SimulationStep from './SimulationStep';

const MemoryHierarchySimulation = () => {
  const [levels, setLevels] = useState(4); // Default number of levels
  const [configs, setConfigs] = useState([
    { name: 'L1 Cache', accessTime: 1, CHR: 99.9 },
    { name: 'L2 Cache', accessTime: 5, CHR: 95.0 },
    { name: 'L3 Cache', accessTime: 10, CHR: 90.0 },
    { name: 'Memory', accessTime: 50, CHR: 80.0 },
  ]);
  const [step, setStep] = useState(0); // Track simulation progress

  const nextStep = () => setStep((prev) => (prev < configs.length ? prev + 1 : prev));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Memory Hierarchy Simulation</h1>

      <div className="flex flex-col items-center">
        <SimulationStep
          step={step}
          configs={configs}
        />
        
        {step < levels && (
          <button
            onClick={nextStep}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next Step
          </button>
        )}
      </div>
    </div>
  );
};

export default MemoryHierarchySimulation;
