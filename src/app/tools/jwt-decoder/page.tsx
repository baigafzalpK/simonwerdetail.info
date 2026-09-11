"use client";

import React, { useState, useEffect } from "react";
import { Unlock, AlertCircle } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

export default function JwtDecoderTool() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setHeader("");
      setPayload("");
      setError("");
      return;
    }
    try {
      // Decode header
      const headerDecoded = jwtDecode(token, { header: true });
      setHeader(JSON.stringify(headerDecoded, null, 2));
      
      // Decode payload
      const payloadDecoded = jwtDecode(token);
      setPayload(JSON.stringify(payloadDecoded, null, 2));
      
      setError("");
    } catch (e) {
      setError("Invalid JWT Format");
      setHeader("");
      setPayload("");
    }
  }, [token]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 flex items-center justify-center">
          <Unlock className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">JWT Decoder</h1>
          <p className="text-gray-500 dark:text-gray-400">Decode JSON Web Tokens securely in your browser.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card flex flex-col h-[600px] overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Encoded Token (Paste here)</span>
          </div>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1 w-full p-4 bg-transparent resize-none outline-none font-mono text-sm text-gray-800 dark:text-gray-200 break-all"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            spellCheck="false"
          />
        </div>

        <div className="flex flex-col gap-6 h-[600px]">
          {error ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6 border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 flex items-center gap-3 text-red-600 dark:text-red-400">
              <AlertCircle className="w-6 h-6" />
              <span className="font-semibold">{error}</span>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="glass-card flex flex-col flex-1 overflow-hidden">
                <div className="p-3 border-b border-gray-200 dark:border-white/10 bg-violet-50/50 dark:bg-violet-900/20">
                  <span className="font-semibold text-sm text-violet-800 dark:text-violet-300">Header <span className="text-xs font-normal ml-2 opacity-70">Algorithm & Token Type</span></span>
                </div>
                <div className="flex-1 w-full p-4 overflow-auto font-mono text-sm text-violet-900 dark:text-violet-200">
                  <pre>{header || "{}"}</pre>
                </div>
              </div>
              
              {/* Payload */}
              <div className="glass-card flex flex-col flex-[2] overflow-hidden">
                <div className="p-3 border-b border-gray-200 dark:border-white/10 bg-blue-50/50 dark:bg-blue-900/20">
                  <span className="font-semibold text-sm text-blue-800 dark:text-blue-300">Payload <span className="text-xs font-normal ml-2 opacity-70">Data</span></span>
                </div>
                <div className="flex-1 w-full p-4 overflow-auto font-mono text-sm text-blue-900 dark:text-blue-200">
                  <pre>{payload || "{}"}</pre>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
