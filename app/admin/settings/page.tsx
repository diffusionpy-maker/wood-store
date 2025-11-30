'use client';
import { Card, Form, Input, Button, Tabs, Switch, Select, message, Upload, Avatar } from 'antd';
import { UserOutlined, LockOutlined, BellOutlined, SafetyCertificateOutlined, GlobalOutlined } from '@ant-design/icons';
import PageContainer from '../components/PageContainer';
import ProCard from '@ant-design/pro-card';

export default function SettingsPage() {
  const [form] = Form.useForm();

  const handleSave = () => {
    message.success('設定已儲存 (Demo)');
  };

  const items = [
    {
      key: '1',
      label: (
        <span>
          <UserOutlined />
          基本設定
        </span>
      ),
      children: (
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            systemName: 'Wood Store Admin',
            adminEmail: 'admin@example.com',
            language: 'zh-TW',
            timezone: 'Asia/Taipei'
          }}
          onFinish={handleSave}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="系統名稱" name="systemName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="管理員 Email" name="adminEmail" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="系統語言" name="language">
            <Select
              options={[
                { value: 'zh-TW', label: '繁體中文' },
                { value: 'en-US', label: 'English' },
              ]}
            />
          </Form.Item>
          <Form.Item label="時區" name="timezone">
            <Select
              options={[
                { value: 'Asia/Taipei', label: '台北 (GMT+8)' },
                { value: 'UTC', label: 'UTC' },
              ]}
            />
          </Form.Item>
          <Form.Item label="系統Logo">
            <div className="flex items-center gap-4">
              <Avatar size={64} shape="square" style={{ backgroundColor: '#1677ff' }}>W</Avatar>
              <Upload showUploadList={false}>
                <Button>更換 Logo</Button>
              </Upload>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              儲存設定
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <LockOutlined />
          安全設定
        </span>
      ),
      children: (
        <Form layout="vertical" style={{ maxWidth: 600 }} onFinish={handleSave}>
          <Form.Item label="目前密碼" name="currentPassword" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="新密碼" name="newPassword" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="確認新密碼" name="confirmPassword" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="雙重驗證 (2FA)" name="2fa" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              更新密碼
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <BellOutlined />
          通知設定
        </span>
      ),
      children: (
        <Form layout="vertical" style={{ maxWidth: 600 }} initialValues={{ emailNotify: true, pushNotify: false }}>
          <Form.Item label="Email 通知" name="emailNotify" valuePropName="checked" help="接收訂單、庫存等重要通知">
            <Switch />
          </Form.Item>
          <Form.Item label="瀏覽器推播" name="pushNotify" valuePropName="checked" help="接收即時系統通知">
            <Switch />
          </Form.Item>
          <Form.Item label="每月報表" name="monthlyReport" valuePropName="checked" help="每月自動寄送營收報表">
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSave}>
              儲存通知設定
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <PageContainer
      title="系統設定"
      subTitle="管理系統參數、安全設置與通知偏好"
    >
      <ProCard
        style={{ borderRadius: 8, minHeight: 600 }}
        bordered
      >
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          items={items}
        />
      </ProCard>
    </PageContainer>
  );
}
