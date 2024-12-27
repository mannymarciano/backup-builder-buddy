import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const ScannerNode = () => {
  return (
    <Card className="w-[300px] p-4 bg-card text-card-foreground">
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Rescan
          </Button>
        </div>
        
        <ScrollArea className="h-[100px] rounded-md border p-2">
          <div className="space-y-2">
            <div className="text-sm">Users</div>
            <div className="text-sm">Products</div>
            <div className="text-sm">Orders</div>
            <div className="text-sm">Settings</div>
          </div>
        </ScrollArea>
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </Card>
  );
};

export default ScannerNode;