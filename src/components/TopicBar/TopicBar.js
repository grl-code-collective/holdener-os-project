import React from 'react';
import { Link } from 'react-router-dom';

const TopicBar = ({ isSidebarOpen }) => {
  const topics = [
    { name: 'Home', path: '/os_project' },
    { name: 'Buffers', path: '/os_project/buffers' },
    {name:'Memory Hiearchy', path:'/os_project/memory_hie'}
  ];

  return (
    isSidebarOpen && (<div className="h-screen flex">
      <div
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h1 className="text-2xl font-bold text-center">Topics</h1>
        <ul className="space-y-2">
          {topics.map((topic, index) => (
            <li key={index} className="p-2 rounded hover:bg-gray-700 cursor-pointer">
              <Link to={topic.path}>{topic.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>) 
    
  );
};

export default TopicBar;
