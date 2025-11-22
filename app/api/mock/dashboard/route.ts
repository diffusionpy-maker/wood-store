import { NextResponse } from 'next/server';

const dashboardStats = {
  todayOrders: 5,
  monthRevenue: 120000,
  topProducts: [
    { name: 'Smartphone Pro', sales: 3 },
    { name: 'Vintage Watch', sales: 2 }
  ]
};

export async function GET() {
  return NextResponse.json(dashboardStats);
}
