import React from "react";
import BuilderBlock from "./BuilderBlock";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const ScannerBlock = () => {
  return (
    <BuilderBlock title="Data Scanner" className="ml-16">
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
    </BuilderBlock>
  );
};

export default ScannerBlock;