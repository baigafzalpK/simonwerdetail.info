"use client";

import React, { useState } from "react";
import { FileCode2, Eye, Edit3 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function MarkdownPreviewerTool() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Previewer!

This is a real-time Markdown rendering tool. You can write your **Markdown** on the left, and it will magically appear formatted on the right.

## Features Supported
- **Bold**, *Italics*, and ~~Strikethrough~~
- Lists (Ordered and Unordered)
- [Links](https://simutility.com)
- Blockquotes
- Code blocks

\`\`\`javascript
function greet() {
  console.log("Hello, World!");
}
\`\`\`

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

### Tables
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 flex items-center justify-center">
          <FileCode2 className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Markdown Previewer</h1>
          <p className="text-gray-500 dark:text-gray-400">Write Markdown and preview it rendered as HTML in real-time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[700px]">
        {/* Editor */}
        <div className="glass-card flex flex-col overflow-hidden">
          <div className="p-3 border-b border-gray-200 dark:border-white/10 flex items-center gap-2 bg-gray-50/50 dark:bg-white/5">
            <Edit3 className="w-4 h-4 text-gray-500" />
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Editor</span>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-1 w-full p-6 bg-transparent resize-none outline-none font-mono text-sm text-gray-800 dark:text-gray-200 leading-relaxed"
            spellCheck="false"
          />
        </div>

        {/* Preview */}
        <div className="glass-card flex flex-col overflow-hidden bg-white/80 dark:bg-black/50">
          <div className="p-3 border-b border-gray-200 dark:border-white/10 flex items-center gap-2 bg-gray-50/50 dark:bg-white/5">
            <Eye className="w-4 h-4 text-gray-500" />
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Preview</span>
          </div>
          <div className="flex-1 w-full p-8 overflow-auto">
            <div className="prose dark:prose-invert prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-500 hover:prose-a:text-blue-600 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:text-gray-800 dark:prose-pre:text-gray-200">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
