"use client";

import React, { useState } from "react";
import { Lock, ShieldCheck, Copy } from "lucide-react";
import bcrypt from "bcryptjs";

export default function BcryptGeneratorTool() {
  const [input, setInput] = useState("");
  const [rounds, setRounds] = useState(10);
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);

  const [verifyText, setVerifyText] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);

  const generateHash = () => {
    if (!input) return;
    setLoading(true);
    // Bcrypt generation can be slow, wrap in timeout to not block UI thread completely for high rounds
    setTimeout(() => {
      try {
        const salt = bcrypt.genSaltSync(rounds);
        const generatedHash = bcrypt.hashSync(input, salt);
        setHash(generatedHash);
      } catch (err) {
        setHash("Error generating hash");
      }
      setLoading(false);
    }, 50);
  };

  const handleVerify = () => {
    if (!verifyText || !verifyHash) return;
    try {
      const match = bcrypt.compareSync(verifyText, verifyHash);
      setVerifyResult(match);
    } catch {
      setVerifyResult(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-slate-800 text-white flex items-center justify-center">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bcrypt Generator</h1>
          <p className="text-gray-500 dark:text-gray-400">Generate and verify Bcrypt hashes instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generator */}
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Generate Hash</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">String to hash</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-white outline-none text-gray-900 dark:text-white"
                placeholder="secret_password_123"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Salt Rounds: {rounds}</label>
              <input
                type="range"
                min="4"
                max="16"
                value={rounds}
                onChange={(e) => setRounds(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-slate-800 dark:accent-white"
              />
              <p className="text-xs text-gray-500 mt-2">Higher rounds = more secure but slower to generate.</p>
            </div>
            <button
              onClick={generateHash}
              disabled={loading || !input}
              className="w-full py-3 px-4 rounded-xl shadow-lg text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all font-semibold"
            >
              {loading ? "Hashing..." : "Generate Hash"}
            </button>
            
            {hash && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase">Result</span>
                  <button onClick={() => navigator.clipboard.writeText(hash)} className="text-gray-400 hover:text-slate-800 dark:hover:text-white">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-mono text-sm break-all text-gray-900 dark:text-white">{hash}</p>
              </div>
            )}
          </div>
        </div>

        {/* Verifier */}
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Verify Hash</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">String to verify</label>
              <input
                type="text"
                value={verifyText}
                onChange={(e) => { setVerifyText(e.target.value); setVerifyResult(null); }}
                className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-white outline-none text-gray-900 dark:text-white"
                placeholder="secret_password_123"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bcrypt Hash</label>
              <input
                type="text"
                value={verifyHash}
                onChange={(e) => { setVerifyHash(e.target.value); setVerifyResult(null); }}
                className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-white outline-none text-gray-900 dark:text-white font-mono text-sm"
                placeholder="$2a$10$..."
              />
            </div>
            <button
              onClick={handleVerify}
              disabled={!verifyText || !verifyHash}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-lg border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all font-semibold"
            >
              <ShieldCheck className="w-5 h-5" /> Verify Match
            </button>

            {verifyResult !== null && (
              <div className={`mt-6 p-4 rounded-xl border ${verifyResult ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-500/30 dark:text-green-400' : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-500/30 dark:text-red-400'}`}>
                <p className="font-bold text-center text-lg">
                  {verifyResult ? "✅ Match!" : "❌ No Match"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
