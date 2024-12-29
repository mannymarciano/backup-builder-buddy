import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    position: { x: 250, y: 50 },
    data: { label: 'Source' },
  },
  {
    id: 'scanner-1',
    type: 'scannerNode',
    position: { x: 250, y: 200 },
    data: { label: 'Scanner' },
  },
  {
    id: 'destination-1',
    type: 'destinationNode',
    position: { x: 250, y: 350 },
    data: { label: 'Destination' },
  },
];

const initialEdges = [
  { 
    id: 'e1-2', 
    source: 'source-1', 
    target: 'scanner-1', 
    animated: true,
    style: { stroke: '#9b87f5' }
  },
  { 
    id: 'e2-3', 
    source: 'scanner-1', 
    target: 'destination-1', 
    animated: true,
    style: { stroke: '#9b87f5' }
  },
];

// Workspace boundaries
const INITIAL_BOUNDS = {
  minX: 0,
  maxX: 800,
  minY: 0,
  maxY: 600,
};

const navigationItems = [
  'Builder',
  'Backups',
  'Activity',
  'Support',
  'Settings'
];

const Index = () => {
  const [bounds, setBounds] = useState(INITIAL_BOUNDS);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { toast } = useToast();
  const { fitView } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeDragStop = useCallback((event: React.MouseEvent, node: Node) => {
    const x = Math.max(bounds.minX, Math.min(bounds.maxX, node.position.x));
    const y = Math.max(bounds.minY, Math.min(bounds.maxY, node.position.y));
    
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          return {
            ...n,
            position: { x, y },
          };
        }
        return n;
      })
    );
  }, [setNodes, bounds]);

  const addBackupInstance = useCallback(() => {
    const newNodeId = `backup-${nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      type: 'destinationNode',
      position: { 
        x: 250,
        y: Math.min(bounds.maxY - 100, nodes[nodes.length - 1].position.y + 150)
      },
      data: { label: `Backup ${nodes.length - 2}` },
    };

    setNodes((nds) => [...nds, newNode]);
    
    // Expand workspace if needed
    if (newNode.position.y + 150 > bounds.maxY) {
      setBounds((prev) => ({
        ...prev,
        maxY: prev.maxY + 200,
      }));
    }

    // Connect the new node
    const newEdge = {
      id: `e-${nodes.length}-${newNodeId}`,
      source: 'scanner-1',
      target: newNodeId,
      animated: true,
      style: { stroke: '#9b87f5' }
    };
    
    setEdges((eds) => [...eds, newEdge]);

    toast({
      title: "Backup Instance Added",
      description: "A new backup instance has been created.",
    });

    // Fit view to show new node
    setTimeout(() => fitView({ duration: 500 }), 100);
  }, [nodes, bounds, setNodes, setEdges, toast, fitView]);

  return (
    <div className="w-full h-screen bg-background">
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

      <div className="w-full h-12 border-b flex items-center justify-between px-4">
        <nav className="flex space-x-6">
          {navigationItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`text-sm ${
                item === 'Builder' 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        <Button 
          onClick={addBackupInstance}
          className="ml-auto"
          variant="secondary"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Backup Instance
        </Button>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
        className="bg-background"
      >
        <Background 
          color="#e5e5e5"
          gap={16} 
          size={1}
          className="transition-opacity duration-300"
        />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Index;