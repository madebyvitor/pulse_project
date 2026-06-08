import React from 'react';
import { Circle, CheckCircle2, Clock, GitCommit, FileText, Layout, Rocket } from 'lucide-react';

export type TimelineEventIcon = 'commit' | 'upload' | 'design' | 'deploy' | 'milestone' | 'pending';

interface TimelineItemProps {
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'current' | 'pending';
  type?: TimelineEventIcon;
  isLast?: boolean;
}

const getIcon = (type?: TimelineEventIcon, status?: string) => {
  if (status === 'completed') return <CheckCircle2 size={16} className="text-[#C6FF4A]" />;
  switch (type) {
    case 'commit':
      return <GitCommit size={16} />;
    case 'upload':
      return <FileText size={16} />;
    case 'design':
      return <Layout size={16} />;
    case 'deploy':
      return <Rocket size={16} />;
    case 'milestone':
      return <Circle size={16} />;
    default:
      return <Clock size={16} />;
  }
};

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  description,
  timestamp,
  status,
  type,
  isLast = false
}) => {
  const isActive = status === 'current';
  const isCompleted = status === 'completed';

  return (
    <div className="flex gap-4 group">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${isCompleted ? 'bg-[#C6FF4A]/10 border-[#C6FF4A] text-[#C6FF4A]' : isActive ? 'bg-white/5 border-white text-white' : 'bg-transparent border-[#222222] text-[#444444]'}`}>
          {getIcon(type, status)}
        </div>
        {!isLast && <div className={`w-[1px] flex-grow my-1 transition-colors duration-300 ${isCompleted ? 'bg-[#C6FF4A]' : 'bg-[#222222]'}`} />}
      </div>

      <div className={`pb-8 flex flex-col ${isLast ? 'pb-0' : ''}`}>
        <div className="flex items-center gap-2 mb-1">
          <h4 className={`text-sm font-semibold tracking-tight ${isActive || isCompleted ? 'text-white' : 'text-[#888888]'}`}>
            {title}
          </h4>
          <span className="text-[10px] font-medium text-[#444444] uppercase tracking-wider">
            {timestamp}
          </span>
        </div>
        <p className="text-sm text-[#888888] leading-relaxed max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
};
