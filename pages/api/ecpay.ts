// 綠界金流串接建議用 pages/api：
// 1. 完全支援 Node.js 語法與第三方套件（如 crypto），最穩定。
// 2. 金流、第三方 SDK 建議都放 pages/api，避免升級或 edge runtime 限制。
// 3. 部署 Vercel 也完全支援 pages/api。
// 4. 本範例已移除 ecpay-payment，改用原生 crypto 產生 CheckMacValue。
// pages/api/ecpay.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

function genCheckMacValue(
  params: Record<string, string | number | undefined>,
  HashKey: string = '',
  HashIV: string = ''
): string {
  // 1. 依照官方順序排序
  const keys = Object.keys(params).sort();
  let raw = '';
  keys.forEach((key) => {
    raw += `${key}=${params[key]}&`;
  });
  raw = `HashKey=${HashKey}&${raw}HashIV=${HashIV}`;

  // 2. URL encode
  let urlEncoded = encodeURIComponent(raw)
    .toLowerCase()
    .replace(/%20/g, '+')
    .replace(/'/g, '%27')
    .replace(/\*/g, '%2a')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');

  // 3. MD5 hash
  const hash = crypto.createHash('md5').update(urlEncoded).digest('hex').toUpperCase();
  return hash;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end('Method Not Allowed');
    return;
  }
  const { orderId, amount } = req.body as { orderId: string | number; amount: string | number };

  // 綠界測試商店參數（從 .env 讀取）
  const options = {
    MerchantID: process.env.ECPAY_MERCHANT_ID || '',
    HashKey: process.env.ECPAY_HASH_KEY || '',
    HashIV: process.env.ECPAY_HASH_IV || '',
    ReturnURL: process.env.ECPAY_RETURN_URL || '',
    ClientBackURL: process.env.ECPAY_CLIENT_BACK_URL || '',
  };

  // 產生正確格式的 MerchantTradeDate
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const MerchantTradeDate = `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const params: Record<string, string | number> = {
    MerchantID: options.MerchantID,
    MerchantTradeNo: (String(orderId) + Date.now()).slice(0, 20),
    MerchantTradeDate,
    PaymentType: 'aio',
    TotalAmount: parseInt(String(amount), 10),
    TradeDesc: 'Order',
    ItemName: 'Product',
    ReturnURL: options.ReturnURL,
    ClientBackURL: options.ClientBackURL, // 新增返回商店按鈕網址
    ChoosePayment: 'ALL',
  };
  // 產生 CheckMacValue
  params.CheckMacValue = genCheckMacValue(params, options.HashKey, options.HashIV);
  console.log('ecpay params:', params);

  // 產生綠界付款表單 HTML
  let html = `<form id="_form_aiochk" action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5" method="post">`;
  Object.keys(params).forEach((key) => {
    html += `<input type="hidden" name="${key}" value="${params[key]}" />`;
  });
  html += `<script type="text/javascript">document.getElementById('_form_aiochk').submit();</script></form>`;
  res.status(200).send(html);
}