import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    // 轉換資料格式
    const formattedCategories = categories.map((category) => ({
      key: category.id,
      id: category.id,
      name: category.name,
      description: '', // Category 沒有 description 欄位，使用空字符
      status: category.is_active ? '啟用' : '停用',
      isActive: category.is_active,
      createdAt: category.created_at?.toISOString().split('T')[0] || '未知',
    }));

    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
