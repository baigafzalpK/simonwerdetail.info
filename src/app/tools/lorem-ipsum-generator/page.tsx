"use client";

import React, { useState } from "react";
import { FileText, Copy, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function LoremIpsumTool() {
  const [paragraphs, setParagraphs] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // Standard Lorem Ipsum text blocks
  const loremBlocks = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.",
    "Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit rutrum. Cras dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    "Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. Nullam sapien sem, ornare ac, nonummy non, lobortis a, enim. Nunc tincidunt ante vitae massa. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Etiam commodo dui eget wisi. Donec iaculis gravida nulla. Donec quis nibh at felis congue commodo. Etiam bibendum elit eget erat.",
    "Praesent in mauris eu tortor porttitor accumsan. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Aenean fermentum risus id tortor. Integer imperdiet lectus quis justo. Integer tempor. Vivamus ac urna vel leo pretium faucibus. Mauris elementum mauris vitae tortor. In dapibus augue non sapien. Aliquam ante. Donec feugiat pellentesque lacus."
  ];

  const generateLorem = () => {
    let result = [];
    for (let i = 0; i < paragraphs; i++) {
      let block = loremBlocks[i % loremBlocks.length];
      if (i === 0 && startWithLorem) {
        block = "Lorem ipsum dolor sit amet, " + block.substring(29);
      }
      result.push(block);
    }
    setOutput(result.join("\n\n"));
    setCopied(false);
  };

  // Generate on mount
  React.useEffect(() => {
    generateLorem();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
          <FileText className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lorem Ipsum Generator</h1>
          <p className="text-gray-500 dark:text-gray-400">Generate placeholder text for your mockups and designs.</p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Paragraphs</label>
            <input
              type="number"
              min="1"
              max="50"
              value={paragraphs}
              onChange={(e) => setParagraphs(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-center h-12">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="w-5 h-5 rounded text-rose-600 focus:ring-rose-500 bg-white/50 dark:bg-black/20 border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Start with "Lorem ipsum"</span>
            </label>
          </div>
          <button
            onClick={generateLorem}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-lg text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:opacity-90 transition-all font-semibold"
          >
            <RefreshCw className="w-5 h-5" /> Generate
          </button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Generated Output</span>
          <button 
            onClick={copyToClipboard}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${copied ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'}`}
          >
            <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy Text'}
          </button>
        </div>
        <div className="p-6 md:p-8 max-h-[600px] overflow-y-auto bg-transparent">
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            {output.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-4 last:mb-0 leading-relaxed text-lg">{paragraph}</p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
