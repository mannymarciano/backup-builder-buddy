import React, { useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

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

const Index = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-screen bg-background relative">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b p-4 flex justify-between items-center">
        <div className="font-bold text-xl">Logo</div>
        <Button variant="ghost">Sign Out</Button>
      </div>

      <div className="fixed top-4 right-4 z-10">
        <Button variant="default">
          <Plus className="h-4 w-4 mr-2" />
          Create New Backup
        </Button>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-background"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#444" gap={16} />
        <Controls />
      </ReactFlow>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white rounded-full shadow-lg px-6 py-3 flex space-x-8 animate-fade-in">
          <Button variant="ghost" className="text-sm">Dashboard</Button>
          <Button variant="ghost" className="text-sm">Backups</Button>
          <Button variant="ghost" className="text-sm">Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default Index;