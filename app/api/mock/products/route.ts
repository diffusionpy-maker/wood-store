import { NextResponse } from 'next/server';

const products = [
  {
    id: 1,
    name: 'Smartphone Pro',
    price: 32990,
    description: 'Flagship smartphone with auction-ready packaging.',
    image: '',
    category: 'Electronics',
    stock: 25,
    createdAt: '2025-11-01T10:00:00Z'
  },
  {
    id: 2,
    name: 'Vintage Watch',
    price: 15800,
    description: 'Classic collectible watch.',
    image: '',
    category: 'Collectibles',
    stock: 5,
    createdAt: '2025-11-02T12:00:00Z'
  }
];

export async function GET() {
  return NextResponse.json(products);
}
