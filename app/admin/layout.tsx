'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Avatar, Badge, Dropdown, Space, notification, Breadcrumb } from 'antd';
import {
  BarChartOutlined,
  ShopOutlined,
  OrderedListOutlined,
  TagsOutlined,
  CreditCardOutlined,
  BellOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
const ProLayout = dynamic(() => import('@ant-design/pro-layout'), { ssr: false });
import { useRouter, usePathname } from 'next/navigation';

const menuData = [
  {
    path: '/admin/dashboard',
    name: '儀表板',
    icon: <BarChartOutlined />,
  },
  {
    path: '/admin/products',
    name: '商品管理',
    icon: <ShopOutlined />,
  },
  {
    path: '/admin/orders',
    name: '訂單管理',
    icon: <OrderedListOutlined />,
  },
  {
    path: '/admin/categories',
    name: '類別管理',
    icon: <TagsOutlined />,
  },
  {
    path: '/admin/payments',
    name: '付款管理',
    icon: <CreditCardOutlined />,
  },
  {
    path: '/admin/users',
    name: '用戶管理',
    icon: <UserOutlined />,
  },
  {
    path: '/admin/reports',
    name: '報表分析',
    icon: <BarChartOutlined />,
  },
  {
    path: '/admin/settings',
    name: '系統設定',
    icon: <SettingOutlined />,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [notificationCount, setNotificationCount] = useState(3);

  // 麵包屑配置
  const breadcrumbNameMap: Record<string, string> = {
    '/admin': '後台',
    '/admin/dashboard': '儀表板',
    '/admin/products': '商品管理',
    '/admin/orders': '訂單管理',
    '/admin/categories': '類別管理',
    '/admin/payments': '付款管理',
  };

  const pathSnippets = pathname.split('/').filter((i) => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = '/' + pathSnippets.slice(0, index + 1).join('/');
    return {
      title: breadcrumbNameMap[url] || url,
    };
  });

  // 用戶下拉菜單
  const userMenuItems: any[] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '個人資料',
      onClick: () => notification.info({ message: '開發中', description: '個人資料功能開發中...' }),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '設定',
      onClick: () => notification.info({ message: '開發中', description: '設定功能開發中...' }),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '登出',
      onClick: () => {
        notification.success({ message: '已登出', description: '再見！' });
        router.push('/');
      },
    },
  ];

  // 通知下拉菜單
  const notificationItems: any[] = [
    {
      key: '1',
      label: '新訂單通知 #001',
      onClick: () => notification.info({ message: '訂單 #001', description: '客戶 John Doe 下單' }),
    },
    {
      key: '2',
      label: '庫存不足警告',
      onClick: () =>
        notification.warning({ message: '庫存預警', description: '商品 iPhone 14 庫存即將不足' }),
    },
    {
      key: '3',
      label: '付款已確認',
      onClick: () =>
        notification.success({ message: '付款已確認', description: '訂單 #002 已完成付款' }),
    },
    {
      type: 'divider',
    },
    {
      key: 'all',
      label: '查看全部',
      onClick: () =>
        notification.info({ message: '通知中心', description: '通知中心功能開發中...' }),
    },
  ];

  // 頂部右側渲染
  const rightRender = () => (
    <Space size="large" style={{ marginRight: 24 }}>
      {/* 通知 */}
      <Dropdown menu={{ items: notificationItems }} trigger={['click']}>
        <Badge count={notificationCount} style={{ cursor: 'pointer' }}>
          <BellOutlined style={{ fontSize: 18, color: '#1890ff' }} />
        </Badge>
      </Dropdown>

      {/* 用戶 */}
      <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
        <Space style={{ cursor: 'pointer' }}>
          <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
          <span>管理員</span>
        </Space>
      </Dropdown>
    </Space>
  );

  return (
    <ProLayout
      title="Auction Admin"
      logo={null}
      layout="mix"
      navTheme="light"
      menu={{
        request: async () => menuData,
      }}
      onMenuHeaderClick={() => router.push('/admin/dashboard')}
      menuItemRender={(item, dom) => (
        <div
          onClick={() => {
            if (item && typeof item === 'object' && item.path) {
              router.push(item.path);
            }
          }}
          style={{ cursor: 'pointer' }}
        >
          {dom}
        </div>
      )}
      fixSiderbar
      headerRender={(props) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 24px',
            height: 64,
          }}
        >
          <div></div>
          {rightRender()}
        </div>
      )}
      breadcrumbRender={(routers) => [
        {
          breadcrumbName: '後台',
          path: '/admin',
        },
        ...breadcrumbItems,
      ]}
      contentStyle={{ margin: 0, padding: '24px' }}
      style={{ minHeight: '100vh' }}
    >
      <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 16 }} />
      {children}
    </ProLayout>
  );
}
