# Phase 0 Research: TXN 智慧交易日誌

## 目標
- 釐清所有 [NEEDS CLARIFICATION] 標記之需求細節
- 盤點 Supabase、React、TailwindCSS、Netlify 在本專案的最佳實踐
- 研究大規模交易紀錄查詢與圖片上傳效能方案

## 需釐清事項
1. 圖片上傳支援格式？（建議：jpg, png, webp, gif）
2. 交易歷史分頁策略？（建議：cursor-based 分頁或虛擬捲動）
3. 停損/停利未輸入時，風險回報比顯示預設值或提示？
4. 非圖片格式上傳時，前端/後端錯誤提示策略？

## 技術研究
- Supabase Storage 圖片上傳限制與安全性
- Supabase 資料表設計與查詢效能（索引、分頁）
- React 拖放上傳與即時預覽最佳實踐
- TailwindCSS KPI 卡片與動態顏色標示
- 權益曲線圖表元件選型（如 Recharts, Chart.js）
- Netlify CI/CD 與 Supabase 整合流程

## 參考資源
- Supabase 官方文件
- React DnD、React Dropzone
- TailwindCSS 色彩系統
- Netlify 部署與自動化

---

> 本研究將作為後續資料模型、合約、快速啟動文件設計依據。