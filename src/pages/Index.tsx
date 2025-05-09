
import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import KpiCard from '../components/dashboard/KpiCard';
import AiInsights from '../components/dashboard/AiInsights';
import SystemArchitecture from '../components/dashboard/SystemArchitecture';
import BlockchainIdentity from '../components/dashboard/BlockchainIdentity';
import EngineArchitecture from '../components/dashboard/EngineArchitecture';
import { BarChart, Activity, Database, Layers } from 'lucide-react';
import { useDataSimulation } from '@/hooks/useDataSimulation';
import { generateKpiData } from '@/utils/dataSimulation';
import { Link } from 'react-router-dom';

const Index = () => {
  const { data: kpiData, loading } = useDataSimulation(generateKpiData, { interval: 2000 }); // Reduced from 3000ms to 2000ms

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-factory-blue-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KpiCard 
              title="Overall Equipment Effectiveness"
              value={kpiData?.oee.value || "76.3%"}
              trend={kpiData?.oee.trend || 2.1}
              icon={<BarChart className="h-5 w-5" />}
              loading={loading}
            />
            <KpiCard 
              title="Active Production Orders"
              value={kpiData?.productionOrders.value || "14"}
              trend={kpiData?.productionOrders.trend || -1}
              icon={<Activity className="h-5 w-5" />}
              loading={loading}
              description={kpiData?.productionOrders.description || "3 high priority"}
            />
            <KpiCard 
              title="Connected Machines"
              value={kpiData?.connectedMachines.value || "28"}
              trend={kpiData?.connectedMachines.trend || 0}
              icon={<Database className="h-5 w-5" />}
              loading={loading}
              description={kpiData?.connectedMachines.description || "All machines online"}
            />
            <Link to="/model-training" className="no-underline">
              <KpiCard 
                title="AI Model Training"
                value={kpiData?.simulations.value || "2"}
                trend={kpiData?.simulations.trend || 1}
                icon={<Layers className="h-5 w-5" />}
                loading={loading}
                description={kpiData?.simulations.description || "MES & Crypto engines"}
              />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="min-h-[550px]">
              <SystemArchitecture />
            </div>
            <BlockchainIdentity />
          </div>
          
          <div className="mb-6">
            <EngineArchitecture />
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
