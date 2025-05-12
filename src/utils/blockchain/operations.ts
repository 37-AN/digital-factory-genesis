
import { BlockchainTransaction, Machine, ProductionBatch, LotData, QAResult, ScanEvent, isMachine, isProductionBatch } from './types';
import { getBlockchainData, updateBlockchainData } from './storage';

export const simulateNewTransaction = (type: string): BlockchainTransaction[] => {
  const id = Math.random().toString(36).substring(2, 10).toUpperCase();
  const block = Math.floor(Math.random() * 1000000).toString(16).toUpperCase();
  
  const transaction: BlockchainTransaction = {
    id: `TX-${id}`,
    type,
    timestamp: new Date().toISOString(),
    status: Math.random() > 0.2 ? "Confirmed" : "Pending",
    block: `0x${block}`
  };
  
  const data = getBlockchainData();
  const updatedTransactions = [transaction, ...data.transactions].slice(0, 30);
  
  updateBlockchainData({
    ...data,
    transactions: updatedTransactions
  });
  
  return updatedTransactions;
};

export const verifyBlockchainItem = (item: Machine | ProductionBatch): Machine | ProductionBatch => {
  const data = getBlockchainData();
  
  if (isMachine(item)) {
    const updatedMachines = data.machines.map(machine => 
      machine.id === item.id ? { ...machine, verified: true } : machine
    );
    
    updateBlockchainData({
      ...data,
      machines: updatedMachines
    });
    
    return { ...item, verified: true };
  } 
  else if (isProductionBatch(item)) {
    const updatedBatches = data.batches.map(batch => 
      batch.id === item.id ? { ...batch, verified: true } : batch
    );
    
    updateBlockchainData({
      ...data,
      batches: updatedBatches
    });
    
    return { ...item, verified: true };
  }
  
  return item;
};
