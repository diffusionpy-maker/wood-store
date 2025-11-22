"use client";
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function AdminHomePage() {
  // DEMO: session mock
  const session = { user: { name: 'Admin User', email: 'admin@example.com' } };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
      <div className="w-full max-w-lg p-8 bg-white text-[#181818] border border-gray-200">
        <Title level={2} style={{ color: '#181818', fontWeight: 700 }}>Auction Admin Dashboard</Title>
        <Text type="secondary">歡迎 {session?.user?.name ?? session?.user?.email} 進入管理後台</Text>
      </div>
    </div>
  );
}
