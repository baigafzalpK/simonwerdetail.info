"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is SIM Utility Hub?",
      answer: "SIM Utility Hub is an enterprise-grade platform offering over 70 AI-powered tools for telecom professionals, developers, and everyday users. It includes validators, formatters, generators, and security utilities."
    },
    {
      question: "Are my tool executions secure?",
      answer: "Yes. Many of our tools (like the Password Generator) run entirely locally in your browser and do not send data to any server. For tools that require server-side execution (like IP lookups), we do not log or store the queries, adhering strictly to our Privacy Policy."
    },
    {
      question: "Do you offer an API for developers?",
      answer: "Absolutely! Our Pro and Enterprise plans include RESTful API access to all 70+ utilities, allowing you to integrate our powerful formatting, validation, and telecom tools directly into your own applications."
    },
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer: "Yes, you can change your subscription plan at any time from your User Dashboard. Changes take effect immediately, and billing is prorated."
    },
    {
      question: "What kind of support is included?",
      answer: "Basic users get access to our community forum. Pro users receive priority email support with a 24-hour response time. Enterprise users get 24/7 dedicated phone support and a dedicated account manager."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Everything you need to know about the product and billing.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className="glass-card rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
            >
              <span className="font-semibold text-lg text-gray-900 dark:text-white">{faq.question}</span>
              <ChevronDown 
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === idx ? "transform rotate-180" : ""}`} 
              />
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
