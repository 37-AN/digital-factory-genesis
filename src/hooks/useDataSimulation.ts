
import { useState, useEffect } from "react";

interface SimulationOptions {
  interval?: number;
  initialDelay?: number;
  enabled?: boolean;
}

/**
 * Custom hook for simulating real-time data updates
 * @param dataGenerator Function that generates the data
 * @param options Configuration options for the simulation
 * @returns The current simulated data and loading state
 */
export function useDataSimulation<T>(
  dataGenerator: () => T,
  options: SimulationOptions = {}
) {
  const {
    interval = 5000,
    initialDelay = 1000,
    enabled = true
  } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    
    // Initial data load with delay to simulate API fetching
    const initialTimer = setTimeout(() => {
      setData(dataGenerator());
      setLoading(false);
    }, initialDelay);
    
    // Set up interval for regular data updates
    const intervalTimer = setInterval(() => {
      setData(dataGenerator());
    }, interval);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [dataGenerator, interval, initialDelay, enabled]);

  return { data, loading };
}
