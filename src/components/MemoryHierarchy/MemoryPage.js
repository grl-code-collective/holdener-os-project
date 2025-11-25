import React from 'react';
import TabsComponent from "../TabsComponent/Tabs";
import AccessTreeSimulation from './AccessTreeSimulation';
import MemoryVariable from './MemoryVariable';
import MemoryInteractive from './MemoryInteractive';

function MemoryPage(){
    const tabContent = {
        simulation: <AccessTreeSimulation />,
        variable: <MemoryVariable/>,
        interactiveExercise:<MemoryInteractive/>,
      };
    
      return (
        <div>
          <h1 className="text-2xl font-bold text-center mb-4 pt-4">Memory Hierarchy</h1>
          <TabsComponent content={tabContent} />
        </div>
      );
}

export default MemoryPage;