import React from "react";
import Link from "next/link";
import { Smartphone, Globe, Mail, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-md pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center">
                <Smartphone className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight">SIM Utility Hub</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              Premium, enterprise-grade telecom utilities and tools powered by AI. Secure, fast, and reliable.
            </p>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-blue-500 transition-colors"><Mail className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><MessageSquare className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Globe className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Telecom Guides (200)</h3>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/keywords" className="hover:text-blue-500 transition-colors font-medium text-blue-600 dark:text-blue-400">All 200+ Guides Directory</Link></li>
              <li><Link href="/keywords/sim-owner-details-online-check" className="hover:text-blue-500 transition-colors">SIM Owner Details Check</Link></li>
              <li><Link href="/keywords/all-network-balance-check-code" className="hover:text-blue-500 transition-colors">All Balance Check Codes</Link></li>
              <li><Link href="/keywords/pta-mobile-device-verification-online-dirbs" className="hover:text-blue-500 transition-colors">PTA DIRBS Device Check</Link></li>
              <li><Link href="/keywords/best-4g-apn-internet-settings-for-jazz" className="hover:text-blue-500 transition-colors">4G APN High-Speed Settings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Utilities</h3>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/tools/sim-format-validator" className="hover:text-blue-500 transition-colors">SIM Validator</Link></li>
              <li><Link href="/tools/ip-lookup" className="hover:text-blue-500 transition-colors">IP Geolocation</Link></li>
              <li><Link href="/tools/qr-generator" className="hover:text-blue-500 transition-colors">QR Code Generator</Link></li>
              <li><Link href="/tools/password-generator" className="hover:text-blue-500 transition-colors">Password Security</Link></li>
              <li><Link href="/tools" className="hover:text-blue-500 transition-colors">View All Developer Tools</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company & Legal</h3>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/faq" className="hover:text-blue-500 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/contact" className="hover:text-blue-500 transition-colors">Contact Support</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-500 transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} SIM Utility Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Status:</span>
            <span className="flex items-center gap-1 text-green-500"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
