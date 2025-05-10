
import React, { useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Card } from '@/components/ui/card';

type Lot = {
  lot_id: string;
  product_id: string;
  production_date: string;
  expiry_date: string;
  status: string;
};

type LotGenealogy = {
  id: number;
  parent_lot_id: string;
  child_lot_id: string;
  relationship_type: string;
  created_at: string;
};

interface LotGenealogyTreeProps {
  lots: Lot[];
  genealogy: LotGenealogy[];
  selectedLot: string | null;
  onSelectLot: (lotId: string) => void;
}

// Custom styled node component
const StyledNode = ({ lot, isSelected, onClick }: { 
  lot: Lot; 
  isSelected: boolean; 
  onClick: () => void;
}) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer transition-all ${
      isSelected 
        ? 'ring-2 ring-factory-teal' 
        : 'hover:bg-gray-50 dark:hover:bg-factory-blue-light'
    }`}
  >
    <Card className={`p-2 text-center bg-white dark:bg-factory-blue ${
      isSelected ? 'border-factory-teal' : ''
    }`}>
      <div className="font-medium text-sm">{lot.lot_id}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{lot.product_id}</div>
      <div className={`text-xs mt-1 px-1 py-0.5 rounded ${
        lot.status === 'active' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      }`}>
        {lot.status}
      </div>
    </Card>
  </div>
);

const LotGenealogyTree: React.FC<LotGenealogyTreeProps> = ({ 
  lots, 
  genealogy, 
  selectedLot, 
  onSelectLot 
}) => {
  // If no lots provided, show a message
  if (lots.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        No lot data available
      </div>
    );
  }

  // Find the root lots (those that are not children in any relationship)
  const childLotIds = genealogy.map(rel => rel.child_lot_id);
  const rootLots = lots.filter(lot => !childLotIds.includes(lot.lot_id));

  // Helper function to build the tree recursively
  const buildTreeNodes = (parentLotId: string) => {
    // Find all children of this parent
    const children = genealogy.filter(rel => rel.parent_lot_id === parentLotId);
    
    if (children.length === 0) {
      return null;
    }
    
    return children.map(child => {
      const childLot = lots.find(lot => lot.lot_id === child.child_lot_id);
      if (!childLot) return null;
      
      return (
        <TreeNode 
          key={child.id} 
          label={
            <StyledNode 
              lot={childLot} 
              isSelected={selectedLot === childLot.lot_id}
              onClick={() => onSelectLot(childLot.lot_id)}
            />
          }
        >
          {buildTreeNodes(childLot.lot_id)}
        </TreeNode>
      );
    });
  };

  // If no root lots found, use the first lot as root
  const rootLotsToShow = rootLots.length > 0 ? rootLots : [lots[0]];

  return (
    <div className="overflow-auto p-4 h-96">
      {rootLotsToShow.map(rootLot => (
        <Tree
          key={rootLot.lot_id}
          lineWidth="2px"
          lineColor="#00A9A5"
          lineBorderRadius="10px"
          label={
            <StyledNode 
              lot={rootLot} 
              isSelected={selectedLot === rootLot.lot_id}
              onClick={() => onSelectLot(rootLot.lot_id)}
            />
          }
        >
          {buildTreeNodes(rootLot.lot_id)}
        </Tree>
      ))}
    </div>
  );
};

export default LotGenealogyTree;
