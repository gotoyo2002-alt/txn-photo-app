import React from 'react';

interface TradeFilterBarProps {
  symbol: string;
  side: string;
  onSymbolChange: (v: string) => void;
  onSideChange: (v: string) => void;
}

const TradeFilterBar: React.FC<TradeFilterBarProps> = ({ symbol, side, onSymbolChange, onSideChange }) => {
  return (
    <div className="flex gap-2 mb-4 items-center">
      <input
        className="px-3 py-2 rounded bg-primary/60 border border-accent/30 text-white placeholder:text-gray-400 font-mono"
        placeholder="搜尋標的..."
        value={symbol}
        onChange={e => onSymbolChange(e.target.value)}
      />
      <select
        className="px-3 py-2 rounded bg-primary/60 border border-accent/30 text-white font-mono"
        value={side}
        onChange={e => onSideChange(e.target.value)}
      >
        <option value="">全部方向</option>
        <option value="long">多</option>
        <option value="short">空</option>
      </select>
    </div>
  );
};

export default TradeFilterBar;
