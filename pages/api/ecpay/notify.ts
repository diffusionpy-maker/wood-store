// 綠界付款完成通知 API
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

function genCheckMacValue(
  params: Record<string, string | number | undefined>,
  HashKey: string = '',
  HashIV: string = ''
): string {
  const keys = Object.keys(params).sort();
  let raw = '';
  keys.forEach((key) => {
    raw += `${key}=${params[key]}&`;
  });
  raw = `HashKey=${HashKey}&${raw}HashIV=${HashIV}`;
  let urlEncoded = encodeURIComponent(raw)
    .toLowerCase()
    .replace(/%20/g, '+')
    .replace(/'/g, '%27')
    .replace(/\*/g, '%2a')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
  const hash = crypto.createHash('md5').update(urlEncoded).digest('hex').toUpperCase();
  return hash;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end('Method Not Allowed');
    return;
  }
  const body = req.body as Record<string, any>;
  // 驗證 CheckMacValue
  const checkMac = genCheckMacValue(
    body,
    process.env.ECPAY_HASH_KEY || '',
    process.env.ECPAY_HASH_IV || ''
  );
  if (body.CheckMacValue !== checkMac) {
    res.status(400).send('CheckMacValue Error');
    return;
  }
  // TODO: 根據 body 內容更新訂單狀態
  // 例如 body.MerchantTradeNo, body.RtnCode, body.TradeAmt ...

  // 回傳 1|OK 給綠界
  res.status(200).send('1|OK');
}