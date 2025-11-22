# Wood Store Auction System – Full Specification Document
（木作拍賣平台系統完整規格文件）


# 1. System Overview（系統概要）

本專案為「Wood Store Auction System」，包含前台（購物／拍賣頁面）與後台（商品與訂單管理）。  
目前開發優先順序：**先完成後台**，確立技術環境、架構、資料庫與 API。  
未來可串接綠界金流、LINE Pay 並能視覺化數據。

---

# 2. Technical Direction（技術方向）

## 2.1 Frontend（前台）
- Next.js 14（App Router）
- React 18
- TypeScript
- Tailwind CSS
- 用於呈現商品、拍賣品、購物流程與金流導向

## 2.2 Admin Backend（後台）
- Next.js 14（App Router）
- TypeScript
- Ant Design（後台 UI）
- Recharts 或 Tremor（儀表板）
- SWR / fetch（API 接口）

## 2.3 API / Backend
- Next.js Route Handlers (API Route)
- Prisma ORM
- Zod（輸入驗證）
- JWT / NextAuth（登入驗證）

## 2.4 Database（線上資料庫）
- MySQL（PlanetScale 或 Railway）
- Prisma schema + migration

## 2.5 Payment Integration（金流）
- 綠界金流 ECPay（信用卡 / ATM / 超商）
- LINE Pay v3
- Server-to-Server Callback
- 訂單狀態同步更新

## 2.6 Deployment（部署）
- Vercel（前後端 + API）
- Railway / PlanetScale（MySQL）
- 環境變數設定：DB URL、金流金鑰、JWT、LINE Pay 金鑰

---

# 3. System Modules（模組）

## 3.1 Admin Modules（後台）
- Login
- Dashboard（圖表）
- Products Management
- Categories
- Orders Management
- Users（可選）
- Payment Logs（綠界＋LINE Pay 回傳紀錄）
- Settings（可選）

## 3.2 Frontend Modules（前台）
- 商品頁
- 商品詳情
- 購物車
- 結帳導向金流
- 訂單查詢（可選）

---

# 4. Full WBS（完整工作分解結構）

## 🧩 Phase 1 — Environment Setup（環境搭建）
1. 初始化 Next.js + TypeScript 專案
2. 安裝 Ant Design、Tailwind、Prisma、Recharts/Tremor
3. 建立基本 Layout、Sidebar、Admin 路由架構
4. 設定 ESLint / Prettier
5. 建立 .env 與基本環境變數

---

## 🧩 Phase 2 — Database（線上 MySQL + Prisma）
1. 在 PlanetScale / Railway 建 MySQL
2. Prisma init
3. 撰寫 schema（Users、Products、Orders、Categories、OrderItems）
4. 執行 migration
5. Seed 初始資料
6. 設定資料庫連線 function

---

## 🧩 Phase 3 — API Layer（Next.js API Route）
1. Users API（登入／JWT）
2. Products API（CRUD）
3. Categories API（CRUD）
4. Orders API（CRUD）
5. OrderItems 自動生成
6. Dashboard Stats API（營收、銷售量、成交數）
7. 金流 API：
   - 綠界建立訂單
   - 綠界 callback 驗證與更新
   - LINE Pay reserve
   - LINE Pay confirm
8. API Error handling（Zod）

---

## 🧩 Phase 4 — Admin UI（Ant Design）
1. Login 頁面（JWT or NextAuth）
2. Dashboard 儀表板
   - 今日訂單
   - 月營收統計
   - 折線圖（Recharts/Tremor）
   - 圓餅圖
   - 商品銷售排行

3. 商品管理頁
   - 商品表格
   - 新增商品（Form）
   - 編輯商品（Modal）
   - 圖片上傳（可用外部 Storage）
   - 上下架

4. 類別管理頁

5. 訂單管理頁
   - 訂單清單（表格）
   - 狀態篩選
   - 日期搜尋
   - 訂單詳情 Modal
   - 修改狀態（paid / shipped / cancel）

6. 使用者管理（可選）

7. 金流紀錄頁 Payment Logs

---

## 🧩 Phase 5 — Payment Integration（金流）
1. 綠界 API key / MerchantID 設定
2. 建立交易參數
3. 傳送訂單至綠界
4. 訂單 callback（Server to Server）
5. callback 安全驗證
6. 更新訂單狀態
7. LINE Pay reserve → redirect
8. LINE Pay confirm → 更新訂單
9. 加入錯誤與例外處理

---

## 🧩 Phase 6 — Deployment
1. 上傳專案至 GitHub
2. Vercel 連結專案部署
3. Railway / PlanetScale 設定資料庫連線
4. 設定環境變數：
   - DATABASE_URL
   - JWT_SECRET
   - ECPAY HashKey / HashIV / MerchantID
   - LINE_PAY ChannelID / Secret
5. 測試金流 callback URL
6. 完成正式版部署

---

# 5. Database Schema（Prisma 建議）

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  role      String   @default("admin")
  createdAt DateTime @default(now())
}

model Category {
  id      Int      @id @default(autoincrement())
  name    String
  products Product[]
}

model Product {
  id          Int       @id @default(autoincrement())
  name        String
  price       Int
  description String?
  image       String?
  categoryId  Int
  category    Category  @relation(fields: [categoryId], references: [id])
  createdAt   DateTime  @default(now())
}

model Order {
  id         Int          @id @default(autoincrement())
  userId     Int
  totalPrice Int
  status     String        @default("pending")
  createdAt  DateTime      @default(now())
  items      OrderItem[]
}

model OrderItem {
  id        Int      @id @default(autoincrement())
  orderId   Int
  productId Int
  quantity  Int
  price     Int
  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}


# 9. Instruction for AI（AI 執行指令）

請依照本規格文件，使用 Next.js + TypeScript + Ant Design + Prisma + MySQL Cloud，
自動建立完整後台專案，包括：

- 專案初始化
- 資料庫 schema 與 migration
- API Route CRUD
- 管理介面（商品、訂單、類別、金流紀錄）
- 登入/驗證
- Dashboard 圖表
- 綠界 + LINE Pay 金流流程（含 callback）
- 部署設定（Vercel + Railway）

請分階段依照 WBS 逐步產生所有檔案與程式碼。
