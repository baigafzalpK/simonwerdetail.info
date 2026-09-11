"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Smartphone, Globe, Shield, Wifi, Zap, FileText, Link2, Type, Hash } from "lucide-react";
import Link from "next/link";

const categories = [
  "All",
  "Telecom Utilities",
  "Security Tools",
  "Network Utilities",
  "Developer Utilities",
  "Converter Tools"
];

const tools = [
  { name: "SIM Format Validator", category: "Telecom Utilities", icon: <Smartphone className="w-5 h-5" />, path: "/tools/sim-format-validator", desc: "Check ICCID format validity." },
  { name: "Mobile Number Validator", category: "Telecom Utilities", icon: <Smartphone className="w-5 h-5" />, path: "/tools/mobile-number-validator", desc: "Validate numbers globally." },
  { name: "Password Generator", category: "Security Tools", icon: <Shield className="w-5 h-5" />, path: "/tools/password-generator", desc: "Create secure passwords." },
  { name: "QR Code Generator", category: "Developer Utilities", icon: <Zap className="w-5 h-5" />, path: "/tools/qr-generator", desc: "Generate customizable QR codes." },
  { name: "IP Address Lookup", category: "Network Utilities", icon: <Globe className="w-5 h-5" />, path: "/tools/ip-lookup", desc: "Find geolocation of IP addresses." },
  { name: "Ping Tool", category: "Network Utilities", icon: <Wifi className="w-5 h-5" />, path: "/tools/ping", desc: "Test reachability of a host." },
  { name: "JSON Formatter", category: "Developer Utilities", icon: <FileText className="w-5 h-5" />, path: "/tools/json-formatter", desc: "Format and validate JSON." },
  { name: "Base64 Encoder", category: "Converter Tools", icon: <Zap className="w-5 h-5" />, path: "/tools/base64", desc: "Encode or decode Base64." },
  { name: "URL Encoder/Decoder", category: "Converter Tools", icon: <Link2 className="w-5 h-5" />, path: "/tools/url-encoder", desc: "Safely encode or decode URLs." },
  { name: "Text Case Converter", category: "Converter Tools", icon: <Type className="w-5 h-5" />, path: "/tools/text-case-converter", desc: "Convert text to UPPERCASE, camelCase, etc." },
  { name: "Word Counter", category: "Developer Utilities", icon: <FileText className="w-5 h-5" />, path: "/tools/word-counter", desc: "Real-time statistics for your text." },
  { name: "UUID Generator", category: "Developer Utilities", icon: <Hash className="w-5 h-5" />, path: "/tools/uuid-generator", desc: "Generate universally unique identifiers." },
  { name: "Lorem Ipsum Generator", category: "Developer Utilities", icon: <FileText className="w-5 h-5" />, path: "/tools/lorem-ipsum-generator", desc: "Generate placeholder text." },
];

export default function ToolsDirectory() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Tools Directory
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 dark:text-gray-400"
        >
          Explore over 70+ powerful AI-driven utilities designed for telecom professionals, developers, and everyday users.
        </motion.p>
      </div>

      {/* Search and Filters */}
      <div className="mb-12">
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for a tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-md focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm text-gray-900 dark:text-white text-lg"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                  : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {filteredTools.map((tool, idx) => (
          <Link href={tool.path} key={idx}>
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 h-full flex flex-col group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{tool.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex-1">{tool.desc}</p>
              <div className="mt-4 text-sm font-medium text-blue-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Open Tool &rarr;
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
      
      {filteredTools.length === 0 && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          No tools found matching your search.
        </div>
      )}
    </div>
  );
}
