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
