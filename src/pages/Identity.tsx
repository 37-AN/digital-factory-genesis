import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import KpiCard from '../components/dashboard/KpiCard';
import { Key, FileText, Users, ShieldAlert, UserCheck } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Identity = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationId, setVerificationId] = useState('');
  
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

  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "User creation form would open in a complete implementation"
    });
    // In a real app, this would open a user creation modal or navigate to a user creation page
  };

  const handleEditUser = (userId) => {
    toast({
      title: "Edit User",
      description: `Editing user ${userId}`
    });
    // In a real app, this would open a user edit modal or navigate to a user edit page
  };

  const handleDisableUser = (userId) => {
    toast({
      title: "Disable User",
      description: `Disabling user ${userId}`,
      variant: "destructive"
    });
    // In a real app, this would trigger an API call to disable the user
  };

  const handleVerifyIdentity = (e) => {
    e.preventDefault();
    if (!verificationId.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid ID or public key",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Identity Verification",
      description: `Verifying identity for ${verificationId}`
    });
    // In a real app, this would trigger an API call to verify the identity
  };

  const handleSearchUsers = (e) => {
    e.preventDefault();
    toast({
      title: "Search Users",
      description: `Searching for users matching: ${searchQuery}`
    });
    // In a real app, this would filter the users list based on the search query
  };

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
                  <form onSubmit={handleSearchUsers}>
                    <input 
                      type="text" 
                      placeholder="Search users" 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="text-sm px-3 py-1 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                    />
                  </form>
                  <button 
                    className="ml-2 px-3 py-1 bg-factory-teal text-white text-sm rounded-md hover:bg-factory-teal-dark transition-colors"
                    onClick={handleAddUser}
                  >
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
                            <button 
                              className="text-factory-teal hover:text-factory-teal-dark transition-colors mr-3"
                              onClick={() => handleEditUser(user.id)}
                            >
                              Edit
                            </button>
                            <button 
                              className="text-factory-danger hover:text-red-600 transition-colors"
                              onClick={() => handleDisableUser(user.id)}
                            >
                              Disable
                            </button>
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
                    
                    <form onSubmit={handleVerifyIdentity}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          User ID or Public Key
                        </label>
                        <input 
                          type="text" 
                          placeholder="Enter ID or public key" 
                          value={verificationId}
                          onChange={e => setVerificationId(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-factory-blue-light rounded-md shadow-sm bg-white dark:bg-factory-blue focus:outline-none focus:ring-factory-teal focus:border-factory-teal"
                        />
                      </div>
                      
                      <button 
                        type="submit"
                        className="w-full mt-4 px-3 py-2 bg-factory-teal text-white rounded-md hover:bg-factory-teal-dark transition-colors"
                      >
                        Verify Identity
                      </button>
                    </form>
                    
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
        </main>
      </div>
    </div>
  );
};

export default Identity;
