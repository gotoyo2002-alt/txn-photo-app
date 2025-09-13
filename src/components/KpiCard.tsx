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
      className={`rounded-2xl px-8 py-6 flex flex-col items-center shadow-2xl min-w-[140px] bg-gradient-to-br from-accent/20 to-primary/90 border border-accent/10 hover:scale-105 hover:shadow-accent/40 transition-transform duration-200 ${className}`}
      style={{ boxShadow: '0 4px 24px 0 #FBBF2430' }}
    >
      <span className="text-xs text-accent tracking-widest mb-2 font-bold drop-shadow">{label}</span>
      <span className="font-mono text-3xl font-extrabold flex items-center gap-2 drop-shadow-lg" style={{ color }}>
        {value}
        {trend && (
          <span className={trend === 'up' ? 'text-profit' : 'text-loss'} style={{ fontSize: 18 }}>{arrow[trend]}</span>
        )}
      </span>
    </div>
  );
};

export default KpiCard;
