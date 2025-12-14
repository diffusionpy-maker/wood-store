import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 獲取今日訂單數
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = await prisma.order.count({
      where: {
        created_at: {
          gte: today,
        },
      },
    });

    // 計算本月收益
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthOrders = await prisma.order.aggregate({
      _sum: {
        total_amount: true,
      },
      where: {
        created_at: {
          gte: monthStart,
        },
      },
    });
    const monthRevenue = monthOrders._sum.total_amount || 0;

    // 獲取熱銷商品
    const topProducts = await prisma.orderItem.groupBy({
      by: ['product_id'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    });

    // 獲取商品詳細信息
    const topProductsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.product_id },
        });
        return {
          name: product?.name || '未知商品',
          sales: item._sum.quantity || 0,
        };
      })
    );

    const dashboardStats = {
      todayOrders,
      monthRevenue,
      topProducts: topProductsWithDetails,
    };

    return NextResponse.json(dashboardStats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
