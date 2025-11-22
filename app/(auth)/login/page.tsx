'use client';

import { Suspense } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Typography, message } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const { Title, Text } = Typography;

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    });
    setLoading(false);
    if (result?.ok) {
      message.success('登入成功');
      const callbackUrl = searchParams.get('callbackUrl') ?? '/admin';
      router.push(callbackUrl);
    } else {
      message.error('帳號或密碼錯誤');
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <div className="mb-6 text-center">
        <Title level={2}>Auction Admin</Title>
        <Text type="secondary">請使用管理員帳號登入系統</Text>
      </div>
      <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>
        <Form.Item
          name="email"
          label="電子郵件"
          rules={[{ required: true, message: '請輸入電子郵件' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="admin@example.com" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密碼"
          rules={[{ required: true, message: '請輸入密碼' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="********"
            size="large"
            autoComplete="current-password"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" block size="large" loading={loading}>
          登入
        </Button>
      </Form>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <Suspense fallback={<div>載入中...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}