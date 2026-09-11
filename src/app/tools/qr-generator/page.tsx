"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Download, Settings, Copy } from "lucide-react";

export default function QrGeneratorTool() {
  const [text, setText] = useState("https://simutility.com");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(4);

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
          <QrCode className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">QR Code Generator</h1>
          <p className="text-gray-500 dark:text-gray-400">Create customizable QR codes instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content (URL, Text, etc.)</label>
              <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white resize-none"
                placeholder="Enter text or URL here..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Foreground Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="font-mono text-sm text-gray-500">{fgColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Background Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="font-mono text-sm text-gray-500">{bgColor}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                <span>Size (px)</span>
                <span className="text-blue-500 font-mono">{size}</span>
              </label>
              <input
                type="range"
                min="128"
                max="512"
                step="8"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                <span>Margin</span>
                <span className="text-blue-500 font-mono">{margin}</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={margin}
                onChange={(e) => setMargin(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 md:p-8 flex flex-col items-center justify-center">
          <div className="bg-white p-4 rounded-2xl shadow-xl shadow-black/5 dark:shadow-white/5 mb-8">
            <QRCodeSVG
              id="qr-code-svg"
              value={text || " "}
              size={size}
              bgColor={bgColor}
              fgColor={fgColor}
              level={"L"}
              marginSize={margin}
              includeMargin={true}
            />
          </div>
          
          <button
            onClick={downloadQR}
            className="w-full max-w-xs flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/25 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 hover:-translate-y-0.5 transition-all"
          >
            <Download className="w-5 h-5" /> Download SVG
          </button>
        </div>
      </div>
    </div>
  );
}
