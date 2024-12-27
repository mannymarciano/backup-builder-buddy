import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SourceBlock from "@/components/SourceBlock";
import ScannerBlock from "@/components/ScannerBlock";
import DestinationBlock from "@/components/DestinationBlock";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#f3f3f3] bg-dot-pattern bg-[length:20px_20px] relative">
      <div className="fixed top-4 right-4 z-10">
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Create New Backup
        </Button>
      </div>
      
      <div className="p-8">
        <div className="flex flex-col gap-8">
          <SourceBlock />
          <ScannerBlock />
          <DestinationBlock />
        </div>
      </div>
    </div>
  );
};

export default Index;