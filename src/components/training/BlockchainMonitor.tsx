
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Link, Activity, FileText } from 'lucide-react';

interface BlockchainMonitorProps {
  loading: boolean;
}

const BlockchainMonitor: React.FC<BlockchainMonitorProps> = ({ loading }) => {
  const [transactions, setTransactions] = useState<{
    hash: string;
    type: string;
    status: string;
    timestamp: string;
    gas: number;
  }[]>([
    {
      hash: '0x7f9e4c8d...',
      type: 'Machine NFT Minting',
      status: 'Confirmed',
      timestamp: '10:30:15',
      gas: 98500
    },
    {
      hash: '0x3e6b9d2f...',
      type: 'Batch Transfer',
      status: 'Pending',
      timestamp: '10:29:42',
      gas: 124600
    },
    {
      hash: '0xc12a45e8...',
      type: 'Quality Verification',
      status: 'Confirmed',
      timestamp: '10:28:07',
      gas: 75300
    },
    {
      hash: '0x9f81d73b...',
      type: 'Operator Authorization',
      status: 'Confirmed',
      timestamp: '10:25:55',
      gas: 85700
    }
  ]);
  
  const [contracts, setContracts] = useState<{
    name: string;
    address: string;
    type: string;
    events: number;
    lastBlock: number;
  }[]>([
    {
      name: 'MachineIdentity',
      address: '0x7F9abc...',
      type: 'ERC-721',
      events: 346,
      lastBlock: 18451267
    },
    {
      name: 'ProductionBatch',
      address: '0x3E8def...',
      type: 'ERC-721',
      events: 892,
      lastBlock: 18451265
    },
    {
      name: 'OperatorRegistry',
      address: '0x2C5fgh...',
      type: 'Custom',
      events: 127,
      lastBlock: 18451260
    },
    {
      name: 'QualityControl',
      address: '0xA71ijk...',
      type: 'Custom',
      events: 518,
      lastBlock: 18451254
    }
  ]);

  // Simulate new transactions coming in
  useEffect(() => {
    if (loading) return;
    
    const newTxTypes = [
      'Machine NFT Minting',
      'Batch Transfer',
      'Quality Verification',
      'Operator Authorization',
      'Maintenance Record',
      'Parameter Update'
    ];
    
    const interval = setInterval(() => {
      // 30% chance of adding a new transaction
      if (Math.random() < 0.3) {
        const randomType = newTxTypes[Math.floor(Math.random() * newTxTypes.length)];
        const randomHash = '0x' + Math.random().toString(16).substr(2, 8) + '...';
        const isPending = Math.random() < 0.2;
        
        setTransactions(prev => [
          {
            hash: randomHash,
            type: randomType,
            status: isPending ? 'Pending' : 'Confirmed',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            gas: Math.floor(Math.random() * 100000) + 50000
          },
          ...prev.slice(0, 3) // Keep only the 4 most recent transactions
        ]);
        
        // Update contract event count
        if (!isPending) {
          setContracts(prev => prev.map((contract, idx) => {
            if (idx === Math.floor(Math.random() * contracts.length)) {
              return {
                ...contract,
                events: contract.events + 1,
                lastBlock: contract.lastBlock + (Math.random() < 0.5 ? 1 : 0)
              };
            }
            return contract;
          }));
        }
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [loading, contracts]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Smart Contracts
            </CardTitle>
            <CardDescription>
              Active blockchain contracts for identity & traceability
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array(4).fill(0).map((_, idx) => (
                  <div key={idx} className="animate-pulse space-y-2 border-b dark:border-factory-blue-light pb-3 last:border-0 last:pb-0">
                    <div className="h-5 bg-gray-200 dark:bg-factory-blue-light rounded w-40"></div>
                    <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-24"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y dark:divide-factory-blue-light">
                {contracts.map((contract) => (
                  <div key={contract.address} className="py-2 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">{contract.name}</div>
                      <Badge variant="outline">{contract.type}</Badge>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Address: {contract.address}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center mr-4">
                        <Activity className="h-3.5 w-3.5 mr-1" />
                        <span>{contract.events} events</span>
                      </div>
                      <div className="flex items-center">
                        <Link className="h-3.5 w-3.5 mr-1" />
                        <span>Block #{contract.lastBlock}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Blockchain Transactions
            </CardTitle>
            <CardDescription>
              Recent identity & traceability transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array(4).fill(0).map((_, idx) => (
                  <div key={idx} className="animate-pulse space-y-2 border-b dark:border-factory-blue-light pb-3 last:border-0 last:pb-0">
                    <div className="h-5 bg-gray-200 dark:bg-factory-blue-light rounded w-40"></div>
                    <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.hash} className="border-b dark:border-factory-blue-light pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">{tx.type}</div>
                      <Badge className={tx.status === 'Confirmed' ? 
                        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'}>
                        {tx.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{tx.hash}</span>
                      <span>{tx.timestamp}</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Gas used: {tx.gas.toLocaleString()} wei
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Blockchain Gateway Services
          </CardTitle>
          <CardDescription>
            Integration services status and statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-factory-blue-light rounded w-full"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array(3).fill(0).map((_, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="h-5 bg-gray-200 dark:bg-factory-blue-light rounded w-40"></div>
                    <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Node.js Blockchain Gateway</span>
                  <span className="text-green-600 dark:text-green-400">Active</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Memory Usage</div>
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1">
                        <span>384 MB / 1024 MB</span>
                        <span>38%</span>
                      </div>
                      <Progress value={38} className="h-2" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">CPU Usage</div>
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1">
                        <span>2 cores</span>
                        <span>27%</span>
                      </div>
                      <Progress value={27} className="h-2" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Event Queue</div>
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1">
                        <span>12 events</span>
                        <span>6%</span>
                      </div>
                      <Progress value={6} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-factory-blue-light rounded-md">
                  <div className="text-sm font-medium mb-1">HSM Integration</div>
                  <div className="text-xl font-semibold">Secure</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Private key operations</div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-factory-blue-light rounded-md">
                  <div className="text-sm font-medium mb-1">Solidity Contracts</div>
                  <div className="text-xl font-semibold">4 Active</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Deployed & verified</div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-factory-blue-light rounded-md">
                  <div className="text-sm font-medium mb-1">Event Handlers</div>
                  <div className="text-xl font-semibold">8 Listeners</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Processing blockchain events</div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-factory-blue-light rounded-md">
                  <div className="text-sm font-medium mb-1">Smart Rules</div>
                  <div className="text-xl font-semibold">12 Active</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Quality & maintenance rules</div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlockchainMonitor;
