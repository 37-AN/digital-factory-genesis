
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCode, Database, QrCode } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BlockchainCode = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileCode className="h-5 w-5 mr-2" />
            Smart Contracts (Chaincode)
          </CardTitle>
          <CardDescription>
            Core business logic implemented as blockchain smart contracts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="lot">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="lot">Lot Management</TabsTrigger>
              <TabsTrigger value="scan">Barcode Scanning</TabsTrigger>
              <TabsTrigger value="qa">Quality Assurance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="lot" className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Database className="h-4 w-4 mr-2" />
                  Lot Management Contract
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  This contract supports lot creation and genealogy tracking by linking parent and child lot IDs on-chain.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md">
                <ScrollArea className="h-[360px] w-full rounded-md border p-4 font-mono text-sm">
                  <pre>
                    <code>
{`type Lot struct {
  LotID         string   \`json:"lotID"\`
  ProductID     string   \`json:"productID"\`
  ProductionTS  int64    \`json:"productionTS"\`
  ExpiryTS      int64    \`json:"expiryTS"\`
  Status        string   \`json:"status"\`
  ParentLots    []string \`json:"parentLots"\`
}

func (s *SmartContract) CreateLot(ctx contractapi.TransactionContextInterface, lot Lot) error {
  lotJSON, _ := json.Marshal(lot)
  return ctx.GetStub().PutState(lot.LotID, lotJSON)
}

func (s *SmartContract) AddChildLot(ctx, parentID, childID string) error {
  parentBytes, _ := ctx.GetStub().GetState(parentID)
  var parent Lot; json.Unmarshal(parentBytes, &parent)
  parent.ParentLots = append(parent.ParentLots, childID)
  updated, _ := json.Marshal(parent)
  return ctx.GetStub().PutState(parentID, updated)
}`}
                    </code>
                  </pre>
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="scan" className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <QrCode className="h-4 w-4 mr-2" />
                  Barcode Scan Logging Contract
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Each scan event records metadata and an IPFS hash of the barcode image for verifiable audit trails.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md">
                <ScrollArea className="h-[360px] w-full rounded-md border p-4 font-mono text-sm">
                  <pre>
                    <code>
{`type ScanEvent struct {
  ScanID      string \`json:"scanID"\`
  LotID       string \`json:"lotID"\`
  Timestamp   int64  \`json:"timestamp"\`
  OperatorID  string \`json:"operatorID"\`
  StationID   string \`json:"stationID"\`
  ImageHash   string \`json:"imageHash"\`
}

func (s *SmartContract) LogScan(ctx, eventJSON string) error {
  return ctx.GetStub().PutState(uuid.New().String(), []byte(eventJSON))
}`}
                    </code>
                  </pre>
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="qa" className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Database className="h-4 w-4 mr-2" />
                  Quality Assurance Contract
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Automatically invoked by off-chain triggers when new lots are created, ensuring immutable QA logs.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md">
                <ScrollArea className="h-[360px] w-full rounded-md border p-4 font-mono text-sm">
                  <pre>
                    <code>
{`type QAResult struct {
  CheckID    string \`json:"checkID"\`
  LotID      string \`json:"lotID"\`
  Result     string \`json:"result"\`
  Notes      string \`json:"notes"\`
  CheckedTS  int64  \`json:"checkedTS"\`
}

func (s *SmartContract) RecordQA(ctx, qaJSON string) error {
  return ctx.GetStub().PutState(uuid.New().String(), []byte(qaJSON))
}`}
                    </code>
                  </pre>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlockchainCode;
