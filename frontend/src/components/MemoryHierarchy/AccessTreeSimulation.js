import React, { useState } from 'react';
// import './MemoryHierarchyNode.css';

const MemoryHierarchyCalculator = () => {
    const [levels, setLevels] = useState([
        { name: "L1 Cache", accessTime: 3, CHR: 99, unit: "nsec", isMemory: false },
        { name: "Memory", accessTime: 2000, CHR: null, unit: "nsec", isMemory: true }
    ]);

    const availableLevels = [
        { name: "L2 Cache", accessTime: '', CHR: '', unit: "nsec", isMemory: false },
        { name: "L3 Cache", accessTime: '', CHR: '', unit: "nsec", isMemory: false },
        { name: "SSD", accessTime: '', CHR: '', unit: "usec", isMemory: false },
        { name: "Disk Drive", accessTime: '', CHR: '', unit: "usec", isMemory: false },
        { name: "Tape Drive", accessTime: '', CHR: '', unit: "usec", isMemory: false },
        { name: "Offline Storage", accessTime: '', CHR: '', unit: "usec", isMemory: false }
    ];

    const addLevel = () => {
        // Add a new level from availableLevels if available
        const nextLevel = availableLevels.find(level => !levels.some(l => l.name === level.name));
        if (nextLevel && levels.length < 8) {
            const newLevels = [...levels];
            newLevels.splice(newLevels.length - 1, 0, { ...nextLevel, accessTime: '', CHR: '', isMemory: nextLevel.isMemory });
            setLevels(newLevels);
        }
    };

    const removeLevel = (index) => {
        // Prevent removing Memory
        if (!levels[index].isMemory) {
            setLevels(levels.filter((_, i) => i !== index));
        }
    };

    const handleInputChange = (index, field, value) => {
        const newLevels = [...levels];
        newLevels[index][field] = field === "CHR" || field === "accessTime" ? parseFloat(value) || '' : value;
        setLevels(newLevels);
    };

    const calculateAverageAccessTime = () => {
        let totalAccessTime = 0;
        let cumulativeMissRate = 1;

        levels.forEach((level) => {
            const accessTimeInNs = level.unit === "usec" ? level.accessTime * 1000 : level.accessTime;
            if (level.CHR !== null && level.CHR !== '') {
                const missProbability = (100 - level.CHR) / 100;
                totalAccessTime += accessTimeInNs * cumulativeMissRate * (level.CHR / 100);
                cumulativeMissRate *= missProbability;
            } else {
                totalAccessTime += accessTimeInNs * cumulativeMissRate;
            }
        });

        return totalAccessTime.toFixed(2);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">Memory Hierarchy Tree</h2>

            <p className="text-center mb-6">Enter access times and CHR values to build the memory hierarchy.</p>

            <div className="flex flex-col items-center">
                {levels.map((level, index) => (
                    <div key={index} className="relative mb-6 flex flex-col items-center">
                        {/* Connector Line - Positioned vertically between nodes */}
                        {index > 0 && (
                            <div className="vertical-line"></div>
                        )}
                        {/* Node */}
                        <div className="flex items-center">
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md w-56 text-center relative">
                                <button
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
                                    onClick={() => removeLevel(index)}
                                    disabled={level.isMemory}
                                >
                                    X
                                </button>
                                <strong className="block mb-2 text-red-600 text-base">{level.name}</strong>
                                <div className="flex items-center justify-center mb-2">
                                    <label className="mr-2 text-base">Access Time:</label>
                                    <input
                                        type="number"
                                        value={level.accessTime}
                                        onChange={(e) => handleInputChange(index, "accessTime", e.target.value)}
                                        className="w-16 border border-gray-300 rounded px-2 py-1 text-base"
                                    />
                                    <select
                                        value={level.unit}
                                        onChange={(e) => handleInputChange(index, "unit", e.target.value)}
                                        className="ml-2 border border-gray-300 rounded px-2 py-1 text-base"
                                    >
                                        <option value="nsec">nsec</option>
                                        <option value="usec">usec</option>
                                    </select>
                                </div>
                                {!level.isMemory && (
                                    <div className="flex items-center justify-center">
                                        <label className="mr-2 text-base">CHR (%):</label>
                                        <input
                                            type="number"
                                            value={level.CHR}
                                            onChange={(e) => handleInputChange(index, "CHR", e.target.value)}
                                            className="w-16 border border-gray-300 rounded px-2 py-1 text-base"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={addLevel}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    disabled={levels.length >= 8}
                >
                    Add Level
                </button>
            </div>

            <div className="mt-8 text-center font-semibold text-xl">
                <p>Average Access Time: {calculateAverageAccessTime()} nsec</p>
            </div>
        </div>
    );
};

export default MemoryHierarchyCalculator;
