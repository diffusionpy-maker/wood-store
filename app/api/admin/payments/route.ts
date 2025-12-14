import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        order: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // 轉換資料格式
    const formattedPayments = payments.map((payment) => ({
      key: payment.id,
      id: payment.id,
      orderNumber: payment.order?.order_number || `ORD${payment.order_id}`,
      provider: payment.gateway || 'Unknown',
      status: payment.status || 'pending',
      message: payment.status === 'completed' ? '付款成功' : payment.status === 'failed' ? '付款失敗' : '待處理',
      createdAt: payment.created_at?.toISOString().split('T')[0] || '未知',
      amount: payment.amount || 0,
    }));

    return NextResponse.json(formattedPayments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}
