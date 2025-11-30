import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// 只保護 /admin 路徑
export async function proxy(request: NextRequest) {
  // 取得 JWT token（session）
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // 1. 如果是前往後台登入頁面，直接放行 (避免無窮迴圈)
  if (pathname === '/admin-login') {
    return NextResponse.next();
  }

  // 2. 如果是前往 /admin 開頭的路徑，且沒有登入
  if (!token && pathname.startsWith('/admin')) {
    // 重導到後台專用登入頁 /admin-login
    const loginUrl = new URL('/admin-login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }
  // 其他情況正常通過
  return NextResponse.next();
}

// 設定只攔截 /admin 路徑
export const config = {
  matcher: ['/admin/:path*'],
};
