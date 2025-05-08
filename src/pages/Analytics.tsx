
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import KpiCard from '../components/dashboard/KpiCard';
import { AreaChart, BarChart, LineChart, PieChart, ResponsiveContainer, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Pie, Cell } from 'recharts';
import { BarChart as BarChartIcon, Search, Filter, Download } from 'lucide-react';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30d');
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Sample production data
  const productionData = [
    { date: 'May 1', actual: 420, planned: 450 },
    { date: 'May 2', actual: 435, planned: 450 },
    { date: 'May 3', actual: 455, planned: 450 },
    { date: 'May 4', actual: 440, planned: 450 },
    { date: 'May 5', actual: 425, planned: 450 },
    { date: 'May 6', actual: 460, planned: 450 },
    { date: 'May 7', actual: 470, planned: 450 },
  ];

  // Sample quality data
  const qualityData = [
    { name: 'Pass', value: 85 },
    { name: 'Minor Defects', value: 10 },
    { name: 'Major Defects', value: 5 },
  ];
  
  const QUALITY_COLORS = ['#00A9A5', '#FFA500', '#FF6347'];
  
  // Sample equipment utilization data
  const utilizationData = [
    { name: 'CNC Mill #103', utilization: 78 },
    { name: 'Assembly Robot #47', utilization: 65 },
    { name: 'Injection Molding #5', utilization: 82 },
    { name: 'Test Station #12', utilization: 45 },
    { name: 'Packaging Line #3', utilization: 92 },
  ];
  
  // Sample energy consumption data
  const energyData = [
    { month: 'Jan', consumption: 240 },
    { month: 'Feb', consumption: 230 },
    { month: 'Mar', consumption: 250 },
    { month: 'Apr', consumption: 210 },
    { month: 'May', consumption: 190 },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-factory-blue-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-xl font-bold">Analytics & Reporting</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Production metrics and factory performance</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-2">
              <div className="flex">
                <button 
                  className={`px-3 py-1 text-sm rounded-l-md transition-colors ${
                    dateRange === '7d' 
                      ? 'bg-factory-teal text-white' 
                      : 'bg-white dark:bg-factory-blue text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-factory-blue-light'
                  }`}
                  onClick={() => setDateRange('7d')}
                >
                  7d
                </button>
                <button 
                  className={`px-3 py-1 text-sm transition-colors ${
                    dateRange === '30d' 
                      ? 'bg-factory-teal text-white' 
                      : 'bg-white dark:bg-factory-blue text-gray-700 dark:text-gray-300 border-y border-gray-300 dark:border-factory-blue-light'
                  }`}
                  onClick={() => setDateRange('30d')}
                >
                  30d
                </button>
                <button 
                  className={`px-3 py-1 text-sm transition-colors ${
                    dateRange === '90d' 
                      ? 'bg-factory-teal text-white' 
                      : 'bg-white dark:bg-factory-blue text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-factory-blue-light'
                  }`}
                  onClick={() => setDateRange('90d')}
                >
                  90d
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-r-md transition-colors ${
                    dateRange === 'custom' 
                      ? 'bg-factory-teal text-white' 
                      : 'bg-white dark:bg-factory-blue text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-factory-blue-light'
                  }`}
                  onClick={() => setDateRange('custom')}
                >
                  Custom
                </button>
              </div>
              
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-white dark:bg-factory-blue border border-gray-300 dark:border-factory-blue-light rounded-md flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-factory-blue-light transition-colors">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </button>
                <button className="px-3 py-1 text-sm bg-white dark:bg-factory-blue border border-gray-300 dark:border-factory-blue-light rounded-md flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-factory-blue-light transition-colors">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KpiCard 
              title="Production Efficiency"
              value="87.5%"
              trend={2.3}
              icon={<BarChartIcon className="h-5 w-5" />}
              loading={loading}
              description="vs. last period"
            />
            <KpiCard 
              title="Quality Rate"
              value="95.2%"
              trend={-0.8}
              icon={<BarChartIcon className="h-5 w-5" />}
              loading={loading}
              description="First pass yield"
            />
            <KpiCard 
              title="Energy Efficiency"
              value="76.3%"
              trend={4.1}
              icon={<BarChartIcon className="h-5 w-5" />}
              loading={loading}
              description="kWh per unit"
            />
            <KpiCard 
              title="Throughput"
              value="452"
              trend={1.5}
              icon={<BarChartIcon className="h-5 w-5" />}
              loading={loading}
              description="units per day"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light flex justify-between items-center">
                <h2 className="font-semibold">Production Output</h2>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-factory-teal rounded-full mr-1"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Actual</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-gray-300 dark:bg-gray-500 rounded-full mr-1"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Target</span>
                  </div>
                </div>
              </div>
              <div className="p-4 h-80">
                {loading ? (
                  <div className="animate-pulse h-full bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={productionData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1A2942',
                          borderColor: '#374151',
                          color: '#E5E7EB'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#00A9A5" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="planned" 
                        stroke="#9CA3AF" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light">
                <h2 className="font-semibold">Equipment Utilization</h2>
              </div>
              <div className="p-4 h-80">
                {loading ? (
                  <div className="animate-pulse h-full bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={utilizationData}
                      layout="vertical"
                      margin={{ top: 10, right: 10, left: 140, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#374151" />
                      <XAxis type="number" domain={[0, 100]} stroke="#9CA3AF" />
                      <YAxis type="category" dataKey="name" stroke="#9CA3AF" width={130} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1A2942',
                          borderColor: '#374151',
                          color: '#E5E7EB'
                        }}
                        formatter={(value) => [`${value}%`, 'Utilization']}
                      />
                      <Bar dataKey="utilization" fill="#00A9A5">
                        {utilizationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.utilization < 50 ? '#FFA500' : '#00A9A5'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light">
                <h2 className="font-semibold">Energy Consumption Trend</h2>
              </div>
              <div className="p-4 h-80">
                {loading ? (
                  <div className="animate-pulse h-full bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={energyData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1A2942',
                          borderColor: '#374151',
                          color: '#E5E7EB'
                        }}
                        formatter={(value) => [`${value} kWh`, 'Consumption']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="consumption" 
                        stroke="#00A9A5"
                        fill="#00A9A530"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light">
                <h2 className="font-semibold">Quality Breakdown</h2>
              </div>
              <div className="p-4 h-80">
                {loading ? (
                  <div className="animate-pulse h-full bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                ) : (
                  <div className="h-full flex flex-col lg:flex-row items-center justify-center">
                    <div className="w-48 h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={qualityData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            innerRadius={40}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {qualityData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={QUALITY_COLORS[index % QUALITY_COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-4">
                      <div className="space-y-3">
                        {qualityData.map((entry, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: QUALITY_COLORS[index] }}></div>
                            <span>{entry.name}: </span>
                            <span className="ml-1 font-medium">{entry.value}%</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-3 border-t dark:border-factory-blue-light text-sm">
                        <p>First Pass Yield: <span className="font-medium">85%</span></p>
                        <p className="mt-1">Quality Target: <span className="font-medium">90%</span></p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
            <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light flex justify-between items-center">
              <h2 className="font-semibold">Detailed Product Analysis</h2>
              <div className="flex items-center">
                <div className="relative mr-2">
                  <Search className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search products" 
                    className="pl-8 pr-4 py-1 text-sm border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                  />
                </div>
                <button className="px-3 py-1 text-sm bg-factory-teal text-white rounded-md hover:bg-factory-teal-dark transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-factory-blue-light">
                <thead className="bg-gray-50 dark:bg-factory-blue-light">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Production Volume</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quality Rate</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Energy Usage</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cycle Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-factory-blue divide-y divide-gray-200 dark:divide-factory-blue-light">
                  {loading ? (
                    Array(5).fill(0).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-24"></div></td>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-40"></div></td>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">PRD-001</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">Precision Actuator X7</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">1,245 units</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">97.2%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">12.3 kWh/unit</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">42 min</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">PRD-002</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">Hydraulic Valve Assembly</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">876 units</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">93.8%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">8.7 kWh/unit</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">36 min</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">PRD-003</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">Industrial Sensor Array</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">2,134 units</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">98.1%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">5.2 kWh/unit</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">27 min</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">PRD-004</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">Robotic Joint Module</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">653 units</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">92.4%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">14.8 kWh/unit</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">58 min</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">PRD-005</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">Control Board v2.5</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">3,457 units</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">99.3%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">3.1 kWh/unit</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">18 min</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
