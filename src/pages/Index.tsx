import React, { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import SourceNode from "@/components/nodes/SourceNode";
import ScannerNode from "@/components/nodes/ScannerNode";
import DestinationNode from "@/components/nodes/DestinationNode";

const nodeTypes = {
  sourceNode: SourceNode,
  scannerNode: ScannerNode,
  destinationNode: DestinationNode,
};

const initialNodes = [
  {
    id: 'source-1',
    type: 'sourceNode',
    position: { x: 250, y: 100 },
    data: { label: 'Source' },
  },
  {
    id: 'scanner-1',
    type: 'scannerNode',
    position: { x: 250, y: 300 },
    data: { label: 'Scanner' },
  },
  {
    id: 'destination-1',
    type: 'destinationNode',
    position: { x: 250, y: 500 },
    data: { label: 'Destination' },
  },
];

const initialEdges = [
  { id: 'e1-2', source: 'source-1', target: 'scanner-1', animated: true },
  { id: 'e2-3', source: 'scanner-1', target: 'destination-1', animated: true },
];

const navigationItems = [
  'Builder',
  'Backups',
  'Activity',
  'Support',
  'Settings'
];

const Index = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-screen bg-background">
      {/* Top Bar */}
      <div className="w-full h-16 border-b flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-sm"></div>
          <span className="font-medium">Project Name</span>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      {/* Navigation Bar */}
      <div className="w-full h-12 border-b flex items-center px-4">
        <nav className="flex space-x-6">
          {navigationItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`text-sm ${
                item === 'Overview' 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        className="bg-background"
      >
        <Background color="#000000" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Index;