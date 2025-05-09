
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Clock, ArrowRight, RefreshCw } from 'lucide-react';

interface TrainingMonitorProps {
  type: string;
  schedule: string;
  loading: boolean;
  engine: 'AI' | 'Crypto';
}

const TrainingMonitor: React.FC<TrainingMonitorProps> = ({ type, schedule, loading, engine }) => {
  // Simulated training state with auto-progression
  const [trainingState, setTrainingState] = useState<{
    status: 'running' | 'completed' | 'validating' | 'deploying' | 'idle';
    progress: number;
    currentStep: number;
    lastRun: string;
    nextRun: string;
    metrics: Record<string, number>;
    alerts: { message: string; type: 'warning' | 'error' | 'success' }[];
  }>({
    status: 'idle',
    progress: 0,
    currentStep: 0,
    lastRun: '2023-05-08 14:30',
    nextRun: '2023-05-09 14:30',
    metrics: engine === 'AI' ? 
      { accuracy: 96.7, precision: 94.3, recall: 95.8, drift: -0.5 } : 
      { sharpeRatio: 1.32, maxDrawdown: 3.8, winRate: 68.5, profitFactor: 1.45 },
    alerts: []
  });

  // Simulate training cycle
  useEffect(() => {
    if (loading) return;
    
    const startTraining = () => {
      // Reset training state
      setTrainingState(prev => ({
        ...prev,
        status: 'running',
        progress: 0,
        currentStep: 1,
        alerts: []
      }));
      
      // Step 1: Data export (0-25%)
      const timer1 = setTimeout(() => {
        setTrainingState(prev => ({
          ...prev,
          progress: 25,
          currentStep: 2
        }));
        
        // Step 2: Model Training (25-70%)
        const timer2 = setTimeout(() => {
          setTrainingState(prev => ({
            ...prev,
            progress: 70,
            currentStep: 3
          }));
          
          // Step 3: Validation (70-85%)
          const timer3 = setTimeout(() => {
            setTrainingState(prev => ({
              ...prev,
              status: 'validating',
              progress: 85,
              currentStep: 4,
              alerts: Math.random() > 0.8 ? 
                [...prev.alerts, { 
                  message: engine === 'AI' ? 
                    'Accuracy below threshold (94.8%). Rolling back.' : 
                    'Sharpe ratio below threshold (0.95). Rolling back.',
                  type: 'error' 
                }] : prev.alerts
            }));
            
            // Step 4: Deployment (85-100%)
            const timer4 = setTimeout(() => {
              const success = Math.random() > 0.2;
              setTrainingState(prev => ({
                ...prev,
                status: 'completed',
                progress: 100,
                currentStep: 0,
                lastRun: new Date().toLocaleString(),
                nextRun: new Date(Date.now() + (engine === 'AI' ? 24 : 1) * 60 * 60 * 1000).toLocaleString(),
                metrics: engine === 'AI' ? 
                  { 
                    accuracy: success ? 96.7 + (Math.random() * 0.6 - 0.3) : 94.8,
                    precision: success ? 94.3 + (Math.random() * 0.6 - 0.3) : 93.1,
                    recall: success ? 95.8 + (Math.random() * 0.6 - 0.3) : 94.5,
                    drift: success ? -0.5 + (Math.random() * 0.4 - 0.2) : -1.2
                  } : 
                  {
                    sharpeRatio: success ? 1.32 + (Math.random() * 0.2 - 0.1) : 0.95,
                    maxDrawdown: success ? 3.8 + (Math.random() * 0.6 - 0.3) : 5.2,
                    winRate: success ? 68.5 + (Math.random() * 1 - 0.5) : 65.2,
                    profitFactor: success ? 1.45 + (Math.random() * 0.1 - 0.05) : 1.2
                  },
                alerts: success ? prev.alerts : [
                  ...prev.alerts, 
                  { 
                    message: success ?
                      'Model deployed successfully to production endpoint.' :
                      'Validation failed. Rolled back to previous stable version.',
                    type: success ? 'success' : 'error'
                  }
                ]
              }));
            }, 3000);
            
            return () => clearTimeout(timer4);
          }, 2000);
          
          return () => clearTimeout(timer3);
        }, 4000);
        
        return () => clearTimeout(timer2);
      }, 2000);
      
      return () => clearTimeout(timer1);
    };
    
    // Start initial training simulation
    const initialTimer = setTimeout(() => {
      startTraining();
    }, 2000);
    
    // Set up recurring training simulation
    const recurringTimer = setInterval(() => {
      if (trainingState.status === 'idle') {
        startTraining();
      }
    }, 15000);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(recurringTimer);
    };
  }, [loading, engine]);

  // Auto reset to idle after completion
  useEffect(() => {
    if (trainingState.status === 'completed') {
      const timer = setTimeout(() => {
        setTrainingState(prev => ({
          ...prev,
          status: 'idle'
        }));
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [trainingState.status]);

  const steps = engine === 'AI' ? [
    "Export new rows since last run",
    "Retrain AI model using in-db training",
    "Validate: ≥95% accuracy & no negative drift",
    "Deploy to /api/mes/predict endpoint",
    "Log metrics to monitoring DB"
  ] : [
    "Fetch latest minute-level features",
    "Retrain RL agent with TD3 algorithm",
    "Backtest on last 7 days (Sharpe ≥1.0)",
    "Deploy updated policy to trading service",
    "Enforce risk constraints (drawdown, position)"
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">
                {engine === 'AI' ? 'MES Predictor' : 'Crypto Trader'} Training
              </CardTitle>
              <Badge className={trainingState.status === 'running' || trainingState.status === 'validating' ? 
                'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' : 
                trainingState.status === 'completed' ? 
                'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 
                'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'}>
                {trainingState.status === 'running' ? 'Training' : 
                 trainingState.status === 'validating' ? 'Validating' : 
                 trainingState.status === 'completed' ? 'Completed' : 'Idle'}
              </Badge>
            </div>
            <CardDescription>
              Schedule: Every {schedule}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <div className="animate-pulse h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-full mb-2"></div>
                <div className="space-y-2">
                  {Array(5).fill(0).map((_, idx) => (
                    <div key={idx} className="animate-pulse h-5 bg-gray-200 dark:bg-factory-blue-light rounded w-full"></div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Training Progress</span>
                    <span>{trainingState.progress}%</span>
                  </div>
                  <Progress value={trainingState.progress} className="h-2" />
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Training Pipeline Steps:</div>
                  <div className="space-y-2">
                    {steps.map((step, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-start p-2 rounded-sm text-sm ${
                          trainingState.currentStep === idx + 1 
                            ? 'bg-blue-100 dark:bg-blue-900/20 border-l-4 border-blue-500' 
                            : trainingState.currentStep > idx + 1 || (trainingState.status === 'completed' && trainingState.progress === 100)
                            ? 'text-gray-500 dark:text-gray-400'
                            : ''
                        }`}
                      >
                        <div className="mr-3 mt-0.5">
                          {trainingState.currentStep > idx + 1 || (trainingState.status === 'completed' && trainingState.progress === 100) ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : trainingState.currentStep === idx + 1 ? (
                            <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600"></div>
                          )}
                        </div>
                        <div>{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400">Last run:</span>
                    <span className="ml-1">{trainingState.lastRun}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400">Next run:</span>
                    <span className="ml-1">{trainingState.nextRun}</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Performance Metrics</CardTitle>
            <CardDescription>
              Latest model evaluation results
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-2 gap-4">
                {Array(4).fill(0).map((_, idx) => (
                  <div key={idx} className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-20"></div>
                    <div className="h-6 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  {Object.entries(trainingState.metrics).map(([key, value], idx) => (
                    <div key={key}>
                      <div className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-1">
                        {key === 'sharpeRatio' ? 'Sharpe Ratio' : 
                         key === 'maxDrawdown' ? 'Max Drawdown' : 
                         key === 'winRate' ? 'Win Rate' : 
                         key === 'profitFactor' ? 'Profit Factor' : key}
                      </div>
                      <div className="text-2xl font-semibold">
                        {typeof value === 'number' ? 
                          key === 'maxDrawdown' ? `${value}%` : 
                          key === 'winRate' ? `${value}%` : 
                          key === 'drift' ? `${value > 0 ? '+' : ''}${value}%` :
                          key === 'accuracy' || key === 'precision' || key === 'recall' ? `${value}%` :
                          value.toFixed(2)
                        : value}
                        
                        {key === 'accuracy' && value < 95 && (
                          <span className="text-sm text-red-500 ml-2">Below threshold</span>
                        )}
                        {key === 'sharpeRatio' && value < 1.0 && (
                          <span className="text-sm text-red-500 ml-2">Below threshold</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 border-t dark:border-factory-blue-light pt-4">
                  <div className="text-sm font-medium mb-2">Threshold Requirements:</div>
                  <div className="text-sm">
                    {engine === 'AI' ? (
                      <div className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        <span>Accuracy ≥ 95%, No negative drift over 1%</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        <span>Sharpe Ratio ≥ 1.0, Max drawdown ≤ 5%</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      
      {trainingState.alerts.length > 0 && !loading && (
        <div className="space-y-3">
          {trainingState.alerts.map((alert, idx) => (
            <Alert 
              key={idx} 
              className={alert.type === 'error' ? 'border-red-500 dark:border-red-700 bg-red-50 dark:bg-red-900/20' : 
                         alert.type === 'warning' ? 'border-yellow-500 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20' : 
                         'border-green-500 dark:border-green-700 bg-green-50 dark:bg-green-900/20'}
            >
              <AlertDescription className="flex items-center">
                {alert.type === 'error' ? (
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-500 dark:text-red-400" />
                ) : alert.type === 'warning' ? (
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500 dark:text-yellow-400" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 dark:text-green-400" />
                )}
                {alert.message}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainingMonitor;
