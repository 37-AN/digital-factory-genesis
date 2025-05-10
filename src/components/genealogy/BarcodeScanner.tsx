
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { lotTracking } from '@/lib/supabase';

interface BarcodeScannerProps {
  onScan: (result: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleStartScan = () => {
    setIsScanning(true);
    // In a real implementation, this would activate the device camera
    // For this demo, we'll simulate a successful scan after a delay
    setTimeout(() => {
      simulateScan();
    }, 2000);
  };
  
  const simulateScan = async () => {
    setIsProcessing(true);
    // Simulate AI processing time
    setTimeout(async () => {
      const sampleLotIds = ['LOT-2025-0001', 'LOT-2025-0002', 'LOT-2025-0003'];
      const randomLot = sampleLotIds[Math.floor(Math.random() * sampleLotIds.length)];
      
      try {
        // Record the scan in the database
        await lotTracking.recordScan({
          lot_id: randomLot,
          station_id: 'STATION-001',
          operator_id: 'OP-001'
        });
        
        onScan(randomLot);
        toast({
          title: "Scan Recorded",
          description: `Lot ${randomLot} scan has been saved to database`,
        });
      } catch (error) {
        console.error("Error recording scan:", error);
        toast({
          variant: "destructive",
          title: "Scan Error",
          description: "Failed to record scan in database"
        });
      } finally {
        setIsScanning(false);
        setIsProcessing(false);
      }
    }, 1500);
  };
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check if it's an image file
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file."
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing the uploaded image
    setTimeout(async () => {
      const sampleLotIds = ['LOT-2025-0001', 'LOT-2025-0002', 'LOT-2025-0003'];
      const randomLot = sampleLotIds[Math.floor(Math.random() * sampleLotIds.length)];
      
      try {
        // In a real implementation, we would upload the image to storage
        // and get the URL to store in the database
        await lotTracking.recordScan({
          lot_id: randomLot,
          station_id: 'STATION-001',
          operator_id: 'OP-001',
          image_url: 'https://example.com/uploaded-image.jpg' // Placeholder
        });
        
        onScan(randomLot);
        toast({
          title: "Image Processed",
          description: `Lot ${randomLot} identified and scan recorded`,
        });
      } catch (error) {
        console.error("Error processing image:", error);
        toast({
          variant: "destructive",
          title: "Processing Error",
          description: "Failed to process the uploaded image"
        });
      } finally {
        setIsProcessing(false);
        
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }, 2000);
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full aspect-video bg-gray-100 dark:bg-factory-blue-light rounded-lg mb-4 flex items-center justify-center">
        {isScanning ? (
          <div className="text-center">
            {isProcessing ? (
              <div className="flex flex-col items-center">
                <RefreshCw className="h-8 w-8 animate-spin text-factory-teal mb-2" />
                <p>Processing barcode...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 border-4 border-factory-teal relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-factory-teal animate-scan"></div>
                </div>
                <p className="mt-2">Position barcode in the center</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <Camera className="h-12 w-12 mx-auto mb-2" />
            <p>Ready to scan</p>
          </div>
        )}
      </div>
      
      <div className="flex space-x-3">
        <Button 
          onClick={handleStartScan} 
          disabled={isScanning || isProcessing}
          className="flex items-center"
        >
          <Camera className="mr-2 h-4 w-4" />
          {isScanning ? 'Scanning...' : 'Scan Barcode'}
        </Button>
        
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isProcessing}
          />
          <Button 
            variant="outline" 
            disabled={isProcessing}
            className="flex items-center"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(12rem); }
          100% { transform: translateY(0); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BarcodeScanner;
