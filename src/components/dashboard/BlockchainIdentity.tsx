import React, { useState, useEffect } from 'react';
import { Check, Search } from 'lucide-react';
import { useBlockchainData, Machine, ProductionBatch } from '@/utils/blockchain';

const BlockchainIdentity = () => {
  const [loadingId, setLoadingId] = useState(true);
  const [loadingMachines, setLoadingMachines] = useState(true);
  const [loadingBatches, setLoadingBatches] = useState(true);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [batches, setBatches] = useState<ProductionBatch[]>([]);
  const blockchainData = useBlockchainData();

  useEffect(() => {
    // Simulate loading states
    const timer1 = setTimeout(() => {
      setLoadingId(false);
    }, 1200);
    
    const timer2 = setTimeout(() => {
      const data = blockchainData.getBlockchainData();
      setMachines(data.machines);
      setLoadingMachines(false);
    }, 2000);
    
    const timer3 = setTimeout(() => {
      const data = blockchainData.getBlockchainData();
      setBatches(data.batches);
      setLoadingBatches(false);
    }, 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const verifyItem = (type: 'machine' | 'batch', id: string) => {
    if (type === 'machine') {
      const updatedMachines = blockchainData.verifyBlockchainItem('machine', id);
      setMachines(updatedMachines);
    } else {
      const updatedBatches = blockchainData.verifyBlockchainItem('batch', id);
      setBatches(updatedBatches);
    }
  };

  return (
    <div className="bg-white dark:bg-factory-blue rounded-lg p-4 shadow h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Blockchain Identity & Traceability</h2>
        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
          Connected to Ethereum
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Identity Verification Section */}
        <div className="border dark:border-factory-blue-light rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-factory-blue-light p-3 border-b dark:border-factory-blue-light">
            <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">System Identity</h3>
          </div>
          <div className="p-3">
            {loadingId ? (
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-200 dark:bg-factory-blue-light h-10 w-10"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-factory-blue-light rounded w-5/6"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-factory-teal-dark flex items-center justify-center text-white">
                  <Check className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Digital Factory Genesis</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <span>ID: 0x8F42...7B21</span>
                    <span className="mx-1">•</span>
                    <span className="text-factory-teal">Verified</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Machines Section */}
        <div className="border dark:border-factory-blue-light rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-factory-blue-light p-3 border-b dark:border-factory-blue-light">
            <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">Machine NFTs</h3>
          </div>
          <div className="p-3">
            {loadingMachines ? (
              <div className="space-y-3">
                {[1, 2, 3].map((_, idx) => (
                  <div key={idx} className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-factory-blue-light rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {machines.map((machine) => (
                  <div key={machine.id} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-factory-blue-light rounded-md transition-colors">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{machine.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">ID: {machine.id}</div>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        machine.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : machine.status === 'Maintenance'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {machine.status}
                      </span>
                      {machine.verified ? (
                        <span className="text-xs bg-factory-teal-dark/20 text-factory-teal px-2 py-1 rounded-full flex items-center">
                          <Check className="h-3 w-3 mr-1" /> Verified
                        </span>
                      ) : (
                        <button 
                          onClick={() => verifyItem('machine', machine.id)} 
                          className="text-xs bg-gray-100 dark:bg-factory-blue-light text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full flex items-center hover:bg-gray-200 dark:hover:bg-factory-blue transition-colors"
                        >
                          <Search className="h-3 w-3 mr-1" /> Verify
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Production Batches Section */}
        <div className="border dark:border-factory-blue-light rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-factory-blue-light p-3 border-b dark:border-factory-blue-light">
            <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">Production Batch NFTs</h3>
          </div>
          <div className="p-3">
            {loadingBatches ? (
              <div className="space-y-3">
                {[1, 2].map((_, idx) => (
                  <div key={idx} className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-factory-blue-light rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {batches.map((batch) => (
                  <div key={batch.id} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-factory-blue-light rounded-md transition-colors">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{batch.product}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {batch.id} • Qty: {batch.quantity}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        batch.status === 'Completed' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                          : batch.status === 'In Progress'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                      }`}>
                        {batch.status}
                      </span>
                      {batch.verified ? (
                        <span className="text-xs bg-factory-teal-dark/20 text-factory-teal px-2 py-1 rounded-full flex items-center">
                          <Check className="h-3 w-3 mr-1" /> Verified
                        </span>
                      ) : (
                        <button 
                          onClick={() => verifyItem('batch', batch.id)} 
                          className="text-xs bg-gray-100 dark:bg-factory-blue-light text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full flex items-center hover:bg-gray-200 dark:hover:bg-factory-blue transition-colors"
                        >
                          <Search className="h-3 w-3 mr-1" /> Verify
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainIdentity;
