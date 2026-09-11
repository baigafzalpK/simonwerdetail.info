import React from "react";
import { Metadata } from "next";
import SimSearchWidget from "@/components/SimSearchWidget";
import { Smartphone, ShieldCheck, Database, Zap, FileText } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Live Mobile Number & SIM Record Search | SIM Utility Hub",
  description: "Search Pakistani mobile numbers with automatic 92 prefix formatting, carrier network detection, and live API record query.",
  keywords: ["sim record search", "pakistan mobile number lookup", "live sim tracker api", "sim database search"],
};

export default function SimDatabaseLookupPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Database className="w-3.5 h-3.5" />
          <span>Live API Search Engine</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
          Live Mobile Number & SIM Lookup
        </h1>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Enter any Pakistani mobile number (e.g. <code className="font-mono text-blue-600 dark:text-blue-400">03225202988</code>). The backend automatically formats the international <strong>92</strong> prefix and queries live database records.
        </p>
      </div>

      {/* Interactive Search Engine Widget */}
      <SimSearchWidget initialNumber="03225202988" />

      {/* Feature Explanations & FAQ */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Automated 92 Prefixing</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Whether you enter 03225202988, 3225202988, or +923225202988, our server automatically normalizes the query string to 923225202988 before hitting the API.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Carrier Detection</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Real-time prefix mapping accurately detects Jazz, Zong, Telenor, Ufone, or SCOM network operators instantly.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Official Verification</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Connects with PTA 668 and official carrier self-service channels for verified biometric ownership audits.
          </p>
        </div>
      </div>
    </div>
  );
}
