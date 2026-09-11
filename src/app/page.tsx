"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Search, 
  Smartphone, 
  BookOpen, 
  Hash, 
  Wifi, 
  Radio, 
  FileText,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { featuredArticles } from "@/data/featuredArticles";

export default function Home() {
  const [searchVal, setSearchVal] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchVal.trim();
    if (!query) {
      router.push("/keywords");
      return;
    }
    // If user enters a phone number (e.g. 03225202988 or 92322... or 322...), route to the dedicated lookup tool!
    const cleanDigits = query.replace(/\D/g, "");
    if ((cleanDigits.startsWith("03") && cleanDigits.length >= 10) || 
        (cleanDigits.startsWith("923") && cleanDigits.length >= 11) || 
        (cleanDigits.startsWith("3") && cleanDigits.length === 10)) {
      router.push(`/tools/sim-database-lookup?number=${encodeURIComponent(cleanDigits)}`);
    } else {
      router.push(`/keywords?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative overflow-hidden w-full h-full flex flex-col items-center">
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-slate-950">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] rounded-full bg-pink-500/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-white/5 border border-blue-500/20 backdrop-blur-md mb-8 shadow-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            200+ Telecom Guides & USSD Codes Now Published
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6"
        >
          All Your Telecom Utilities in
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> One Secure Platform</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed"
        >
          Explore the most comprehensive directory of 200+ verified guides, USSD dial codes, SIM ownership checks, PTA DIRBS verification, and developer utilities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mx-auto"
        >
          <Link href="/keywords" className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300">
              Browse 200 Guides <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/tools" className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white rounded-xl font-semibold shadow-sm hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300 backdrop-blur-md">
              Developer Tools
            </button>
          </Link>
        </motion.div>

        {/* Original Clean Global Search Area */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-3xl mt-16 p-2 glass-card rounded-2xl flex items-center shadow-xl border border-gray-200 dark:border-white/10"
        >
          <div className="p-4"><Search className="text-gray-400 w-6 h-6" /></div>
          <input 
            type="text" 
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search SIM check, USSD (*111#, 668), PTA tax, APN, packages..." 
            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white text-base sm:text-lg placeholder-gray-400 dark:placeholder-gray-500 py-3 px-2"
          />
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors hidden sm:block mr-2 shadow-md shadow-blue-500/25"
          >
            Search Guides
          </button>
        </motion.form>
      </section>

      {/* Featured 20 Top SEO Articles Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trending Pakistan SIM Guides</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Essential SIM Ownership & Verification Guides
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Comprehensive official walkthroughs for CNIC check, PTA 668, Jazz, Zong, Telenor, and Ufone verification.
            </p>
          </div>
          <Link href="/keywords" className="mt-4 md:mt-0 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            <span>View All 200 Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredArticles.map((article, idx) => (
            <Link key={article.slug} href={`/${article.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (idx % 8) * 0.03 }}
                className="glass-card p-5 h-full rounded-2xl flex flex-col justify-between group hover:border-blue-500/50 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 font-semibold">
                      Guide #{idx + 1}
                    </span>
                    {article.quickCode && (
                      <span className="text-[11px] font-mono text-gray-400">
                        {article.quickCode}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3">
                    {article.snippet}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Read Guide</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* 200 Guides Knowledge Base Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Comprehensive Knowledge Base</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Explore by Telecom Topic
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Verified step-by-step solutions for Pakistani telecom networks and mobile users.
            </p>
          </div>
          <Link href="/keywords" className="mt-4 md:mt-0 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            <span>View All 200 Guides Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "SIM Details & Verification",
              count: "40 Guides",
              icon: <Smartphone className="w-6 h-6 text-blue-500" />,
              desc: "SIM ownership check, CNIC verification via 668, biometric BVS procedures, duplicate SIMs, and ownership transfer.",
              link: "/sim-owner-details-pakistan",
              tag: "PTA 668 & BVS"
            },
            {
              title: "Network USSD Codes",
              count: "35 Guides",
              icon: <Hash className="w-6 h-6 text-purple-500" />,
              desc: "Balance check codes, emergency loan/advance, credit share, remaining data & minutes for Jazz, Zong, Telenor, and Ufone.",
              link: "/all-network-balance-check-code",
              tag: "*111#, *222#, *444#"
            },
            {
              title: "PTA DIRBS & Device Verification",
              count: "30 Guides",
              icon: <Shield className="w-6 h-6 text-emerald-500" />,
              desc: "IMEI registration via 8484, custom duty tax calculators, overseas temporary registration, and stolen phone blocking.",
              link: "/pta-mobile-device-verification-online-dirbs",
              tag: "DIRBS & 8484"
            },
            {
              title: "Packages & Internet Bundles",
              count: "35 Guides",
              icon: <Wifi className="w-6 h-6 text-amber-500" />,
              desc: "Best monthly 4G data packages, WhatsApp and YouTube bundles, all-in-one hybrid packages, and unsubscribe codes.",
              link: "/jazz-monthly-call-packages-details",
              tag: "4G LTE Bundles"
            },
            {
              title: "eSIM, APN & Roaming",
              count: "30 Guides",
              icon: <Radio className="w-6 h-6 text-cyan-500" />,
              desc: "Digital eSIM activation, high-speed 4G/5G APN configuration, Wi-Fi calling, and international roaming bundles.",
              link: "/what-is-esim-and-how-to-activate-in-pakistan",
              tag: "eSIM & High-Speed APN"
            },
            {
              title: "Mobile Security & Utilities",
              count: "30 Guides",
              icon: <FileText className="w-6 h-6 text-rose-500" />,
              desc: "Spam call blocker codes, FIA cybercrime reporting, BISP scam protection, and developer utilities.",
              link: "/how-to-block-spam-calls-and-marketing-sms",
              tag: "Anti-Spam & Security"
            },
          ].map((cat, idx) => (
            <Link href={cat.link} key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-card p-6 h-full rounded-2xl flex flex-col justify-between group hover:border-blue-500/40 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {cat.icon}
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 font-semibold">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>{cat.tag}</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Developer Tools Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-white/10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Popular Developer Utilities</h2>
          <p className="text-gray-600 dark:text-gray-400">Essential online utilities for telecom specialists and software engineers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Live SIM Record Lookup",
              description: "Live query for mobile records with automated 92 international prefixing.",
              icon: <Smartphone className="w-6 h-6 text-blue-500" />,
              path: "/tools/sim-database-lookup"
            },
            {
              title: "IP Address Lookup",
              description: "Check IP geolocation, ISP network provider, ASN, and country details.",
              icon: <Shield className="w-6 h-6 text-purple-500" />,
              path: "/tools/ip-lookup"
            },
            {
              title: "QR Code Generator",
              description: "Create customizable high-resolution QR codes for text, URLs, and Wi-Fi credentials.",
              icon: <Zap className="w-6 h-6 text-yellow-500" />,
              path: "/tools/qr-generator"
            }
          ].map((tool, idx) => (
            <Link href={tool.path} key={idx}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 h-full group cursor-pointer rounded-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{tool.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
                <div className="mt-6 text-blue-500 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Open Tool <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
