
import React, { useState } from 'react';
import { Bell, Search, Settings } from 'lucide-react';

const Header = () => {
  const [notifications] = useState(3);

  return (
    <header className="flex justify-between items-center p-4 border-b dark:border-factory-blue-light">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Digital Factory Genesis</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manufacturing Execution System Dashboard</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 text-sm border rounded-lg dark:border-factory-blue-light bg-transparent focus:outline-none focus:ring-2 focus:ring-factory-teal focus:border-transparent transition-colors" 
          />
        </div>
        
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-factory-blue-light transition-colors">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          {notifications > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-factory-danger text-[10px] font-medium text-white">
              {notifications}
            </span>
          )}
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-factory-blue-light transition-colors">
          <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        
        <button className="flex items-center space-x-2 ml-2 bg-transparent hover:bg-gray-100 dark:hover:bg-factory-blue-light px-3 py-2 rounded-lg transition-colors">
          <div className="h-8 w-8 rounded-full bg-factory-blue flex items-center justify-center text-white">
            <span className="font-medium">JD</span>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">John Doe</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
