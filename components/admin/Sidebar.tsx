"use client";
import { Menu, Typography } from 'antd';
import {
  ShoppingOutlined,
  OrderedListOutlined,
  TagsOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const { Title } = Typography;

const items = [
  {
    label: <Link href="/admin/dashboard">儀表板</Link>,
    key: '/admin/dashboard',
    icon: <BarChartOutlined />
  },
  {
    label: <Link href="/admin/products">商品管理</Link>,
    key: '/admin/products',
    icon: <ShoppingOutlined />
  },
  {
    label: <Link href="/admin/orders">訂單管理</Link>,
    key: '/admin/orders',
    icon: <OrderedListOutlined />
  },
  {
    label: <Link href="/admin/categories">類別管理</Link>,
    key: '/admin/categories',
    icon: <TagsOutlined />
  }
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-white border-r shadow-sm">
      <div className="px-6 py-8 text-center">
        <Title level={4} style={{ marginBottom: 0, color: '#1677ff', fontWeight: 700 }}>Admin</Title>
        <span className="text-xs text-gray-400">拍賣管理系統</span>
      </div>
      <Menu
        mode="inline"
        selectedKeys={pathname ? [pathname] : []}
        items={items}
        style={{ flex: 1, borderRight: 0, background: 'transparent', fontSize: 16 }}
      />
      <div className="px-6 py-4 text-xs text-gray-400 text-center border-t">© 2025 Auction System</div>
    </aside>
  );
}
