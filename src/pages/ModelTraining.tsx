
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Clock, BarChart, Database, RefreshCw, Shield, Zap } from 'lucide-react';
import TrainingMonitor from '@/components/training/TrainingMonitor';
import BlockchainMonitor from '@/components/training/BlockchainMonitor';

const ModelTraining = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
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
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Model Training & Blockchain Gateway</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Monitor continuous learning pipeline progress and blockchain integration
            </p>
          </div>
          
          <Tabs defaultValue="ai-training" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="ai-training"><Database className="h-4 w-4 mr-2" /> AI Training</TabsTrigger>
              <TabsTrigger value="crypto-training"><BarChart className="h-4 w-4 mr-2" /> Crypto Training</TabsTrigger>
              <TabsTrigger value="blockchain"><Shield className="h-4 w-4 mr-2" /> Blockchain Gateway</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai-training">
              <TrainingMonitor 
                type="mes_predictor"
                schedule="24 hours / 10% data growth"
                loading={loading}
                engine="AI"
              />
            </TabsContent>
            
            <TabsContent value="crypto-training">
              <TrainingMonitor 
                type="crypto_trader"
                schedule="1 hour / 1,000 trades"
                loading={loading}
                engine="Crypto"
              />
            </TabsContent>
            
            <TabsContent value="blockchain">
              <BlockchainMonitor loading={loading} />
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Training Schedules
                </CardTitle>
                <CardDescription>Automated model retraining cadence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, idx) => (
                      <div key={idx} className="animate-pulse space-y-2">
                        <div className="h-5 bg-gray-200 dark:bg-factory-blue-light rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 dark:bg-factory-blue-light rounded w-1/3"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="border-b dark:border-factory-blue-light pb-3">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">MES Predictor</span>
                        <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/20">Daily</Badge>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Every 24 hours or when new data exceeds 10% threshold
                      </div>
                    </div>
                    <div className="border-b dark:border-factory-blue-light pb-3">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Crypto Trader</span>
                        <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/20">Hourly</Badge>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Every hour or after 1,000 new market trades
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Blockchain Gateway</span>
                        <Badge variant="outline" className="bg-green-100 dark:bg-green-900/20">Continuous</Badge>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Real-time event monitoring with 30-second block confirmation
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Data Pipeline Health
                </CardTitle>
                <CardDescription>Status of data ingestion services</CardDescription>
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
                        <div className="font-medium">MES Event Stream</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">mes_raw schema</div>
                      </div>
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <span className="mr-1">Healthy</span>
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b dark:border-factory-blue-light">
                      <div>
                        <div className="font-medium">Market Data Feed</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">crypto_raw schema</div>
                      </div>
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <span className="mr-1">Healthy</span>
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">ETL Transformations</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">analytics tables</div>
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
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Model Deployment
                </CardTitle>
                <CardDescription>API endpoints and active versions</CardDescription>
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
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">MES prediction service</div>
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
                        <span className="font-medium">/api/crypto/trade</span>
                        <Badge>v3.7.2</Badge>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Trading policy endpoint</div>
                      <div className="w-full">
                        <div className="text-xs mb-1 flex justify-between">
                          <span>Uptime</span>
                          <span>100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">/api/blockchain/identity</span>
                        <Badge>v1.3.0</Badge>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Smart contract gateway</div>
                      <div className="w-full">
                        <div className="text-xs mb-1 flex justify-between">
                          <span>Uptime</span>
                          <span>97.5%</span>
                        </div>
                        <Progress value={97.5} className="h-2" />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModelTraining;
