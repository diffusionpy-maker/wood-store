'use client';
import { Avatar, Badge, Dropdown, Space } from 'antd';
import { BellOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';

export default function RightHeader({
  notificationCount,
  notificationItems,
  userMenuItems,
}: {
  notificationCount: number;
  notificationItems: any[];
  userMenuItems: any[];
}) {
  return (
    <Space size="large" style={{ marginRight: 24 }} className="ml-auto flex items-center h-full">
      <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1.5 transition-all hover:bg-gray-200 hover:w-64 w-48 group">
        <SearchOutlined className="text-gray-400 group-hover:text-gray-600" />
        <input
          type="text"
          placeholder="搜尋..."
          className="bg-transparent border-none outline-none ml-2 text-sm w-full text-gray-600 placeholder-gray-400"
        />
      </div>
      <Dropdown
        menu={{ items: notificationItems }}
        trigger={['click']}
        placement="bottomRight"
        arrow
      >
        <Badge
          count={notificationCount}
          size="small"
          offset={[-2, 8]}
          style={{ boxShadow: 'none' }}
        >
          <div className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors">
            <BellOutlined style={{ fontSize: 20, color: '#64748b' }} />
          </div>
        </Badge>
      </Dropdown>
      <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight" arrow>
        <Space
          style={{ cursor: 'pointer' }}
          className="hover:bg-gray-50 py-1 px-2 rounded-full transition-colors"
        >
          <Avatar
            style={{ backgroundColor: '#0f172a' }}
            icon={<UserOutlined />}
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
          />
          <span className="font-medium text-slate-700 hidden md:inline">Admin User</span>
        </Space>
      </Dropdown>
    </Space>
  );
}
