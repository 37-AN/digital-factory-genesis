
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import KpiCard from '../components/dashboard/KpiCard';
import { Cpu, HelpCircle, Layers, Play, RefreshCcw, RotateCcw, Server } from 'lucide-react';

const DigitalTwin = () => {
  const [loading, setLoading] = useState(true);
  const [activeSimulation, setActiveSimulation] = useState(false);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-factory-blue-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-bold">Digital Twin Environment</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Virtual simulation and optimization platform</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button 
                className={`px-4 py-2 rounded-md flex items-center ${
                  activeSimulation 
                    ? "bg-red-500 hover:bg-red-600 text-white" 
                    : "bg-factory-teal hover:bg-factory-teal-dark text-white"
                } transition-colors`}
                onClick={() => setActiveSimulation(!activeSimulation)}
              >
                {activeSimulation ? (
                  <>
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    <span>Stop Simulation</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    <span>Run Simulation</span>
                  </>
                )}
              </button>
              
              <button className="px-4 py-2 rounded-md border border-gray-300 dark:border-factory-blue-light bg-white dark:bg-factory-blue hover:bg-gray-50 dark:hover:bg-factory-blue-light text-gray-700 dark:text-gray-200 transition-colors flex items-center">
                <RotateCcw className="h-4 w-4 mr-2" />
                <span>Reset Parameters</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KpiCard 
              title="Active Simulations"
              value={activeSimulation ? "1" : "0"}
              icon={<Cpu className="h-5 w-5" />}
              loading={loading}
              description="Digital Factory Line A"
            />
            <KpiCard 
              title="Simulation Speed"
              value="10x"
              icon={<RefreshCcw className="h-5 w-5" />}
              loading={loading}
              description="Real-time acceleration"
            />
            <KpiCard 
              title="Virtual Machines"
              value="28"
              icon={<Server className="h-5 w-5" />}
              loading={loading}
              description="All connected"
            />
            <KpiCard 
              title="Scenarios"
              value="3"
              icon={<Layers className="h-5 w-5" />}
              loading={loading}
              description="Optimization ready"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white dark:bg-factory-blue rounded-lg shadow overflow-hidden">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light flex justify-between">
                <h2 className="font-semibold">Digital Factory Visualization</h2>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>Simulation Time: </span>
                  <span className="font-mono ml-1">{activeSimulation ? "00:15:47" : "00:00:00"}</span>
                </div>
              </div>
              <div className="p-4 h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-900/30">
                {loading ? (
                  <div className="animate-pulse w-full h-full bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center border border-dashed border-gray-300 dark:border-factory-blue-light rounded">
                    <div className="text-center">
                      <div className="bg-gray-100 dark:bg-factory-blue-light p-4 rounded-full inline-block mb-4">
                        <Layers className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                      </div>
                      <p className="text-lg font-medium text-gray-500 dark:text-gray-400">Digital Twin Visualization</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm">
                        {activeSimulation 
                          ? "Simulation running. Connect to 3D visualization module to view real-time factory simulation." 
                          : "Start a simulation to view the 3D digital twin of your factory in real-time."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light">
                <h2 className="font-semibold">Simulation Parameters</h2>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    {Array(5).fill(0).map((_, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-1/3"></div>
                        <div className="h-8 bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Production Line Speed</label>
                      <div className="flex items-center">
                        <input 
                          type="range" 
                          min="50" 
                          max="150" 
                          defaultValue="100"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-factory-blue-light" 
                          disabled={activeSimulation}
                        />
                        <span className="ml-2 text-sm font-mono">100%</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quality Threshold</label>
                      <div className="flex items-center">
                        <input 
                          type="range" 
                          min="90" 
                          max="100" 
                          defaultValue="95"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-factory-blue-light" 
                          disabled={activeSimulation}
                        />
                        <span className="ml-2 text-sm font-mono">95%</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Maintenance Frequency</label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal text-sm"
                        disabled={activeSimulation}
                      >
                        <option>Regular Schedule</option>
                        <option>Predictive Only</option>
                        <option>Extended Intervals</option>
                        <option>Critical Only</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Power Consumption Mode</label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal text-sm"
                        disabled={activeSimulation}
                      >
                        <option>Standard Operation</option>
                        <option>Energy Saving</option>
                        <option>Maximum Performance</option>
                        <option>Balanced</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        <span>Advanced Parameters</span>
                        <HelpCircle className="h-3 w-3 ml-1 text-gray-400" />
                      </label>
                      <button 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue hover:bg-gray-50 dark:hover:bg-factory-blue-light text-gray-700 dark:text-gray-300 text-sm"
                        disabled={activeSimulation}
                      >
                        Configure Advanced Settings
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light">
                <h2 className="font-semibold">Optimization Scenarios</h2>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    {Array(3).fill(0).map((_, idx) => (
                      <div key={idx} className="space-y-2 border-b dark:border-factory-blue-light pb-4">
                        <div className="h-5 bg-gray-200 dark:bg-factory-blue-light rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-full"></div>
                        <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border-b dark:border-factory-blue-light pb-4">
                      <h3 className="font-medium text-factory-teal">Energy Optimization</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Simulation that optimizes factory operations to reduce energy consumption by up to 15% while maintaining production targets.</p>
                      <div className="mt-2 flex space-x-2">
                        <button 
                          className="px-3 py-1 bg-factory-teal text-white text-sm rounded hover:bg-factory-teal-dark transition-colors"
                          disabled={activeSimulation}
                        >
                          Load Scenario
                        </button>
                        <button className="px-3 py-1 border border-gray-300 dark:border-factory-blue-light text-sm rounded hover:bg-gray-50 dark:hover:bg-factory-blue-light transition-colors">
                          View Results
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-b dark:border-factory-blue-light pb-4">
                      <h3 className="font-medium text-factory-teal">Maximum Throughput</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Analyzes production line configurations to achieve maximum throughput with available resources and equipment.</p>
                      <div className="mt-2 flex space-x-2">
                        <button 
                          className="px-3 py-1 bg-factory-teal text-white text-sm rounded hover:bg-factory-teal-dark transition-colors"
                          disabled={activeSimulation}
                        >
                          Load Scenario
                        </button>
                        <button className="px-3 py-1 border border-gray-300 dark:border-factory-blue-light text-sm rounded hover:bg-gray-50 dark:hover:bg-factory-blue-light transition-colors">
                          View Results
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-factory-teal">Maintenance Schedule Optimization</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Predictive analysis to optimize maintenance schedules, reducing downtime and extending equipment lifetime.</p>
                      <div className="mt-2 flex space-x-2">
                        <button 
                          className="px-3 py-1 bg-factory-teal text-white text-sm rounded hover:bg-factory-teal-dark transition-colors"
                          disabled={activeSimulation}
                        >
                          Load Scenario
                        </button>
                        <button className="px-3 py-1 border border-gray-300 dark:border-factory-blue-light text-sm rounded hover:bg-gray-50 dark:hover:bg-factory-blue-light transition-colors">
                          View Results
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light">
                <h2 className="font-semibold">Simulation Results</h2>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="animate-pulse space-y-4 h-full">
                    <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                    <div className="h-32 bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-1/2"></div>
                    <div className="h-24 bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                  </div>
                ) : activeSimulation ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Real-time metrics updating</span>
                      <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 px-2 py-1 rounded-full">
                        Simulation Running
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Production Rate</span>
                        <span className="text-sm font-medium">127 units/hour</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Energy Consumption</span>
                        <span className="text-sm font-medium">438 kWh</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Quality Rate</span>
                        <span className="text-sm font-medium">97.3%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Resource Utilization</span>
                        <span className="text-sm font-medium">82.5%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Bottleneck Location</span>
                        <span className="text-sm font-medium">Assembly Station #3</span>
                      </div>
                    </div>
                    
                    <div className="border-t dark:border-factory-blue-light pt-4">
                      <h3 className="text-sm font-medium mb-2">AI Recommendations</h3>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start">
                          <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                          <span>Increase buffer capacity before Assembly Station #3 to prevent upstream starvation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                          <span>Reduce cycle time at Testing Station by implementing parallel processing</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                          <span>Adjust conveyor speed parameters to better synchronize with robotic pick rates</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center">
                    <div>
                      <div className="bg-gray-100 dark:bg-factory-blue-light p-4 rounded-full inline-block mb-4">
                        <Play className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                      </div>
                      <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No Active Simulation</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm">
                        Start a simulation to view real-time results and AI-powered optimization recommendations.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DigitalTwin;
