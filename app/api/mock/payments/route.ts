import { NextResponse } from 'next/server';

const payments = [
  {
    id: 1,
    orderNumber: 'A20251120001',
    provider: 'ECPay',
    status: 'confirmed',
    message: '付款成功',
    createdAt: '2025-11-20T09:05:00Z'
  },
  {
    id: 2,
    orderNumber: 'A20251120002',
    provider: 'LINE Pay',
    status: 'failed',
    message: '付款失敗',
    createdAt: '2025-11-20T09:10:00Z'
  }
];

export async function GET() {
  return NextResponse.json(payments);
}
