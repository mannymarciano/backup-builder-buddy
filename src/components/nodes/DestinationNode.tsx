import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const DestinationNode = () => {
  return (
    <Card className="w-[300px] p-4 bg-card text-card-foreground">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="destination">Backup Destination</Label>
          <Select>
            <SelectTrigger id="destination">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cloud">Cloud Storage</SelectItem>
              <SelectItem value="email" disabled>Email (Coming Soon)</SelectItem>
              <SelectItem value="drive" disabled>Google Drive (Coming Soon)</SelectItem>
              <SelectItem value="bucket" disabled>Personal Bucket (Coming Soon)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Select>
            <SelectTrigger id="region">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us-east">US East</SelectItem>
              <SelectItem value="us-west">US West</SelectItem>
              <SelectItem value="eu">Europe</SelectItem>
              <SelectItem value="asia">Asia Pacific</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
    </Card>
  );
};

export default DestinationNode;