
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import KpiCard from '../components/dashboard/KpiCard';
import AiInsights from '../components/dashboard/AiInsights';
import SystemArchitecture from '../components/dashboard/SystemArchitecture';
import BlockchainIdentity from '../components/dashboard/BlockchainIdentity';
import { BarChart, Activity, Database, Layers } from 'lucide-react';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-factory-blue-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KpiCard 
              title="Overall Equipment Effectiveness"
              value="76.3%"
              trend={2.1}
              icon={<BarChart className="h-5 w-5" />}
              loading={loading}
            />
            <KpiCard 
              title="Active Production Orders"
              value="14"
              trend={-1}
              icon={<Activity className="h-5 w-5" />}
              loading={loading}
              description="3 high priority"
            />
            <KpiCard 
              title="Connected Machines"
              value="28"
              trend={0}
              icon={<Database className="h-5 w-5" />}
              loading={loading}
              description="All machines online"
            />
            <KpiCard 
              title="Digital Twin Simulations"
              value="3"
              trend={1}
              icon={<Layers className="h-5 w-5" />}
              loading={loading}
              description="2 optimizations running"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <SystemArchitecture />
            <BlockchainIdentity />
          </div>
          
          <div className="mb-6">
            <AiInsights />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
