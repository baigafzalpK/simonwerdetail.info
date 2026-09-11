"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Smartphone, 
  ShieldCheck, 
  Hash, 
  Wifi, 
  Radio, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Layers,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { getAllKeywords, getAllCategories } from "@/lib/keywords";
import { KeywordItem } from "@/types/keyword";

const categoryIcons: Record<string, React.ReactNode> = {
  "sim-details": <Smartphone className="w-5 h-5" />,
  "network-codes": <Hash className="w-5 h-5" />,
  "pta-device": <ShieldCheck className="w-5 h-5" />,
  "packages-data": <Wifi className="w-5 h-5" />,
  "esim-apn": <Radio className="w-5 h-5" />,
  "security-tools": <FileText className="w-5 h-5" />
};

const categoryGradients: Record<string, string> = {
  "sim-details": "from-blue-600 to-indigo-600",
  "network-codes": "from-purple-600 to-pink-600",
  "pta-device": "from-emerald-600 to-teal-600",
  "packages-data": "from-amber-600 to-orange-600",
  "esim-apn": "from-cyan-600 to-blue-600",
  "security-tools": "from-rose-600 to-red-600"
};

const ITEMS_PER_PAGE = 24;

export default function KeywordsDirectoryPage() {
  const allKeywords = useMemo(() => getAllKeywords(), []);
  const categories = useMemo(() => getAllCategories(), []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"default" | "alphabetical">("default");
  const [selectedLetter, setSelectedLetter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Alphabet list
  const alphabet = useMemo(() => {
    return ["all", ...Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ")];
  }, []);

  // Filtered & Sorted Keywords
  const filteredKeywords = useMemo(() => {
    let list = allKeywords;

    // Filter by Category
    if (selectedCategory !== "all") {
      list = list.filter((item) => item.categorySlug === selectedCategory);
    }

    // Filter by Alphabet
    if (selectedLetter !== "all") {
      list = list.filter((item) => 
        item.title.trim().toUpperCase().startsWith(selectedLetter)
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => 
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        (item.quickCode && item.quickCode.toLowerCase().includes(q)) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === "alphabetical") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      list = [...list].sort((a, b) => a.id - b.id);
    }

    return list;
  }, [allKeywords, selectedCategory, selectedLetter, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredKeywords.length / ITEMS_PER_PAGE) || 1;
  const paginatedKeywords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredKeywords.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredKeywords, currentPage]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setSelectedLetter("all");
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleLetterChange = (letter: string) => {
    setSelectedLetter(letter);
    setCurrentPage(1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pakistan Telecom & SIM Knowledge Base</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6"
        >
          Telecom Utilities & <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            200+ Verified Guides
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Find instant dial codes, PTA verification guidelines, SIM ownership procedures,
          4G internet packages, APN settings, and network security tools across Jazz, Zong, Telenor, and Ufone.
        </motion.p>

        {/* Stats Counter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 p-4 rounded-2xl glass-card border border-gray-200 dark:border-white/10 max-w-3xl mx-auto text-left"
        >
          <div className="flex items-center gap-3 p-2">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">200</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Published Guides</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">6</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Core Categories</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">PTA Compliant</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">4G / 5G</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Updated 2026</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Live Search Box */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search keywords, USSD codes (e.g. *111#, 668, SIM check, APN)..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/60 backdrop-blur-md focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-md text-gray-900 dark:text-white text-base sm:text-lg"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <button
          onClick={() => handleCategoryChange("all")}
          className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
              : "bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10"
          }`}
        >
          All Guides ({allKeywords.length})
        </button>

        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleCategoryChange(cat.slug)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === cat.slug
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10"
            }`}
          >
            <span>{cat.name}</span>
            <span className="text-xs opacity-75 font-mono">({cat.count})</span>
          </button>
        ))}
      </div>

      {/* Alphabet Fast Jump Bar */}
      <div className="hidden lg:flex items-center justify-center gap-1.5 mb-8 p-2 rounded-xl bg-gray-100/50 dark:bg-white/5 border border-gray-200 dark:border-white/5 max-w-4xl mx-auto overflow-x-auto">
        <span className="text-xs font-semibold uppercase text-gray-400 mr-2">A-Z Jump:</span>
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterChange(letter)}
            className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
              selectedLetter === letter
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
            }`}
          >
            {letter === "all" ? "ALL" : letter}
          </button>
        ))}
      </div>

      {/* Controls & Results Count */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-white/10">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{paginatedKeywords.length}</span> of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">{filteredKeywords.length}</span> guides
          {selectedCategory !== "all" && ` in ${categories.find(c => c.slug === selectedCategory)?.name}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "default" | "alphabetical")}
            className="px-3 py-1.5 rounded-lg text-sm bg-white dark:bg-black/60 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="default">Default Order</option>
            <option value="alphabetical">Alphabetical (A - Z)</option>
          </select>
        </div>
      </div>

      {/* Grid of Keywords */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <AnimatePresence mode="popLayout">
          {paginatedKeywords.map((item, idx) => (
            <motion.div
              layout
              key={item.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, delay: (idx % 12) * 0.02 }}
              className="glass-card p-6 flex flex-col justify-between group hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 rounded-2xl"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300">
                    {categoryIcons[item.categorySlug] || <FileText className="w-3.5 h-3.5" />}
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">#{item.id}</span>
                </div>

                {/* Title */}
                <Link href={`/keywords/${item.slug}`}>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors mb-2 leading-snug line-clamp-2">
                    {item.title}
                  </h2>
                </Link>

                {/* Quick Code Badge if present */}
                {item.quickCode && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-mono text-xs font-semibold mb-3">
                    <span className="opacity-70">Code:</span> {item.quickCode}
                  </div>
                )}

                {/* Snippet */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                  {item.snippet}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] px-2 py-0.5 rounded bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link
                  href={`/keywords/${item.slug}`}
                  className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/10 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-500 transition-colors"
                >
                  <span>View Full Guide</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No Results Fallback */}
      {filteredKeywords.length === 0 && (
        <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-300 dark:border-white/10 mb-12">
          <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No guides found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
            We couldn&apos;t find any telecom guides matching &quot;{searchQuery}&quot;. Try adjusting your search query or category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedLetter("all");
            }}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm shadow-md hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mb-16">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                    : "bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Category Deep-Dive Cards */}
      <section className="mt-16 pt-12 border-t border-gray-200 dark:border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Explore by Telecom Topic
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Browse through our structured categories curated for Pakistani mobile networks and global utilities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
              className="glass-card p-6 rounded-2xl cursor-pointer group hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                  {categoryIcons[cat.slug] || <FileText className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 pt-3 border-t border-gray-100 dark:border-white/10">
                <span>{cat.count} Detailed Guides</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
