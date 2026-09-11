"use client";

import React, { useState } from "react";
import { Type, Copy, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function TextCaseConverterTool() {
  const [input, setInput] = useState("");

  const conversions = {
    uppercase: input.toUpperCase(),
    lowercase: input.toLowerCase(),
    titlecase: input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
    camelcase: input.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return ""; 
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    }).replace(/\s+/g, ''),
    snakecase: input.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || "",
    kebabcase: input.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || ""
  };

  const copyToClipboard = (text: string) => {
    if (text) navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center">
          <Type className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Text Case Converter</h1>
          <p className="text-gray-500 dark:text-gray-400">Convert strings to camelCase, snake_case, UPPERCASE, and more.</p>
        </div>
      </div>

      <div className="glass-card flex flex-col mb-8 overflow-hidden border-2 border-transparent focus-within:border-pink-500/50 transition-colors">
        <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Input Text</span>
          <button onClick={() => setInput("")} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Clear">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full p-4 bg-transparent resize-none outline-none text-gray-800 dark:text-gray-200 text-lg"
          placeholder="Type or paste your text here..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "UPPERCASE", value: conversions.uppercase },
          { label: "lowercase", value: conversions.lowercase },
          { label: "Title Case", value: conversions.titlecase },
          { label: "camelCase", value: conversions.camelcase },
          { label: "snake_case", value: conversions.snakecase },
          { label: "kebab-case", value: conversions.kebabcase },
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card p-4 flex flex-col relative group"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{item.label}</span>
              <button 
                onClick={() => copyToClipboard(item.value)} 
                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-pink-500 transition-all bg-white dark:bg-white/10 rounded-md shadow-sm" 
                title="Copy"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
              {item.value || <span className="text-gray-400 dark:text-gray-600 italic">No input</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
