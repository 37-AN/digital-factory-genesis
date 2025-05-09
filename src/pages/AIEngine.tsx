
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Database, Workflow, Server, RefreshCw } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const AIEngine = () => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleTrainModel = () => {
    toast({
      title: "Training Initiated",
      description: "MES predictor model training has started. Estimated completion time: 45 minutes.",
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-factory-blue-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">AI Engine</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage and monitor the AI engine for manufacturing execution system predictions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Data Ingestion & Storage
                </CardTitle>
                <CardDescription>Real-time MES data streaming status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, idx) => (
                      <div key={idx} className="animate-pulse space-y-2">
                        <div className="h-5 bg-gray-200 dark:bg-factory-blue-light rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between pb-3 border-b dark:border-factory-blue-light">
                      <div>
                        <div className="font-medium">Kafka Stream</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">MES events</div>
                      </div>
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <span className="mr-1">Online</span>
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b dark:border-factory-blue-light">
                      <div>
                        <div className="font-medium">Raw Schema</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">mes_raw</div>
                      </div>
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <span className="mr-1">3.2K events/min</span>
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Analytics DB</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">mes_analytics</div>
                      </div>
                      <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                        <span className="mr-1">Warning</span>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Workflow className="h-5 w-5 mr-2" />
                  Continuous Learning Pipeline
                </CardTitle>
                <CardDescription>Automated model retraining status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, idx) => (
                      <div key={idx} className="animate-pulse space-y-2">
                        <div className="h-5 bg-gray-200 dark:bg-factory-blue-light rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="pb-3 border-b dark:border-factory-blue-light">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Last Training</span>
                        <Badge variant="outline">8 hours ago</Badge>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">mes_predictor v2.4.1</div>
                      <div className="w-full">
                        <div className="text-xs mb-1 flex justify-between">
                          <span>Data Growth</span>
                          <span>7.3% / 10%</span>
                        </div>
                        <Progress value={73} className="h-2" />
                      </div>
                    </div>
                    <div className="pb-3 border-b dark:border-factory-blue-light">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Training Schedule</span>
                        <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/20">Daily</Badge>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Every 24 hours or when new data exceeds 10% threshold
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button 
                        className="bg-factory-teal hover:bg-factory-teal/90 text-white px-4 py-2 rounded"
                        onClick={handleTrainModel}
                      >
                        Trigger Manual Training
                      </button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  Model Deployment
                </CardTitle>
                <CardDescription>API endpoint and validation metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, idx) => (
                      <div key={idx} className="animate-pulse space-y-2">
                        <div className="h-5 bg-gray-200 dark:bg-factory-blue-light rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="pb-3 border-b dark:border-factory-blue-light">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">/api/mes/predict</span>
                        <Badge>v2.4.1</Badge>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Production endpoint</div>
                      <div className="w-full">
                        <div className="text-xs mb-1 flex justify-between">
                          <span>Uptime</span>
                          <span>99.8%</span>
                        </div>
                        <Progress value={99.8} className="h-2" />
                      </div>
                    </div>
                    <div className="pb-3 border-b dark:border-factory-blue-light">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Accuracy</span>
                        <span className="text-green-600 dark:text-green-400">97.2%</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Above 95% threshold</div>
                      <div className="w-full">
                        <div className="text-xs mb-1 flex justify-between">
                          <span>Performance</span>
                          <span>97.2% / 95%</span>
                        </div>
                        <Progress value={97.2} className="h-2" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Model Drift</span>
                        <span className="text-green-600 dark:text-green-400">-0.3%</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        No significant drift detected
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Pipeline Monitoring</CardTitle>
              <CardDescription>Real-time visualization of the AI training pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
                <h3 className="text-sm font-semibold flex items-center mb-3">
                  <Database className="h-4 w-4 mr-2" /> Data Processing Flow
                </h3>
                <div className="flex flex-col space-y-2 text-xs">
                  <div className="flex flex-wrap items-center">
                    <span className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded mb-2 mr-2">MES Events</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                    <span className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded mb-2 mr-2">Kafka Stream</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                    <span className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded mb-2 mr-2">Raw Schema</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                    <span className="bg-factory-teal/10 dark:bg-factory-teal/20 p-2 rounded mb-2">SSIS Jobs</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                    <span className="bg-factory-teal/10 dark:bg-factory-teal/20 p-2 rounded mb-2">Analytics DB</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
                <h3 className="text-sm font-semibold flex items-center mb-3">
                  <RefreshCw className="h-4 w-4 mr-2" /> Training Cycle
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded relative">
                    <p className="font-medium">1. Data Selection</p>
                    <p className="text-xs">Incremental with balance policies</p>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500">↓</div>
                  </div>
                  <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded relative">
                    <p className="font-medium">2. Training</p>
                    <p className="text-xs">In-database ML</p>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500">↓</div>
                  </div>
                  <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded relative">
                    <p className="font-medium">3. Validation</p>
                    <p className="text-xs">≥95% accuracy</p>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500">↓</div>
                  </div>
                  <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded relative">
                    <p className="font-medium">4. Deployment</p>
                    <p className="text-xs">API endpoint update</p>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500">↓</div>
                  </div>
                  <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded">
                    <p className="font-medium">5. Monitoring</p>
                    <p className="text-xs">Drift detection</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Training History</CardTitle>
              <CardDescription>Past model training sessions and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-factory-blue-light">
                      <th className="text-left py-2 px-4">Version</th>
                      <th className="text-left py-2 px-4">Date</th>
                      <th className="text-left py-2 px-4">Accuracy</th>
                      <th className="text-left py-2 px-4">Data Size</th>
                      <th className="text-left py-2 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <>
                        {Array(5).fill(0).map((_, idx) => (
                          <tr key={idx} className="border-b dark:border-factory-blue-light animate-pulse">
                            <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                            <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-28"></div></td>
                            <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-12"></div></td>
                            <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-20"></div></td>
                            <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <>
                        <tr className="border-b dark:border-factory-blue-light">
                          <td className="py-2 px-4 font-medium">v2.4.1</td>
                          <td className="py-2 px-4">2025-05-09 02:15</td>
                          <td className="py-2 px-4 text-green-600 dark:text-green-400">97.2%</td>
                          <td className="py-2 px-4">23.8 GB</td>
                          <td className="py-2 px-4">
                            <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full text-xs">
                              Active
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b dark:border-factory-blue-light">
                          <td className="py-2 px-4 font-medium">v2.4.0</td>
                          <td className="py-2 px-4">2025-05-08 02:00</td>
                          <td className="py-2 px-4">96.9%</td>
                          <td className="py-2 px-4">22.1 GB</td>
                          <td className="py-2 px-4">
                            <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                              Archived
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b dark:border-factory-blue-light">
                          <td className="py-2 px-4 font-medium">v2.3.2</td>
                          <td className="py-2 px-4">2025-05-07 08:45</td>
                          <td className="py-2 px-4">96.3%</td>
                          <td className="py-2 px-4">21.5 GB</td>
                          <td className="py-2 px-4">
                            <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                              Archived
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b dark:border-factory-blue-light">
                          <td className="py-2 px-4 font-medium">v2.3.1</td>
                          <td className="py-2 px-4">2025-05-06 02:30</td>
                          <td className="py-2 px-4">96.1%</td>
                          <td className="py-2 px-4">21.0 GB</td>
                          <td className="py-2 px-4">
                            <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                              Archived
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b dark:border-factory-blue-light">
                          <td className="py-2 px-4 font-medium">v2.3.0</td>
                          <td className="py-2 px-4">2025-05-05 02:00</td>
                          <td className="py-2 px-4 text-yellow-600 dark:text-yellow-400">94.8%</td>
                          <td className="py-2 px-4">20.2 GB</td>
                          <td className="py-2 px-4">
                            <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full text-xs">
                              Failed
                            </span>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AIEngine;
