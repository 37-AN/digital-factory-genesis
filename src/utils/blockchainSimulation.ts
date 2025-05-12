
import React from 'react';
import { generateBlockchainTransactions } from './dataSimulation';

// Define types for blockchain data
export interface BlockchainTransaction {
  id: string;
  type: string;
  timestamp: string;
  status: "Confirmed" | "Pending";
  block: string;
}

export interface Machine {
  id: string;
  name: string;
  lastMaintenance: string;
  status: "Active" | "Maintenance" | "Offline";
  verified?: boolean;
}

export interface ProductionBatch {
  id: string;
  product: string;
  quantity: number;
  date: string;
  status: "Completed" | "In Progress" | "Planned";
  verified?: boolean;
}

export interface LotData {
  lotId: string;
  productId: string;
  productionTimestamp: number;
  expiryTimestamp: number;
  status: string;
  parentLots: string[];
}

export interface QAResult {
  checkId: string;
  lotId: string;
  result: "Passed" | "Failed" | "Pending";
  notes: string;
  timestamp: number;
}

export interface ScanEvent {
  scanId: string;
  lotId: string;
  timestamp: number;
  operatorId: string;
  stationId: string;
  imageHash: string;
}

// Generate initial data if not present in localStorage
export function initializeBlockchainData() {
  // Check if data already exists in localStorage
  if (!localStorage.getItem('blockchain_transactions')) {
    const initialTransactions = generateBlockchainTransactions(10);
    localStorage.setItem('blockchain_transactions', JSON.stringify(initialTransactions));
  }

  if (!localStorage.getItem('blockchain_machines')) {
    const initialMachines = [
      { id: '0x72F8...9A3B', name: 'CNC Mill #103', lastMaintenance: '2023-04-15', status: 'Active' },
      { id: '0x91A3...F721', name: 'Robotic Arm #47', lastMaintenance: '2023-05-02', status: 'Maintenance' },
      { id: '0x45D1...8E32', name: 'Assembly Line #2', lastMaintenance: '2023-04-28', status: 'Active' },
      { id: '0xAB23...7C19', name: 'Injection Molding #5', lastMaintenance: '2023-05-10', status: 'Active' },
      { id: '0x19E8...3F52', name: 'Quality Check Station #3', lastMaintenance: '2023-05-08', status: 'Offline' }
    ];
    localStorage.setItem('blockchain_machines', JSON.stringify(initialMachines));
  }

  if (!localStorage.getItem('blockchain_batches')) {
    const initialBatches = [
      { id: '0xBF72...1D43', product: 'Engine Block', quantity: 250, date: '2023-05-01', status: 'Completed' },
      { id: '0x31E8...7A92', product: 'Transmission', quantity: 150, date: '2023-05-03', status: 'In Progress' },
      { id: '0xC4A1...8B37', product: 'Battery Pack', quantity: 500, date: '2023-05-06', status: 'Planned' },
      { id: '0x9D23...2E81', product: 'Control Module', quantity: 300, date: '2023-04-28', status: 'Completed' }
    ];
    localStorage.setItem('blockchain_batches', JSON.stringify(initialBatches));
  }

  if (!localStorage.getItem('blockchain_lots')) {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    
    const initialLots = [
      { 
        lotId: 'LOT-2023-05-001', 
        productId: 'PRD-ENG-BLK', 
        productionTimestamp: now - 5 * day, 
        expiryTimestamp: now + 365 * day, 
        status: 'Active',
        parentLots: []
      },
      { 
        lotId: 'LOT-2023-05-002', 
        productId: 'PRD-TRNSMN', 
        productionTimestamp: now - 3 * day, 
        expiryTimestamp: now + 365 * day, 
        status: 'Active',
        parentLots: ['LOT-2023-04-015']
      },
      { 
        lotId: 'LOT-2023-05-003', 
        productId: 'PRD-BTRY-PK', 
        productionTimestamp: now - 1 * day, 
        expiryTimestamp: now + 180 * day, 
        status: 'QA',
        parentLots: []
      }
    ];
    localStorage.setItem('blockchain_lots', JSON.stringify(initialLots));
  }

  if (!localStorage.getItem('blockchain_qa_results')) {
    const now = Date.now();
    const hour = 60 * 60 * 1000;
    
    const initialQAResults = [
      { 
        checkId: 'QA-2023-05-001', 
        lotId: 'LOT-2023-05-001', 
        result: 'Passed', 
        notes: 'All specifications met', 
        timestamp: now - 96 * hour
      },
      { 
        checkId: 'QA-2023-05-002', 
        lotId: 'LOT-2023-05-002', 
        result: 'Pending', 
        notes: 'Testing in progress', 
        timestamp: now - 24 * hour
      },
      { 
        checkId: 'QA-2023-05-003', 
        lotId: 'LOT-2023-05-003', 
        result: 'Failed', 
        notes: 'Battery capacity below threshold', 
        timestamp: now - 6 * hour
      }
    ];
    localStorage.setItem('blockchain_qa_results', JSON.stringify(initialQAResults));
  }

  if (!localStorage.getItem('blockchain_scan_events')) {
    const now = Date.now();
    const hour = 60 * 60 * 1000;
    
    const initialScanEvents = [
      { 
        scanId: 'SCN-2023-05-001', 
        lotId: 'LOT-2023-05-001', 
        timestamp: now - 120 * hour,
        operatorId: 'OP-104',
        stationId: 'STATION-3',
        imageHash: 'QmT5NvUtoM5n8Stf6Qx5ZfRf1XgfQsJV7FxhoJGRsS8S1A'
      },
      { 
        scanId: 'SCN-2023-05-002', 
        lotId: 'LOT-2023-05-002', 
        timestamp: now - 48 * hour,
        operatorId: 'OP-107',
        stationId: 'STATION-5',
        imageHash: 'QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ'
      },
      { 
        scanId: 'SCN-2023-05-003', 
        lotId: 'LOT-2023-05-003', 
        timestamp: now - 12 * hour,
        operatorId: 'OP-101',
        stationId: 'STATION-2',
        imageHash: 'QmT8CUmFLMNBVuFdXGwdYSWszrVNnMBJcZNS2XgbFSWj3V'
      }
    ];
    localStorage.setItem('blockchain_scan_events', JSON.stringify(initialScanEvents));
  }
}

