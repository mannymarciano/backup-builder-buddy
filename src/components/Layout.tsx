import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigationItems = [
  { path: 'builder', label: 'Builder' },
  { path: 'backups', label: 'Backups' },
  { path: 'activity', label: 'Activity' },
  { path: 'support', label: 'Support' },
  { path: 'settings', label: 'Settings' }
];

const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="w-full h-16 border-b flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-sm"></div>
          <span className="font-medium">Project Name</span>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      {/* Navigation Bar */}
      <div className="w-full h-12 border-b flex items-center px-4">
        <nav className="flex space-x-6">
          {navigationItems.map(({ path, label }) => (
            <Link
              key={path}
              to={`/${path}`}
              className={`text-sm transition-colors ${
                currentPath === path
                  ? 'text-black border-b-2 border-black -mb-[1px]'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Page Content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;