
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AiInsights = () => {
  const [loading, setLoading] = useState(true);
  const [oeeData, setOeeData] = useState({
    availability: 0,
    performance: 0,
    quality: 0,
    overall: 0
  });
  
  const [anomalies, setAnomalies] = useState([
    { id: 1, machine: 'CNC Mill #103', metric: 'Spindle Vibration', severity: 'Medium', time: '08:24:15' },
    { id: 2, machine: 'Robotic Arm #47', metric: 'Joint Temperature', severity: 'Low', time: '09:17:32' },
  ]);

  const [recommendations, setRecommendations] = useState([
    { id: 1, action: 'Adjust pressure settings on Assembly Line #2', impact: 'Potential 5% quality improvement', confidence: 'High' },
    { id: 2, action: 'Schedule preventive maintenance for CNC Mill #103', impact: 'Avoid 4h downtime next week', confidence: 'Medium' },
  ]);
  
  // Sample temperature prediction data
  const predictionData = [
    { time: '1h', actual: 76, predicted: 77 },
    { time: '2h', actual: 78, predicted: 80 },
    { time: '3h', actual: 82, predicted: 84 },
    { time: '4h', actual: 85, predicted: 88 },
    { time: '5h', actual: 87, predicted: 92 },
    { time: '6h', actual: null, predicted: 96 },
    { time: '7h', actual: null, predicted: 99 },
    { time: '8h', actual: null, predicted: 102 },
  ];
  
  // Simulate data loading
  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setOeeData({
        availability: 92,
        performance: 85,
        quality: 97,
        overall: 76
      });
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // OEE chart data
  const oeeChartData = [
    { name: 'Availability', value: oeeData.availability },
    { name: 'Performance', value: oeeData.performance },
    { name: 'Quality', value: oeeData.quality },
  ];
  
  const COLORS = ['#00A9A5', '#FFA500', '#4B5563'];
  
  const getSeverityColor = (severity: string) => {
    switch(severity.toLowerCase()) {
      case 'high': return 'text-factory-danger bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-factory-amber bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-800';
    }
  };

  return (
    <div className="bg-white dark:bg-factory-blue rounded-lg p-4 shadow h-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">AI Insights & Predictions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* OEE Chart Section */}
        <div className="border dark:border-factory-blue-light rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-factory-blue-light p-3 border-b dark:border-factory-blue-light">
            <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">Overall Equipment Effectiveness</h3>
          </div>
          <div className="p-3 h-44">
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-factory-teal border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="flex h-full">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={oeeChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={50}
                        paddingAngle={2}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {oeeChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold fill-gray-900 dark:fill-white">
                        {oeeData.overall}%
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 flex flex-col justify-center">
                  <div className="space-y-2">
                    {oeeChartData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: COLORS[index] }}></span>
                        <span className="text-xs text-gray-600 dark:text-gray-300">{item.name}:</span>
                        <span className="ml-auto text-xs font-medium text-gray-900 dark:text-white">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Temperature Prediction Chart */}
        <div className="border dark:border-factory-blue-light rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-factory-blue-light p-3 border-b dark:border-factory-blue-light">
            <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">Equipment Temperature Prediction</h3>
          </div>
          <div className="p-3 h-44">
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-factory-teal border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={predictionData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1A2942',
                      borderColor: '#374151',
                      color: '#E5E7EB'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#00A9A5" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#FFA500" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        
        {/* Anomaly Detection Section */}
        <div className="border dark:border-factory-blue-light rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-factory-blue-light p-3 border-b dark:border-factory-blue-light flex justify-between items-center">
            <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">Detected Anomalies</h3>
            <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-0.5 rounded-full">
              {anomalies.length} Active
            </span>
          </div>
          <div className="p-3 max-h-44 overflow-y-auto">
            {loading ? (
              <div className="space-y-3">
                {[1, 2].map((_, idx) => (
                  <div key={idx} className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-factory-blue-light rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {anomalies.map((anomaly) => (
                  <div key={anomaly.id} className="p-2 border dark:border-factory-blue-light rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{anomaly.machine}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{anomaly.metric}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(anomaly.severity)}`}>
                        {anomaly.severity}
                      </div>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Detected at {anomaly.time}</span>
                      <button className="text-factory-teal hover:text-factory-teal-dark transition-colors">
                        Investigate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* AI Recommendations Section */}
        <div className="border dark:border-factory-blue-light rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-factory-blue-light p-3 border-b dark:border-factory-blue-light">
            <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">AI Recommendations</h3>
          </div>
          <div className="p-3 max-h-44 overflow-y-auto">
            {loading ? (
              <div className="space-y-3">
                {[1, 2].map((_, idx) => (
                  <div key={idx} className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-factory-blue-light rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="p-2 border dark:border-factory-blue-light rounded-md">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{rec.action}</h4>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                        {rec.confidence}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{rec.impact}</p>
                    <div className="mt-2 flex space-x-2 justify-end">
                      <button className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        Dismiss
                      </button>
                      <button className="text-xs text-factory-teal hover:text-factory-teal-dark transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiInsights;
