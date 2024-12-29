import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activityItems = [
  {
    id: 1,
    user: {
      name: 'User',
      avatar: 'https://github.com/shadcn.png'
    },
    action: 'deployed backet (71d8472 in main) to production',
    timestamp: '5d'
  },
  {
    id: 2,
    user: {
      name: 'User',
      avatar: 'https://github.com/shadcn.png'
    },
    action: 'enabled Web Analytics on mbti',
    timestamp: '7d'
  }
];

const Activity = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8">Activity</h1>
      
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Filters</h3>
            <div className="flex items-center justify-between text-sm text-gray-600 cursor-pointer hover:text-black">
              <span>Last 7 Days</span>
              <span>▼</span>
            </div>
            <div className="text-sm text-gray-600">
              Dec 22 - Dec 29, 3:27pm
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 cursor-pointer hover:text-black">
              <span>Type</span>
              <span>▼</span>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="flex-1">
          <h2 className="font-medium mb-6">December 2024</h2>
          <div className="space-y-6">
            {activityItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={item.user.avatar} />
                  <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    You {item.action}
                  </p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {item.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;