"use client";

import React, { useState } from "react";
import { 
  Search, 
  Smartphone, 
  User, 
  CreditCard, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Copy, 
  Check, 
  Loader2, 
  AlertCircle, 
  Globe, 
  Code, 
  ExternalLink,
  WifiOff,
  Building,
  Radio
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SimSearchWidgetProps {
  initialNumber?: string;
  embedded?: boolean;
}

export default function SimSearchWidget({ initialNumber = "", embedded = false }: SimSearchWidgetProps) {
  const [phoneNumber, setPhoneNumber] = useState(initialNumber);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  const [copied, setCopied] = useState(false);

  // Real-time carrier detector from prefix
  const detectCarrier = (input: string) => {
    let clean = input.replace(/\D/g, "");
    if (clean.startsWith("92")) clean = "0" + clean.slice(2);
    if (clean.length < 4) return null;
    const p = clean.slice(0, 4);

    if (["0300","0301","0302","0303","0304","0305","0306","0307","0308","0309","0320","0321","0322","0323","0324","0325","0326","0327","0328","0329"].includes(p)) {
      return { name: "Jazz / Warid 4G", color: "text-red-500 bg-red-500/10 border-red-500/20" };
    }
    if (["0310","0311","0312","0313","0314","0315","0316","0317","0318","0319"].includes(p)) {
      return { name: "Zong 4G", color: "text-pink-500 bg-pink-500/10 border-pink-500/20" };
    }
    if (["0330","0331","0332","0333","0334","0335","0336","0337","0338","0339"].includes(p)) {
      return { name: "Ufone 4G", color: "text-orange-500 bg-orange-500/10 border-orange-500/20" };
    }
    if (["0340","0341","0342","0343","0344","0345","0346","0347","0348","0349"].includes(p)) {
      return { name: "Telenor Pakistan", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" };
    }
    if (["0355"].includes(p)) {
      return { name: "SCOM (SCO)", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
    }
    return null;
  };

  const currentCarrier = detectCarrier(phoneNumber);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setError("Please enter a valid mobile number (e.g. 03225202988)");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(phoneNumber.trim())}&type=mobile`);
      const data = await res.json();

      if (!res.ok && !data.success) {
        throw new Error(data.message || "Failed to retrieve record.");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Network error occurred while fetching SIM record.");
    } finally {
      setLoading(false);
    }
  };

  const copyDetails = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full ${embedded ? "" : "max-w-4xl mx-auto"}`}>
      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="p-2 sm:p-3 glass-card rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center w-full sm:w-auto pl-3 text-gray-400 gap-2">
            <Smartphone className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 font-mono">+92</span>
          </div>

          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter mobile number e.g. 03225202988 or 3225202988"
            className="flex-1 w-full bg-transparent border-none outline-none text-gray-900 dark:text-white text-base sm:text-lg placeholder-gray-400 dark:placeholder-gray-500 py-3 px-2 font-mono"
          />

          {currentCarrier && (
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border hidden md:inline-block ${currentCarrier.color}`}>
              {currentCarrier.name}
            </span>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-md shadow-blue-500/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Search Record</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Help Badges */}
        <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-2 mt-2 gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Backend Auto-Format: Automatically converts number to 923XXXXXXXXX</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Try sample:</span>
            <button
              type="button"
              onClick={() => setPhoneNumber("03225202988")}
              className="text-blue-500 hover:underline font-mono"
            >
              03225202988
            </button>
          </div>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Panel */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Main Record Card */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
              {/* Header Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-200 dark:border-white/10">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span>{result.records && result.records.length > 0 ? "Record Found" : "Query Processed"}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-mono">
                    {result.displayNumber || result.formattedNumber}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyDetails(JSON.stringify(result, null, 2))}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-xs font-semibold text-gray-900 dark:text-white transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy Output"}</span>
                  </button>

                  <button
                    onClick={() => setShowRaw(!showRaw)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 text-xs font-semibold transition-all border border-blue-500/20"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>{showRaw ? "Hide API Raw" : "View API JSON"}</span>
                  </button>
                </div>
              </div>

              {/* Notice when Upstream server is down / timeout */}
              {result.isUpstreamDown && (
                <div className="p-4 mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-sm flex items-start gap-3">
                  <WifiOff className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="block font-bold mb-1">External Database Server (aichatbot.pk) Offline / Unreachable</strong>
                    The external server hosting <code className="font-mono text-xs bg-black/10 dark:bg-black/30 px-1 py-0.5 rounded">https://aichatbot.pk/api/search_data.php</code> is currently not answering network connection requests (timeout). As soon as the host activates or fixes their database server, records will display automatically here.
                  </div>
                </div>
              )}

              {/* Notice when No Record is found in database */}
              {!result.isUpstreamDown && (!result.records || result.records.length === 0) && (
                <div className="p-4 mb-6 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-900 dark:text-blue-200 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="block font-bold mb-1">No Record Found in Database</strong>
                    The API responded but no registered subscriber record was found for <span className="font-mono font-semibold">{result.displayNumber}</span>. Please verify the number or try another mobile connection.
                  </div>
                </div>
              )}

              {/* Data Grid / Records Display (If Found) */}
              {result.records && result.records.length > 0 ? (
                <div className="space-y-4">
                  {result.records.map((rec: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-gray-50/90 dark:bg-white/5 border border-gray-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-5 shadow-sm"
                    >
                      {rec.name && (
                        <div className="flex items-start gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Subscriber Name</span>
                            <div className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wide">{rec.name}</div>
                          </div>
                        </div>
                      )}

                      {rec.cnic && (
                        <div className="flex items-start gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">CNIC Number</span>
                            <div className="text-base font-bold text-gray-900 dark:text-white font-mono tracking-wider">{rec.cnic}</div>
                          </div>
                        </div>
                      )}

                      {rec.number && (
                        <div className="flex items-start gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                            <Smartphone className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Registered Number</span>
                            <div className="text-base font-bold text-gray-900 dark:text-white font-mono">{rec.number}</div>
                          </div>
                        </div>
                      )}

                      {rec.operator && (
                        <div className="flex items-start gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center flex-shrink-0">
                            <Radio className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Network Operator</span>
                            <div className="text-base font-bold text-gray-900 dark:text-white">{rec.operator}</div>
                          </div>
                        </div>
                      )}

                      {rec.city && (
                        <div className="flex items-start gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
                            <Building className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">City / Circle</span>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">{rec.city}</div>
                          </div>
                        </div>
                      )}

                      {rec.date && (
                        <div className="flex items-start gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Issue / Registration Date</span>
                            <div className="text-sm font-mono text-gray-900 dark:text-white">{rec.date}</div>
                          </div>
                        </div>
                      )}

                      {rec.address && (
                        <div className="flex items-start gap-3.5 sm:col-span-2 pt-2 border-t border-gray-200 dark:border-white/10">
                          <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Registered Residential Address</span>
                            <div className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed mt-0.5">{rec.address}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Fallback & Normalized Carrier Information */
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-gray-50/80 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Detected Network</span>
                    <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                      {result.carrier?.carrier || "Pakistani Mobile"}
                    </div>
                    <span className="text-xs text-blue-500 font-mono mt-0.5 block">Prefix Match</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50/80 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <span className="text-xs text-gray-500 dark:text-gray-400">International Format</span>
                    <div className="text-lg font-bold text-gray-900 dark:text-white font-mono mt-1">
                      +{result.formattedNumber}
                    </div>
                    <span className="text-xs text-emerald-500 font-mono mt-0.5 block">92 Defined on Backend</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50/80 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Biometric Verification</span>
                    <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                      PTA & NADRA BVS
                    </div>
                    <span className="text-xs text-purple-500 font-mono mt-0.5 block">Standard Format</span>
                  </div>
                </div>
              )}

              {/* API Diagnostics Footer */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex flex-wrap items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-blue-500" />
                  <span>Target API Endpoint: <code className="font-mono text-gray-700 dark:text-gray-300">{result.hitUrl || `https://aichatbot.pk/api/search_data.php?query=${result.formattedNumber}&type=mobile`}</code></span>
                </div>
                <div>Status: <span className={`font-semibold ${result.isUpstreamDown ? "text-amber-500" : "text-emerald-500"}`}>{result.isUpstreamDown ? "Upstream Unreachable" : "200 OK"}</span></div>
              </div>

              {/* Raw JSON viewer */}
              {showRaw && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 rounded-2xl bg-black text-emerald-400 font-mono text-xs overflow-x-auto border border-emerald-500/20"
                >
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                </motion.div>
              )}
            </div>

            {/* PTA Official Verification Helper Card */}
            <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold block text-gray-900 dark:text-white">Official Self-Verification Shortcode</span>
                  To verify the registered subscriber details of your active SIM card directly, send an SMS with <strong className="font-mono text-blue-600 dark:text-blue-400">MNP</strong> to <strong className="font-mono text-blue-600 dark:text-blue-400">667</strong>.
                </div>
              </div>
              <a
                href="https://cnic.sims.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all whitespace-nowrap shadow-sm"
              >
                <span>PTA 668 Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
