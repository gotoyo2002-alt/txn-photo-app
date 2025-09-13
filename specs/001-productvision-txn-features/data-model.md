# Data Model: TXN 智慧交易日誌

## TradeRecord (交易紀錄)
- id: string (UUID)
- user_id: string
- symbol: string (標的)
- side: enum ('buy'|'sell')
- entry_price: number
- stop_loss: number | null
- take_profit: number | null
- exit_price: number | null
- pnl: number
- screenshot_url: string | null
- created_at: timestamp

## KPI (統計指標)
- total_pnl: number
- win_rate: number
- avg_risk_reward: number

## EquityCurve (權益曲線)
- date: date
- equity: number

---

> 所有資料表皆以 Supabase PostgreSQL 實作，圖片以 Supabase Storage 儲存。