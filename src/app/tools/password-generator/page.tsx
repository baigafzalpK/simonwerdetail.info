"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Copy, RefreshCw, Check } from "lucide-react";

export default function PasswordGeneratorTool() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
      setPassword("Please select at least one character type.");
      return;
    }

    let result = "";
    // Ensure cryptographically strong random values
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charset.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, []);

  const copyToClipboard = () => {
    if (password && password !== "Please select at least one character type.") {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Calculate Strength
  const strength = length > 16 && useSymbols && useNumbers ? "Strong" : length > 10 ? "Good" : "Weak";
  const strengthColor = strength === "Strong" ? "bg-green-500" : strength === "Good" ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
          <Shield className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Secure Password Generator</h1>
          <p className="text-gray-500 dark:text-gray-400">Generate cryptographically secure passwords locally.</p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-10 relative overflow-hidden">
        {/* The Result */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-20 dark:opacity-40"></div>
          <div className="relative bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="font-mono text-2xl md:text-3xl text-gray-900 dark:text-white break-all tracking-wider">
              {password}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={generatePassword}
                className="p-3 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-gray-600 dark:text-gray-300"
                title="Generate New"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={copyToClipboard}
                className={`p-3 rounded-xl flex items-center gap-2 text-white font-medium transition-colors ${
                  copied ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Strength Meter */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-600 dark:text-gray-400">Password Strength</span>
            <span className={`font-bold ${strength === "Strong" ? "text-green-500" : strength === "Good" ? "text-yellow-500" : "text-red-500"}`}>
              {strength}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className={`h-full ${strengthColor} transition-all duration-500`} style={{ width: strength === "Strong" ? "100%" : strength === "Good" ? "60%" : "30%" }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              <span>Password Length</span>
              <span className="text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded font-mono">{length}</span>
            </label>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>8</span>
              <span>32</span>
              <span>64</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { id: 'upper', label: 'Uppercase (A-Z)', state: useUppercase, setter: setUseUppercase },
              { id: 'lower', label: 'Lowercase (a-z)', state: useLowercase, setter: setUseLowercase },
              { id: 'numbers', label: 'Numbers (0-9)', state: useNumbers, setter: setUseNumbers },
              { id: 'symbols', label: 'Symbols (!@#)', state: useSymbols, setter: setUseSymbols },
            ].map((opt) => (
              <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={opt.state}
                    onChange={() => opt.setter(!opt.state)}
                  />
                  <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                    opt.state 
                      ? 'bg-blue-600 border-blue-600' 
                      : 'bg-white dark:bg-white/5 border-gray-300 dark:border-gray-600'
                  }`}>
                    {opt.state && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-medium">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
