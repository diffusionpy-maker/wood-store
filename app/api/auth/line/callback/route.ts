import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

    if (!code) {
      // 登入失敗，導向首頁並加上錯誤 cookie
      const response = NextResponse.redirect(req.nextUrl.origin);
      response.cookies.set("login_error", "No code provided", { path: "/", httpOnly: true });
      return response;
    }

  // 取得環境變數
  const channelId = process.env.LINE_CHANNEL_ID;
  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  // 支援本地與 Vercel，優先用 LINE_CALLBACK_URL，否則用 NEXT_PUBLIC_LINE_CALLBACK_URL
  const callbackUrl = process.env.LINE_CALLBACK_URL || process.env.NEXT_PUBLIC_LINE_CALLBACK_URL;

  // 交換 access token
  const tokenRes = await fetch('https://api.line.me/oauth2/v2.1/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: callbackUrl!,
      client_id: channelId!,
      client_secret: channelSecret!,
    }),
  });
  const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      // 登入失敗，導向首頁並加上錯誤 cookie
      const response = NextResponse.redirect(req.nextUrl.origin);
      response.cookies.set("login_error", "Failed to get access token", { path: "/", httpOnly: true });
      return response;
    }

  // 取得用戶 profile
  const profileRes = await fetch('https://api.line.me/v2/profile', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const profile = await profileRes.json();

  // Prisma 寫入資料庫
  // 使用 lineId 作為唯一欄位
  const prisma = new PrismaClient();
  let user = await prisma.user.findUnique({ where: { lineId: profile.userId } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        lineId: profile.userId,
        name: profile.displayName,
        avatar: profile.pictureUrl,
        email: profile.email || `${profile.userId}@line.me`,
        password: 'line_oauth_dummy_password',
      },
    });
  }

  // 建立 session（簡易範例，實際可用 JWT 或 NextAuth）
  // 這裡用 cookie 設定 userId
    // 登入成功，導向首頁並加上 userId cookie
    const response = NextResponse.redirect(req.nextUrl.origin);
  response.cookies.set('userId', String(user.id), { path: '/', httpOnly: true });
    response.cookies.set("login_success", "true", { path: "/", httpOnly: true });
  return response;
}
