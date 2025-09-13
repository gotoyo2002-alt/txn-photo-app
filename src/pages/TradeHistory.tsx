
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
      <h2 className="text-3xl font-extrabold mb-8 tracking-tight text-accent drop-shadow-lg">交易歷史</h2>
      <TradeFilterBar symbol={symbol} side={side} onSymbolChange={setSymbol} onSideChange={setSide} />
      {error && <div className="text-loss font-bold mb-2">{error}</div>}
      {loading ? (
        <div className="text-lg text-gray-300 animate-pulse">載入中...</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-400">尚無交易紀錄</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-base rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary/80 via-primary/60 to-accent/10 border border-accent/10 animate-fade-in">
            <thead>
              <tr className="text-accent border-b border-accent/30">
                <th className="px-3 py-2 font-mono">日期</th>
                <th className="px-3 py-2">標的</th>
                <th className="px-3 py-2">方向</th>
                <th className="px-3 py-2">進場</th>
                <th className="px-3 py-2">停損</th>
                <th className="px-3 py-2">停利</th>
                <th className="px-3 py-2">出場</th>
                <th className="px-3 py-2">損益</th>
                <th className="px-3 py-2">截圖</th>
                <th className="px-3 py-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-b border-accent/10 hover:bg-accent/20 transition-colors duration-150">
                  <td className="px-3 py-2 font-mono text-xs text-gray-400">{row.created_at?.slice(0, 10)}</td>
                  <td className="px-3 py-2 font-bold">{row.symbol}</td>
                  <td className={`px-3 py-2 font-mono ${row.side === 'long' ? 'text-profit' : 'text-loss'}`}>{row.side === 'long' ? '多' : '空'}</td>
                  <td className="px-3 py-2 font-mono">{row.entry_price}</td>
                  <td className="px-3 py-2 font-mono">{row.stop_loss ?? '-'}</td>
                  <td className="px-3 py-2 font-mono">{row.take_profit ?? '-'}</td>
                  <td className="px-3 py-2 font-mono">{row.exit_price ?? '-'}</td>
                  <td className={`px-3 py-2 font-mono font-bold ${row.pnl && row.pnl > 0 ? 'text-profit' : row.pnl && row.pnl < 0 ? 'text-loss' : ''}`}>{row.pnl?.toFixed(0) ?? '-'}</td>
                  <td className="px-3 py-2">
                    {row.screenshot_url ? <a href={row.screenshot_url} target="_blank" rel="noopener noreferrer" className="underline text-accent">查看</a> : '-'}
                  </td>
                  <td className="px-3 py-2 flex gap-1">
                    <button className="px-2 py-1 rounded bg-accent/80 text-primary font-bold hover:bg-accent transition text-xs shadow">編輯</button>
                    <button className="px-2 py-1 rounded bg-loss/80 text-white font-bold hover:bg-loss transition text-xs shadow">刪除</button>
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
