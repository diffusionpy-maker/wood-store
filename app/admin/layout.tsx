'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Avatar, Badge, Dropdown, notification, ConfigProvider, theme, Input, Space, Button } from 'antd';
import { signOut } from 'next-auth/react';
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
  SearchOutlined,
  QuestionCircleOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const ProLayout = dynamic(() => import('@ant-design/pro-layout'), { ssr: false });

const menuData = [
  { path: '/admin/dashboard', name: '儀表板', icon: <BarChartOutlined /> },
  { path: '/admin/products', name: '商品管理', icon: <ShopOutlined /> },
  { path: '/admin/orders', name: '訂單管理', icon: <OrderedListOutlined /> },
  { path: '/admin/categories', name: '類別管理', icon: <TagsOutlined /> },
  { path: '/admin/payments', name: '付款管理', icon: <CreditCardOutlined /> },
  { path: '/admin/users', name: '用戶管理', icon: <UserOutlined /> },
  { path: '/admin/reports', name: '報表分析', icon: <BarChartOutlined /> },
  { path: '/admin/settings', name: '系統設定', icon: <SettingOutlined /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() ?? '';
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 6,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
        components: {
          Layout: {
            bodyBg: '#f0f2f5', // 主體背景色，原 colorBgBody 已棄用
          },
        },
      }}
    >
      <ProLayout
        title="Wood Store"
        logo={
          <div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-white font-bold text-lg">
            W
          </div>
        }
        layout="mix"
        navTheme="light"
        siderWidth={240}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        menu={{ request: async () => menuData }}
        location={{ pathname }}
        menuItemRender={(item, dom) => (
          <Link href={item.path || '/admin'} className="no-underline">
            {dom}
          </Link>
        )}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          title: 'Admin User',
          render: (_, dom) => (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '登出',
                    onClick: () => signOut({ callbackUrl: '/' }),
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          ),
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <Input.Search
              key="search"
              placeholder="搜尋..."
              style={{ width: 200, marginLeft: 8 }}
              onSearch={(value) => console.log(value)}
            />,
            <QuestionCircleOutlined key="QuestionCircleOutlined" />,
            <Badge count={5} size="small" key="notification">
              <BellOutlined style={{ fontSize: 16 }} />
            </Badge>,
          ];
        }}
        footerRender={() => (
          <div className="text-center py-4 text-gray-500 text-sm">
            © 2024 Wood Store Admin. All Rights Reserved.
          </div>
        )}
        token={{
          header: {
            colorBgHeader: '#fff',
            colorHeaderTitle: '#1677ff',
            heightLayoutHeader: 64,
          },
          sider: {
            colorMenuBackground: '#fff',
            colorMenuItemDivider: '#dfdfdf',
            colorTextMenu: '#595959',
            colorTextMenuSelected: '#1677ff',
            colorBgMenuItemSelected: '#e6f4ff',
          },
        }}
      >
        {children}
      </ProLayout>
    </ConfigProvider>
  );
}
