# Wood Store Auction System

## 專案簡介
本專案為「Wood Store Auction System」，涵蓋拍賣／購物平台的前台與後台管理系統，支援商品、訂單、類別、用戶、金流紀錄等模組。前台與後台皆採用 Next.js 14 App Router 架構，並可串接綠界金流與 LINE Pay。

## 技術棧
- Next.js 14 (App Router)
- React 18 / TypeScript
- Tailwind CSS
- Ant Design
- Prisma ORM
- MySQL (PlanetScale / Railway)
- NextAuth / JWT
- Zod (輸入驗證)
- Recharts / Tremor (儀表板)

## 目錄結構
```
app/           # 前台與後台頁面、API route
components/    # 共用元件
lib/           # Prisma 與認證相關程式
prisma/        # Prisma schema 與 seed script
public/        # 靜態資源
styles/        # 全域樣式
```

## 環境變數
請參考 `.env.example`，複製為 `.env` 並填入對應值：
- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL
- JWT_SECRET
- ECPAY_HASH_KEY
- ECPAY_HASH_IV
- ECPAY_MERCHANT_ID
- LINE_PAY_CHANNEL_ID
- LINE_PAY_CHANNEL_SECRET

## 安裝與啟動
```bash
npm install
npm run dev
```

## 常用開發指令與說明

- `npm run dev`：啟動本地開發伺服器
- `npm run build`：產生 Prisma Client 並編譯 Next.js
- `npm run prisma:migrate`：執行資料庫 migration（同步 schema 變更）
- `npm run prisma:seed`：執行種子資料腳本，建立測試資料
- `npm run db:sync`：一鍵 migration + seed，快速同步資料表與測試資料
- `npm run db:reset`：重設資料庫並重新建立所有測試資料

## 資料庫管理與查詢

- 使用 Neon 控制台「Tables」可直接瀏覽所有資料表
- 進階查詢可用「SQL Editor」輸入 SQL 指令
- 例如：`SELECT * FROM "User";` 查詢所有使用者

## 種子資料腳本（seed.ts）

- 主要用於建立初始測試資料（管理員、分類、商品等）
- 修改 seed.ts 可自訂 mock 資料內容
- 執行方式：`npm run prisma:seed` 或搭配 `db:sync` 一鍵執行

## 開發流程建議

1. 修改 `prisma/schema.prisma` 設計資料表
2. 執行 `npm run db:sync` 同步資料表並建立測試資料
3. 撰寫 API Route 或前端頁面，串接 Prisma 查詢資料
4. 需要重設資料庫時可用 `npm run db:reset`

## 資料庫初始化
```bash
npm run prisma:migrate   # 執行 migration
npm run prisma:seed      # 匯入初始資料
```

## 主要功能模組
- 登入／認證
- 儀表板（銷售數據、排行）
- 商品管理
- 類別管理
- 訂單管理
- 用戶管理
- 金流紀錄
- 系統設定

## 部署
- Vercel（前後端）
- Railway / PlanetScale（MySQL）

---
如需詳細規格請參考 `auction-admin-system-spec.md`。
