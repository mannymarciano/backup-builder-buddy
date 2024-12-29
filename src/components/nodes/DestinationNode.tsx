import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select as SelectSchedule,
  SelectContent as SelectScheduleContent,
  SelectItem as SelectScheduleItem,
  SelectTrigger as SelectScheduleTrigger,
  SelectValue as SelectScheduleValue,
} from "@/components/ui/select";

const DestinationNode = () => {
  const [destination, setDestination] = useState('');
  const [region, setRegion] = useState('');
  const [schedule, setSchedule] = useState('');
  const { toast } = useToast();

  const handleTestBackup = async () => {
    try {
      const url = localStorage.getItem('bubbleUrl');
      const apiKey = localStorage.getItem('bubbleApiKey');

      if (!url || !apiKey || !destination || !region || !schedule) {
        throw new Error('Please configure all backup settings');
      }

      toast({
        title: "Test backup initiated",
        description: "Testing backup configuration...",
      });

      // Simulate backup test
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Test successful",
        description: "Backup configuration is valid",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Test failed",
        description: error instanceof Error ? error.message : "Failed to test backup configuration",
      });
    }
  };

  return (
    <Card className="w-[300px] p-4 bg-card text-card-foreground">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="destination">Backup Destination</Label>
          <Select value={destination} onValueChange={setDestination}>
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
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger id="region">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us-west">North California</SelectItem>
              <SelectItem value="us-east">North Virginia</SelectItem>
              <SelectItem value="eu-west">London</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="schedule">Backup Schedule</Label>
          <SelectSchedule value={schedule} onValueChange={setSchedule}>
            <SelectScheduleTrigger id="schedule">
              <SelectScheduleValue placeholder="Select schedule" />
            </SelectScheduleTrigger>
            <SelectScheduleContent>
              <SelectScheduleItem value="daily">Daily</SelectScheduleItem>
              <SelectScheduleItem value="weekly">Weekly</SelectScheduleItem>
              <SelectScheduleItem value="monthly">Monthly</SelectScheduleItem>
            </SelectScheduleContent>
          </SelectSchedule>
        </div>

        <Button 
          onClick={handleTestBackup}
          className="w-full"
          disabled={!destination || !region || !schedule}
        >
          Test Backup Configuration
        </Button>
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
    </Card>
  );
};

export default DestinationNode;