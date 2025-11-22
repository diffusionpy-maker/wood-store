import { NextResponse } from 'next/server';

const categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Collectibles' },
  { id: 3, name: 'Fashion' }
];

export async function GET() {
  return NextResponse.json(categories);
}
