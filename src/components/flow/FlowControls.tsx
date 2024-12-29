import React from 'react';
import { Controls, ControlButton } from '@xyflow/react';
import { Plus } from 'lucide-react';

interface FlowControlsProps {
  onAddBackup: () => void;
}

const FlowControls = ({ onAddBackup }: FlowControlsProps) => {
  return (
    <Controls>
      <ControlButton onClick={onAddBackup} title="Add Backup Instance">
        <Plus className="h-4 w-4" />
      </ControlButton>
    </Controls>
  );
};

export default FlowControls;