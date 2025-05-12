import { generateBlockchainTransactions } from '../dataSimulation';
import { getStorageItem, setStorageItem, STORAGE_KEYS, getBlockchainData } from './storage';
import { Machine, ProductionBatch } from './types';

// Simulate new transaction
export function simulateNewTransaction() {
  const transactions = getStorageItem(STORAGE_KEYS.TRANSACTIONS, []);
  const newTransactions = generateBlockchainTransactions(1);
  
  transactions.unshift(newTransactions[0]); // Add new transaction at the beginning
  
  // Keep only the most recent transactions
  if (transactions.length > 50) {
    transactions.pop();
  }
  
  setStorageItem(STORAGE_KEYS.TRANSACTIONS, transactions);
  return transactions;
}

// Verify a blockchain item (machine or production batch)
export function verifyBlockchainItem(type: 'machine' | 'batch', id: string) {
  const key = type === 'machine' ? STORAGE_KEYS.MACHINES : STORAGE_KEYS.BATCHES;
  const items = getStorageItem(key, []);
  
  const updatedItems = items.map((item: Machine | ProductionBatch) => {
    if (item.id === id) {
      return { ...item, verified: true };
    }
    return item;
  });
  
  setStorageItem(key, updatedItems);
  return updatedItems;
}
