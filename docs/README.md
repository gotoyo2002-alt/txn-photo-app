# TXN 智慧交易日誌

本專案為一套以 React + TailwindCSS + Supabase 為核心的線上交易日誌，支援雲端部署於 Netlify。

## 主要功能
- 新增/編輯交易（含風險回報比即時計算、圖片拖放上傳）
- 交易歷史查詢（含篩選器、損益顏色標示）
- 儀表板（KPI 卡片、權益曲線圖）

## 快速啟動
詳見 `../specs/001-productvision-txn-features/quickstart.md`

## API 合約
- 交易資料表：`supabase/migrations/01_create_trade_record.sql`
- KPI/權益查詢：`supabase/functions/kpi_equity.sql`

## 測試
- 單元測試：`npm run test`（Vitest）
- E2E 測試：`npx playwright test`

## 部署
- Netlify 連接 GitHub 倉庫自動部署
- 環境變數：`.env.local` 需設置 Supabase 連線資訊
