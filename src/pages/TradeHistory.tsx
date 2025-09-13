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

const TradeHistory: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div>
      <h2>交易歷史</h2>
      <div className="mb-2">
        <input placeholder="搜尋標的..." className="input" />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {loading ? (
        <div>載入中...</div>
      ) : trades.length === 0 ? (
        <div>尚無交易紀錄</div>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>日期</th>
              <th>標的</th>
              <th>方向</th>
              <th>進場</th>
              <th>停損</th>
              <th>停利</th>
              <th>截圖</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((row) => (
              <tr key={row.id}>
                <td>{row.created_at?.slice(0, 10)}</td>
                <td>{row.symbol}</td>
                <td>{row.side}</td>
                <td>{row.entry_price}</td>
                <td>{row.stop_loss ?? '-'}</td>
                <td>{row.take_profit ?? '-'}</td>
                <td>{row.screenshot_url ? <a href={row.screenshot_url} target="_blank" rel="noopener noreferrer">查看</a> : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TradeHistory;