// Retrieve all blockchain data
export function getBlockchainData() {
  return {
    transactions: JSON.parse(localStorage.getItem('blockchain_transactions') || '[]'),
    machines: JSON.parse(localStorage.getItem('blockchain_machines') || '[]'),
    batches: JSON.parse(localStorage.getItem('blockchain_batches') || '[]'),
    lots: JSON.parse(localStorage.getItem('blockchain_lots') || '[]'),
    qaResults: JSON.parse(localStorage.getItem('blockchain_qa_results') || '[]'),
    scanEvents: JSON.parse(localStorage.getItem('blockchain_scan_events') || '[]')
  };
}

// Update blockchain data
export function updateBlockchainData<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Simulate new transaction
export function simulateNewTransaction() {
  const transactions = JSON.parse(localStorage.getItem('blockchain_transactions') || '[]');
  const newTransactions = generateBlockchainTransactions(1);
  
  transactions.unshift(newTransactions[0]); // Add new transaction at the beginning
  
  // Keep only the most recent transactions
  if (transactions.length > 50) {
    transactions.pop();
  }
  
  localStorage.setItem('blockchain_transactions', JSON.stringify(transactions));
  return transactions;
}

// Verify an item
export function verifyBlockchainItem(type: 'machine' | 'batch', id: string) {
  const key = type === 'machine' ? 'blockchain_machines' : 'blockchain_batches';
  const items = JSON.parse(localStorage.getItem(key) || '[]');
  
  const updatedItems = items.map((item: Machine | ProductionBatch) => {
    if (item.id === id) {
      return { ...item, verified: true };
    }
    return item;
  });
  
  localStorage.setItem(key, JSON.stringify(updatedItems));
  return updatedItems;
}

// Create a custom hook for working with blockchain data
export function useBlockchainData() {
  // Fixed: Properly use React.useEffect instead of directly referencing useEffect
  React.useEffect(() => {
    initializeBlockchainData();
  }, []);
  
  return {
    getBlockchainData,
    simulateNewTransaction,
    verifyBlockchainItem,
    updateBlockchainData
  };
}
