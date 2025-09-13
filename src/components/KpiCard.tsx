import React from 'react';

interface KpiCardProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | null;
  color?: string;
  className?: string;
}

const arrow = {
  up: '▲',
  down: '▼',
};

const KpiCard: React.FC<KpiCardProps> = ({ label, value, trend = null, color = '', className = '' }) => {
  return (
    <div
      className={`bg-primary/80 rounded-xl px-6 py-4 flex flex-col items-center shadow-md min-w-[120px] ${className}`}
    >
      <span className="text-xs text-accent tracking-widest mb-1">{label}</span>
      <span className="font-mono text-2xl font-bold flex items-center gap-1" style={{ color }}>
        {value}
        {trend && (
          <span className={trend === 'up' ? 'text-profit' : 'text-loss'}>{arrow[trend]}</span>
        )}
      </span>
    </div>
  );
};

export default KpiCard;
