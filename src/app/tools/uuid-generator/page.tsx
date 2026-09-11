"use client";

import React, { useState } from "react";
import { Hash, Copy, RefreshCw, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function UuidGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState("v4");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateUUIDv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUIDv4());
    setUuids(newUuids);
  };

  const copyToClipboard = (text: string, index: number | null = null) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gray-800 text-white flex items-center justify-center shadow-lg">
          <Hash className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">UUID Generator</h1>
          <p className="text-gray-500 dark:text-gray-400">Generate universally unique identifiers (v4).</p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Version</label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-gray-800 dark:focus:ring-white outline-none text-gray-900 dark:text-white"
            >
              <option value="v4">UUID v4 (Random)</option>
              <option value="v1" disabled>UUID v1 (Timestamp) - Coming Soon</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-gray-800 dark:focus:ring-white outline-none text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-lg text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all font-semibold"
            >
              <RefreshCw className="w-5 h-5" /> Generate
            </button>
          </div>
        </div>
      </div>

      {uuids.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Generated UUIDs ({uuids.length})</span>
            {uuids.length > 1 && (
              <button onClick={copyAll} className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors">
                <Layers className="w-4 h-4" /> Copy All
              </button>
            )}
          </div>
          <div className="divide-y divide-gray-100 dark:divide-white/5 max-h-[500px] overflow-y-auto">
            {uuids.map((uuid, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <span className="font-mono text-gray-800 dark:text-gray-200">{uuid}</span>
                <button 
                  onClick={() => copyToClipboard(uuid, idx)}
                  className={`p-2 rounded-lg transition-colors ${copiedIndex === idx ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400' : 'text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white opacity-0 group-hover:opacity-100'}`}
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
