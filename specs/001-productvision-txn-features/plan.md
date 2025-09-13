# Implementation Plan: TXN 智慧交易日誌

**Branch**: `001-productvision-txn-features` | **Date**: 2025-09-13 | **Spec**: D:/my-photo-app/specs/001-productvision-txn-features/spec.md
**Input**: Feature specification from `/specs/001-productvision-txn-features/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
TXN 是一套以 React + TailwindCSS 為前端、Supabase 為後端服務（含 PostgreSQL、認證、API、檔案儲存）、Netlify 部署、GitHub 版本控管的智慧交易日誌。核心功能包括交易新增/編輯（含風險回報比即時計算、截圖上傳）、交易歷史查詢（含損益顏色標示）、儀表板（KPI 卡片與權益曲線圖）。

## Technical Context
**Language/Version**: JavaScript/TypeScript (React 18+), SQL (PostgreSQL), Shell (CI/CD)
**Primary Dependencies**: React, TailwindCSS, Supabase JS SDK, Netlify CLI, GitHub Actions
**Storage**: Supabase PostgreSQL、Supabase Storage（截圖）
**Testing**: Jest, React Testing Library, Supabase test DB, E2E: Playwright
**Target Platform**: Web (現代瀏覽器)、Netlify
**Project Type**: web (frontend + backend即服務)
**Performance Goals**: 首頁載入 < 2s，交易查詢 < 500ms，KPI/圖表即時更新
**Constraints**: 僅支援圖片格式上傳（[NEEDS CLARIFICATION: 支援格式]），大量資料需分頁/虛擬捲動（[NEEDS CLARIFICATION: 分頁策略]）
**Scale/Scope**: 10k+ 交易紀錄、單一用戶 100MB 圖片儲存

## Constitution Check
**Simplicity**:
- Projects: 2（web 前端、supabase 後端即服務）
- 使用框架直接（React, Supabase SDK），無自訂封裝層
- 單一資料模型（TradeRecord），KPI 與曲線為衍生資料
- 無複雜設計模式

**Architecture**:
- 每個功能模組皆可獨立（React component/library）
- 主要 library: UI（KPI、圖表）、API（Supabase contract）
- CLI: Netlify CLI、Supabase CLI
- 文件：README、llms.txt、quickstart.md

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor 流程
- 測試先於實作
- 測試順序：Contract→Integration→E2E→Unit
- 實際依賴（Supabase 測試 DB）
- 新增/異動合約皆有整合測試
- 禁止先寫實作、跳過 RED 階段

**Observability**:
- 結構化前端/後端 log
- 前端錯誤可回報至後端
- log 內容含錯誤上下文

**Versioning**:
- 版本號 MAJOR.MINOR.BUILD
- 每次變更遞增 BUILD
- 破壞性變更需平行測試與遷移計畫

## Project Structure
- /src (React 前端)
- /contracts (API/資料結構定義)
- /supabase (DB schema, policy, function)
- /public (靜態資源)
- /tests (單元、整合、E2E)
- /docs (說明文件)

---

## Progress Tracking
- [x] Initial Constitution Check
- [ ] Phase 0: research.md
- [ ] Phase 1: data-model.md, contracts/, quickstart.md
- [ ] Post-Design Constitution Check
- [ ] Phase 2: tasks.md 計畫描述

---

## Phase 0: Research
(將於 research.md 產出)

## Phase 1: Data Model, Contracts, Quickstart
(將於 data-model.md、contracts/、quickstart.md 產出)

## Phase 2: Tasks 計畫
(僅描述，不產生 tasks.md)

---
