import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BuilderBlockProps {
  title: string;
  children: React.ReactNode;
  isComingSoon?: boolean;
  className?: string;
}

const BuilderBlock = ({ title, children, isComingSoon, className = "" }: BuilderBlockProps) => {
  return (
    <Card className={`w-[300px] p-4 bg-white shadow-lg relative ${className} ${isComingSoon ? 'opacity-50' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        {isComingSoon && (
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            Coming Soon
          </Badge>
        )}
      </div>
      {children}
    </Card>
  );
};

export default BuilderBlock;