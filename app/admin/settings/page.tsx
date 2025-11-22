'use client';
import { Card, Form, Input, Button } from 'antd';
export default function SettingsPage() {
  return (
    <Card
      title="系統設定"
      bordered
      style={{ borderRadius: 12, boxShadow: '0 2px 12px #0001', maxWidth: 480 }}
    >
      <Form
        layout="vertical"
        initialValues={{ systemName: 'Auction Admin', adminEmail: 'admin@example.com' }}
      >
        <Form.Item label="系統名稱" name="systemName">
          <Input />
        </Form.Item>
        <Form.Item label="管理員 Email" name="adminEmail">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary">儲存設定</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
