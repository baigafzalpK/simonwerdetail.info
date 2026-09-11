"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, BarChart3, Settings, Database, Server, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Console</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage users, tools, and system performance.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white rounded-lg transition-colors font-medium text-sm">
            Generate Report
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Users", value: "12,482", change: "+12%", icon: <Users className="w-5 h-5 text-blue-500" /> },
          { label: "Active Subs", value: "3,190", change: "+5%", icon: <CreditCard className="w-5 h-5 text-green-500" /> },
          { label: "API Requests", value: "1.2M", change: "+18%", icon: <Server className="w-5 h-5 text-purple-500" /> },
          { label: "System Load", value: "42%", change: "-2%", icon: <Activity className="w-5 h-5 text-orange-500" /> },
        ].map((stat, i) => (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} key={i} className="glass-card p-6 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Panel */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Users</h3>
              <button className="text-sm text-blue-500 font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-200 dark:border-white/10">
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Plan</th>
                    <th className="pb-3 font-medium">Joined</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <tr key={i}>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">User {i + 1}</p>
                            <p className="text-xs text-gray-500">user{i}@example.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4"><span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 rounded-md font-medium">Pro</span></td>
                      <td className="py-4 text-gray-500">Today</td>
                      <td className="py-4"><span className="flex items-center gap-1.5 text-green-600 dark:text-green-400"><div className="w-2 h-2 rounded-full bg-green-500"></div> Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { label: "Manage Tools", icon: <Database className="w-4 h-4" /> },
                { label: "Security Logs", icon: <ShieldCheck className="w-4 h-4" /> },
                { label: "System Settings", icon: <Settings className="w-4 h-4" /> },
                { label: "View Analytics", icon: <BarChart3 className="w-4 h-4" /> },
              ].map((action, i) => (
                <button key={i} className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                  {action.icon} {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icons imports workaround for missing ones
function CreditCard(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
}
function Activity(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
}
