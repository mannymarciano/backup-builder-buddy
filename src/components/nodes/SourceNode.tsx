import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const SourceNode = () => {
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [platform, setPlatform] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const validateConnection = async () => {
    setIsValidating(true);
    try {
      const baseUrl = url.endsWith('/') ? url : `${url}/`;
      const response = await fetch(`${baseUrl}api/1.1/meta`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to connect to Bubble.io');
      }

      const data = await response.json();
      toast({
        title: "Connection successful",
        description: "Successfully connected to Bubble.io",
      });
      
      // Store validated credentials
      localStorage.setItem('bubbleUrl', url);
      localStorage.setItem('bubbleApiKey', apiKey);
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: "Please check your URL and API key",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Card className="w-[300px] p-4 bg-card text-card-foreground">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="platform">Platform</Label>
          <Select value={platform} onValueChange={setPlatform}>
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
          <Input 
            id="url" 
            placeholder="https://your-app.bubble.io" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input 
            id="apiKey" 
            type="password" 
            placeholder="Enter your API key" 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        <Button 
          onClick={validateConnection} 
          disabled={!url || !apiKey || isValidating}
          className="w-full"
        >
          {isValidating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Validating
            </>
          ) : (
            'Validate Connection'
          )}
        </Button>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </Card>
  );
};

export default SourceNode;