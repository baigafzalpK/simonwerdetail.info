"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Basic",
      desc: "Essential tools for personal use and quick checks.",
      price: annual ? "$0" : "$0",
      period: "forever",
      features: ["10 Tool Executions / Day", "Standard Support", "Basic Tool Access", "Community Forum"],
      missing: ["API Access", "Advanced Telecom Data", "Bulk Processing"],
      popular: false,
      btn: "Get Started Free"
    },
    {
      name: "Pro",
      desc: "Advanced utilities and APIs for professionals.",
      price: annual ? "$29" : "$39",
      period: "per month",
      features: ["Unlimited Tool Executions", "Priority Support", "Access to all 70+ Tools", "API Access (10k requests)", "Export Data (CSV/JSON)"],
      missing: ["Dedicated Account Manager"],
      popular: true,
      btn: "Start Free Trial"
    },
    {
      name: "Enterprise",
      desc: "Custom solutions for large-scale operations.",
      price: annual ? "$199" : "$249",
      period: "per month",
      features: ["Unlimited Everything", "24/7 Phone Support", "Custom Integrations", "Unlimited API Access", "Dedicated Account Manager", "SLA Guarantee"],
      missing: [],
      popular: false,
      btn: "Contact Sales"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight"
        >
          Simple, transparent pricing
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 dark:text-gray-400 mb-10"
        >
          Whether you are an individual developer or an enterprise, we have a plan designed specifically for you.
        </motion.p>

        {/* Toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4"
        >
          <span className={`text-sm font-medium ${!annual ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>Monthly</span>
          <button 
            onClick={() => setAnnual(!annual)}
            className="relative inline-flex h-7 w-14 items-center rounded-full bg-blue-600 transition-colors"
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${annual ? 'translate-x-8' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>
            Annually <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 dark:bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-800 dark:text-green-400">Save 25%</span>
          </span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (idx * 0.1) }}
            className={`relative rounded-3xl p-8 ${
              plan.popular 
                ? "bg-gradient-to-b from-blue-600 to-purple-800 text-white shadow-2xl shadow-blue-500/20 transform md:-translate-y-4" 
                : "glass-card text-gray-900 dark:text-white"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-6 transform -translate-y-1/2">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wider shadow-lg">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </span>
              </div>
            )}
            
            <h3 className={`text-xl font-bold mb-2 ${plan.popular ? "text-white" : "text-gray-900 dark:text-white"}`}>{plan.name}</h3>
            <p className={`text-sm mb-6 ${plan.popular ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>{plan.desc}</p>
            
            <div className="mb-8">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              <span className={`text-sm ${plan.popular ? "text-blue-200" : "text-gray-500 dark:text-gray-400"}`}> /{plan.period}</span>
            </div>

            <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-lg ${
              plan.popular 
                ? "bg-white text-blue-600 hover:bg-gray-50" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}>
              {plan.btn}
            </button>

            <div className="mt-8 space-y-4">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "text-blue-200" : "text-blue-500"}`} />
                  <span className={`text-sm ${plan.popular ? "text-white" : "text-gray-600 dark:text-gray-300"}`}>{feature}</span>
                </div>
              ))}
              {plan.missing.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 opacity-50">
                  <X className="w-5 h-5 flex-shrink-0 text-gray-400" />
                  <span className={`text-sm ${plan.popular ? "text-blue-200" : "text-gray-500 dark:text-gray-400"}`}>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
