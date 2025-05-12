
import { 
  BlockchainTransaction, 
  Machine, 
  ProductionBatch, 
  LotData, 
  QAResult, 
  ScanEvent 
} from './types';

// Get items from localStorage with type safety
export function getStorageItem<T>(key: string, defaultValue: T): T {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
}

// Set items in localStorage
export function setStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Storage keys
const STORAGE_KEYS = {
  TRANSACTIONS: 'blockchain_transactions',
  MACHINES: 'blockchain_machines',
  BATCHES: 'blockchain_batches',
  LOTS: 'blockchain_lots',
  QA_RESULTS: 'blockchain_qa_results',
  SCAN_EVENTS: 'blockchain_scan_events'
};

// Get blockchain data from localStorage
export function getBlockchainData() {
  return {
    transactions: getStorageItem<BlockchainTransaction[]>(STORAGE_KEYS.TRANSACTIONS, []),
    machines: getStorageItem<Machine[]>(STORAGE_KEYS.MACHINES, []),
    batches: getStorageItem<ProductionBatch[]>(STORAGE_KEYS.BATCHES, []),
    lots: getStorageItem<LotData[]>(STORAGE_KEYS.LOTS, []),
    qaResults: getStorageItem<QAResult[]>(STORAGE_KEYS.QA_RESULTS, []),
    scanEvents: getStorageItem<ScanEvent[]>(STORAGE_KEYS.SCAN_EVENTS, [])
  };
}

// Update blockchain data
export function updateBlockchainData<T>(key: string, data: T) {
  setStorageItem(key, data);
}

// Export storage keys
export { STORAGE_KEYS };
