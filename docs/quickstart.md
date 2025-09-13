# 快速啟動

1. 下載專案並安裝依賴：
   ```sh
   git clone https://github.com/gotoyo2002-alt/txn-photo-app.git
   cd txn-photo-app/src
   npm install
   ```
2. 設定 Supabase 連線資訊於 `/src/.env.local`
3. 啟動本地開發伺服器：
   ```sh
   npm run dev
   ```
4. 執行測試：
   ```sh
   npm run test
   npx playwright test
   ```
5. 部署：
   - 連接 GitHub 倉庫至 Netlify，並設定環境變數
