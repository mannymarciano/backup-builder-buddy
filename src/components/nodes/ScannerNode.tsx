import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const ScannerNode = () => {
  const [dataTypes, setDataTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const scanDataTypes = async () => {
    setIsScanning(true);
    try {
      const url = localStorage.getItem('bubbleUrl');
      const apiKey = localStorage.getItem('bubbleApiKey');

      if (!url || !apiKey) {
        throw new Error('Please configure Bubble.io connection first');
      }

      const baseUrl = url.endsWith('/') ? url : `${url}/`;
      const response = await fetch(`${baseUrl}api/1.1/meta`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data types');
      }

      const data = await response.json();
      const types = data.get || [];
      setDataTypes(types);
      toast({
        title: "Scan complete",
        description: `Found ${types.length} data types`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Scan failed",
        description: error instanceof Error ? error.message : "Failed to scan data types",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const toggleDataType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <Card className="w-[300px] p-4 bg-card text-card-foreground">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Data Types</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={scanDataTypes}
            disabled={isScanning}
          >
            {isScanning ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Rescan
              </>
            )}
          </Button>
        </div>
        
        <ScrollArea className="h-[200px] rounded-md border p-2">
          <div className="space-y-2">
            {dataTypes.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-4">
                No data types found. Click rescan to fetch data types.
              </div>
            ) : (
              dataTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={() => toggleDataType(type)}
                  />
                  <label
                    htmlFor={type}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </label>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </Card>
  );
};

export default ScannerNode;