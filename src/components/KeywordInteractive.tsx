"use client";

import React, { useState } from "react";
import { Copy, Check, ChevronDown } from "lucide-react";
import { KeywordFAQ } from "@/types/keyword";

interface CopyCodeButtonProps {
  code: string;
}

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
      title="Copy Code"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-300" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Copy Code</span>
        </>
      )}
    </button>
  );
}

interface FaqAccordionProps {
  faqs: KeywordFAQ[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden bg-white/50 dark:bg-white/5 transition-colors"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 dark:text-white hover:text-blue-500 transition-colors gap-4"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-blue-500" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/5">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
