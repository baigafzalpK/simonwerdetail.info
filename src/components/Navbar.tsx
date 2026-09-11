"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Menu, X, Smartphone, User } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass border-b" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Smartphone className="text-white w-6 h-6" />
            </div>
            <Link href="/">
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                SIM Utility Hub
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/keywords" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors flex items-center gap-1">
              <span>Telecom Guides (200)</span>
            </Link>
            <Link href="/tools" className="text-sm font-medium hover:text-blue-500 transition-colors">
              Tools
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-blue-500 transition-colors">
              Pricing
            </Link>
            <Link href="/faq" className="text-sm font-medium hover:text-blue-500 transition-colors">
              FAQ
            </Link>
            
            {/* Global Search */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const query = (form.elements.namedItem('search') as HTMLInputElement)?.value;
                if (query) window.location.href = `/keywords?q=${encodeURIComponent(query)}`;
              }}
              className="relative group"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <input
                name="search"
                type="text"
                placeholder="Search 200+ guides, USSD..."
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-full bg-gray-50/50 dark:bg-black/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent w-64 transition-all duration-300 focus:w-80 text-sm"
              />
            </form>

            {/* User & Theme Actions */}
            <div className="flex items-center space-x-4 border-l border-gray-200 dark:border-gray-800 pl-6">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                <div className="w-5 h-5 flex items-center justify-center text-sm">
                  {theme === "dark" ? "🌙" : "☀️"}
                </div>
              </button>
              
              <Link href="/login" className="flex items-center gap-2 text-sm font-medium hover:text-blue-500 transition-colors">
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass border-t"
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            <div className="pt-2 pb-4">
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full pl-4 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <Link href="/keywords" className="block px-3 py-2 rounded-md text-base font-semibold text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-white/10">Telecom Guides (200)</Link>
            <Link href="/tools" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-white/10">Tools Directory</Link>
            <Link href="/pricing" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-white/10">Pricing</Link>
            <Link href="/faq" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-white/10">FAQ</Link>
            <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20">Login / Register</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
