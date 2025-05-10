
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import BarcodeScanner from '../components/genealogy/BarcodeScanner';
import LotGenealogyTree from '../components/genealogy/LotGenealogyTree';
import QualityChecks from '../components/genealogy/QualityChecks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

type Lot = {
  lot_id: string;
  product_id: string;
  production_date: string;
  expiry_date: string;
  status: string;
};

type LotGenealogy = {
  id: number;
  parent_lot_id: string;
  child_lot_id: string;
  relationship_type: string;
  created_at: string;
};

const fetchLots = async () => {
  // This would be replaced with actual Supabase query once connected
  const mockResponse = {
    data: [
      {
        lot_id: 'LOT-2025-0001',
        product_id: 'PRD-001',
        production_date: '2025-04-01',
        expiry_date: '2026-04-01',
        status: 'active'
      },
      {
        lot_id: 'LOT-2025-0002',
        product_id: 'PRD-002',
        production_date: '2025-04-02',
        expiry_date: '2026-04-02',
        status: 'active'
      },
      {
        lot_id: 'LOT-2025-0003',
        product_id: 'PRD-003',
        production_date: '2025-04-03',
        expiry_date: '2026-04-03',
        status: 'inactive'
      }
    ]
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockResponse.data;
};

const fetchGenealogyData = async () => {
  // This would be replaced with actual Supabase query once connected
  const mockResponse = {
    data: [
      {
        id: 1,
        parent_lot_id: 'LOT-2025-0001',
        child_lot_id: 'LOT-2025-0002',
        relationship_type: 'component',
        created_at: '2025-04-01T12:00:00Z'
      },
      {
        id: 2,
        parent_lot_id: 'LOT-2025-0001',
        child_lot_id: 'LOT-2025-0003',
        relationship_type: 'assembly',
        created_at: '2025-04-01T14:30:00Z'
      }
    ]
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  return mockResponse.data;
};

const LotGenealogy = () => {
  const [selectedLot, setSelectedLot] = useState<string | null>(null);
  
  const { 
    data: lots,
    isLoading: lotsLoading,
    error: lotsError 
  } = useQuery({
    queryKey: ['lots'],
    queryFn: fetchLots
  });
  
  const {
    data: genealogyData,
    isLoading: genealogyLoading,
    error: genealogyError
  } = useQuery({
    queryKey: ['genealogy'],
    queryFn: fetchGenealogyData
  });
  
  const handleScan = (result: string) => {
    toast({
      title: "Barcode Scanned",
      description: `Lot ID: ${result} scanned successfully`,
    });
    setSelectedLot(result);
  };
  
  const handleQualityCheckSubmit = (data: any) => {
    toast({
      title: "Quality Check Recorded",
      description: `Check for Lot ${data.lotId} submitted successfully`,
    });
  };
  
  const isLoading = lotsLoading || genealogyLoading;
  const hasError = lotsError || genealogyError;
  
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-factory-blue-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-xl font-bold">AI-Enhanced Lot Genealogy & Assurance</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Track production lots with AI-powered barcode scanning</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-factory-blue rounded-lg shadow mb-6">
                <div className="p-4 border-b dark:border-factory-blue-light bg-gray-50 dark:bg-factory-blue-light">
                  <h2 className="font-semibold">Lot Genealogy Explorer</h2>
                </div>
                <div className="p-4">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-60">
                      <Loader2 className="w-8 h-8 animate-spin text-factory-teal" />
                    </div>
                  ) : hasError ? (
                    <div className="text-center text-red-500 p-4">
                      Error loading data. Please try again.
                    </div>
                  ) : (
                    <LotGenealogyTree 
                      lots={lots || []} 
                      genealogy={genealogyData || []}
                      selectedLot={selectedLot}
                      onSelectLot={setSelectedLot}
                    />
                  )}
                </div>
              </div>
              
              <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
                <Tabs defaultValue="quality">
                  <div className="p-4 border-b dark:border-factory-blue-light bg-gray-50 dark:bg-factory-blue-light">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="quality">Quality Checks</TabsTrigger>
                      <TabsTrigger value="history">Scan History</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="quality" className="p-4">
                    <QualityChecks 
                      lotId={selectedLot || ''} 
                      onSubmit={handleQualityCheckSubmit} 
                    />
                  </TabsContent>
                  
                  <TabsContent value="history" className="p-4">
                    <div className="text-sm">
                      {selectedLot ? (
                        <div>
                          <h3 className="font-medium mb-2">Recent Scans for {selectedLot}</h3>
                          <ul className="space-y-2">
                            <li className="p-2 bg-gray-50 dark:bg-factory-blue-light rounded">
                              <div className="flex justify-between">
                                <span>Station: Assembly Line #3</span>
                                <span>2025-05-09 14:23:45</span>
                              </div>
                              <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                                Operator: John Smith
                              </div>
                            </li>
                            <li className="p-2 bg-gray-50 dark:bg-factory-blue-light rounded">
                              <div className="flex justify-between">
                                <span>Station: Packaging #7</span>
                                <span>2025-05-09 16:12:30</span>
                              </div>
                              <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                                Operator: Sarah Johnson
                              </div>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 p-4">
                          Select a lot to view scan history
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div>
              <div className="bg-white dark:bg-factory-blue rounded-lg shadow mb-6">
                <div className="p-4 border-b dark:border-factory-blue-light bg-gray-50 dark:bg-factory-blue-light">
                  <h2 className="font-semibold">AI Barcode Scanner</h2>
                </div>
                <div className="p-4">
                  <BarcodeScanner onScan={handleScan} />
                </div>
              </div>
              
              <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
                <div className="p-4 border-b dark:border-factory-blue-light bg-gray-50 dark:bg-factory-blue-light">
                  <h2 className="font-semibold">AI Model Performance</h2>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Recognition Accuracy</span>
                      <span className="text-sm font-medium">98.7%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-factory-blue-light rounded-full h-2">
                      <div className="bg-factory-teal h-2 rounded-full" style={{ width: "98.7%" }}></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Processing Speed</span>
                      <span className="text-sm font-medium">0.23s/scan</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-factory-blue-light rounded-full h-2">
                      <div className="bg-factory-teal h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Error Rate</span>
                      <span className="text-sm font-medium">1.3%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-factory-blue-light rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{ width: "1.3%" }}></div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                    <p>Last model update: 2025-05-08</p>
                    <p>Total scans processed: 12,487</p>
                    <p>Training feedback entries: 342</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LotGenealogy;
