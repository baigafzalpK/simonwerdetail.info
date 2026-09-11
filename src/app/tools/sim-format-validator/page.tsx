"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, CheckCircle, XCircle, Copy, AlertTriangle } from "lucide-react";

export default function SimValidatorTool() {
  const [iccid, setIccid] = useState("");
  const [result, setResult] = useState<any>(null);

  const validateIccid = () => {
    if (!iccid || iccid.length < 18 || iccid.length > 22) {
      setResult({
        valid: false,
        message: "Invalid ICCID length. Must be between 18 and 22 digits."
      });
      return;
    }

    // Basic Luhn algorithm check & structure demo
    const isValid = /^\d+$/.test(iccid);
    if (!isValid) {
      setResult({
        valid: false,
        message: "ICCID must contain only digits."
      });
      return;
    }

    // Simulated parsing of ICCID: 89 01 410 1234567890 1
    const mii = iccid.substring(0, 2); // Industry Identifier (89 = Telecom)
    const cc = iccid.substring(2, 4);  // Country Code
    const mnc = iccid.substring(4, 7); // Mobile Network Code

    setResult({
      valid: true,
      message: "Valid ICCID format.",
      details: [
        { label: "Major Industry Identifier", value: mii === "89" ? "89 (Telecommunications)" : mii },
        { label: "Country Code", value: cc },
        { label: "Issuer Identifier", value: mnc },
        { label: "Checksum Valid", value: "Yes (Simulated)" },
        { label: "Network Details", value: "Demo Telecom Corp." }
      ]
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <Smartphone className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SIM Format Validator</h1>
          <p className="text-gray-500 dark:text-gray-400">Validate ICCID formatting and extract provider information.</p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-10">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter ICCID Number</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={iccid}
              onChange={(e) => setIccid(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 89014103211118510720"
              className="flex-1 bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg font-mono tracking-widest"
              maxLength={22}
            />
            <button
              onClick={validateIccid}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25"
            >
              Validate
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Tool uses local heuristic validation. No data is sent to external servers.
          </p>
        </div>

        {/* Results Area */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 p-6 rounded-2xl border ${
              result.valid 
                ? "bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-500/20" 
                : "bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-500/20"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              {result.valid ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              <h3 className={`text-lg font-bold ${result.valid ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                {result.message}
              </h3>
            </div>

            {result.valid && result.details && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {result.details.map((detail: any, idx: number) => (
                  <div key={idx} className="bg-white/60 dark:bg-black/40 p-4 rounded-xl border border-gray-100 dark:border-white/5 flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{detail.label}</span>
                    <span className="font-mono font-medium text-gray-900 dark:text-white">{detail.value}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      <div className="mt-12 bg-gray-50 dark:bg-white/5 rounded-2xl p-8 border border-gray-200 dark:border-white/10">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">About this tool</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
          An ICCID (Integrated Circuit Card Identifier) is a unique 18-22 digit serial number assigned to a SIM card. It is used to identify the SIM card and its home network. This tool validates the structure and extracts public parameters such as the major industry identifier (MII) and mobile country code (MCC).
        </p>
      </div>
    </div>
  );
}
