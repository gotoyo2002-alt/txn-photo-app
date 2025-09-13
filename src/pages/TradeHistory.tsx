
import React, { useEffect, useState } from 'react';
import supabase from '../api/supabase';
import TradeFilterBar from '../components/TradeFilterBar';

interface Trade {
  id: string;
  symbol: string;
  side: string;
  entry_price: number;
  stop_loss?: number;
  take_profit?: number;
  exit_price?: number;
  pnl?: number;
  screenshot_url?: string;
  created_at: string;
}

const TradeHistory: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [symbol, setSymbol] = useState('');
  const [side, setSide] = useState('');

  useEffect(() => {
    const fetchTrades = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.from('trade_records').select('*').order('created_at', { ascending: false });
        if (error) setError(error.message);
        else setTrades(data || []);
      } catch (err: any) {
        setError(err.message || '資料讀取失敗');
      } finally {
        setLoading(false);
      }
    };
    fetchTrades();
  }, []);

  // 篩選
  const filtered = trades.filter(t =>
    (!symbol || t.symbol.toLowerCase().includes(symbol.toLowerCase())) &&
    (!side || t.side === side)
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-2">
      <h2 className="text-2xl font-bold mb-6 tracking-tight text-accent">交易歷史</h2>
      <TradeFilterBar symbol={symbol} side={side} onSymbolChange={setSymbol} onSideChange={setSide} />
      {error && <div className="text-loss font-bold mb-2">{error}</div>}
      {loading ? (
        <div className="text-lg text-gray-300">載入中...</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-400">尚無交易紀錄</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm rounded-xl overflow-hidden shadow-md bg-primary/70">
            <thead>
              <tr className="text-accent border-b border-accent/30">
                <th className="px-2 py-1 font-mono">日期</th>
                <th className="px-2 py-1">標的</th>
                <th className="px-2 py-1">方向</th>
                <th className="px-2 py-1">進場</th>
                <th className="px-2 py-1">停損</th>
                <th className="px-2 py-1">停利</th>
                <th className="px-2 py-1">出場</th>
                <th className="px-2 py-1">損益</th>
                <th className="px-2 py-1">截圖</th>
                <th className="px-2 py-1">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-b border-accent/10 hover:bg-accent/10">
                  <td className="px-2 py-1 font-mono text-xs text-gray-400">{row.created_at?.slice(0, 10)}</td>
                  <td className="px-2 py-1 font-bold">{row.symbol}</td>
                  <td className={`px-2 py-1 font-mono ${row.side === 'long' ? 'text-profit' : 'text-loss'}`}>{row.side === 'long' ? '多' : '空'}</td>
                  <td className="px-2 py-1 font-mono">{row.entry_price}</td>
                  <td className="px-2 py-1 font-mono">{row.stop_loss ?? '-'}</td>
                  <td className="px-2 py-1 font-mono">{row.take_profit ?? '-'}</td>
                  <td className="px-2 py-1 font-mono">{row.exit_price ?? '-'}</td>
                  <td className={`px-2 py-1 font-mono font-bold ${row.pnl && row.pnl > 0 ? 'text-profit' : row.pnl && row.pnl < 0 ? 'text-loss' : ''}`}>{row.pnl?.toFixed(0) ?? '-'}</td>
                  <td className="px-2 py-1">
                    {row.screenshot_url ? <a href={row.screenshot_url} target="_blank" rel="noopener noreferrer" className="underline text-accent">查看</a> : '-'}
                  </td>
                  <td className="px-2 py-1 flex gap-1">
                    <button className="px-2 py-1 rounded bg-accent/80 text-primary font-bold hover:bg-accent transition text-xs">編輯</button>
                    <button className="px-2 py-1 rounded bg-loss/80 text-white font-bold hover:bg-loss transition text-xs">刪除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TradeHistory;
