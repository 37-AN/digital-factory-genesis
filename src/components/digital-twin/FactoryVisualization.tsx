
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Grid, Text, Html } from '@react-three/drei';
import { useDataSimulation } from '@/hooks/useDataSimulation';
import * as THREE from 'three';

// Define TypeScript interfaces for component props
interface MachineProps {
  position: [number, number, number];
  color?: string;
  name: string;
  status?: 'running' | 'idle' | 'error';
  efficiency?: number;
}

interface ConveyorProps {
  startPos: [number, number, number];
  endPos: [number, number, number];
  width?: number;
}

// Define the machine data structure to type-check the simulation data
interface MachineData {
  name: string;
  status: 'running' | 'idle' | 'error';
  efficiency: number;
}

interface SimulationData {
  machines: MachineData[];
}

const Machine = ({ 
  position, 
  color = "#60a5fa", 
  name, 
  status = "running", 
  efficiency = 100 
}: MachineProps) => {
  // Properly type the ref to be a THREE.Mesh object
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Animate based on status
  useFrame(() => {
    if (status === "running" && meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  const statusColor = useMemo(() => {
    if (status === "running") return "#4ade80";
    if (status === "idle") return "#facc15";
    return "#f87171";
  }, [status]);
  
  return (
    <group position={position}>
      {/* Base cylinder */}
      <Cylinder 
        args={[1, 1, 0.2, 32]} 
        position={[0, -0.6, 0]}
      >
        <meshStandardMaterial color="#475569" />
      </Cylinder>
      
      {/* Main machine body */}
      <Box args={[2, 1, 1]} ref={meshRef}>
        <meshStandardMaterial color={color} />
      </Box>
      
      {/* Status indicator */}
      <Cylinder 
        args={[0.1, 0.1, 0.3, 8]} 
        position={[0, 0.8, 0]}
      >
        <meshStandardMaterial color={statusColor} emissive={statusColor} emissiveIntensity={0.5} />
      </Cylinder>
      
      {/* Label */}
      <Html position={[0, 1.5, 0]} center>
        <div className="bg-white dark:bg-factory-blue px-2 py-1 rounded-md text-xs shadow-md">
          <p className="font-bold">{name}</p>
          <p className="text-xs opacity-80">Efficiency: {efficiency}%</p>
        </div>
      </Html>
    </group>
  );
};

const Conveyor = ({ startPos, endPos, width = 0.5 }: ConveyorProps) => {
  // Calculate the center position and rotation for the conveyor
  const centerX = (startPos[0] + endPos[0]) / 2;
  const centerZ = (startPos[2] + endPos[2]) / 2;
  const centerY = -0.4;  // Fixed Y position
  
  const length = Math.sqrt(
    Math.pow(endPos[0] - startPos[0], 2) + 
    Math.pow(endPos[2] - startPos[2], 2)
  );
  
  const angle = Math.atan2(
    endPos[2] - startPos[2],
    endPos[0] - startPos[0]
  );
  
  return (
    <Box 
      args={[length, 0.1, width]} 
      // Fix: Use an array instead of Vector3 since @react-three/drei Box expects array positions
      position={[centerX, centerY, centerZ]}
      rotation={[0, angle, 0]}
    >
      <meshStandardMaterial color="#94a3b8" />
    </Box>
  );
};

interface FactoryProps {
  running?: boolean;
}

const Factory = ({ running = false }: FactoryProps) => {
  const { data } = useDataSimulation<SimulationData>(() => {
    return {
      machines: [
        { name: "Assembly", status: "running" as const, efficiency: Math.floor(Math.random() * 20) + 80 },
        { name: "Welding", status: Math.random() > 0.1 ? "running" as const : "idle" as const, efficiency: Math.floor(Math.random() * 30) + 70 },
        { name: "Testing", status: Math.random() > 0.15 ? "running" as const : "error" as const, efficiency: Math.floor(Math.random() * 40) + 60 },
        { name: "Packaging", status: "running" as const, efficiency: Math.floor(Math.random() * 15) + 85 }
      ]
    };
  }, { interval: 3000, enabled: running });

  // Define typed default machines
  const defaultMachines: MachineData[] = [
    { name: "Assembly", status: "idle", efficiency: 0 },
    { name: "Welding", status: "idle", efficiency: 0 },
    { name: "Testing", status: "idle", efficiency: 0 },
    { name: "Packaging", status: "idle", efficiency: 0 }
  ];

  const machines = data?.machines || defaultMachines;

  // Define machine positions as proper tuples
  const machinePositions: [number, number, number][] = [
    [-6, 0, 0],
    [-2, 0, 0],
    [2, 0, 0],
    [6, 0, 0]
  ];

  return (
    <>
      {/* Floor */}
      <Grid
        args={[30, 30]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#64748b"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#475569"
        fadeDistance={30}
        position={[0, -0.5, 0]}
      />
      
      {/* Factory machines */}
      <Machine position={machinePositions[0]} name={machines[0].name} status={running ? machines[0].status : "idle"} efficiency={machines[0].efficiency} />
      <Machine position={machinePositions[1]} name={machines[1].name} status={running ? machines[1].status : "idle"} efficiency={machines[1].efficiency} color="#8b5cf6" />
      <Machine position={machinePositions[2]} name={machines[2].name} status={running ? machines[2].status : "idle"} efficiency={machines[2].efficiency} color="#10b981" />
      <Machine position={machinePositions[3]} name={machines[3].name} status={running ? machines[3].status : "idle"} efficiency={machines[3].efficiency} color="#f59e0b" />
      
      {/* Conveyors - We need to use array position format consistently */}
      <Conveyor startPos={machinePositions[0]} endPos={machinePositions[1]} />
      <Conveyor startPos={machinePositions[1]} endPos={machinePositions[2]} />
      <Conveyor startPos={machinePositions[2]} endPos={machinePositions[3]} />
    </>
  );
};

interface FactoryVisualizationProps {
  running?: boolean;
}

const FactoryVisualization = ({ running = false }: FactoryVisualizationProps) => {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Factory running={running} />
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true} 
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>
      {!running && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/40 text-white p-4 rounded-lg text-center max-w-xs">
            <p className="text-lg font-medium">Simulation Paused</p>
            <p className="text-sm mt-1">Start the simulation to activate the digital twin</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FactoryVisualization;
