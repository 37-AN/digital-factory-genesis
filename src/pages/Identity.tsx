
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import KpiCard from '../components/dashboard/KpiCard';
import { Key, FileText, Users, ShieldAlert, UserCheck } from 'lucide-react';

const Identity = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const users = [
    { id: 'USR-001', name: 'John Smith', role: 'System Administrator', status: 'Active', lastLogin: '10 minutes ago', accessLevel: 'Full Access' },
    { id: 'USR-002', name: 'Maria Rodriguez', role: 'Production Manager', status: 'Active', lastLogin: '2 hours ago', accessLevel: 'Production Line' },
    { id: 'USR-003', name: 'Robert Chen', role: 'Quality Control', status: 'Active', lastLogin: '3 hours ago', accessLevel: 'Quality Systems' },
    { id: 'USR-004', name: 'Sarah Johnson', role: 'Maintenance Engineer', status: 'Inactive', lastLogin: '2 days ago', accessLevel: 'Maintenance' },
    { id: 'USR-005', name: 'David Wilson', role: 'Logistics Coordinator', status: 'Active', lastLogin: '1 day ago', accessLevel: 'Inventory' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-factory-blue-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <h1 className="text-xl font-bold mb-4">Blockchain Identity & Access Management</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KpiCard 
              title="Registered Users"
              value="42"
              trend={2}
              icon={<Users className="h-5 w-5" />}
              loading={loading}
              description="5 new this month"
            />
            <KpiCard 
              title="Active Sessions"
              value="18"
              trend={0}
              icon={<UserCheck className="h-5 w-5" />}
              loading={loading}
              description="Current users online"
            />
            <KpiCard 
              title="Security Events"
              value="3"
              trend={-2}
              icon={<ShieldAlert className="h-5 w-5" />}
              loading={loading}
              description="Last 7 days"
            />
            <KpiCard 
              title="Access Policies"
              value="12"
              trend={1}
              icon={<FileText className="h-5 w-5" />}
              loading={loading}
              description="Role-based controls"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white dark:bg-factory-blue rounded-lg shadow overflow-hidden">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light flex items-center justify-between">
                <h2 className="font-semibold">User Registry</h2>
                <div className="flex items-center">
                  <input 
                    type="text" 
                    placeholder="Search users" 
                    className="text-sm px-3 py-1 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                  />
                  <button className="ml-2 px-3 py-1 bg-factory-teal text-white text-sm rounded-md hover:bg-factory-teal-dark transition-colors">
                    Add User
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-factory-blue-light">
                  <thead className="bg-gray-50 dark:bg-factory-blue-light">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Login</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-factory-blue divide-y divide-gray-200 dark:divide-factory-blue-light">
                    {loading ? (
                      Array(5).fill(0).map((_, index) => (
                        <tr key={index} className="animate-pulse">
                          <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                          <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-32"></div></td>
                          <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-40"></div></td>
                          <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-20"></div></td>
                          <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-24"></div></td>
                          <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div></td>
                        </tr>
                      ))
                    ) : (
                      users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium">{user.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">{user.role}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.lastLogin}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <button className="text-factory-teal hover:text-factory-teal-dark transition-colors mr-3">Edit</button>
                            <button className="text-factory-danger hover:text-red-600 transition-colors">Disable</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light">
                <h2 className="font-semibold">Blockchain Verification</h2>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-24 bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                    <div className="h-10 bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                    <div className="h-32 bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-factory-blue-light p-4 rounded-lg border dark:border-factory-blue-light">
                      <div className="flex items-center justify-center mb-2">
                        <Key className="h-10 w-10 text-factory-teal" />
                      </div>
                      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Verify user identity using the decentralized blockchain registry and cryptographic challenge.
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        User ID or Public Key
                      </label>
                      <input 
                        type="text" 
                        placeholder="Enter ID or public key" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                      />
                    </div>
                    
                    <button className="w-full px-3 py-2 bg-factory-teal text-white rounded-md hover:bg-factory-teal-dark transition-colors">
                      Verify Identity
                    </button>
                    
                    <div className="mt-4 space-y-2">
                      <h3 className="text-sm font-medium border-b dark:border-factory-blue-light pb-2">Recent Activity</h3>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <div>
                            <span className="font-medium">User Login</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">USR-001: John Smith</p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">10m ago</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <div>
                            <span className="font-medium">Permission Change</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">USR-003: Robert Chen</p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">1h ago</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <div>
                            <span className="font-medium text-yellow-600 dark:text-yellow-400">Failed Login Attempt</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">USR-004: Sarah Johnson</p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">2h ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light">
                <h2 className="font-semibold">Access Control Policies</h2>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    {Array(5).fill(0).map((_, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border-b dark:border-factory-blue-light">
                        <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-40"></div>
                        <div className="h-6 bg-gray-200 dark:bg-factory-blue-light rounded w-16"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border-b dark:border-factory-blue-light">
                      <div>
                        <span className="font-medium">System Administration</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Full system access and configuration</p>
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 text-xs rounded-full">1 User</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 border-b dark:border-factory-blue-light">
                      <div>
                        <span className="font-medium">Production Management</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Manage production lines and scheduling</p>
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 text-xs rounded-full">4 Users</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 border-b dark:border-factory-blue-light">
                      <div>
                        <span className="font-medium">Quality Control</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Access to quality systems and data</p>
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 text-xs rounded-full">5 Users</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 border-b dark:border-factory-blue-light">
                      <div>
                        <span className="font-medium">Maintenance</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Equipment maintenance and repair access</p>
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 text-xs rounded-full">7 Users</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-2">
                      <div>
                        <span className="font-medium">Inventory Management</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Raw material and product inventory</p>
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 text-xs rounded-full">3 Users</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <button className="px-3 py-2 bg-factory-teal text-white rounded-md hover:bg-factory-teal-dark transition-colors">
                        Manage Policies
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-factory-blue rounded-lg shadow">
              <div className="border-b dark:border-factory-blue-light p-4 bg-gray-50 dark:bg-factory-blue-light">
                <h2 className="font-semibold">Security Audit Log</h2>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    {Array(6).fill(0).map((_, index) => (
                      <div key={index} className="flex items-start space-x-2 pb-3 border-b dark:border-factory-blue-light">
                        <div className="h-8 w-8 bg-gray-200 dark:bg-factory-blue-light rounded"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-gray-200 dark:bg-factory-blue-light rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 dark:bg-factory-blue-light rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div className="flex items-start space-x-2 pb-3 border-b dark:border-factory-blue-light">
                      <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-300 p-2 rounded-full">
                        <UserCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">User Login</span> - John Smith logged in successfully
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Today, 10:23 AM | IP: 192.168.1.45</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 pb-3 border-b dark:border-factory-blue-light">
                      <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 p-2 rounded-full">
                        <Key className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Access Granted</span> - Maria Rodriguez accessed Production Line Dashboard
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Today, 09:42 AM | IP: 192.168.1.28</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 pb-3 border-b dark:border-factory-blue-light">
                      <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-300 p-2 rounded-full">
                        <ShieldAlert className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Failed Login Attempt</span> - Multiple failed attempts for user Sarah Johnson
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Today, 08:17 AM | IP: 192.168.1.112</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 pb-3 border-b dark:border-factory-blue-light">
                      <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 p-2 rounded-full">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Policy Update</span> - Robert Chen permissions modified
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday, 3:45 PM | IP: 192.168.1.87</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 pb-3 border-b dark:border-factory-blue-light">
                      <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-300 p-2 rounded-full">
                        <UserCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">User Login</span> - David Wilson logged in successfully
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday, 1:12 PM | IP: 192.168.1.56</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-300 p-2 rounded-full">
                        <ShieldAlert className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Unauthorized Access Attempt</span> - Someone tried to access admin panel
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago, 11:53 PM | IP: 203.45.67.89</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Identity;
