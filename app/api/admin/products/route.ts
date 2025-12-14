import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // 轉換資料格式
    const formattedProducts = products.map((product) => ({
      key: product.id,
      id: product.id,
      name: product.name,
      category: product.category?.name || '未分類',
      price: product.price,
      stock: product.stock_quantity || 0,
      description: product.description || '',
      status: product.is_active ? '上架' : '下架',
      isActive: product.is_active,
      createdAt: product.created_at?.toISOString().split('T')[0] || '未知',
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
