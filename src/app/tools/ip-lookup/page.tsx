"use client";

import React, { useState } from "react";
import { Globe, Search, MapPin, Server, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function IPLookupTool() {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const lookupIP = async () => {
    if (!ip) return;
    setLoading(true);
    // Simulate API lookup
    setTimeout(() => {
      setResult({
        ip: ip,
        city: "San Francisco",
        region: "California",
        country: "United States",
        loc: "37.7749,-122.4194",
        org: "AS15169 Google LLC",
        timezone: "America/Los_Angeles",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
          <Globe className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">IP Address Lookup</h1>
          <p className="text-gray-500 dark:text-gray-400">Find geolocation and ASN information for any IP address.</p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Server className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-gray-900 dark:text-white font-mono text-lg"
              placeholder="e.g. 8.8.8.8"
            />
          </div>
          <button
            onClick={lookupIP}
            disabled={loading || !ip}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-cyan-500/25"
          >
            {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            Lookup
          </button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              { label: "IP Address", value: result.ip },
              { label: "Location", value: `${result.city}, ${result.region}, ${result.country}` },
              { label: "Coordinates", value: result.loc },
              { label: "ISP / Organization", value: result.org },
              { label: "Timezone", value: result.timezone },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                <p className="font-semibold text-gray-900 dark:text-white">{item.value}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
