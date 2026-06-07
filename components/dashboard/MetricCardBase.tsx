import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  description?: string;
}

export const MetricCardBase: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
  description,
}) => {
  return (
    <div className="bg-[#111111] border border-[#222222] p-6 rounded-xl hover:border-[#333333] transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-[#1a1a1a] rounded-lg text-[#888888] group-hover:text-[#C6FF4A] transition-colors">
          {icon}
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              trend === 'up'
                ? 'bg-[#C6FF4A15] text-[#C6FF4A]'
                : trend === 'down'
                ? 'bg-red-500/10 text-red-500'
                : 'bg-white/5 text-white/60'
            }`}
          >
            {trend === 'up' && <TrendingUp size={12} />}
            {trend === 'down' && <TrendingDown size={12} />}
            {change}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-[#888888] mb-1">{title}</h3>
        <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
        {description && <p className="text-xs text-[#444444] mt-2">{description}</p>}
      </div>
    </div>
  );
};
