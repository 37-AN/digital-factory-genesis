
import { ChartConfig } from "@/components/ui/chart";

// Define types for different chart data structures
export interface LineChartData {
  name: string;
  value: number;
}

export interface BarChartData {
  name: string;
  [key: string]: number | string;
}

export interface PieChartData {
  name: string;
  value: number;
}

// Generate random number within a range
export const randomInRange = (min: number, max: number, decimals = 0): number => {
  const value = Math.random() * (max - min) + min;
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

// Generate random array of numbers within a range
export const randomArrayInRange = (
  min: number,
  max: number,
  length: number,
  decimals = 0
): number[] => {
  return Array.from({ length }, () => randomInRange(min, max, decimals));
};

// Create random trend (up, down, or stable with small variations)
export const generateTrend = (
  startValue: number,
  points: number,
  volatility: number,
  trend: "up" | "down" | "stable" = "stable",
  min = 0,
  max = 100
): number[] => {
  const data: number[] = [startValue];
  
  for (let i = 1; i < points; i++) {
    let trendFactor = 0;
    
    if (trend === "up") {
      trendFactor = volatility * 0.7;
    } else if (trend === "down") {
      trendFactor = -volatility * 0.7;
    }
    
    const randomChange = randomInRange(-volatility, volatility, 2);
    let newValue = data[i - 1] + randomChange + trendFactor;
    
    // Ensure the value stays within the specified range
    newValue = Math.max(min, Math.min(max, newValue));
    
    data.push(Number(newValue.toFixed(2)));
  }
  
  return data;
};

// Generate production metrics data
export const generateProductionMetrics = (): BarChartData[] => {
  const machines = ["Assembly", "Packaging", "Testing", "Processing", "Welding"];
  
  return machines.map(machine => {
    return {
      name: machine,
      efficiency: randomInRange(65, 95),
      output: randomInRange(70, 98),
      quality: randomInRange(85, 99)
    };
  });
};

// Generate energy consumption data
export const generateEnergyData = (): LineChartData[] => {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  
  return hours.map(hour => {
    // Higher consumption during working hours (8-18)
    const hourNum = parseInt(hour);
    let baseValue = 30;
    
    if (hourNum >= 8 && hourNum <= 18) {
      baseValue = 70;
    } else if ((hourNum >= 6 && hourNum < 8) || (hourNum > 18 && hourNum <= 20)) {
      baseValue = 50;
    }
    
    return {
      name: hour,
      value: randomInRange(baseValue - 15, baseValue + 15)
    };
  });
};

// Generate quality metrics data
export const generateQualityMetrics = (): PieChartData[] => {
  const passed = randomInRange(90, 98);
  
  return [
    { name: "Passed", value: passed },
    { name: "Minor Issues", value: randomInRange(1, Math.floor((100 - passed) * 0.7)) },
    { name: "Major Issues", value: 100 - passed - randomInRange(1, Math.floor((100 - passed) * 0.3)) }
  ];
};

// Generate blockchain transaction data
export const generateBlockchainTransactions = (count: number = 5) => {
  const types = [
    "Product Verification",
    "Machine Maintenance",
    "Batch Production",
    "Quality Control",
    "Material Receipt",
    "Operator Authentication",
    "Process Change"
  ];
  
  const timestamps = [
    "Just now",
    "2 mins ago",
    "5 mins ago",
    "12 mins ago",
    "27 mins ago",
    "1 hour ago",
    "2 hours ago",
    "5 hours ago"
  ];
  
  const generateId = () => {
    const hex = "0123456789abcdef";
    let id = "0x";
    for (let i = 0; i < 4; i++) {
      id += hex[Math.floor(Math.random() * 16)];
    }
    id += "...";
    for (let i = 0; i < 4; i++) {
      id += hex[Math.floor(Math.random() * 16)];
    }
    return id;
  };
  
  const generateBlock = () => {
    return `#${(14_500_000 + Math.floor(Math.random() * 100_000)).toLocaleString()}`;
  };
  
  return Array.from({ length: count }, (_, i) => {
    return {
      id: generateId(),
      type: types[Math.floor(Math.random() * types.length)],
      timestamp: timestamps[Math.min(i, timestamps.length - 1)],
      status: Math.random() > 0.1 ? "Confirmed" : "Pending",
      block: generateBlock()
    };
  });
};

// Generate KPI data
export const generateKpiData = () => {
  return {
    oee: {
      value: `${randomInRange(70, 85, 1)}%`,
      trend: randomInRange(-3, 5, 1)
    },
    productionOrders: {
      value: String(randomInRange(10, 20)),
      trend: randomInRange(-2, 3),
      description: `${randomInRange(1, 5)} high priority`
    },
    connectedMachines: {
      value: String(randomInRange(25, 32)),
      trend: randomInRange(-1, 2),
      description: Math.random() > 0.9 ? `${randomInRange(1, 2)} offline` : "All machines online"
    },
    simulations: {
      value: String(randomInRange(2, 5)),
      trend: randomInRange(0, 2),
      description: `${randomInRange(1, 3)} optimizations running`
    }
  };
};

// Chart config for recharts
export const chartConfig: ChartConfig = {
  efficiency: {
    label: "Efficiency",
    color: "#10b981", // green-500
    theme: {
      light: "#10b981",
      dark: "#10b981"
    }
  },
  output: {
    label: "Output",
    color: "#3b82f6", // blue-500
    theme: {
      light: "#3b82f6",
      dark: "#60a5fa"
    }
  },
  quality: {
    label: "Quality",
    color: "#8b5cf6", // violet-500
    theme: {
      light: "#8b5cf6",
      dark: "#a78bfa"
    }
  },
  energy: {
    label: "Energy",
    color: "#f59e0b", // amber-500
    theme: {
      light: "#f59e0b",
      dark: "#fbbf24"
    }
  },
  temperature: {
    label: "Temperature",
    color: "#ef4444", // red-500
    theme: {
      light: "#ef4444", 
      dark: "#f87171"
    }
  },
  Passed: {
    label: "Passed",
    color: "#22c55e", // green-500
    theme: {
      light: "#22c55e",
      dark: "#4ade80"
    }
  },
  "Minor Issues": {
    label: "Minor Issues",
    color: "#f59e0b", // amber-500
    theme: {
      light: "#f59e0b",
      dark: "#fbbf24"
    }
  },
  "Major Issues": {
    label: "Major Issues",
    color: "#ef4444", // red-500
    theme: {
      light: "#ef4444",
      dark: "#f87171"
    }
  }
};
