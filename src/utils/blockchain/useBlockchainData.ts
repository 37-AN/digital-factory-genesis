
import { useEffect } from 'react';
import { initializeBlockchainData } from './initialData';
import { getBlockchainData } from './storage';
import { simulateNewTransaction, verifyBlockchainItem } from './operations';
import { updateBlockchainData } from './storage';

// Custom hook for working with blockchain data
export function useBlockchainData() {
  useEffect(() => {
    initializeBlockchainData();
  }, []);
  
  return {
    getBlockchainData,
    simulateNewTransaction,
    verifyBlockchainItem,
    updateBlockchainData
  };
}
