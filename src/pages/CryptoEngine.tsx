
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, Database, Shield, RefreshCw, TrendingUp } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const CryptoEngine = () => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleTrainModel = () => {
    toast({
      title: "Training Initiated",
      description: "Crypto trader model training has started. Estimated completion time: 15 minutes.",
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-factory-blue-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Crypto Engine</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Real-time reinforcement learning for cryptocurrency trading strategies
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Market Data Feeds
                </CardTitle>
                <CardDescription>Exchange API connections status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, idx) => (
                      <div key={idx} className="animate-pulse space-y-2">
                        <div className="h-5 bg-gray-200 dark:bg-factory-blue-light rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between pb-3 border-b dark:border-factory-blue-light">
                      <div>
                        <div className="font-medium">Order Books</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Level 2 data</div>
                      </div>
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <span className="mr-1">Online</span>
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b dark:border-factory-blue-light">
                      <div>
                        <div className="font-medium">Trade Data</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Executed transactions</div>
                      </div>
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <span className="mr-1">86 tps</span>
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Sentiment Data</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Social feeds</div>
                      </div>
                      <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                        <span className="mr-1">Delayed</span>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2" />
                  RL Training Status
                </CardTitle>
                <CardDescription>Reinforcement learning pipeline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, idx) => (
                      <div key={idx} className="animate-pulse space-y-2">
                        <div className="h-5 bg-gray-200 dark:bg-factory-blue-light rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="pb-3 border-b dark:border-factory-blue-light">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Last Training</span>
                        <Badge variant="outline">35 minutes ago</Badge>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">crypto_trader v3.7.2</div>
                      <div className="w-full">
                        <div className="text-xs mb-1 flex justify-between">
                          <span>Trades since last run</span>
                          <span>651 / 1,000</span>
                        </div>
                        <Progress value={65.1} className="h-2" />
                      </div>
                    </div>
                    <div className="pb-3 border-b dark:border-factory-blue-light">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Training Schedule</span>
                        <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/20">Hourly</Badge>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Every hour or after 1,000 new market trades
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button 
                        className="bg-factory-teal hover:bg-factory-teal/90 text-white px-4 py-2 rounded"
                        onClick={handleTrainModel}
                      >
                        Trigger Manual Training
                      </button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Risk Controls
                </CardTitle>
                <CardDescription>Trading limits and performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, idx) => (
                      <div key={idx} className="animate-pulse space-y-2">
                        <div className="h-5 bg-gray-200 dark:bg-factory-blue-light rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="pb-3 border-b dark:border-factory-blue-light">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Max Drawdown</span>
                        <span>2.1% / 5.0%</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current / Limit</div>
                      <div className="w-full">
                        <Progress value={42} className="h-2" />
                      </div>
                    </div>
                    <div className="pb-3 border-b dark:border-factory-blue-light">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Position Sizing</span>
                        <span>1.8% / 2.0%</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current / Limit</div>
                      <div className="w-full">
                        <Progress value={90} className="h-2" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Sharpe Ratio</span>
                        <span className="text-green-600 dark:text-green-400">1.42</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Above 1.0 threshold (good)
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="algorithm" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="algorithm"><RefreshCw className="h-4 w-4 mr-2" /> RL Algorithm</TabsTrigger>
              <TabsTrigger value="performance"><TrendingUp className="h-4 w-4 mr-2" /> Performance</TabsTrigger>
              <TabsTrigger value="trades"><Database className="h-4 w-4 mr-2" /> Recent Trades</TabsTrigger>
            </TabsList>
            
            <TabsContent value="algorithm">
              <Card>
                <CardHeader>
                  <CardTitle>TD3 Reinforcement Learning</CardTitle>
                  <CardDescription>Twin Delayed Deep Deterministic Policy Gradient implementation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
                        <h3 className="text-sm font-semibold mb-3">Algorithm Configuration</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded">
                            <p className="font-medium">Actor Network</p>
                            <p className="text-xs">3 layers, 256 units</p>
                          </div>
                          <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded">
                            <p className="font-medium">Critic Networks</p>
                            <p className="text-xs">Twin Q-networks</p>
                          </div>
                          <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded">
                            <p className="font-medium">Update Frequency</p>
                            <p className="text-xs">Every 2 steps</p>
                          </div>
                          <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded">
                            <p className="font-medium">Target Update</p>
                            <p className="text-xs">Soft, τ=0.005</p>
                          </div>
                          <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded">
                            <p className="font-medium">Exploration</p>
                            <p className="text-xs">Gaussian noise</p>
                          </div>
                          <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded">
                            <p className="font-medium">Batch Size</p>
                            <p className="text-xs">256 trades</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
                        <h3 className="text-sm font-semibold mb-3">State Vector</h3>
                        <div className="space-y-2">
                          <div className="bg-factory-teal/10 dark:bg-factory-teal/20 p-2 rounded">
                            <p className="font-medium">Price Features</p>
                            <p className="text-xs">Moving averages (7 timeframes), Bollinger bands, RSI</p>
                          </div>
                          <div className="bg-factory-teal/10 dark:bg-factory-teal/20 p-2 rounded">
                            <p className="font-medium">Volume Features</p>
                            <p className="text-xs">VWAP, OBV, volume profile by price level</p>
                          </div>
                          <div className="bg-factory-teal/10 dark:bg-factory-teal/20 p-2 rounded">
                            <p className="font-medium">Sentiment Features</p>
                            <p className="text-xs">Social sentiment score, news sentiment, fear & greed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
                      <h3 className="text-sm font-semibold mb-3">Hierarchical RL Structure</h3>
                      <div className="relative">
                        {/* Meta-controller */}
                        <div className="bg-factory-blue/30 dark:bg-factory-blue-light/90 p-3 rounded-md mb-6 text-center">
                          <p className="font-medium">Meta-Controller</p>
                          <p className="text-xs">Market regime classifier</p>
                        </div>
                        
                        {/* Connector lines */}
                        <div className="absolute left-1/2 top-12 w-0.5 h-6 bg-gray-400 dark:bg-gray-500 transform -translate-x-1/2"></div>
                        
                        {/* Sub-agents container */}
                        <div className="grid grid-cols-3 gap-3 mt-2">
                          {/* Sub-agent 1 */}
                          <div className="bg-factory-teal/20 dark:bg-factory-teal/30 p-2 rounded-md text-center relative">
                            <div className="absolute -top-6 left-1/2 w-0.5 h-6 bg-gray-400 dark:bg-gray-500 transform -translate-x-1/2"></div>
                            <p className="font-medium">Trend Agent</p>
                            <p className="text-xs">Long timeframes</p>
                          </div>
                          
                          {/* Sub-agent 2 */}
                          <div className="bg-factory-teal/20 dark:bg-factory-teal/30 p-2 rounded-md text-center relative">
                            <div className="absolute -top-6 left-1/2 w-0.5 h-6 bg-gray-400 dark:bg-gray-500 transform -translate-x-1/2"></div>
                            <p className="font-medium">Range Agent</p>
                            <p className="text-xs">Consolidation</p>
                          </div>
                          
                          {/* Sub-agent 3 */}
                          <div className="bg-factory-teal/20 dark:bg-factory-teal/30 p-2 rounded-md text-center relative">
                            <div className="absolute -top-6 left-1/2 w-0.5 h-6 bg-gray-400 dark:bg-gray-500 transform -translate-x-1/2"></div>
                            <p className="font-medium">Volatility Agent</p>
                            <p className="text-xs">News events</p>
                          </div>
                        </div>
                        
                        {/* Action space */}
                        <div className="mt-6">
                          <p className="text-sm font-semibold mb-2">Continuous Action Space:</p>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded">
                              <p className="font-medium">Position Size</p>
                              <p className="text-xs">0-2% of capital</p>
                            </div>
                            <div className="bg-factory-blue/10 dark:bg-factory-blue-light/70 p-2 rounded">
                              <p className="font-medium">Direction</p>
                              <p className="text-xs">-1 (short) to +1 (long)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Trading Performance</CardTitle>
                  <CardDescription>Key metrics from the reinforcement learning model</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
                      <h3 className="text-sm font-semibold mb-2">Returns</h3>
                      <div className="text-3xl font-bold text-factory-teal">+8.3%</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Last 30 days</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
                      <h3 className="text-sm font-semibold mb-2">Sharpe Ratio</h3>
                      <div className="text-3xl font-bold text-factory-teal">1.42</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Risk-adjusted return</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-factory-blue-light rounded-md p-4">
                      <h3 className="text-sm font-semibold mb-2">Max Drawdown</h3>
                      <div className="text-3xl font-bold text-yellow-500">-2.1%</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Within target range</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold">Performance Breakdown</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b dark:border-factory-blue-light">
                            <th className="text-left py-2 px-4">Metric</th>
                            <th className="text-left py-2 px-4">Value</th>
                            <th className="text-left py-2 px-4">Target</th>
                            <th className="text-left py-2 px-4">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b dark:border-factory-blue-light">
                            <td className="py-2 px-4">Sharpe Ratio</td>
                            <td className="py-2 px-4">1.42</td>
                            <td className="py-2 px-4">≥ 1.0</td>
                            <td className="py-2 px-4 text-green-600 dark:text-green-400">✓ Pass</td>
                          </tr>
                          <tr className="border-b dark:border-factory-blue-light">
                            <td className="py-2 px-4">Max Drawdown</td>
                            <td className="py-2 px-4">-2.1%</td>
                            <td className="py-2 px-4">≤ 5.0%</td>
                            <td className="py-2 px-4 text-green-600 dark:text-green-400">✓ Pass</td>
                          </tr>
                          <tr className="border-b dark:border-factory-blue-light">
                            <td className="py-2 px-4">Win Rate</td>
                            <td className="py-2 px-4">58.3%</td>
                            <td className="py-2 px-4">≥ 55.0%</td>
                            <td className="py-2 px-4 text-green-600 dark:text-green-400">✓ Pass</td>
                          </tr>
                          <tr className="border-b dark:border-factory-blue-light">
                            <td className="py-2 px-4">Profit Factor</td>
                            <td className="py-2 px-4">1.83</td>
                            <td className="py-2 px-4">≥ 1.5</td>
                            <td className="py-2 px-4 text-green-600 dark:text-green-400">✓ Pass</td>
                          </tr>
                          <tr className="border-b dark:border-factory-blue-light">
                            <td className="py-2 px-4">Avg Win / Avg Loss</td>
                            <td className="py-2 px-4">1.31</td>
                            <td className="py-2 px-4">≥ 1.0</td>
                            <td className="py-2 px-4 text-green-600 dark:text-green-400">✓ Pass</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trades">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Trading Activity</CardTitle>
                  <CardDescription>Trades executed by the reinforcement learning agent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b dark:border-factory-blue-light">
                          <th className="text-left py-2 px-4">Time</th>
                          <th className="text-left py-2 px-4">Symbol</th>
                          <th className="text-left py-2 px-4">Action</th>
                          <th className="text-left py-2 px-4">Price</th>
                          <th className="text-left py-2 px-4">Size</th>
                          <th className="text-left py-2 px-4">P/L</th>
                          <th className="text-left py-2 px-4">Strategy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <>
                            {Array(5).fill(0).map((_, idx) => (
                              <tr key={idx} className="border-b dark:border-factory-blue-light animate-pulse">
                                <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-20"></div></td>
                                <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                                <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-12"></div></td>
                                <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-20"></div></td>
                                <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                                <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-12"></div></td>
                                <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-20"></div></td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <>
                            <tr className="border-b dark:border-factory-blue-light">
                              <td className="py-2 px-4">14:32:15</td>
                              <td className="py-2 px-4">BTC/USD</td>
                              <td className="py-2 px-4">
                                <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full text-xs">Buy</span>
                              </td>
                              <td className="py-2 px-4">$61,245.30</td>
                              <td className="py-2 px-4">0.082 BTC</td>
                              <td className="py-2 px-4 text-green-600 dark:text-green-400">+$137.62</td>
                              <td className="py-2 px-4">Trend Agent</td>
                            </tr>
                            <tr className="border-b dark:border-factory-blue-light">
                              <td className="py-2 px-4">14:05:52</td>
                              <td className="py-2 px-4">ETH/USD</td>
                              <td className="py-2 px-4">
                                <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full text-xs">Sell</span>
                              </td>
                              <td className="py-2 px-4">$3,128.75</td>
                              <td className="py-2 px-4">1.5 ETH</td>
                              <td className="py-2 px-4 text-green-600 dark:text-green-400">+$78.45</td>
                              <td className="py-2 px-4">Range Agent</td>
                            </tr>
                            <tr className="border-b dark:border-factory-blue-light">
                              <td className="py-2 px-4">13:48:07</td>
                              <td className="py-2 px-4">SOL/USD</td>
                              <td className="py-2 px-4">
                                <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full text-xs">Buy</span>
                              </td>
                              <td className="py-2 px-4">$146.82</td>
                              <td className="py-2 px-4">10.5 SOL</td>
                              <td className="py-2 px-4 text-red-600 dark:text-red-400">-$42.20</td>
                              <td className="py-2 px-4">Volatility Agent</td>
                            </tr>
                            <tr className="border-b dark:border-factory-blue-light">
                              <td className="py-2 px-4">13:22:34</td>
                              <td className="py-2 px-4">XRP/USD</td>
                              <td className="py-2 px-4">
                                <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full text-xs">Sell</span>
                              </td>
                              <td className="py-2 px-4">$0.5231</td>
                              <td className="py-2 px-4">1,500 XRP</td>
                              <td className="py-2 px-4 text-green-600 dark:text-green-400">+$28.35</td>
                              <td className="py-2 px-4">Range Agent</td>
                            </tr>
                            <tr className="border-b dark:border-factory-blue-light">
                              <td className="py-2 px-4">13:01:15</td>
                              <td className="py-2 px-4">BNB/USD</td>
                              <td className="py-2 px-4">
                                <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full text-xs">Buy</span>
                              </td>
                              <td className="py-2 px-4">$572.45</td>
                              <td className="py-2 px-4">2.1 BNB</td>
                              <td className="py-2 px-4 text-green-600 dark:text-green-400">+$64.80</td>
                              <td className="py-2 px-4">Trend Agent</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card>
            <CardHeader>
              <CardTitle>Training History</CardTitle>
              <CardDescription>Past reinforcement learning model versions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-factory-blue-light">
                      <th className="text-left py-2 px-4">Version</th>
                      <th className="text-left py-2 px-4">Date</th>
                      <th className="text-left py-2 px-4">Sharpe</th>
                      <th className="text-left py-2 px-4">Win Rate</th>
                      <th className="text-left py-2 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <>
                        {Array(5).fill(0).map((_, idx) => (
                          <tr key={idx} className="border-b dark:border-factory-blue-light animate-pulse">
                            <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                            <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-28"></div></td>
                            <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-12"></div></td>
                            <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-12"></div></td>
                            <td className="py-2 px-4"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <>
                        <tr className="border-b dark:border-factory-blue-light">
                          <td className="py-2 px-4 font-medium">v3.7.2</td>
                          <td className="py-2 px-4">2025-05-09 13:00</td>
                          <td className="py-2 px-4 text-green-600 dark:text-green-400">1.42</td>
                          <td className="py-2 px-4">58.3%</td>
                          <td className="py-2 px-4">
                            <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full text-xs">
                              Active
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b dark:border-factory-blue-light">
                          <td className="py-2 px-4 font-medium">v3.7.1</td>
                          <td className="py-2 px-4">2025-05-09 12:00</td>
                          <td className="py-2 px-4">1.39</td>
                          <td className="py-2 px-4">57.9%</td>
                          <td className="py-2 px-4">
                            <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                              Archived
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b dark:border-factory-blue-light">
                          <td className="py-2 px-4 font-medium">v3.7.0</td>
                          <td className="py-2 px-4">2025-05-09 11:00</td>
                          <td className="py-2 px-4">1.36</td>
                          <td className="py-2 px-4">57.2%</td>
                          <td className="py-2 px-4">
                            <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                              Archived
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b dark:border-factory-blue-light">
                          <td className="py-2 px-4 font-medium">v3.6.9</td>
                          <td className="py-2 px-4">2025-05-09 10:00</td>
                          <td className="py-2 px-4">1.34</td>
                          <td className="py-2 px-4">56.8%</td>
                          <td className="py-2 px-4">
                            <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                              Archived
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b dark:border-factory-blue-light">
                          <td className="py-2 px-4 font-medium">v3.6.8</td>
                          <td className="py-2 px-4">2025-05-09 09:00</td>
                          <td className="py-2 px-4 text-yellow-600 dark:text-yellow-400">0.98</td>
                          <td className="py-2 px-4">54.3%</td>
                          <td className="py-2 px-4">
                            <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full text-xs">
                              Failed
                            </span>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CryptoEngine;
