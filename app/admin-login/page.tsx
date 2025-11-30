'use client';

import { Suspense, useState, useEffect } from 'react';
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, ConfigProvider } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { message as antdMessage } from 'antd';

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [messageApi, contextHolder] = antdMessage.useMessage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.ok) {
        message.success({ content: '登入成功，歡迎回來', style: { marginTop: '20vh' } });
        // 後台登入不論身分都只導向 /admin
        router.push('/admin');
      } else {
        messageApi.error({ content: '帳號或密碼錯誤', style: { marginTop: '20vh' } });
      }
    } catch (error) {
      message.error('發生錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0f172a',
          borderRadius: 8,
        },
      }}
    >
      {contextHolder}
      <div
        className={`w-full max-w-md transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="mb-10 text-center relative z-10">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-slate-200">
              <SafetyCertificateOutlined style={{ fontSize: 32, color: '#fff' }} />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">Admin Portal</h1>
            <p className="text-slate-500">請輸入您的管理員憑證以繼續</p>
          </div>

          <Form
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
            size="large"
            className="relative z-10"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: '請輸入電子郵件' },
                { type: 'email', message: '請輸入有效的電子郵件格式' },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-slate-400" />}
                placeholder="admin@example.com"
                className="rounded-xl bg-slate-50 border-slate-200 hover:bg-white focus:bg-white transition-all"
              />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: '請輸入密碼' }]}>
              <Input.Password
                prefix={<LockOutlined className="text-slate-400" />}
                placeholder="密碼"
                className="rounded-xl bg-slate-50 border-slate-200 hover:bg-white focus:bg-white transition-all"
              />
            </Form.Item>

            <Form.Item className="mb-2">
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="h-12 rounded-xl bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-200 font-semibold tracking-wide"
              >
                登入系統
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-6 text-center text-xs text-slate-400">
            &copy; 2025 Wood Store Management System
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5] relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-100 to-slate-200"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative z-10 w-full flex justify-center px-4">
        <Suspense fallback={<div className="text-slate-500">載入中...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
