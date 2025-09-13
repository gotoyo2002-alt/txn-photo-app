# Quickstart: TXN 智慧交易日誌

## 前置需求
- Node.js 18+
- Netlify CLI
- Supabase CLI
- Git

## 專案初始化
1. `git clone <repo-url>`
2. `cd my-photo-app`
3. `npm install`
4. `netlify login`
5. `supabase login`
6. `supabase init`

## 本地開發
1. 啟動 Supabase 本地服務：
   `supabase start`
2. 啟動前端：
   `npm run dev`
3. 設定 .env 連接 Supabase

## 部署
1. `netlify deploy --prod`
2. 設定 Netlify 環境變數（Supabase 連線資訊）

## 測試
- 單元測試：`npm run test`
- E2E 測試：`npx playwright test`

---

> 詳細合約與資料結構請見 /contracts 與 data-model.md。