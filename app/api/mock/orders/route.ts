import { NextResponse } from 'next/server';

const orders = [
  {
    id: 101,
    orderNumber: 'A20251120001',
    user: 'admin@example.com',
    totalPrice: 48790,
    status: 'paid',
    createdAt: '2025-11-20T09:00:00Z',
    items: [
      { product: 'Smartphone Pro', quantity: 1, price: 32990 },
      { product: 'Vintage Watch', quantity: 1, price: 15800 }
    ]
  }
];

export async function GET() {
  return NextResponse.json(orders);
}
