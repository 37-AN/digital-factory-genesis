
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, RefreshCcw, Cpu, Zap } from 'lucide-react';

const AIFeedbackSystem = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI-Driven Barcode Scanning & Continuous Learning
          </CardTitle>
          <CardDescription>
            Edge AI with continuous improvement for accurate barcode processing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border dark:border-factory-blue-light rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Cpu className="h-5 w-5 mr-2 text-factory-teal" />
                <h3 className="font-medium">Edge Capture & Inference</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Deploy lightweight AI (e.g., a TensorFlow Lite model) at scan stations to extract barcode data and 
                upload images to IPFS. The hash and parsed data are then sent to the blockchain network to ensure 
                immutable verification.
              </p>
              
              <div className="mt-4 bg-gray-50 dark:bg-factory-blue-light p-3 rounded-md text-xs">
                <h4 className="font-medium mb-1">Implementation Notes:</h4>
                <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>TensorFlow Lite optimized for edge devices</li>
                  <li>Local AI processing reduces network dependency</li>
                  <li>Secure transmission to IPFS storage</li>
                  <li>Fallback mechanism for connectivity issues</li>
                </ul>
              </div>
            </div>
            
            <div className="border dark:border-factory-blue-light rounded-lg p-4">
              <div className="flex items-center mb-3">
                <RefreshCcw className="h-5 w-5 mr-2 text-factory-teal" />
                <h3 className="font-medium">Feedback Loop & Model Retraining</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                A continuous improvement system that identifies errors, collects new training data, 
                and enhances the model over time to improve accuracy and resilience.
              </p>
              
              <div className="mt-4 space-y-3">
                <div>
                  <h4 className="font-medium text-xs">Error Logging:</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Failed scans are flagged on-chain via a special QA record
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-xs">Batch Extraction:</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    A scheduled Off-Chain Worker queries Fabric for new scan events and failed flags every 24 hours
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-xs">Retraining:</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    The worker pulls images from IPFS, retrains the OCR model, and publishes a new model version to a Model Registry
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-4">
              <Zap className="h-5 w-5 mr-2 text-factory-teal" />
              <h3 className="font-medium">System Workflow</h3>
            </div>
            
            <div className="relative">
              <div className="absolute left-3 inset-y-0 w-0.5 bg-gray-200 dark:bg-factory-blue-light"></div>
              
              <div className="space-y-8 relative">
                <div className="ml-10 relative">
                  <div className="absolute -left-10 mt-1.5 w-6 h-6 rounded-full bg-factory-teal flex items-center justify-center text-white text-sm">
                    1
                  </div>
                  <h4 className="font-medium">Scan Capture</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Edge device captures barcode image and runs local inference
                  </p>
                </div>
                
                <div className="ml-10 relative">
                  <div className="absolute -left-10 mt-1.5 w-6 h-6 rounded-full bg-factory-teal flex items-center justify-center text-white text-sm">
                    2
                  </div>
                  <h4 className="font-medium">Processing & Storage</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Image uploaded to IPFS; data and hash recorded on blockchain
                  </p>
                </div>
                
                <div className="ml-10 relative">
                  <div className="absolute -left-10 mt-1.5 w-6 h-6 rounded-full bg-factory-teal flex items-center justify-center text-white text-sm">
                    3
                  </div>
                  <h4 className="font-medium">Success/Failure Logging</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Scan result recorded; failures flagged for review and retraining
                  </p>
                </div>
                
                <div className="ml-10 relative">
                  <div className="absolute -left-10 mt-1.5 w-6 h-6 rounded-full bg-factory-teal flex items-center justify-center text-white text-sm">
                    4
                  </div>
                  <h4 className="font-medium">Batch Analysis & Retraining</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Off-chain worker analyzes data, retrains model, and deploys updates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIFeedbackSystem;
