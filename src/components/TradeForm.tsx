import React, { useState } from 'react';

interface TradeFormProps {
  onSubmit: (data: any) => void;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="symbol" value={form.symbol} onChange={handleChange} placeholder="標的" className="input" />
      <select name="side" value={form.side} onChange={handleChange} className="input">
        <option value="buy">買進</option>
        <option value="sell">賣出</option>
      </select>
      <input name="entry_price" value={form.entry_price} onChange={handleChange} placeholder="進場價" className="input" type="number" />
      <input name="stop_loss" value={form.stop_loss} onChange={handleChange} placeholder="停損價" className="input" type="number" />
      <input name="take_profit" value={form.take_profit} onChange={handleChange} placeholder="停利價" className="input" type="number" />
      <input name="screenshot" type="file" accept="image/*" onChange={handleFile} className="input" />
      <div>風險回報比: {riskReward !== null ? riskReward.toFixed(2) : '—'}</div>
      <button type="submit" className="btn">儲存</button>
    </form>
  );
};

export default TradeForm;
