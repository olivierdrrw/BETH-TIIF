"use client";

import * as React from "react";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative bg-[#050505] pt-20 pb-10 overflow-hidden border-t border-white/10">
      
      {/* Premium Gradient Top Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-navy-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          
          {/* Brand Column */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-navy-600 to-navy-600 flex items-center justify-center">
                <BrainCircuit className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">TIIF</h3>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              The Human Development & Wellbeing Operating System. 
              Built to help you understand yourself, heal, and grow.
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:w-2/3">
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="#" className="hover:text-navy-400 transition-colors">Human Twin™</Link></li>
                <li><Link href="#" className="hover:text-navy-400 transition-colors">AI Companion</Link></li>
                <li><Link href="#" className="hover:text-navy-400 transition-colors">Growth Score™</Link></li>
                <li><Link href="#" className="hover:text-navy-400 transition-colors">Ecosystem</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Solutions</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="#" className="hover:text-navy-400 transition-colors">Individuals</Link></li>
                <li><Link href="#" className="hover:text-navy-400 transition-colors">Schools & Universities</Link></li>
                <li><Link href="#" className="hover:text-navy-400 transition-colors">Therapists</Link></li>
                <li><Link href="#" className="hover:text-navy-400 transition-colors">NGOs & Government</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-semibold text-white mb-4">Organization</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="#" className="hover:text-white transition-colors">Beth Wellness Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Our Mission</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy & Security</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Beth Wellness Center. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-600">
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}