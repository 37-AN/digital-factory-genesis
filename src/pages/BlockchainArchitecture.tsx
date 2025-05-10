
import React, { useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, Server, Shield, FileCode, Network } from 'lucide-react';
import BlockchainCode from '@/components/blockchain/BlockchainCode';
import ConsortiumNetwork from '@/components/blockchain/ConsortiumNetwork';
import AIFeedbackSystem from '@/components/blockchain/AIFeedbackSystem';
import BlockchainTransactionList from '@/components/blockchain/BlockchainTransactionList';
import BlockchainDataDisplay from '@/components/blockchain/BlockchainDataDisplay';
import { initializeBlockchainData } from '@/utils/blockchainSimulation';

const BlockchainArchitecture = () => {
  // Initialize blockchain data when the page loads
  useEffect(() => {
    initializeBlockchainData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-factory-blue-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <h1 className="text-xl font-bold mb-4">Blockchain Network Architecture</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <BlockchainTransactionList />
            <div className="lg:col-span-2">
              <BlockchainDataDisplay />
            </div>
          </div>
          
          <Tabs defaultValue="network" className="w-full">
            <TabsList className="w-full mb-6 grid grid-cols-4 gap-2">
              <TabsTrigger value="network" className="flex items-center">
                <Network className="h-4 w-4 mr-2" />
                Consortium Network
              </TabsTrigger>
              <TabsTrigger value="contracts" className="flex items-center">
                <FileCode className="h-4 w-4 mr-2" />
                Smart Contracts
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center">
                <Database className="h-4 w-4 mr-2" />
                AI-Driven System
              </TabsTrigger>
              <TabsTrigger value="orchestration" className="flex items-center">
                <Server className="h-4 w-4 mr-2" />
                Orchestration
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="network" className="space-y-4">
              <ConsortiumNetwork />
            </TabsContent>
            
            <TabsContent value="contracts" className="space-y-4">
              <BlockchainCode />
            </TabsContent>
            
            <TabsContent value="ai" className="space-y-4">
              <AIFeedbackSystem />
            </TabsContent>
            
            <TabsContent value="orchestration" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Server className="h-5 w-5 mr-2" />
                    System Orchestration
                  </CardTitle>
                  <CardDescription>
                    Automated workflows and system-level configuration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
                    <ScrollArea className="h-[400px] w-full rounded-md border p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap">
                        <code>
{`System:
  - For each new production lot:
      • Invoke CreateLot(lotID, productID, productionTS, expiryTS).
      • Trigger off-chain Edge Worker to perform barcode AI scan.
      • AI Worker stores image in IPFS → returns imageHash.
      • Invoke LogScan(scanID, lotID, timestamp, operatorID, stationID, imageHash).
      • After CreateLot, automatically invoke RecordQA(checkID, lotID, 'Pending', 'Auto QA', now).
  - Daily at 02:00:
      • Off-Chain Worker pulls last 24 h of ScanEvents.
      • Retrain OCR model; require ≥98 % extraction accuracy.
      • Deploy updated model to Edge devices.
      • Log model version on chaincode via RecordQA for audit.
  - Continuous:
      • API Gateway aggregates on-chain data for MES dashboard.
      • Trigger alerts if QA failure rate >2 %.
      • Repeat indefinitely.`}
                        </code>
                      </pre>
                    </ScrollArea>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Implementation Details</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Orchestration system runs on Hyperledger Cello or Apache Airflow</li>
                      <li>Event-driven architecture ensures real-time updates</li>
                      <li>Scheduled tasks handle model retraining and optimization</li>
                      <li>Alerts and notifications integrated with factory monitoring systems</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default BlockchainArchitecture;
