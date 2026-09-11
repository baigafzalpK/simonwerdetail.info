"use client";

import React, { useState } from "react";
import { ArrowRightLeft, Copy, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const processText = (text: string, currentMode: "encode" | "decode") => {
    setInput(text);
    setError("");
    if (!text) {
      setOutput("");
      return;
    }
    try {
      if (currentMode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(text))));
      } else {
        setOutput(decodeURIComponent(escape(atob(text))));
      }
    } catch (err) {
      setError("Invalid input for Base64 decoding.");
      setOutput("");
    }
  };

  const toggleMode = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    processText(output, newMode); // Swap input/output automatically
  };

  const copyToClipboard = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <ArrowRightLeft className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Base64 Encoder / Decoder</h1>
            <p className="text-gray-500 dark:text-gray-400">Convert text to Base64 and vice versa securely.</p>
          </div>
        </div>
        <div className="glass-card p-1 rounded-lg flex">
          <button
            onClick={() => { setMode("encode"); processText(input, "encode"); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === "encode" ? "bg-orange-500 text-white shadow-md" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"}`}
          >
            Encode
          </button>
          <button
            onClick={() => { setMode("decode"); processText(input, "decode"); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === "decode" ? "bg-orange-500 text-white shadow-md" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"}`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="glass-card flex flex-col h-[500px] overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Input</span>
            <button onClick={() => processText("", mode)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => processText(e.target.value, mode)}
            className="flex-1 w-full p-4 bg-transparent resize-none outline-none font-mono text-sm text-gray-800 dark:text-gray-200"
            placeholder={`Paste your ${mode === "encode" ? "text" : "Base64"} here...`}
          />
        </div>

        {/* Output */}
        <div className="glass-card flex flex-col h-[500px] overflow-hidden relative">
          <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Output</span>
            <button onClick={copyToClipboard} className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full p-4 overflow-auto font-mono text-sm text-gray-800 dark:text-gray-200 break-all whitespace-pre-wrap">
            {error ? <span className="text-red-500">{error}</span> : output}
          </div>
        </div>
      </div>
    </div>
  );
}
