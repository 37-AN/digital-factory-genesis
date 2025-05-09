
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const SystemArchitecture = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const architectureNodes = [
    { 
      id: 'ui',
      label: 'UI Layer',
      description: 'React frontend with dashboards & controls', 
      x: 50, 
      y: 20, 
      connections: ['api']
    },
    { 
      id: 'api',
      label: 'API Gateway',
      description: 'REST/gRPC endpoints & authentication', 
      x: 50, 
      y: 35, 
      connections: ['microservices', 'blockchain', 'ai']
    },
    { 
      id: 'microservices',
      label: 'Microservices',
      description: 'Kubernetes-orchestrated services', 
      x: 25, 
      y: 50, 
      connections: ['db', 'message']
    },
    { 
      id: 'blockchain',
      label: 'Blockchain Gateway',
      description: 'Smart contract integration & identity', 
      x: 50, 
      y: 50, 
      connections: ['db']
    },
    { 
      id: 'ai',
      label: 'AI Engine',
      description: 'ML models for prediction & optimization', 
      x: 75, 
      y: 50, 
      connections: ['db', 'message']
    },
    { 
      id: 'db',
      label: 'Universal DB',
      description: 'Multi-database connectivity layer', 
      x: 50, 
      y: 65, 
      connections: []
    },
    { 
      id: 'message',
      label: 'Message Broker',
      description: 'Kafka event streaming platform', 
      x: 75, 
      y: 65, 
      connections: [] 
    },
    { 
      id: 'edge',
      label: 'Edge Computing',
      description: 'Low-latency data collection nodes', 
      x: 25, 
      y: 65, 
      connections: ['message'] 
    }
  ];
  
  const renderConnections = () => {
    return architectureNodes.flatMap(node => 
      node.connections.map(target => {
        const targetNode = architectureNodes.find(n => n.id === target);
        if (!targetNode) return null;
        
        const isHighlighted = 
          hoveredNode === node.id || 
          hoveredNode === target;
        
        return (
          <line 
            key={`${node.id}-${target}`}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2={`${targetNode.x}%`}
            y2={`${targetNode.y}%`}
            stroke={isHighlighted ? "#00A9A5" : "#4B5563"}
            strokeWidth={isHighlighted ? 2 : 1}
            strokeDasharray={isHighlighted ? "" : "4 2"}
          />
        );
      })
    );
  };
  
  return (
    <div className="bg-white dark:bg-factory-blue rounded-lg p-4 shadow h-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">System Architecture</h2>
      <div className="relative w-full h-[500px]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {renderConnections()}
          
          {architectureNodes.map(node => (
            <TooltipProvider key={node.id}>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <g 
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={`${node.x}%`}
                      cy={`${node.y}%`}
                      r="4.5"
                      fill={hoveredNode === node.id ? "#00A9A5" : "#1A2942"}
                      className="transition-all duration-300"
                    />
                    <rect
                      x={`${node.x - 10}%`}
                      y={`${node.y + 5}%`}
                      width="20%"
                      height="7%"
                      rx="1"
                      fill={hoveredNode === node.id ? "#00A9A5" : "#1A2942"}
                      fillOpacity={hoveredNode === node.id ? 1 : 0.9}
                      className="transition-all duration-300"
                    />
                    <text
                      x={`${node.x}%`}
                      y={`${node.y + 9}%`}
                      textAnchor="middle"
                      fill="white"
                      fontSize="2.5"
                      className="select-none pointer-events-none"
                    >
                      {node.label}
                    </text>
                  </g>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white dark:bg-factory-blue-dark border border-gray-200 dark:border-factory-blue-light p-2 text-xs shadow-md">
                  <p className="font-bold text-gray-900 dark:text-white">{node.label}</p>
                  <p className="text-gray-600 dark:text-gray-300">{node.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default SystemArchitecture;
