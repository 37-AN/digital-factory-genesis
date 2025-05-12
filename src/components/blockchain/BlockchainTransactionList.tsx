
import React, { useState, useEffect } from 'react';
import { useBlockchainData, BlockchainTransaction } from '@/utils/blockchain';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const BlockchainTransactionList = () => {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { getBlockchainData, simulateNewTransaction } = useBlockchainData();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = () => {
      const data = getBlockchainData();
      setTransactions(data.transactions);
      setLoading(false);
    };

    fetchData();
    
    // Simulate new transaction every 30 seconds
    const interval = setInterval(() => {
      const newTransactions = simulateNewTransaction();
      setTransactions(newTransactions);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    const newTransactions = simulateNewTransaction();
    setTransactions(newTransactions);
    
    toast({
      title: "New Transaction Added",
      description: "Blockchain data has been updated with a new transaction",
      duration: 3000
    });
    
    setTimeout(() => setRefreshing(false), 500);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Transactions</CardTitle>
          <CardDescription>Recent transactions on the blockchain network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array(5).fill(null).map((_, idx) => (
              <div key={idx} className="animate-pulse flex flex-col space-y-1">
                <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-factory-blue-light rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Blockchain Transactions</CardTitle>
          <CardDescription>Recent transactions on the blockchain network</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={refreshing}
          className="text-xs"
        >
          <RefreshCcw className={`h-3 w-3 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Block</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.slice(0, 5).map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{tx.timestamp}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                    tx.status === "Confirmed" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                  }`}>
                    {tx.status === "Confirmed" ? (
                      <Check className="h-3 w-3 mr-1" />
                    ) : (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {tx.status}
                  </span>
                </TableCell>
                <TableCell className="font-mono text-xs">{tx.block}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BlockchainTransactionList;
