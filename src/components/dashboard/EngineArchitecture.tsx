
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Database, RefreshCw, Server, Shield, Workflow } from 'lucide-react';

const EngineArchitecture = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Intelligent Engine Architecture</CardTitle>
        <CardDescription>Real-time processing and continuous learning system</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ai">
          <TabsList className="mb-4">
            <TabsTrigger value="ai">AI Engine</TabsTrigger>
            <TabsTrigger value="crypto">Crypto Engine</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai" className="space-y-4">
            <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
              <h3 className="text-sm font-semibold flex items-center mb-3">
                <Database className="h-4 w-4 mr-2" /> Data Ingestion & Storage
              </h3>
              <div className="flex flex-col space-y-2 text-xs">
                <div className="flex items-center">
                  <span className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded">MES Events</span>
                  <ArrowRight className="h-3 w-3 mx-2" />
                  <span className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded">Kafka Stream</span>
                  <ArrowRight className="h-3 w-3 mx-2" />
                  <span className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded">Raw Schema</span>
                </div>
                <div className="ml-8 mt-1 flex items-center">
                  <ArrowRight className="h-3 w-3 transform rotate-90" />
                </div>
                <div className="flex items-center ml-8">
                  <span className="bg-factory-teal/10 dark:bg-factory-teal/20 p-2 rounded">Analytics DB</span>
                  <ArrowRight className="h-3 w-3 mx-2 transform -rotate-90" />
                  <span className="bg-factory-teal/10 dark:bg-factory-teal/20 p-2 rounded">SSIS Jobs</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
              <h3 className="text-sm font-semibold flex items-center mb-3">
                <Workflow className="h-4 w-4 mr-2" /> Continuous Learning Pipeline
              </h3>
              <div className="flex flex-wrap justify-between text-xs">
                <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded mb-2 w-[48%]">
                  <p className="font-medium">Data Selection</p>
                  <p>Incremental data ingestion with balance policies</p>
                </div>
                <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded mb-2 w-[48%]">
                  <p className="font-medium">Triggers</p>
                  <p>5% data growth or weekly schedule</p>
                </div>
                <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded mb-2 w-[48%]">
                  <p className="font-medium">Model Training</p>
                  <p>In-database training on new data chunks</p>
                </div>
                <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded mb-2 w-[48%]">
                  <p className="font-medium">CI/CD</p>
                  <p>CML for model versioning and deployment</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
              <h3 className="text-sm font-semibold flex items-center mb-3">
                <Server className="h-4 w-4 mr-2" /> Deployment & Monitoring
              </h3>
              <div className="flex items-center justify-between text-xs mb-2">
                <div className="bg-factory-teal/10 dark:bg-factory-teal/20 p-2 rounded w-[31%]">
                  <p className="font-medium">API Endpoint</p>
                  <p>/api/mes/predict</p>
                </div>
                <ArrowRight className="h-3 w-3 mx-1" />
                <div className="bg-factory-teal/10 dark:bg-factory-teal/20 p-2 rounded w-[31%]">
                  <p className="font-medium">Validation</p>
                  <p>≥95% accuracy</p>
                </div>
                <ArrowRight className="h-3 w-3 mx-1" />
                <div className="bg-factory-teal/10 dark:bg-factory-teal/20 p-2 rounded w-[31%]">
                  <p className="font-medium">Performance</p>
                  <p>Drift monitoring</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="crypto" className="space-y-4">
            <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
              <h3 className="text-sm font-semibold flex items-center mb-3">
                <Database className="h-4 w-4 mr-2" /> Market Data Feeds
              </h3>
              <div className="flex flex-col space-y-2 text-xs">
                <div className="flex flex-wrap justify-between">
                  <span className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded mb-2 w-[31%] text-center">Order Books</span>
                  <span className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded mb-2 w-[31%] text-center">Trade Data</span>
                  <span className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded mb-2 w-[31%] text-center">Sentiment</span>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 transform rotate-90" />
                </div>
                <div className="flex items-center justify-center">
                  <span className="bg-factory-teal/10 dark:bg-factory-teal/20 p-2 rounded w-full text-center">
                    Time-Series Database (InfluxDB)
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
              <h3 className="text-sm font-semibold flex items-center mb-3">
                <RefreshCw className="h-4 w-4 mr-2" /> Reinforcement Learning Core
              </h3>
              <div className="flex flex-col space-y-2 text-xs">
                <div className="flex flex-wrap justify-between">
                  <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded mb-2 w-[48%]">
                    <p className="font-medium">Algorithm</p>
                    <p>TD3 for continuous action spaces</p>
                  </div>
                  <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded mb-2 w-[48%]">
                    <p className="font-medium">State Vector</p>
                    <p>Price deltas, volume, sentiment</p>
                  </div>
                </div>
                <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded w-full">
                  <p className="font-medium">Hierarchical RL</p>
                  <p>Sub-agents for different market regimes with meta-controller</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
              <h3 className="text-sm font-semibold flex items-center mb-3">
                <Shield className="h-4 w-4 mr-2" /> Risk Controls & Deployment
              </h3>
              <div className="flex flex-wrap justify-between text-xs">
                <div className="bg-factory-teal/10 dark:bg-factory-teal/20 p-2 rounded mb-2 w-[31%]">
                  <p className="font-medium">Retraining</p>
                  <p>Every 1000 trades or hourly</p>
                </div>
                <div className="bg-factory-teal/10 dark:bg-factory-teal/20 p-2 rounded mb-2 w-[31%]">
                  <p className="font-medium">Risk Limits</p>
                  <p>Max 5% drawdown, 2% position</p>
                </div>
                <div className="bg-factory-teal/10 dark:bg-factory-teal/20 p-2 rounded mb-2 w-[31%]">
                  <p className="font-medium">Validation</p>
                  <p>Sharpe ratio ≥1.0</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EngineArchitecture;
