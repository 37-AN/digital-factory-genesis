
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { Bell, HelpCircle, Key, Lock, Save, Server, Settings as SettingsIcon, User } from 'lucide-react';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dashboardAlerts, setDashboardAlerts] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'profile', label: 'User Profile', icon: <User className="h-5 w-5" /> },
    { id: 'security', label: 'Security', icon: <Lock className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { id: 'api', label: 'API Access', icon: <Key className="h-5 w-5" /> },
    { id: 'system', label: 'System', icon: <Server className="h-5 w-5" /> },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-factory-blue-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="flex items-center mb-6">
            <SettingsIcon className="h-6 w-6 mr-2" />
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="bg-white dark:bg-factory-blue rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b dark:border-factory-blue-light">
                <h2 className="font-semibold">Settings</h2>
              </div>
              <ul className="py-2">
                {loading ? (
                  <>
                    {Array(6).fill(0).map((_, idx) => (
                      <li key={idx} className="px-4 py-3 animate-pulse">
                        <div className="flex items-center">
                          <div className="h-5 w-5 bg-gray-200 dark:bg-factory-blue-light rounded mr-3"></div>
                          <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-32"></div>
                        </div>
                      </li>
                    ))}
                  </>
                ) : (
                  <>
                    {tabs.map((tab) => (
                      <li key={tab.id}>
                        <button
                          className={`w-full px-4 py-3 flex items-center text-left transition-colors ${
                            activeTab === tab.id 
                              ? 'bg-gray-100 dark:bg-factory-blue-light text-factory-teal' 
                              : 'hover:bg-gray-50 dark:hover:bg-factory-blue-light'
                          }`}
                          onClick={() => setActiveTab(tab.id)}
                        >
                          <span className={`mr-3 ${activeTab === tab.id ? 'text-factory-teal' : 'text-gray-500 dark:text-gray-400'}`}>
                            {tab.icon}
                          </span>
                          <span>{tab.label}</span>
                        </button>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
            
            {/* Settings Content */}
            <div className="lg:col-span-3 bg-white dark:bg-factory-blue rounded-lg shadow">
              <div className="border-b dark:border-factory-blue-light p-4">
                <h2 className="font-semibold">
                  {tabs.find(tab => tab.id === activeTab)?.label || 'Loading...'}
                </h2>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <div className="animate-pulse space-y-6">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-1/4"></div>
                      <div className="h-10 bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-1/4"></div>
                      <div className="h-10 bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                    </div>
                    <div className="h-10 bg-gray-200 dark:bg-factory-blue-light rounded w-32"></div>
                  </div>
                ) : (
                  <>
                    {/* User Profile Settings */}
                    {activeTab === 'profile' && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
                            Full Name
                          </label>
                          <input 
                            id="name"
                            type="text" 
                            defaultValue="John Smith" 
                            className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                            Email
                          </label>
                          <input 
                            id="email"
                            type="email" 
                            defaultValue="john.smith@digitalfactory.com" 
                            className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="role">
                            Role
                          </label>
                          <select 
                            id="role"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                            defaultValue="admin"
                          >
                            <option value="admin">System Administrator</option>
                            <option value="manager">Production Manager</option>
                            <option value="operator">Machine Operator</option>
                            <option value="engineer">Engineer</option>
                            <option value="quality">Quality Control</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="timezone">
                            Timezone
                          </label>
                          <select 
                            id="timezone"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                            defaultValue="et"
                          >
                            <option value="et">Eastern Time (ET)</option>
                            <option value="ct">Central Time (CT)</option>
                            <option value="mt">Mountain Time (MT)</option>
                            <option value="pt">Pacific Time (PT)</option>
                            <option value="utc">UTC</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center">
                          <button className="px-4 py-2 bg-factory-teal text-white rounded-md hover:bg-factory-teal-dark transition-colors flex items-center">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Security Settings */}
                    {activeTab === 'security' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Change Password</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="current-password">
                                Current Password
                              </label>
                              <input 
                                id="current-password"
                                type="password" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="new-password">
                                New Password
                              </label>
                              <input 
                                id="new-password"
                                type="password" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="confirm-password">
                                Confirm New Password
                              </label>
                              <input 
                                id="confirm-password"
                                type="password" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                              />
                            </div>
                            
                            <div className="pt-2">
                              <button className="px-4 py-2 bg-factory-teal text-white rounded-md hover:bg-factory-teal-dark transition-colors">
                                Update Password
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t dark:border-factory-blue-light">
                          <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">Enhance your account security with two-factor authentication.</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Status: <span className="font-medium text-green-600 dark:text-green-400">Enabled</span></p>
                            </div>
                            <button className="px-3 py-1 border border-gray-300 dark:border-factory-blue-light bg-white dark:bg-factory-blue text-gray-700 dark:text-gray-300 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-factory-blue-light transition-colors">
                              Configure
                            </button>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t dark:border-factory-blue-light">
                          <h3 className="text-lg font-medium mb-4">Login Sessions</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 border dark:border-factory-blue-light rounded-md">
                              <div>
                                <p className="font-medium">Current Session</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Started: 10:23 AM today | IP: 192.168.1.45</p>
                              </div>
                              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 text-xs rounded-full">
                                Active
                              </span>
                            </div>
                            <button className="text-sm text-factory-teal hover:text-factory-teal-dark transition-colors">
                              Logout from all other devices
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Notification Settings */}
                    {activeTab === 'notifications' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Receive system alerts and reports via email</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer" 
                                  checked={emailNotifications}
                                  onChange={() => setEmailNotifications(!emailNotifications)}
                                />
                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-factory-blue-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-factory-blue-light peer-checked:bg-factory-teal"></div>
                              </label>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Dashboard Alerts</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Show real-time notifications in dashboard</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer" 
                                  checked={dashboardAlerts}
                                  onChange={() => setDashboardAlerts(!dashboardAlerts)}
                                />
                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-factory-blue-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-factory-blue-light peer-checked:bg-factory-teal"></div>
                              </label>
                            </div>
                            
                            <div className="pt-4">
                              <h4 className="font-medium mb-2">Alert Categories</h4>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <input id="alert-production" type="checkbox" defaultChecked className="h-4 w-4 text-factory-teal focus:ring-factory-teal border-gray-300 rounded" />
                                  <label htmlFor="alert-production" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Production Alerts</label>
                                </div>
                                
                                <div className="flex items-center">
                                  <input id="alert-maintenance" type="checkbox" defaultChecked className="h-4 w-4 text-factory-teal focus:ring-factory-teal border-gray-300 rounded" />
                                  <label htmlFor="alert-maintenance" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Maintenance Alerts</label>
                                </div>
                                
                                <div className="flex items-center">
                                  <input id="alert-quality" type="checkbox" defaultChecked className="h-4 w-4 text-factory-teal focus:ring-factory-teal border-gray-300 rounded" />
                                  <label htmlFor="alert-quality" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Quality Control Alerts</label>
                                </div>
                                
                                <div className="flex items-center">
                                  <input id="alert-security" type="checkbox" defaultChecked className="h-4 w-4 text-factory-teal focus:ring-factory-teal border-gray-300 rounded" />
                                  <label htmlFor="alert-security" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Security Alerts</label>
                                </div>
                                
                                <div className="flex items-center">
                                  <input id="alert-reports" type="checkbox" defaultChecked className="h-4 w-4 text-factory-teal focus:ring-factory-teal border-gray-300 rounded" />
                                  <label htmlFor="alert-reports" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Scheduled Reports</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <button className="px-4 py-2 bg-factory-teal text-white rounded-md hover:bg-factory-teal-dark transition-colors flex items-center">
                              <Save className="h-4 w-4 mr-2" />
                              Save Preferences
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* API Access Settings */}
                    {activeTab === 'api' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">API Keys</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Create and manage API keys for integrating with external systems and applications.
                          </p>
                          
                          <div className="space-y-4">
                            <div className="border dark:border-factory-blue-light rounded-md p-4 bg-gray-50 dark:bg-factory-blue-light">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Production API</span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 text-xs rounded-full">
                                  Active
                                </span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-mono text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-factory-blue px-3 py-1 rounded border dark:border-factory-blue-light flex-1">
                                  dfg_prod_api_key_8a3e...5f4b
                                </span>
                                <button className="ml-2 px-3 py-1 bg-white dark:bg-factory-blue border border-gray-300 dark:border-factory-blue-light text-sm rounded hover:bg-gray-50 dark:hover:bg-factory-blue-light transition-colors">
                                  Show
                                </button>
                              </div>
                              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                Created: May 3, 2024 | Last used: 2 hours ago
                              </div>
                            </div>
                            
                            <div className="border dark:border-factory-blue-light rounded-md p-4 bg-gray-50 dark:bg-factory-blue-light">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Analytics Integration</span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 text-xs rounded-full">
                                  Active
                                </span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-mono text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-factory-blue px-3 py-1 rounded border dark:border-factory-blue-light flex-1">
                                  dfg_analytics_api_key_b42f...9e7d
                                </span>
                                <button className="ml-2 px-3 py-1 bg-white dark:bg-factory-blue border border-gray-300 dark:border-factory-blue-light text-sm rounded hover:bg-gray-50 dark:hover:bg-factory-blue-light transition-colors">
                                  Show
                                </button>
                              </div>
                              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                Created: April 18, 2024 | Last used: 1 day ago
                              </div>
                            </div>
                          </div>
                          
                          <button className="mt-4 px-4 py-2 bg-factory-teal text-white rounded-md hover:bg-factory-teal-dark transition-colors">
                            Generate New API Key
                          </button>
                        </div>
                        
                        <div className="pt-6 border-t dark:border-factory-blue-light">
                          <h3 className="text-lg font-medium mb-4">Webhook Configurations</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Set up webhooks to notify external systems about events in real-time.
                          </p>
                          
                          <div className="space-y-4">
                            <div className="border dark:border-factory-blue-light rounded-md p-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Production Events</span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 text-xs rounded-full">
                                  Active
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                https://example.com/webhooks/production
                              </div>
                              <div className="mt-2 flex space-x-2">
                                <button className="px-3 py-1 text-xs bg-white dark:bg-factory-blue border border-gray-300 dark:border-factory-blue-light rounded hover:bg-gray-50 dark:hover:bg-factory-blue-light transition-colors">
                                  Edit
                                </button>
                                <button className="px-3 py-1 text-xs text-red-600 dark:text-red-400 bg-white dark:bg-factory-blue border border-gray-300 dark:border-factory-blue-light rounded hover:bg-gray-50 dark:hover:bg-factory-blue-light transition-colors">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <button className="mt-4 px-4 py-2 bg-white dark:bg-factory-blue border border-gray-300 dark:border-factory-blue-light rounded-md hover:bg-gray-50 dark:hover:bg-factory-blue-light text-gray-700 dark:text-gray-300 transition-colors">
                            Add Webhook
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* System Settings */}
                    {activeTab === 'system' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Appearance</h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Dark Mode</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Use dark theme for the interface</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                              />
                              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-factory-blue-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-factory-blue-light peer-checked:bg-factory-teal"></div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t dark:border-factory-blue-light">
                          <h3 className="text-lg font-medium mb-4">Language & Region</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="language">
                                Language
                              </label>
                              <select 
                                id="language"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                                defaultValue="en"
                              >
                                <option value="en">English (US)</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                                <option value="zh">中文</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="date-format">
                                Date Format
                              </label>
                              <select 
                                id="date-format"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                                defaultValue="mdy"
                              >
                                <option value="mdy">MM/DD/YYYY</option>
                                <option value="dmy">DD/MM/YYYY</option>
                                <option value="ymd">YYYY/MM/DD</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t dark:border-factory-blue-light">
                          <h3 className="text-lg font-medium mb-4">Data Management</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="data-retention">
                                Data Retention Period
                              </label>
                              <select 
                                id="data-retention"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                                defaultValue="1y"
                              >
                                <option value="30d">30 Days</option>
                                <option value="90d">90 Days</option>
                                <option value="6m">6 Months</option>
                                <option value="1y">1 Year</option>
                                <option value="forever">Forever</option>
                              </select>
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Data older than the selected period will be automatically archived.
                              </p>
                            </div>
                            
                            <div className="pt-2">
                              <button className="px-4 py-2 bg-white dark:bg-factory-blue border border-gray-300 dark:border-factory-blue-light rounded-md hover:bg-gray-50 dark:hover:bg-factory-blue-light text-gray-700 dark:text-gray-300 transition-colors">
                                Export System Data
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t dark:border-factory-blue-light">
                          <h3 className="text-lg font-medium mb-4">System Status</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-700 dark:text-gray-300">System Version</span>
                              <span className="text-sm font-medium">v2.5.3</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-700 dark:text-gray-300">Last Updated</span>
                              <span className="text-sm font-medium">May 1, 2024</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-700 dark:text-gray-300">Database Status</span>
                              <span className="text-sm font-medium text-green-600 dark:text-green-400">Healthy</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-6">
                          <button className="px-4 py-2 bg-factory-teal text-white rounded-md hover:bg-factory-teal-dark transition-colors flex items-center">
                            <Save className="h-4 w-4 mr-2" />
                            Save System Settings
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Help & Support */}
                    {activeTab === 'help' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Documentation & Resources</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <a href="#" className="border dark:border-factory-blue-light rounded-md p-4 hover:bg-gray-50 dark:hover:bg-factory-blue-light transition-colors flex items-start">
                              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-md text-blue-600 dark:text-blue-300 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">User Manual</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Complete documentation for system users</p>
                              </div>
                            </a>
                            
                            <a href="#" className="border dark:border-factory-blue-light rounded-md p-4 hover:bg-gray-50 dark:hover:bg-factory-blue-light transition-colors flex items-start">
                              <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-md text-green-600 dark:text-green-300 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                  <path d="M12 17h.01"></path>
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">FAQ</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Answers to common questions</p>
                              </div>
                            </a>
                            
                            <a href="#" className="border dark:border-factory-blue-light rounded-md p-4 hover:bg-gray-50 dark:hover:bg-factory-blue-light transition-colors flex items-start">
                              <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-md text-purple-600 dark:text-purple-300 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">Tutorials</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Step-by-step guides for features</p>
                              </div>
                            </a>
                            
                            <a href="#" className="border dark:border-factory-blue-light rounded-md p-4 hover:bg-gray-50 dark:hover:bg-factory-blue-light transition-colors flex items-start">
                              <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-md text-orange-600 dark:text-orange-300 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">API Documentation</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Reference for developers</p>
                              </div>
                            </a>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t dark:border-factory-blue-light">
                          <h3 className="text-lg font-medium mb-4">Contact Support</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="support-topic">
                                Topic
                              </label>
                              <select 
                                id="support-topic"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                              >
                                <option>Technical Issue</option>
                                <option>Account Access</option>
                                <option>Feature Request</option>
                                <option>Billing Question</option>
                                <option>Other</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="support-message">
                                Message
                              </label>
                              <textarea 
                                id="support-message"
                                rows={4}
                                placeholder="Describe your issue or question..."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                              ></textarea>
                            </div>
                            
                            <div className="pt-2">
                              <button className="px-4 py-2 bg-factory-teal text-white rounded-md hover:bg-factory-teal-dark transition-colors">
                                Submit Support Request
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t dark:border-factory-blue-light">
                          <h3 className="text-lg font-medium mb-4">System Information</h3>
                          <div className="bg-gray-50 dark:bg-factory-blue-light p-4 rounded-md text-sm">
                            <p><span className="font-medium">System Version:</span> 2.5.3</p>
                            <p><span className="font-medium">Last Updated:</span> May 1, 2024</p>
                            <p><span className="font-medium">License:</span> Enterprise</p>
                            <p><span className="font-medium">Support Plan:</span> Premium</p>
                            <p><span className="font-medium">Support Expiry:</span> December 31, 2024</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
