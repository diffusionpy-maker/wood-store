'use client';

import { ConfigProvider, theme } from 'antd';
import { ReactNode } from 'react';

interface AntdConfigProviderProps {
  children: ReactNode;
}

export function AntdConfigProvider({ children }: AntdConfigProviderProps) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff', // 主色
          borderRadius: 12, // 圓角
          fontFamily: 'Segoe UI, Noto Sans TC, Arial, sans-serif', // 字型
          colorBgContainer: '#f5f7fa', // 背景色
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
