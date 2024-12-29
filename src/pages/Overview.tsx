import React from 'react';
import ReactFlow from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const Overview = () => {
  return (
    <div className="h-[calc(100vh-7rem)]">
      <ReactFlow
        proOptions={{ hideAttribution: true }}
        className="bg-background"
      >
      </ReactFlow>
    </div>
  );
};

export default Overview;