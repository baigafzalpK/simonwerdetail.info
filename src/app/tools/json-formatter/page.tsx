"use client";

import React, { useState } from "react";
import { FileJson, Play, Copy, Trash2 } from "lucide-react";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJSON = () => {
    if (!input) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center">
            <FileJson className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">JSON Formatter & Validator</h1>
            <p className="text-gray-500 dark:text-gray-400">Pretty print and validate your JSON data.</p>
          </div>
        </div>
        <button
          onClick={formatJSON}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-green-500/25"
        >
          <Play className="w-4 h-4 fill-current" /> Format
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
        {/* Editor */}
        <div className="glass-card flex flex-col overflow-hidden">
          <div className="p-3 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Raw JSON</span>
            <button onClick={() => setInput("")} className="p-1.5 text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 w-full p-4 bg-transparent resize-none outline-none font-mono text-sm text-gray-800 dark:text-gray-200"
            placeholder='{ "paste": "here" }'
            spellCheck="false"
          />
        </div>

        {/* Viewer */}
        <div className="glass-card flex flex-col overflow-hidden relative">
          <div className="p-3 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Formatted Output</span>
            <button onClick={() => navigator.clipboard.writeText(output)} className="p-1.5 text-gray-400 hover:text-blue-500">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full p-4 overflow-auto font-mono text-sm">
            {error ? (
              <div className="text-red-500 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-200 dark:border-red-500/20">
                <span className="font-bold block mb-1">Invalid JSON:</span>
                {error}
              </div>
            ) : (
              <pre className="text-gray-800 dark:text-gray-200">
                {output}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
