
import React, { useState, useEffect } from 'react';
import { useBlockchainData, LotData, QAResult, ScanEvent } from '@/utils/blockchain';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const BlockchainDataDisplay = () => {
  const [loading, setLoading] = useState(true);
  const [lots, setLots] = useState<LotData[]>([]);
  const [qaResults, setQaResults] = useState<QAResult[]>([]);
  const [scanEvents, setScanEvents] = useState<ScanEvent[]>([]);
  const blockchainData = useBlockchainData();

  useEffect(() => {
    // Load data with a small delay to simulate blockchain query
    const timer = setTimeout(() => {
      const data = blockchainData.getBlockchainData();
      setLots(data.lots);
      setQaResults(data.qaResults);
      setScanEvents(data.scanEvents);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusIcon = (result: string) => {
    if (result === 'Passed') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (result === 'Failed') return <XCircle className="h-4 w-4 text-red-500" />;
    return <Clock className="h-4 w-4 text-yellow-500" />;
  };

  const renderLoadingState = () => (
    <div className="space-y-3">
      {[1, 2, 3].map((_, idx) => (
        <div key={idx} className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-factory-blue-light rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Blockchain Data Records</CardTitle>
        <CardDescription>View production lots, QA checks, and barcode scans</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="lots">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="lots">Production Lots</TabsTrigger>
            <TabsTrigger value="qa">Quality Checks</TabsTrigger>
            <TabsTrigger value="scans">Barcode Scans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lots">
            {loading ? renderLoadingState() : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lot ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Production Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lots.map((lot) => (
                    <TableRow key={lot.lotId}>
                      <TableCell className="font-mono text-xs">{lot.lotId}</TableCell>
                      <TableCell>{lot.productId}</TableCell>
                      <TableCell>{formatTimestamp(lot.productionTimestamp)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                          lot.status === 'Active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : lot.status === 'QA'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {lot.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
          
          <TabsContent value="qa">
            {loading ? renderLoadingState() : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Check ID</TableHead>
                    <TableHead>Lot ID</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {qaResults.map((qa) => (
                    <TableRow key={qa.checkId}>
                      <TableCell className="font-mono text-xs">{qa.checkId}</TableCell>
                      <TableCell className="font-mono text-xs">{qa.lotId}</TableCell>
                      <TableCell>
                        <span className="flex items-center">
                          {getStatusIcon(qa.result)}
                          <span className="ml-1">{qa.result}</span>
                        </span>
                      </TableCell>
                      <TableCell>{formatTimestamp(qa.timestamp)}</TableCell>
                      <TableCell>{qa.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
          
          <TabsContent value="scans">
            {loading ? renderLoadingState() : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scan ID</TableHead>
                    <TableHead>Lot ID</TableHead>
                    <TableHead>Operator</TableHead>
                    <TableHead>Station</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scanEvents.map((scan) => (
                    <TableRow key={scan.scanId}>
                      <TableCell className="font-mono text-xs">{scan.scanId}</TableCell>
                      <TableCell className="font-mono text-xs">{scan.lotId}</TableCell>
                      <TableCell>{scan.operatorId}</TableCell>
                      <TableCell>{scan.stationId}</TableCell>
                      <TableCell>{formatTimestamp(scan.timestamp)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BlockchainDataDisplay;
