import React from 'react';
import TabsComponent from "../TabsComponent/Tabs";
import BufferSimulation from "./BufferSimulation";
import BuffersInteractive from "./BuffersInteractive";
import BuffersVariables from "./BuffersVariable";

function BuffersPage(){
    const tabContent = {
        simulation: <BufferSimulation />,
        variable: <BuffersVariables/>,
        interactiveExercise:<BuffersInteractive/>,
      };
    
      return (
        <div>
          <h1 className="text-2xl font-bold text-center mb-4 pt-4">Buffers</h1>
          <TabsComponent content={tabContent} />
        </div>
      );
}

export default BuffersPage;