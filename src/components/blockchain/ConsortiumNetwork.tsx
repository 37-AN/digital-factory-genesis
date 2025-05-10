
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, DatabaseBackup, Lock } from 'lucide-react';

const ConsortiumNetwork = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Permissioned Consortium Network
          </CardTitle>
          <CardDescription>
            Hyperledger Fabric implementation with modular consensus and privacy controls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Network Architecture</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Hyperledger Fabric provides a modular architecture with fine-grained privacy controls ideal for manufacturing consortia. 
                Each participant (e.g., plant, QA lab, logistics) runs a dedicated Fabric peer and holds certificates issued by a common Certificate Authority.
              </p>
              
              <h4 className="font-medium mt-4 mb-2">Key Components</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Certificate Authority (CA) - manages identity and access</li>
                <li>Ordering Service - handles transaction consensus</li>
                <li>Peer Nodes - maintain ledger state and execute chaincode</li>
                <li>Membership Service Provider (MSP) - authenticates participants</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Channels and Data Privacy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Each production line or manufacturing site operates on a dedicated channel, isolating sensitive data and 
                reducing ledger bloat. Shared channels host cross-site genealogy data, while private data collections store 
                confidential QA results.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="border dark:border-factory-blue-light p-3 rounded-lg">
                  <h4 className="font-medium">Production Channels</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Site-specific data isolation
                  </p>
                </div>
                <div className="border dark:border-factory-blue-light p-3 rounded-lg">
                  <h4 className="font-medium">Shared Channels</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Cross-site lot genealogy
                  </p>
                </div>
                <div className="border dark:border-factory-blue-light p-3 rounded-lg">
                  <h4 className="font-medium">Private Collections</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sensitive QA & test data
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Off-Chain Data Storage</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Large assets like barcode images, sensor data, and documentation are stored in IPFS or a dedicated cloud bucket. 
                IPFS hashes are recorded on-chain to ensure immutability and efficient retrieval, providing a complete audit trail 
                without bloating the ledger.
              </p>
              
              <div className="flex items-center justify-center mt-6 space-x-6">
                <div className="flex flex-col items-center">
                  <DatabaseBackup className="h-10 w-10 text-factory-teal mb-2" />
                  <span className="text-sm">IPFS Storage</span>
                </div>
                <div className="border-t-2 w-16 border-dashed border-gray-300 dark:border-gray-700"></div>
                <div className="flex flex-col items-center">
                  <Lock className="h-10 w-10 text-factory-teal mb-2" />
                  <span className="text-sm">Hash On-Chain</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsortiumNetwork;
