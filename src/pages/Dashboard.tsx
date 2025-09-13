import React, { useEffect, useState } from 'react';
import supabase from '../api/supabase';

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

const Dashboard: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrades = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.from('trade_records').select('*').order('created_at', { ascending: true });
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

  // KPI 計算
  const total_pnl = trades.reduce((sum, t) => sum + (t.pnl ?? 0), 0);
  const win_count = trades.filter((t) => (t.pnl ?? 0) > 0).length;
  const win_rate = trades.length ? win_count / trades.length : 0;
  const avg_risk_reward = trades.length
    ? trades.reduce((sum, t) => sum + ((t.take_profit && t.stop_loss && t.entry_price) ? Math.abs((t.take_profit - t.entry_price) / (t.entry_price - t.stop_loss)) : 0), 0) / trades.length
    : 0;
  // 權益曲線
  let equity = 10000;
  const equityCurve = trades.map((t) => {
    equity += t.pnl ?? 0;
    return { date: t.created_at.slice(0, 10), equity };
  });

  return (
    <div>
      <h2>儀表板</h2>
      {error && <div className="text-red-600">{error}</div>}
      {loading ? (
        <div>載入中...</div>
      ) : (
        <>
          <div className="flex gap-4 mb-4">
            <div className="kpi-card">總損益: {total_pnl}</div>
            <div className="kpi-card">勝率: {(win_rate * 100).toFixed(1)}%</div>
            <div className="kpi-card">平均風險回報比: {avg_risk_reward.toFixed(2)}</div>
          </div>
          <div className="equity-curve">
            <h3>權益曲線</h3>
            <svg width="300" height="100">
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                points={equityCurve.map((p, i) => `${i * 50},${100 - (p.equity - 10000) / 2}`).join(' ')}
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
