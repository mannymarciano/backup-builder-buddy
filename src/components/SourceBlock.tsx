import React from "react";
import BuilderBlock from "./BuilderBlock";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SourceBlock = () => {
  return (
    <BuilderBlock title="Source Configuration">
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
    </BuilderBlock>
  );
};

export default SourceBlock;