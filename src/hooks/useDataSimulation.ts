
import { useState, useEffect, useCallback, useRef } from "react";

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
  const generatorRef = useRef(dataGenerator);
  
  // Update the ref when the generator changes
  useEffect(() => {
    generatorRef.current = dataGenerator;
  }, [dataGenerator]);
  
  const generateData = useCallback(() => {
    return generatorRef.current();
  }, []);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    
    // Initial data load with delay to simulate API fetching
    const initialTimer = setTimeout(() => {
      setData(generateData());
      setLoading(false);
    }, initialDelay);
    
    // Set up interval for regular data updates
    const intervalTimer = setInterval(() => {
      setData(generateData());
    }, interval);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [generateData, interval, initialDelay, enabled]);

  return { data, loading, refreshData: () => setData(generateData()) };
}
