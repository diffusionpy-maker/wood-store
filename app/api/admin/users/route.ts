import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        emailVerified: true,
        created_at: true,
        oauth_google_id: true,
        oauth_line_id: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // 轉換資料格式
    const formattedUsers = users.map((user) => ({
      key: user.id,
      id: user.id,
      name: user.name || '未命名用戶',
      email: user.email || 'N/A',
      role: user.email?.includes('admin') ? '管理員' : '用戶',
      status: user.emailVerified ? '啟用' : '待驗證',
      createdAt: user.created_at?.toISOString().split('T')[0] || '未知',
      avatar: user.image || `https://api.dicebear.com/7.x/miniavs/svg?seed=${user.id}`,
      oauth: {
        google: !!user.oauth_google_id,
        line: !!user.oauth_line_id,
      },
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
