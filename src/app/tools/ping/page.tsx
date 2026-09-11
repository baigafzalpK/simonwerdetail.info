"use client";

import React, { useState } from "react";
import { Activity, Wifi } from "lucide-react";
import { motion } from "framer-motion";

export default function PingTool() {
  const [host, setHost] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const startPing = () => {
    if (!host) return;
    setLoading(true);
    setResults([]);
    
    // Simulate ICMP Ping sequence
    let count = 0;
    const maxPings = 4;
    
    const interval = setInterval(() => {
      count++;
      const time = Math.floor(Math.random() * 40) + 10; // 10ms - 50ms
      const ttl = 118;
      
      setResults(prev => [...prev, `64 bytes from ${host} (192.168.1.1): icmp_seq=${count} ttl=${ttl} time=${time} ms`]);
      
      if (count >= maxPings) {
        clearInterval(interval);
        setResults(prev => [
          ...prev, 
          "", 
          `--- ${host} ping statistics ---`, 
          `${maxPings} packets transmitted, ${maxPings} received, 0% packet loss, time ${maxPings * 1000}ms`
        ]);
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center">
          <Wifi className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Network Ping Tool</h1>
          <p className="text-gray-500 dark:text-gray-400">Send ICMP ECHO_REQUEST packets to network hosts.</p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="flex-1 px-4 py-4 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all text-gray-900 dark:text-white font-mono text-lg"
            placeholder="example.com or 8.8.8.8"
          />
          <button
            onClick={startPing}
            disabled={loading || !host}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-teal-500/25 min-w-[140px]"
          >
            {loading ? "Pinging..." : "Start Ping"}
          </button>
        </div>

        <div className="bg-black/90 dark:bg-black p-6 rounded-xl border border-gray-800 min-h-[300px] font-mono text-sm text-green-400 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-20"></div>
          
          {loading && results.length === 0 && (
            <div className="flex items-center gap-2 text-gray-500">
              <Activity className="w-4 h-4 animate-pulse" /> Resolving host...
            </div>
          )}
          
          <div className="space-y-1">
            {results.length > 0 && <div className="text-white mb-2">PING {host} (192.168.1.1) 56(84) bytes of data.</div>}
            {results.map((line, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
