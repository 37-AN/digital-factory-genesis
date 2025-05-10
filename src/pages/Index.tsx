
import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import KpiCard from '../components/dashboard/KpiCard';
import AiInsights from '../components/dashboard/AiInsights';
import SystemArchitecture from '../components/dashboard/SystemArchitecture';
import BlockchainIdentity from '../components/dashboard/BlockchainIdentity';
import EngineArchitecture from '../components/dashboard/EngineArchitecture';
import { BarChart, Activity, Database, QrCode, Cpu, TrendingUp } from 'lucide-react';
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
            <Link to="/ai-engine" className="no-underline">
              <KpiCard 
                title="AI Engine"
                value={kpiData?.connectedMachines.value || "97.2%"}
                trend={kpiData?.connectedMachines.trend || 0}
                icon={<Cpu className="h-5 w-5" />}
                loading={loading}
                description="MES Predictor accuracy"
              />
            </Link>
            <Link to="/crypto-engine" className="no-underline">
              <KpiCard 
                title="Crypto Engine"
                value="1.42"
                trend={1.2}
                icon={<TrendingUp className="h-5 w-5" />}
                loading={loading}
                description="Current Sharpe ratio"
              />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="min-h-[550px]">
              <SystemArchitecture />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <BlockchainIdentity />
              <Link to="/lot-genealogy" className="no-underline">
                <div className="bg-white dark:bg-factory-blue rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg mb-2">AI-Enhanced Lot Genealogy</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Track production batches through their entire lifecycle with AI-powered barcode scanning
                      </p>
                    </div>
                    <div className="p-3 bg-factory-teal bg-opacity-20 rounded-full">
                      <QrCode className="h-6 w-6 text-factory-teal" />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-500 dark:text-gray-400">Active Lots</span>
                      <span className="font-medium">128</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 dark:text-gray-400">Scan Accuracy</span>
                      <span className="font-medium">98.7%</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
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
