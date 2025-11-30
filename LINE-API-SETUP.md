# LINE Login API 串接設定與環境變數說明

## 1. LINE Developers 後台設定

### 步驟一：建立 Channel
- 前往 https://developers.line.biz/console/
- 建立 Provider 與 Channel（類型選 LINE Login）

### 步驟二：設定 Callback URL
- 進入 Channel 設定頁面
- 找到「LINE Login」區塊，填入 Callback URL
  - 範例：
    `https://your-domain.vercel.app/api/auth/line/callback`
- 儲存設定

### 步驟三：Channel 狀態
- 測試階段：保持「開發中（Developing）」狀態，僅開發者可登入
- 正式上線：切換為「公開（Published）」狀態，所有用戶可登入

### 步驟四：邀請開發者
- 在 Members/Invite new members 輸入 email，邀請自己或團隊成員

## 2. 專案環境變數設定

### .env（後端專用，敏感資訊）
```
LINE_CHANNEL_ID=你的ChannelID
LINE_CHANNEL_SECRET=你的ChannelSecret
LINE_CALLBACK_URL=https://your-domain.vercel.app/api/auth/line/callback
```

### .env.local（前端可用，必須加 NEXT_PUBLIC_ 前綴）
```
NEXT_PUBLIC_LINE_CHANNEL_ID=你的ChannelID
NEXT_PUBLIC_LINE_CALLBACK_URL=https://your-domain.vercel.app/api/auth/line/callback
```

- Channel Secret 絕對不能加 NEXT_PUBLIC_，只給後端用
- Callback URL 必須和 LINE Developers 後台設定完全一致

## 3. 前端 LINE 授權跳轉

```tsx
const channelId = process.env.NEXT_PUBLIC_LINE_CHANNEL_ID!;
const callbackUrl = process.env.NEXT_PUBLIC_LINE_CALLBACK_URL!;
const state = Math.random().toString(36).substring(2, 15);
const scope = "profile%20openid%20email";
const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${encodeURIComponent(callbackUrl)}&state=${state}&scope=${scope}`;
window.location.href = lineAuthUrl;
```

## 4. 後端 Callback API Route

- 路徑：`/app/api/auth/line/callback/route.ts`
- 功能：
  - 取得 code
  - 交換 access token
  - 取得用戶 profile
  - 寫入資料庫、建立 session

## 5. 常見錯誤
- 400 Bad Request / Invalid redirect_uri：Callback URL 不一致，請檢查後台與 .env.local
- This channel is now developing status：僅開發者可登入，請邀請自己為開發者或切換公開

---

如需更多教學或自動化程式碼產生，請參考本專案 README 或聯絡技術負責人。
