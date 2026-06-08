/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import { Globe, ExternalLink } from 'lucide-react';

interface WhiteLabelHeaderProps {
  logoUrl?: string;
  agencyName: string;
  clientName?: string;
  onBackToWebsite?: () => void;
}

export const WhiteLabelHeader: React.FC<WhiteLabelHeaderProps> = ({
  logoUrl,
  agencyName,
  clientName,
  onBackToWebsite
}) => {
  return (
    <header className="w-full h-16 bg-[#050505] border-b border-[#222222] px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {logoUrl ? (
          <img src={logoUrl} alt={agencyName} className="h-8 w-auto object-contain" />
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded flex items-center justify-center font-bold text-black text-xs">
              {agencyName.charAt(0)}
            </div>
            <span className="font-semibold text-white tracking-tight">{agencyName}</span>
          </div>
        )}
        <div className="h-4 w-[1px] bg-[#222222] mx-2" />
        {clientName && <span className="text-sm text-[#888888] font-medium">Portal do Cliente</span>}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={onBackToWebsite} className="flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors font-medium px-3 py-2 rounded-md hover:bg-[#111111]">
          <Globe size={16} />
          <span>Visitar Site</span>
          <ExternalLink size={14} className="opacity-50" />
        </button>
        
        <div className="w-8 h-8 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center overflow-hidden">
          {/* User Placeholder */}
          <div className="w-full h-full flex items-center justify-center text-[10px] text-[#888888] font-bold">
            {clientName?.charAt(0) || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
};
