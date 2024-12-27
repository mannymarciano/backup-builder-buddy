import React, { useCallback, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
  PanelPosition,
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
    data: { label: 'Scanner', visible: false },
  },
  {
    id: 'destination-1',
    type: 'destinationNode',
    position: { x: 250, y: 500 },
    data: { label: 'Destination', visible: false },
  },
];

const initialEdges = [
  { 
    id: 'e1-2', 
    source: 'source-1', 
    target: 'scanner-1', 
    animated: true,
    style: { stroke: '#22c55e', strokeWidth: 2 },
    hidden: true
  },
  { 
    id: 'e2-3', 
    source: 'scanner-1', 
    target: 'destination-1', 
    animated: true,
    style: { stroke: '#22c55e', strokeWidth: 2 },
    hidden: true
  },
];

const Index = () => {
  const { toast } = useToast();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [sourceComplete, setSourceComplete] = useState(false);
  const [scannerComplete, setScannerComplete] = useState(false);
  const [destinationComplete, setDestinationComplete] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Update node visibility based on completion status
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'scanner-1') {
          return {
            ...node,
            data: { ...node.data, visible: sourceComplete },
          };
        }
        if (node.id === 'destination-1') {
          return {
            ...node,
            data: { ...node.data, visible: scannerComplete },
          };
        }
        return node;
      })
    );
  }, [sourceComplete, scannerComplete, setNodes]);

  // Update edge visibility based on node completion status
  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === 'e1-2') {
          return { ...edge, hidden: !sourceComplete };
        }
        if (edge.id === 'e2-3') {
          return { ...edge, hidden: !scannerComplete };
        }
        return edge;
      })
    );
  }, [sourceComplete, scannerComplete, setEdges]);

  // Check if all nodes are complete and show success notification
  useEffect(() => {
    if (sourceComplete && scannerComplete && destinationComplete) {
      toast({
        title: "Success!",
        description: "All nodes are properly configured and connected.",
        duration: 3000,
      });
    }
  }, [sourceComplete, scannerComplete, destinationComplete, toast]);

  const filteredNodes = nodes.filter(node => 
    node.data.visible !== false || node.id === 'source-1'
  );

  return (
    <div className="w-full h-screen bg-background dark">
      <div className="fixed top-4 right-4 z-10">
        <Button variant="default">
          <Plus className="h-4 w-4 mr-2" />
          Create New Backup
        </Button>
      </div>
      
      <ReactFlow
        nodes={filteredNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-background"
        minZoom={0.5}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          color="#444" 
          gap={16} 
          className="bg-background"
        />
      </ReactFlow>
    </div>
  );
};

export default Index;