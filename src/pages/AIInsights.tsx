
import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import AiInsights from '../components/dashboard/AiInsights';

const AIInsightsPage = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-factory-blue-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <h1 className="text-xl font-bold mb-4">AI Insights & Analysis</h1>
          <div className="mb-6">
            <AiInsights />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIInsightsPage;
