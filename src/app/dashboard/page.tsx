"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Settings, Bookmark, Activity, Key, CreditCard } from "lucide-react";

export default function UserDashboard() {
  const menuItems = [
    { label: "Profile", icon: <User className="w-5 h-5" />, active: true },
    { label: "Bookmarks", icon: <Bookmark className="w-5 h-5" /> },
    { label: "Activity History", icon: <Activity className="w-5 h-5" /> },
    { label: "API Keys", icon: <Key className="w-5 h-5" /> },
    { label: "Subscription", icon: <CreditCard className="w-5 h-5" /> },
    { label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="glass-card p-6 sticky top-28">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                JD
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
                <p className="text-xs text-gray-500">Pro Plan</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                    item.active 
                      ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <input type="text" value="John Doe" readOnly className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">Email Address</label>
                <input type="email" value="john@example.com" readOnly className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">Subscription Status</label>
                <div className="w-full px-4 py-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 font-medium">
                  Active (Pro)
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">API Usage</label>
                <div className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                  <div className="flex justify-between mb-1">
                    <span>1,240 / 10,000 req</span>
                    <span className="font-medium text-blue-500">12%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[12%]"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Saved Tools", value: "14", color: "blue" },
              { title: "Searches Today", value: "28", color: "purple" },
              { title: "Exported Reports", value: "3", color: "green" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <h4 className="text-gray-500 text-sm font-medium mb-2">{stat.title}</h4>
                <div className={`text-3xl font-bold text-${stat.color}-500 dark:text-${stat.color}-400`}>{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
