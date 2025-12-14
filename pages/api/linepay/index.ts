// LINE Pay 付款請求 API
import type { NextApiRequest, NextApiResponse } from 'next';

// 請將這些參數設在 .env 檔案
const LINEPAY_CHANNEL_ID = process.env.LINEPAY_CHANNEL_ID || '';
const LINEPAY_CHANNEL_SECRET = process.env.LINEPAY_CHANNEL_SECRET || '';

// 統一設定 LINEPAY_BASE_URL，方便切換 ngrok/正式網址
const LINEPAY_BASE_URL = process.env.LINEPAY_BASE_URL || 'http://localhost:3000';
const LINEPAY_API_URL = process.env.LINEPAY_API_URL || 'https://sandbox-api-pay.line.me/v2/payments/request';
const LINEPAY_CONFIRM_URL = process.env.LINEPAY_CONFIRM_URL || 'https://sandbox-api-pay.line.me/v2/payments';
// 統一用 BASE_URL 組合 return/cancel url
const LINEPAY_RETURN_URL = `${LINEPAY_BASE_URL}/order/success`;
const LINEPAY_CANCEL_URL = `${LINEPAY_BASE_URL}/order/fail`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end('Method Not Allowed');
    return;
  }
  const { orderId, amount, productName } = req.body as {
    orderId: string;
    amount: number;
    productName: string;
  };

  // 建立付款請求資料
  const body = {
    amount,
    currency: 'TWD',
    orderId,
    packages: [
      {
        id: orderId,
        amount,
        name: productName,
        products: [
          {
            name: productName,
            quantity: 1,
            price: amount,
          },
        ],
      },
    ],
    redirectUrls: {
      confirmUrl: LINEPAY_RETURN_URL,
      cancelUrl: LINEPAY_CANCEL_URL,
    },
  };

  // 計算 LINE Pay 簽章
  const nonce = Date.now().toString();
  const crypto = await import('crypto');
  const rawSignature = `${LINEPAY_CHANNEL_SECRET}/${'v2/payments/request'}${JSON.stringify(body)}${nonce}`;
  const signature = crypto
    .createHmac('sha256', LINEPAY_CHANNEL_SECRET)
    .update(rawSignature)
    .digest('base64');

  // 準備 headers
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-LINE-ChannelId': LINEPAY_CHANNEL_ID,
    'X-LINE-Authorization-Nonce': nonce,
    'X-LINE-Authorization': signature,
    'X-LINE-MerchantId': process.env.LINEPAY_MERCHANT_ID || '',
  };
  // log headers 與 body
  console.log('=== LINE Pay 請求 headers ===');
  console.log(headers);
  console.log('=== LINE Pay 請求 body ===');
  console.log(JSON.stringify(body, null, 2));
  // log headers 與 body
  console.log('=== LINE Pay 請求 headers ===');
  console.log(headers);
  console.log('=== LINE Pay 請求 body ===');
  console.log(JSON.stringify(body, null, 2));

  // 發送請求到 LINE Pay
  const response = await fetch(LINEPAY_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  // log response 狀態
  console.log('=== LINE Pay response status ===');
  console.log(response.status, response.statusText);

  const data = await response.json();
  console.log('=== LINE Pay response data ===');
  console.log(data);

  if (data.returnCode === '0000') {
    // 成功，回傳付款網址
    res.status(200).json({ paymentUrl: data.info.paymentUrl.web });
  } else {
    // log 錯誤資訊
    console.error('LINE Pay error:', data);
    console.log('LINEPAY_CHANNEL_ID:', LINEPAY_CHANNEL_ID);
    console.log('LINEPAY_CHANNEL_SECRET:', LINEPAY_CHANNEL_SECRET);
    console.log('nonce:', nonce);
    console.log('signature:', signature);
    res.status(400).json({ error: data.returnMessage, code: data.returnCode, detail: data });
  }
}
