
# wood-store er model (修正版)

---

> 本文件為 wood-store 專案資料庫 ER model（實體關聯圖）設計，內容已依據現有 schema 與需求修正，供後續 Prisma schema 與資料庫設計參考。

---

---


## users (會員)
- id: int, pk, auto increment  // 主鍵，自動遞增
- name: varchar                // 使用者姓名
- email: varchar, unique       // 電子郵件（唯一）
- password: varchar            // 密碼（加密後）
- status: varchar (active/suspended) // 帳號狀態：active=正常，suspended=停用
- created_at: datetime         // 註冊日期


## user_addresses (會員收件地址)
- id: int, pk, auto increment  // 主鍵
- user_id: int, ref users.id   // 所屬使用者 ID
- recipient: varchar           // 收件人姓名
- phone: varchar               // 收件人電話
- address: varchar             // 詳細地址
- is_default: boolean          // 是否為預設地址
- created_at: datetime         // 建立時間


## categories (商品分類)
- id: int, pk, auto increment         // 主鍵
- name: varchar                      // 分類名稱
- parent_id: int, ref categories.id, nullable // 上層分類（可為 null）


## products (商品)
- id: int, pk, auto increment      // 主鍵
- category_id: int, ref categories.id // 商品分類 ID
- name: varchar                    // 商品名稱
- price: int                       // 售價
- stock: int                       // 庫存數量
- description: text                // 商品介紹 / 詳細敘述
- status: varchar (active/inactive) // 商品狀態：active=上架, inactive=下架
- created_at: datetime             // 商品建立時間


## product_images (商品圖片)
- id: int, pk, auto increment      // 主鍵
- product_id: int, ref products.id // 所屬商品 ID
- image_url: varchar               // 圖片連結
- sort_order: int                  // 排序編號（越小越前面）


## favorites (收藏)
- user_id: int, ref users.id       // 使用者 ID
- product_id: int, ref products.id // 商品 ID
- created_at: datetime             // 收藏時間
- pk: (user_id, product_id)        // 複合主鍵：防止重複收藏


## carts (購物車)
- id: int, pk, auto increment      // 主鍵
- user_id: int, ref users.id       // 使用者 ID
- created_at: datetime             // 建立時間


## cart_items (購物車內容)
- id: int, pk, auto increment      // 主鍵
- cart_id: int, ref carts.id       // 所屬購物車 ID
- product_id: int, ref products.id // 商品 ID
- quantity: int                    // 購買數量


## orders (訂單)
- id: int, pk, auto increment      // 主鍵
- user_id: int, ref users.id       // 購買者 ID
- total_price: int                 // 訂單總金額
- status: varchar (pending/paid/shipped/completed/cancelled) // 訂單狀態
- payment_method: varchar          // 付款方式
- shipping_address: varchar        // 收件地址（下單當下的地址快照）
- created_at: datetime             // 下單時間


## order_items (訂單明細)
- id: int, pk, auto increment      // 主鍵
- order_id: int, ref orders.id     // 所屬訂單 ID
- product_id: int, ref products.id // 商品 ID
- price: int                       // 當時購買的商品單價（快照）
- quantity: int                    // 數量


## reviews (商品評論)
- id: int, pk, auto increment      // 主鍵
- user_id: int, ref users.id       // 使用者 ID
- product_id: int, ref products.id // 商品 ID
- rating: int (1-5)                // 評分（1 — 5 顆星）
- content: text                    // 評語內容
- created_at: datetime             // 評論時間


## coupons (優惠券)
- id: int, pk, auto increment      // 主鍵
- code: varchar, unique            // 優惠碼（唯一）
- type: varchar (percent/fixed)    // 類型：percent=折扣 %, fixed=折抵金額
- value: int                       // 折扣數值
- min_price: int                   // 使用門檻（最低金額）
- expired_at: datetime             // 到期日
- usage_limit: int                 // 使用次數限制

---
