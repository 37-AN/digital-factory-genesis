
import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import AiInsights from '../components/dashboard/AiInsights';
import { BarChart, LineChart, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Area, Pie, Cell } from 'recharts';
import { useDataSimulation } from '@/hooks/useDataSimulation';
import { 
  generateProductionMetrics, 
  generateEnergyData, 
  generateQualityMetrics,
  chartConfig
} from '@/utils/dataSimulation';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "@/components/ui/use-toast";

const AIInsightsPage = () => {
  const { 
    data: productionData, 
    loading: loadingProduction 
  } = useDataSimulation(generateProductionMetrics, { interval: 7000 });
  
  const { 
    data: energyData, 
    loading: loadingEnergy 
  } = useDataSimulation(generateEnergyData, { interval: 10000 });
  
  const { 
    data: qualityData, 
    loading: loadingQuality 
  } = useDataSimulation(generateQualityMetrics, { interval: 8000 });

  const handleScheduleMaintenance = () => {
    toast({
      title: "Maintenance Scheduled",
      description: "Maintenance for Assembly Station #3 has been scheduled."
    });
  };

  const handleDetailedAnalysis = () => {
    toast({
      title: "Detailed Analysis",
      description: "Opening detailed vibration pattern analysis for Assembly Station #3."
    });
  };

  const handleViewRecommendation = () => {
    toast({
      title: "Energy Optimization Recommendation",
      description: "Viewing detailed recommendation for 12% energy reduction opportunity."
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-factory-blue-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <h1 className="text-xl font-bold mb-4">AI Insights & Analysis</h1>
          
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="production">Production</TabsTrigger>
              <TabsTrigger value="energy">Energy</TabsTrigger>
              <TabsTrigger value="quality">Quality</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <AiInsights />
            </TabsContent>
            
            <TabsContent value="production">
              <Card>
                <CardHeader>
                  <CardTitle>Production Metrics Analysis</CardTitle>
                  <CardDescription>
                    Real-time production efficiency, output, and quality metrics across manufacturing stations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {loadingProduction ? (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="h-32 w-32 rounded-md animate-pulse bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    ) : (
                      <ChartContainer config={chartConfig}>
                        <BarChart
                          data={productionData || []}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                          />
                          <defs>
                            <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="efficiency" fill="url(#colorEfficiency)" name="Efficiency" />
                          <Bar dataKey="output" fill="url(#colorOutput)" name="Output" />
                          <Bar dataKey="quality" fill="url(#colorQuality)" name="Quality" />
                        </BarChart>
                      </ChartContainer>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  Data updates every 7 seconds with AI-analyzed production metrics
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="energy">
              <Card>
                <CardHeader>
                  <CardTitle>Energy Consumption Patterns</CardTitle>
                  <CardDescription>
                    24-hour energy usage profile with AI-detected optimization opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {loadingEnergy ? (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="h-32 w-32 rounded-md animate-pulse bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    ) : (
                      <ChartContainer config={chartConfig}>
                        <LineChart
                          data={energyData || []}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                          />
                          <defs>
                            <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip />
                          <Area type="monotone" dataKey="value" stroke="#f59e0b" fillOpacity={1} fill="url(#colorEnergy)" name="Energy Usage (kWh)" />
                        </LineChart>
                      </ChartContainer>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  Data updates every 10 seconds with real-time energy consumption metrics
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="quality">
              <Card>
                <CardHeader>
                  <CardTitle>Quality Control Analysis</CardTitle>
                  <CardDescription>
                    Distribution of quality inspection results with AI anomaly detection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {loadingQuality ? (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="h-32 w-32 rounded-md animate-pulse bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    ) : (
                      <ChartContainer config={chartConfig}>
                        <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                          />
                          <Pie
                            data={qualityData || []}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {qualityData?.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={chartConfig[entry.name as keyof typeof chartConfig]?.color || '#8884d8'} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ChartContainer>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  Data updates every 8 seconds based on quality inspection results
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Anomaly Detection</CardTitle>
                <CardDescription>
                  Machine learning models continuously monitor and detect potential issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/20 rounded-md">
                    <h3 className="font-medium text-amber-800 dark:text-amber-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Anomaly Detected: Assembly Station #3
                    </h3>
                    <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                      Unusual vibration pattern detected on main bearing. Predictive model suggests 
                      potential failure within 72 hours (89% confidence).
                    </p>
                    <div className="mt-4 flex">
                      <button 
                        className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm"
                        onClick={handleScheduleMaintenance}
                      >
                        Schedule Maintenance
                      </button>
                      <button 
                        className="ml-2 px-3 py-1 border border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-md text-sm"
                        onClick={handleDetailedAnalysis}
                      >
                        Detailed Analysis
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/20 rounded-md">
                    <h3 className="font-medium text-blue-800 dark:text-blue-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Process Optimization Opportunity
                    </h3>
                    <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                      AI model detected a potential 12% energy reduction opportunity in the cooling system
                      during non-peak hours without affecting product quality.
                    </p>
                    <div className="mt-4">
                      <button 
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                        onClick={handleViewRecommendation}
                      >
                        View Recommendation
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIInsightsPage;
