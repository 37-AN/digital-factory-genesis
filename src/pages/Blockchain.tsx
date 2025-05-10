import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import KpiCard from '../components/dashboard/KpiCard';
import { Database, FileCheck, FileSearch, Shield, ShieldCheck, Server } from 'lucide-react';
import { useDataSimulation } from '@/hooks/useDataSimulation';
import { generateBlockchainTransactions } from '@/utils/dataSimulation';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const Blockchain = () => {
  const [productId, setProductId] = useState('');
  const { data: transactions, loading } = useDataSimulation(() => generateBlockchainTransactions(5), { 
    interval: 15000 
  });

  const handleViewTransactionDetails = (txId) => {
    toast({
      title: "Transaction Details",
      description: `Viewing details for transaction ${txId}`
    });
    // In a real app, this would open a modal or navigate to a transaction details page
  };

  const handleVerifyProduct = (e) => {
    e.preventDefault();
    if (!productId.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid product ID",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Product Verification",
      description: `Verifying product with ID: ${productId}`
    });
    // In a real app, this would trigger API call to verify the product
  };

  const handleScanQR = () => {
    toast({
      title: "QR Scanner",
      description: "QR scanner would open in a complete implementation"
    });
    // In a real app, this would open the device camera to scan a QR code
  };

  const handleDeployContract = () => {
    toast({
      title: "Contract Deployment",
      description: "Smart contract deployment wizard would open in a complete implementation"
    });
    // In a real app, this would open a smart contract deployment wizard
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-factory-blue-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Blockchain Traceability</h1>
            <Link to="/blockchain-architecture">
              <Button variant="outline" className="flex items-center">
                <Server className="mr-2 h-4 w-4" />
                View Network Architecture
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KpiCard 
              title="Total Transactions"
              value="12,487"
              trend={3.7}
              icon={<Database className="h-5 w-5" />}
              loading={loading}
              description="This month"
            />
            <KpiCard 
              title="Verified Assets"
              value="7,842"
              trend={2.1}
              icon={<ShieldCheck className="h-5 w-5" />}
              loading={loading}
              description="Products & equipment"
            />
            <KpiCard 
              title="Smart Contracts"
              value="24"
              trend={0}
              icon={<FileCheck className="h-5 w-5" />}
              loading={loading}
              description="Active & deployed"
            />
            <KpiCard 
              title="Network Status"
              value="Operational"
              icon={<Shield className="h-5 w-5" />}
              loading={loading}
              description="All nodes healthy"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white dark:bg-factory-blue rounded-lg shadow overflow-hidden">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light">
                <h2 className="font-semibold">Recent Transactions</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-factory-blue-light">
                  <thead className="bg-gray-50 dark:bg-factory-blue-light">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transaction ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Block</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-factory-blue divide-y divide-gray-200 dark:divide-factory-blue-light">
                    {loading ? (
                      Array(5).fill(0).map((_, index) => (
                        <tr key={index} className="animate-pulse">
                          <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-24"></div></td>
                          <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-32"></div></td>
                          <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-20"></div></td>
                          <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                          <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-20"></div></td>
                          <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                        </tr>
                      ))
                    ) : (
                      transactions?.map((tx) => (
                        <tr key={tx.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-mono text-sm">{tx.id}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm">{tx.type}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-500 dark:text-gray-400">{tx.timestamp}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${tx.status === "Confirmed" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
                              }`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-mono">{tx.block}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-factory-teal">
                            <button 
                              className="hover:text-factory-teal-dark transition-colors"
                              onClick={() => handleViewTransactionDetails(tx.id)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light">
                <h2 className="font-semibold">Verify Product</h2>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-1/2"></div>
                    <div className="h-10 bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-1/4"></div>
                    <div className="h-32 bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Verify product authenticity and view manufacturing history by entering a product ID or scanning a QR code.
                    </p>
                    
                    <form onSubmit={handleVerifyProduct}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Product ID or Serial Number
                        </label>
                        <div className="flex">
                          <input 
                            type="text" 
                            placeholder="Enter product ID" 
                            value={productId}
                            onChange={e => setProductId(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-l-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                          />
                          <button 
                            type="submit"
                            className="px-4 py-2 bg-factory-teal text-white rounded-r-md hover:bg-factory-teal-dark transition-colors"
                          >
                            <FileSearch className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </form>
                    
                    <div className="text-center mt-6">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Or scan QR code</p>
                      <button 
                        className="mt-2 px-4 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue hover:bg-gray-50 dark:hover:bg-factory-blue-light text-gray-700 dark:text-gray-300 transition-colors"
                        onClick={handleScanQR}
                      >
                        Scan QR Code
                      </button>
                    </div>
                    
                    <div className="border-t dark:border-factory-blue-light mt-4 pt-4">
                      <h3 className="text-sm font-medium mb-2">Recently Verified</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-mono">PRD-2024-057832</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">5 mins ago</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-mono">PRD-2024-057740</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Yesterday</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-mono">PRD-2024-057623</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Yesterday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light">
                <h2 className="font-semibold">Smart Contract Performance</h2>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    {Array(4).fill(0).map((_, index) => (
                      <div key={index} className="flex justify-between items-center border-b dark:border-factory-blue-light pb-2">
                        <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-40"></div>
                        <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-20"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b dark:border-factory-blue-light pb-3">
                        <div>
                          <span className="font-medium">ProductRegistry</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Tracks product lifecycle</p>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-green-100 dark:bg-green-900/20 w-3 h-3 rounded-full mr-2"></div>
                          <span className="text-sm">Active</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center border-b dark:border-factory-blue-light pb-3">
                        <div>
                          <span className="font-medium">QualityControl</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Enforces quality standards</p>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-green-100 dark:bg-green-900/20 w-3 h-3 rounded-full mr-2"></div>
                          <span className="text-sm">Active</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center border-b dark:border-factory-blue-light pb-3">
                        <div>
                          <span className="font-medium">MaintenanceLog</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Records maintenance activities</p>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-green-100 dark:bg-green-900/20 w-3 h-3 rounded-full mr-2"></div>
                          <span className="text-sm">Active</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">SupplyChainVerifier</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Validates material sources</p>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-yellow-100 dark:bg-yellow-900/20 w-3 h-3 rounded-full mr-2"></div>
                          <span className="text-sm">Upgrading</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button 
                        className="w-full px-3 py-2 bg-factory-teal text-white rounded-md hover:bg-factory-teal-dark transition-colors"
                        onClick={handleDeployContract}
                      >
                        Deploy New Contract
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light">
                <h2 className="font-semibold">Network Statistics</h2>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-40 bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-1/2"></div>
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border dark:border-factory-blue-light rounded-lg p-3 text-center">
                        <div className="text-3xl font-bold text-factory-teal">14.5M</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Current Block Height</div>
                      </div>
                      
                      <div className="border dark:border-factory-blue-light rounded-lg p-3 text-center">
                        <div className="text-3xl font-bold text-factory-teal">1.2s</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Avg Transaction Time</div>
                      </div>
                      
                      <div className="border dark:border-factory-blue-light rounded-lg p-3 text-center">
                        <div className="text-3xl font-bold text-factory-teal">96.7%</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Uptime</div>
                      </div>
                      
                      <div className="border dark:border-factory-blue-light rounded-lg p-3 text-center">
                        <div className="text-3xl font-bold text-factory-teal">8/8</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Active Nodes</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Network Health: <span className="font-medium text-green-600 dark:text-green-400">Excellent</span>
                      </p>
                      <div className="flex items-center justify-center space-x-1">
                        <div className="w-6 h-1 bg-green-500 rounded"></div>
                        <div className="w-6 h-1 bg-green-500 rounded"></div>
                        <div className="w-6 h-1 bg-green-500 rounded"></div>
                        <div className="w-6 h-1 bg-green-500 rounded"></div>
                        <div className="w-6 h-1 bg-green-500 rounded"></div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Last system health check: 2 minutes ago
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Blockchain;
