
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Database, 
  Search,
  Activity, 
  BarChart, 
  Users, 
  Layers,
  Cpu,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: BarChart, label: 'Production', href: '/production' },
    { icon: Activity, label: 'AI Insights', href: '/insights' },
    { icon: Cpu, label: 'AI Engine', href: '/ai-engine' },
    { icon: TrendingUp, label: 'Crypto Engine', href: '/crypto-engine' },
    { icon: Layers, label: 'Digital Twin', href: '/digital-twin' },
    { icon: Database, label: 'Blockchain', href: '/blockchain' },
    { icon: Users, label: 'Identity', href: '/identity' },
    { icon: Search, label: 'Analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-factory-blue flex flex-col transition-all duration-300 text-white border-r border-factory-blue-light",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-factory-teal flex items-center justify-center mr-2">
              <span className="font-bold text-white">DF</span>
            </div>
            <h2 className="font-bold text-lg">Digital Factory</h2>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-md bg-factory-teal flex items-center justify-center mx-auto">
            <span className="font-bold text-white">DF</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1 rounded-full hover:bg-factory-blue-light transition-colors",
            collapsed && "mx-auto mt-4"
          )}
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pt-5">
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center py-3 px-4 text-gray-300 hover:bg-factory-blue-light hover:text-white transition-colors",
                    window.location.pathname === item.href && "bg-factory-blue-light text-white border-l-2 border-factory-teal"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="p-4 border-t border-factory-blue-light">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-factory-gray-dark flex items-center justify-center">
            <Users size={18} />
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">System Engineer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
