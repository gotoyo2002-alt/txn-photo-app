import React, { useState } from 'react';
import supabase from '../api/supabase';

interface TradeFormProps {
  onSubmit?: () => void;
}

export const TradeForm: React.FC<TradeFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState({
    symbol: '',
    side: 'buy',
    entry_price: '',
    stop_loss: '',
    take_profit: '',
    screenshot: null as File | null,
  });
  const [riskReward, setRiskReward] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    if (name === 'stop_loss' || name === 'take_profit' || name === 'entry_price') {
      const entry = +(name === 'entry_price' ? value : form.entry_price);
      const stop = +(name === 'stop_loss' ? value : form.stop_loss);
      const take = +(name === 'take_profit' ? value : form.take_profit);
      if (entry && stop && take) {
        setRiskReward(Math.abs((take - entry) / (entry - stop)));
      } else {
        setRiskReward(null);
      }
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, screenshot: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let screenshot_url = null;
      if (form.screenshot) {
        const fileExt = form.screenshot.name.split('.').pop();
        const fileName = `${form.symbol}_${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from('screenshots').upload(fileName, form.screenshot);
        if (uploadError) throw uploadError;
        screenshot_url = supabase.storage.from('screenshots').getPublicUrl(fileName).data.publicUrl;
      }
      // 自動計算 pnl（以 take_profit - entry_price 為例，實際可依需求調整）
      const entry = Number(form.entry_price);
      const exit = form.take_profit ? Number(form.take_profit) : entry;
      const pnl = exit - entry;
      const user_id = 'demo'; // 可改為登入用戶 id
      const { error: insertError } = await supabase.from('trade_records').insert([
        {
          user_id,
          symbol: form.symbol,
          side: form.side,
          entry_price: entry,
          stop_loss: form.stop_loss ? Number(form.stop_loss) : null,
          take_profit: form.take_profit ? Number(form.take_profit) : null,
          exit_price: exit,
          pnl,
          screenshot_url,
          created_at: new Date().toISOString(),
        },
      ]);
      if (insertError) throw insertError;
      setForm({ symbol: '', side: 'buy', entry_price: '', stop_loss: '', take_profit: '', screenshot: null });
      setRiskReward(null);
      if (onSubmit) onSubmit();
    } catch (err: any) {
      setError(err.message || '發生錯誤');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input name="symbol" value={form.symbol} onChange={handleChange} placeholder="標的" className="input focus:ring-2 focus:ring-accent/60 shadow-sm" required autoFocus />
      <select name="side" value={form.side} onChange={handleChange} className="input focus:ring-2 focus:ring-accent/60 shadow-sm">
        <option value="buy">買進</option>
        <option value="sell">賣出</option>
      </select>
      <div className="flex gap-3 flex-wrap">
        <input name="entry_price" value={form.entry_price} onChange={handleChange} placeholder="進場價" className="input focus:ring-2 focus:ring-accent/60 shadow-sm flex-1" type="number" required />
        <input name="stop_loss" value={form.stop_loss} onChange={handleChange} placeholder="停損價" className="input focus:ring-2 focus:ring-accent/60 shadow-sm flex-1" type="number" />
        <input name="take_profit" value={form.take_profit} onChange={handleChange} placeholder="停利價" className="input focus:ring-2 focus:ring-accent/60 shadow-sm flex-1" type="number" />
      </div>
      <input name="screenshot" type="file" accept="image/*" onChange={handleFile} className="input focus:ring-2 focus:ring-accent/60 shadow-sm" />
      <div className="text-accent font-mono text-lg">風險回報比: {riskReward !== null ? riskReward.toFixed(2) : '—'}</div>
      {error && <div className="text-loss font-bold">{error}</div>}
      <button type="submit" className="btn w-full text-lg py-3" disabled={loading}>{loading ? '儲存中...' : '儲存'}</button>
    </form>
  );
};

export default TradeForm;
