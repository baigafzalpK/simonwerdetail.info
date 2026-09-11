"use client";

import React, { useState } from "react";
import { FileText, Clock, Type, AlignLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, "").length;
  const paragraphCount = text.trim() ? text.split(/\n+/).filter(p => p.trim() !== "").length : 0;
  const readingTime = Math.ceil(wordCount / 200); // avg 200 wpm

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
          <FileText className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Word & Character Counter</h1>
          <p className="text-gray-500 dark:text-gray-400">Real-time statistics for your text.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Words", value: wordCount, icon: <Type className="w-4 h-4 text-amber-500" /> },
          { label: "Characters", value: charCount, icon: <AlignLeft className="w-4 h-4 text-blue-500" /> },
          { label: "No Spaces", value: charNoSpaces, icon: <AlignLeft className="w-4 h-4 text-purple-500" /> },
          { label: "Paragraphs", value: paragraphCount, icon: <FileText className="w-4 h-4 text-green-500" /> },
          { label: "Reading Time", value: `~${readingTime}m`, icon: <Clock className="w-4 h-4 text-red-500" /> },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center text-center col-span-1"
          >
            <div className="flex items-center gap-2 mb-2">
              {stat.icon}
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</span>
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="glass-card flex flex-col h-[500px] overflow-hidden border-2 border-transparent focus-within:border-amber-500/50 transition-colors">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 w-full p-6 bg-transparent resize-none outline-none text-gray-800 dark:text-gray-200 text-lg leading-relaxed"
          placeholder="Start typing or paste your document here..."
        />
        <div className="bg-gray-50 dark:bg-white/5 px-6 py-3 border-t border-gray-200 dark:border-white/10 flex justify-between items-center text-sm text-gray-500">
          <span>{charCount > 0 ? "Analyzing..." : "Waiting for input..."}</span>
          <button onClick={() => setText("")} className="hover:text-red-500 transition-colors font-medium">Clear Text</button>
        </div>
      </div>
    </div>
  );
}
