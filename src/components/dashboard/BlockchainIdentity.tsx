import React, { useState, useEffect } from 'react';
import { Machine, ProductionBatch, isMachine, isProductionBatch } from '@/utils/blockchain/types';
import { useBlockchainData } from '@/utils/blockchain/useBlockchainData';
import { verifyBlockchainItem } from '@/utils/blockchain/operations';

function BlockchainIdentity() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [batches, setBatches] = useState<ProductionBatch[]>([]);
  const { getBlockchainData } = useBlockchainData();
  
  useEffect(() => {
    const data = getBlockchainData();
    if (data) {
      // Filter and ensure we only set the appropriate types
      const machinesData = data.machines.filter(item => isMachine(item)) as Machine[];
      const batchesData = data.batches.filter(item => isProductionBatch(item)) as ProductionBatch[];
      
      setMachines(machinesData);
      setBatches(batchesData);
    }
  }, [getBlockchainData]);

  const verifyItem = (item: Machine | ProductionBatch) => {
    const verifiedItem = verifyBlockchainItem(item);
    
    if (isMachine(verifiedItem)) {
      setMachines(prevMachines => 
        prevMachines.map(machine => 
          machine.id === verifiedItem.id ? verifiedItem : machine
        )
      );
    } else if (isProductionBatch(verifiedItem)) {
      setBatches(prevBatches => 
        prevBatches.map(batch => 
          batch.id === verifiedItem.id ? verifiedItem : batch
        )
      );
    }
  };
  
  return (
    <div className="bg-white dark:bg-factory-blue rounded-lg p-4 shadow h-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Identity Management</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-2 text-gray-800 dark:text-gray-200">Machine Identities</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-factory-blue-light">
              <thead className="bg-gray-50 dark:bg-factory-blue-light">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Maintenance</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Verified</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-factory-blue divide-y divide-gray-200 dark:divide-factory-blue-light">
                {machines.map((machine) => (
                  <tr key={machine.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-300">{machine.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{machine.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{machine.lastMaintenance}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${machine.status === "Active" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                          : machine.status === "Maintenance"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                        }`}>
                        {machine.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {machine.verified ? (
                        <span className="text-green-600 dark:text-green-400">✓ Verified</span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">Unverified</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {!machine.verified && (
                        <button 
                          onClick={() => verifyItem(machine)}
                          className="text-factory-teal hover:text-factory-teal-dark transition-colors"
                        >
                          Verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-2 text-gray-800 dark:text-gray-200">Production Batch Identities</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-factory-blue-light">
              <thead className="bg-gray-50 dark:bg-factory-blue-light">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Verified</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-factory-blue divide-y divide-gray-200 dark:divide-factory-blue-light">
                {batches.map((batch) => (
                  <tr key={batch.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-300">{batch.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{batch.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{batch.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{batch.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${batch.status === "Completed" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                          : batch.status === "In Progress"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-300"
                        }`}>
                        {batch.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {batch.verified ? (
                        <span className="text-green-600 dark:text-green-400">✓ Verified</span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">Unverified</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {!batch.verified && (
                        <button 
                          onClick={() => verifyItem(batch)}
                          className="text-factory-teal hover:text-factory-teal-dark transition-colors"
                        >
                          Verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlockchainIdentity;
