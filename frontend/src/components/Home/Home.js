import React from 'react';
import {  Route, Routes,Navigate } from 'react-router-dom';
import Navbar from '../Navbar/NavBar';
import TopicBar from '../TopicBar/TopicBar';
import { useState } from 'react';
import Welcome from '../WelcomeComponent/Welcome';
import BuffersPage from '../Buffers/BuffersPage';
import AccessTreeSimulation from '../MemoryHierarchy/AccessTreeSimulation';
import MemoryPage from '../MemoryHierarchy/MemoryPage';
import MemoryHierarchySimulation from '../AccessTree/MemoryHierarchySimulation';
import BinaryTree from '../MemoryHierarchy/Tree';
import PagingSimulation from '../Paging/PagingSimulation';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        
         {isSidebarOpen && <TopicBar isSidebarOpen={isSidebarOpen} />}
        <div
          className="flex-1 transition-all duration-300"
        >
        <Routes>
          <Route path="/" element={<Navigate to="/os_project" />} />
          <Route path="/os_project" element={<Welcome/>}/>
          <Route path="/os_project/buffers" element={<BuffersPage />} />
          <Route path="/os_project/memory_hie" element={<MemoryPage/>}/>
          <Route path="/os_project/memory_hie1" element={<BinaryTree/>}/>
          <Route path="/os_project/paging" element={<PagingSimulation/>}/>
        </Routes>
        </div>
      </div>
      {/* <Welcome/> */}
    </div>
  );
}

export default Home;
