import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // 轉換資料格式
    const formattedOrders = orders.map((order) => ({
      key: order.id,
      id: order.id,
      orderNumber: order.order_number || `ORD${order.id}`,
      user: order.user?.email || order.user?.name || '未知用戶',
      totalPrice: order.total_amount || 0,
      status: order.status || 'pending',
      createdAt: order.created_at?.toISOString() || new Date().toISOString(),
      items: (order.items || []).map((item) => ({
        product: item.product?.name || '未知商品',
        quantity: item.quantity,
        price: item.unit_price,
      })),
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
