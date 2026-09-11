"use client";

import React, { useState } from "react";
import { Paintbrush, AlignLeft, Minimize, Copy, Trash2 } from "lucide-react";

export default function CssFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const formatCSS = () => {
    if (!input) return;
    // Simple basic formatter:
    let css = input.replace(/\s+/g, ' '); // collapse spaces
    css = css.replace(/{\s*/g, ' {\n  '); // new line after {
    css = css.replace(/;\s*/g, ';\n  '); // new line after ;
    css = css.replace(/,\s*/g, ', '); // space after comma
    css = css.replace(/[ ]*}/g, '\n}\n\n'); // new line before and after }
    css = css.replace(/\n  \n}/g, '\n}'); // fix empty blocks
    setOutput(css.trim());
  };

  const minifyCSS = () => {
    if (!input) return;
    // Simple minifier:
    let css = input.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove comments
    css = css.replace(/\s+/g, ' '); // Collapse spaces
    css = css.replace(/\s*([{};:,])\s*/g, '$1'); // Remove spaces around characters
    css = css.replace(/;}/g, '}'); // Remove last semicolon
    setOutput(css.trim());
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-600 dark:text-fuchsia-400 flex items-center justify-center">
            <Paintbrush className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CSS Formatter & Minifier</h1>
            <p className="text-gray-500 dark:text-gray-400">Beautify or compress your CSS code.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={formatCSS}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
          >
            <AlignLeft className="w-4 h-4" /> Format
          </button>
          <button
            onClick={minifyCSS}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-fuchsia-500/25 hover:opacity-90"
          >
            <Minimize className="w-4 h-4" /> Minify
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
        {/* Editor */}
        <div className="glass-card flex flex-col overflow-hidden">
          <div className="p-3 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Raw CSS</span>
            <button onClick={() => { setInput(""); setOutput(""); }} className="p-1.5 text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 w-full p-4 bg-transparent resize-none outline-none font-mono text-sm text-gray-800 dark:text-gray-200"
            placeholder=".class { color: red; }"
            spellCheck="false"
          />
        </div>

        {/* Viewer */}
        <div className="glass-card flex flex-col overflow-hidden relative">
          <div className="p-3 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Output CSS</span>
            <button onClick={() => navigator.clipboard.writeText(output)} className="p-1.5 text-gray-400 hover:text-blue-500">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full p-4 overflow-auto font-mono text-sm">
            <pre className="text-gray-800 dark:text-gray-200">
              {output}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
