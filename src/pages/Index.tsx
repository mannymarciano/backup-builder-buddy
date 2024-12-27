import React, { useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  ReactFlow,
  MiniMap,
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
    <div className="w-full h-screen bg-background">
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
      >
        <Background color="#444" gap={16} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default Index;