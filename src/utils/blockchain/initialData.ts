
import { setStorageItem, STORAGE_KEYS } from './storage';
import { generateBlockchainTransactions } from '../dataSimulation';

// Initialize blockchain data with sample values if not present in localStorage
export function initializeBlockchainData() {
  // Check if data already exists in localStorage
  if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
    const initialTransactions = generateBlockchainTransactions(10);
    setStorageItem(STORAGE_KEYS.TRANSACTIONS, initialTransactions);
  }

  if (!localStorage.getItem(STORAGE_KEYS.MACHINES)) {
    const initialMachines = [
      { id: '0x72F8...9A3B', name: 'CNC Mill #103', lastMaintenance: '2023-04-15', status: 'Active' },
      { id: '0x91A3...F721', name: 'Robotic Arm #47', lastMaintenance: '2023-05-02', status: 'Maintenance' },
      { id: '0x45D1...8E32', name: 'Assembly Line #2', lastMaintenance: '2023-04-28', status: 'Active' },
      { id: '0xAB23...7C19', name: 'Injection Molding #5', lastMaintenance: '2023-05-10', status: 'Active' },
      { id: '0x19E8...3F52', name: 'Quality Check Station #3', lastMaintenance: '2023-05-08', status: 'Offline' }
    ];
    setStorageItem(STORAGE_KEYS.MACHINES, initialMachines);
  }

  if (!localStorage.getItem(STORAGE_KEYS.BATCHES)) {
    const initialBatches = [
      { id: '0xBF72...1D43', product: 'Engine Block', quantity: 250, date: '2023-05-01', status: 'Completed' },
      { id: '0x31E8...7A92', product: 'Transmission', quantity: 150, date: '2023-05-03', status: 'In Progress' },
      { id: '0xC4A1...8B37', product: 'Battery Pack', quantity: 500, date: '2023-05-06', status: 'Planned' },
      { id: '0x9D23...2E81', product: 'Control Module', quantity: 300, date: '2023-04-28', status: 'Completed' }
    ];
    setStorageItem(STORAGE_KEYS.BATCHES, initialBatches);
  }

  if (!localStorage.getItem(STORAGE_KEYS.LOTS)) {
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
    setStorageItem(STORAGE_KEYS.LOTS, initialLots);
  }

  if (!localStorage.getItem(STORAGE_KEYS.QA_RESULTS)) {
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
    setStorageItem(STORAGE_KEYS.QA_RESULTS, initialQAResults);
  }

  if (!localStorage.getItem(STORAGE_KEYS.SCAN_EVENTS)) {
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
    setStorageItem(STORAGE_KEYS.SCAN_EVENTS, initialScanEvents);
  }
}
