
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
