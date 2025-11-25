import React from 'react';
import { Link } from 'react-router-dom';

const topics = [
    { 
        id: 1, 
        title: 'Buffers', 
        description: 'Understand how buffers manage data transfer between components, ensuring smooth communication and preventing data loss.', 
        path: 'os_project/buffers' 
    },
    { 
        id: 2, 
        title: 'Paging', 
        description: 'Discover how operating systems handle memory management using paging to efficiently allocate resources and avoid fragmentation.', 
        path: 'os_project/paging' 
    },
    { 
        id: 3, 
        title: 'Memory Hierarchy', 
        description: 'Dive into the multi-level structure of memory, from caches to main memory, and learn how it enhances system performance.', 
        path: 'process_mgmt' 
    },
];


function Welcome() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-300">
            <h1 className="text-5xl font-bold text-white mb-4">Welcome</h1>
            <p className="text-lg text-white text-center max-w-md bg-blue-600 rounded-lg p-4 shadow-md mb-6">
                Welcome to the Operating Systems Simulation! Here, you can explore various concepts and interact with simulations designed to enhance your understanding of operating systems.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full">
                {topics.map(topic => (
                    <div key={topic.id} className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
                        <h2 className="text-xl font-semibold text-blue-600">{topic.title}</h2>
                        <p className="text-gray-700 mt-2">{topic.description}</p>
                        <Link
                            to={`/${topic.path}`}
                            className="mt-4 inline-block bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 transition duration-200 hover:bg-blue-700"
                        >
                            Learn More
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Welcome;
