# Prisma 資料庫管理說明

## 1. 主要檔案與結構

- `schema.prisma`：定義資料庫結構（所有資料表、欄位、關聯）。
- `seed.js`：資料初始化腳本，執行後會自動建立預設帳號、分類、商品等。
- `migrations/`：資料庫結構變更的歷史紀錄，每次執行 migrate 都會產生一個 migration 資料夾。

## 2. 主要指令

- `npx prisma migrate dev`：
  - 依據 schema.prisma 產生 migration，並套用到資料庫。
  - 適合開發階段，會自動同步資料庫結構。

- `npx prisma migrate dev --create-only`：
  - 只產生 migration 檔案，不直接套用。
  - 適合有舊資料、必填欄位需手動調整 migration.sql 時使用。

- `npx prisma generate`：
  - 產生 Prisma Client，讓程式可以用 JS/TS 操作資料庫。

- `node prisma/seed.js`：
  - 執行資料初始化腳本，建立預設帳號、分類、商品。

## 3. 主要檔案內容說明

### schema.prisma
- 定義所有資料表（model）、欄位型態、關聯（@relation）。
- 例如：
  - `User` 有多個 `Order`、`Cart`、`Favorite` 關聯。
  - `Product` 屬於一個 `Category`，有多個 `ProductImage`、`OrderItem`。

### seed.js
- 用於自動建立測試資料。
- 例如：
  - 建立三種帳號（admin/manager/viewer）。
  - 建立三個分類（Electronics, Collectibles, Fashion）。
  - 建立一個商品。

## 4. 常見開發流程

1. 修改 `schema.prisma`（新增/修改資料表欄位、關聯）。
2. 執行 `npx prisma migrate dev` 產生並套用 migration。
3. 執行 `npx prisma generate` 產生 Prisma Client。
4. 執行 `node prisma/seed.js` 初始化資料。
5. 用程式（JS/TS）透過 Prisma Client 操作資料庫。

## 5. 關聯說明
- 一個 `User` 可以有多個 `Order`、`Cart`、`Favorite`。
- 一個 `Product` 屬於一個 `Category`，但一個 `Category` 可以有多個 `Product`。
- `OrderItem` 連結 `Order` 與 `Product`，代表一筆訂單裡的商品明細。
- `CartItem` 連結 `Cart` 與 `Product`，代表購物車裡的商品明細。

## 6. 資料庫重設
- 若 migration drift 或資料不重要，可執行：
  ```
  npx prisma migrate reset
  ```
  會清空所有資料並重新套用 migration。

## 7. 其他補充
- migration 只記錄結構變更，不包含資料。
- seed.js 負責資料初始化，適合測試或 demo 用。
- 若遇到 migration 欄位必填但有舊資料，請用 `--create-only` 產生 migration.sql，手動允許 NULL 或加 DEFAULT。

---
如需更詳細說明或遇到錯誤，請貼出訊息，我會協助解答。
