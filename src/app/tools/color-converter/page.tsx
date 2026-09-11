"use client";

import React, { useState } from "react";
import { Palette, Copy } from "lucide-react";
import { motion } from "framer-motion";

export default function ColorConverterTool() {
  const [color, setColor] = useState("#3B82F6");

  const hexToRgb = (hex: string) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return isNaN(r) ? null : { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, Math.min(m, y));
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    return { 
      c: Math.round(c * 100), 
      m: Math.round(m * 100), 
      y: Math.round(y * 100), 
      k: Math.round(k * 100) 
    };
  };

  const rgb = hexToRgb(color);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  const cmyk = rgb ? rgbToCmyk(rgb.r, rgb.g, rgb.b) : null;

  const formats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "Invalid" },
    { label: "HSL", value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "Invalid" },
    { label: "CMYK", value: cmyk ? `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` : "Invalid" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
          <Palette className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Color Converter</h1>
          <p className="text-gray-500 dark:text-gray-400">Convert HEX to RGB, HSL, and CMYK.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 md:p-8 flex flex-col justify-center items-center h-[400px]">
          <div 
            className="w-full h-full rounded-2xl shadow-inner transition-colors duration-200 ease-in-out border border-black/10 dark:border-white/10"
            style={{ backgroundColor: color }}
          ></div>
          <div className="w-full mt-6 flex justify-between items-center bg-white/50 dark:bg-black/20 p-4 rounded-xl border border-gray-200 dark:border-white/10">
            <span className="font-mono font-medium text-gray-700 dark:text-gray-300">Pick a color</span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-12 p-0 border-0 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4">
          {formats.map((fmt, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-4 flex justify-between items-center group"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">{fmt.label}</p>
                <p className="font-mono text-lg text-gray-900 dark:text-white">{fmt.value}</p>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(fmt.value)}
                className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-indigo-500 transition-all bg-white dark:bg-white/10 rounded-lg shadow-sm"
              >
                <Copy className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
