import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SourceNode = () => {
  return (
    <Card className="w-[300px] p-4 bg-card text-card-foreground">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="platform">Platform</Label>
          <Select>
            <SelectTrigger id="platform">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bubble">Bubble.io</SelectItem>
              <SelectItem value="adalo" disabled>Adalo (Coming Soon)</SelectItem>
              <SelectItem value="others" disabled>Others (Coming Soon)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="url">Bubble.io URL</Label>
          <Input id="url" placeholder="https://your-app.bubble.io" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input id="apiKey" type="password" placeholder="Enter your API key" />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </Card>
  );
};

export default SourceNode;