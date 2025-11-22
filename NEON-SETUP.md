# Neon 雲端 PostgreSQL 串接與商業部署說明

本文件說明如何將 Wood Store Auction System 專案串接 Neon 雲端 PostgreSQL，並為未來正式商業部署做好準備。

---

## 為什麼選擇 Neon？
- **現代雲端架構**：免安裝、免維護，支援自動擴展，適合從開發到商業正式用。
- **彈性高**：支援分支、備份、權限管理，方便多人協作與資料安全。
- **Prisma 完全支援**：可直接用 Prisma 操作資料庫，開發體驗佳。
- **未來可升級**：免費方案適合開發，商業用可隨時升級，確保效能與安全。

---

## 串接步驟

### 1. 註冊 Neon 並建立資料庫
- 前往 https://neon.tech 註冊帳號。
- 建立新專案，命名（如 wood_store），選擇地區。

### 2. 取得連線字串
- 在 Neon 專案頁面複製 PostgreSQL 連線字串。
- 格式：
  ```
  postgresql://user:password@host:port/dbname
  ```
- 貼到 `.env` 的 `DATABASE_URL` 欄位。

### 3. Prisma 設定
- `prisma/schema.prisma` 設定：
  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  ```
- 執行 migration 建立資料表：
  ```bash
  npx prisma migrate dev
  ```

### 4. 開發與測試
- 使用 Prisma Client 查詢、寫入 Neon 雲端資料庫。
- 可用 `npx prisma studio` 管理資料。

### 5. Vercel 部署
- 在 Vercel 專案設定 Environment Variables，新增 `DATABASE_URL`，填入 Neon 連線字串。
- 部署後，前後端自動連線 Neon 雲端資料庫。

---

## 商業正式部署注意事項
- **升級方案**：商業用建議升級 Neon 付費方案，確保連線數、效能、資料安全。
- **資料安全**：設定資料庫權限、啟用 SSL 加密，保障用戶資料。
- **自動備份**：啟用 Neon 備份功能，避免資料遺失。
- **監控與擴展**：隨業務成長可即時擴展資源，確保服務穩定。

---

## 可行性與未來延伸

Neon 採用標準 PostgreSQL 架構，開發、測試、商業用皆可行，且支援自動擴展、備份、分支管理，適合新創與成長型專案。

未來如遇以下需求，也能彈性延伸：
- 業務規模擴大，可升級 Neon 付費方案，或無痛遷移至 AWS RDS、Google Cloud SQL、Azure Database 等企業級雲端服務。
- 只需匯出資料、調整連線字串即可，程式碼與 Prisma Client 幾乎不需更動。
- 若有特殊合規、地區法規、專屬網路需求，可選用自建 PostgreSQL 叢集或專業託管服務。

Neon 讓你專案初期快速上手，未來可隨業務成長彈性升級或遷移，確保長期穩定發展。

如需進一步教學或自動化腳本，請參考官方文件或聯絡技術支援。
