# Tasks: TXN 智慧交易日誌

**Input**: Design documents from `/specs/001-productvision-txn-features/`
**Prerequisites**: plan.md (required), research.md, data-model.md, quickstart.md

## Execution Flow (main)
```
1. Load plan.md from feature directory
2. Load optional design documents: data-model.md, research.md, quickstart.md
3. Generate tasks by category: Setup, Tests, Core, Integration, Polish
4. Apply task rules: [P] for parallel, sequential otherwise, TDD enforced
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness
9. Return: SUCCESS (tasks ready for execution)
```

## Phase 3.1: Setup
- [ ] T001 建立專案目錄結構（/src, /contracts, /supabase, /public, /tests, /docs）
- [ ] T002 初始化 Node.js + React + TailwindCSS 專案於 /src，安裝所有依賴（React, TailwindCSS, Supabase JS, Netlify CLI 等）
- [ ] T003 [P] 設定 lint/format 工具（ESLint, Prettier）於 /src
- [ ] T004 [P] 初始化 Supabase 專案與本地 PostgreSQL DB 結構於 /supabase
- [ ] T005 [P] 設定 Netlify 部署與 CI/CD 腳本

## Phase 3.2: Tests First (TDD)
- [ ] T006 [P] 為 TradeRecord 實體撰寫單元測試於 /tests/unit/trade-record.test.ts
- [ ] T007 [P] 為 KPI 與 EquityCurve 統計撰寫單元測試於 /tests/unit/kpi-equity.test.ts
- [ ] T008 [P] 撰寫 E2E 測試腳本，驗證新增/編輯交易、圖片上傳、查詢、KPI 顯示於 /tests/e2e/txn-flow.test.ts
- [ ] T009 [P] 撰寫整合測試，驗證 Supabase API 與前端互動於 /tests/integration/supabase-integration.test.ts

## Phase 3.3: Core Implementation
- [ ] T010 [P] 實作 TradeRecord 資料表 schema 於 /supabase/migrations
- [ ] T011 [P] 實作 KPI 與 EquityCurve 統計查詢 SQL 於 /supabase/functions
- [ ] T012 [P] 實作 React 交易表單元件（含風險回報比即時計算、圖片拖放上傳）於 /src/components/TradeForm.tsx
- [ ] T013 [P] 實作交易歷史查詢頁（含篩選器、損益顏色標示、分頁/虛擬捲動）於 /src/pages/TradeHistory.tsx
- [ ] T014 [P] 實作儀表板（KPI 卡片、權益曲線圖）於 /src/pages/Dashboard.tsx
- [ ] T015 [P] 實作 Supabase API 介接與認證於 /src/api/supabase.ts
- [ ] T016 [P] 實作圖片上傳與預覽功能於 /src/components/ImageUpload.tsx

## Phase 3.4: Integration
- [ ] T017 [P] 整合前端與 Supabase API，串接所有資料流於 /src/api/
- [ ] T018 [P] 實作前端/後端結構化 log 與錯誤回報於 /src/utils/logging.ts
- [ ] T019 [P] 設定環境變數與部署自動化於 Netlify/CI

## Phase 3.5: Polish
- [ ] T020 [P] 撰寫文件（README, quickstart, API 合約）於 /docs
- [ ] T021 [P] 前端/後端效能優化與壓力測試於 /tests/perf
- [ ] T022 [P] 補齊所有單元測試與覆蓋率報告於 /tests/unit

---

## Parallel Execution Examples
- T003, T004, T005 可同時進行（Setup）
- T006, T007, T008, T009 可同時進行（Tests）
- T010~T016 多數可平行，惟資料流/依賴需注意

---

> 每項任務皆標註明確路徑與依賴，TDD 流程嚴格執行，適合 LLM 代理人自動化執行。