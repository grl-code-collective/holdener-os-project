import React, { useState } from 'react';

const TabsComponent = ({ content }) => {
    const [activeTab, setActiveTab] = useState('Simulation');
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Simulation':
                return content.simulation;
            case 'Variable':
                return content.variable;
            case 'Interactive Exercise':
                return content.interactiveExercise;
            default:
                return null;
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="w-full p-4">
            {/* Tab buttons */}
            <div className="flex space-x-4 border-b-2 border-gray-300 mb-4">
                <button
                    className={`py-2 px-4 text-lg font-medium ${activeTab === 'Simulation' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'}`}
                    onClick={() => handleTabClick('Simulation')}
                >
                    Simulation
                </button>
                <button
                    className={`py-2 px-4 text-lg font-medium ${activeTab === 'Interactive Exercise' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'}`}
                    onClick={() => handleTabClick('Interactive Exercise')}
                >
                    Interactive Exercise
                </button>
                <button
                    className={`py-2 px-4 text-lg font-medium ${activeTab === 'Variable' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'}`}
                    onClick={() => handleTabClick('Variable')}
                >
                    Variable
                </button>
                
            </div>

            <div className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default TabsComponent;
