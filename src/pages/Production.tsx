
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import KpiCard from '../components/dashboard/KpiCard';
import { AlertTriangle, CheckCircle, Clock, Factory, Layers, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Production = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const productionOrders = [
    { id: 'PO-2024-001', product: 'Precision Actuator X7', status: 'In Progress', completion: 65, priority: 'High', startTime: '08:30', endTime: '14:45' },
    { id: 'PO-2024-002', product: 'Hydraulic Valve Assembly', status: 'Scheduled', completion: 0, priority: 'Medium', startTime: '15:00', endTime: '18:30' },
    { id: 'PO-2024-003', product: 'Industrial Sensor Array', status: 'In Progress', completion: 28, priority: 'Medium', startTime: '09:15', endTime: '16:00' },
    { id: 'PO-2024-004', product: 'Robotic Joint Module', status: 'Complete', completion: 100, priority: 'High', startTime: '07:00', endTime: '12:30' },
    { id: 'PO-2024-005', product: 'Control Board v2.5', status: 'In Progress', completion: 82, priority: 'Low', startTime: '10:45', endTime: '17:15' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-factory-blue-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KpiCard 
              title="Active Production Orders"
              value="5"
              trend={1}
              icon={<Layers className="h-5 w-5" />}
              loading={loading}
              description="3 in progress"
            />
            <KpiCard 
              title="On-Time Delivery Rate"
              value="94.2%"
              trend={-0.8}
              icon={<Clock className="h-5 w-5" />}
              loading={loading}
            />
            <KpiCard 
              title="Machine Utilization"
              value="78.5%"
              trend={2.4}
              icon={<Factory className="h-5 w-5" />}
              loading={loading}
            />
            <KpiCard 
              title="Production Cycle Time"
              value="43.2 min"
              trend={-3.1}
              icon={<RefreshCw className="h-5 w-5" />}
              loading={loading}
              description="5.3% faster than target"
            />
          </div>
          
          <div className="bg-white dark:bg-factory-blue rounded-lg p-4 shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Production Orders</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-factory-blue-light">
                <thead className="bg-gray-50 dark:bg-factory-blue-light">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timeline</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-factory-blue divide-y divide-gray-200 dark:divide-factory-blue-light">
                  {loading ? (
                    Array(5).fill(0).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-40"></div></td>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-20"></div></td>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-24"></div></td>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-32"></div></td>
                      </tr>
                    ))
                  ) : (
                    productionOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{order.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{order.product}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Complete' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                            order.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                            order.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                            'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                          }`}>
                            {order.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {order.startTime} - {order.endTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full">
                            <div className="flex items-center gap-2">
                              <Progress value={order.completion} className="h-2" />
                              <span className="text-xs font-medium">{order.completion}%</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-factory-blue rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold mb-4">Material Inventory</h2>
              <div className="space-y-4">
                {!loading ? (
                  <>
                    <div className="flex items-center justify-between p-2 border-b dark:border-factory-blue-light">
                      <span className="font-medium">Aluminum Alloy Sheets</span>
                      <div className="flex items-center">
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">Sufficient</span>
                        <CheckCircle className="ml-2 h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border-b dark:border-factory-blue-light">
                      <span className="font-medium">Electronic Components Kit B</span>
                      <div className="flex items-center">
                        <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Low Stock</span>
                        <AlertTriangle className="ml-2 h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border-b dark:border-factory-blue-light">
                      <span className="font-medium">Hydraulic Fluid XH-500</span>
                      <div className="flex items-center">
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">Sufficient</span>
                        <CheckCircle className="ml-2 h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border-b dark:border-factory-blue-light">
                      <span className="font-medium">Precision Fasteners Type C</span>
                      <div className="flex items-center">
                        <span className="text-sm text-red-600 dark:text-red-400 font-medium">Critical</span>
                        <AlertTriangle className="ml-2 h-4 w-4 text-red-600 dark:text-red-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <span className="font-medium">Carbon Fiber Sheets</span>
                      <div className="flex items-center">
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">Sufficient</span>
                        <CheckCircle className="ml-2 h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </>
                ) : (
                  Array(5).fill(0).map((_, index) => (
                    <div key={index} className="animate-pulse flex items-center justify-between p-2 border-b dark:border-factory-blue-light">
                      <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-40"></div>
                      <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-24"></div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-factory-blue rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold mb-4">Machine Status</h2>
              <div className="space-y-4">
                {!loading ? (
                  <>
                    <div className="flex items-center justify-between p-2 border-b dark:border-factory-blue-light">
                      <div>
                        <span className="font-medium block">CNC Mill #103</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Cutting Operation</span>
                      </div>
                      <span className="text-sm bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 px-2 py-1 rounded-full">
                        Operating
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 border-b dark:border-factory-blue-light">
                      <div>
                        <span className="font-medium block">Assembly Robot #47</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Joint Assembly</span>
                      </div>
                      <span className="text-sm bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 px-2 py-1 rounded-full">
                        Maintenance
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 border-b dark:border-factory-blue-light">
                      <div>
                        <span className="font-medium block">Injection Molding #5</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Casing Production</span>
                      </div>
                      <span className="text-sm bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 px-2 py-1 rounded-full">
                        Operating
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 border-b dark:border-factory-blue-light">
                      <div>
                        <span className="font-medium block">Test Station #12</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Quality Control</span>
                      </div>
                      <span className="text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 px-2 py-1 rounded-full">
                        Idle
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <div>
                        <span className="font-medium block">Packaging Line #3</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Final Packaging</span>
                      </div>
                      <span className="text-sm bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 px-2 py-1 rounded-full">
                        Operating
                      </span>
                    </div>
                  </>
                ) : (
                  Array(5).fill(0).map((_, index) => (
                    <div key={index} className="animate-pulse flex items-center justify-between p-2 border-b dark:border-factory-blue-light">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-32"></div>
                        <div className="h-3 bg-gray-200 dark:bg-factory-blue-light rounded w-24"></div>
                      </div>
                      <div className="h-6 bg-gray-200 dark:bg-factory-blue-light rounded w-20"></div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Production;
