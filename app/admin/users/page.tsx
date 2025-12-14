'use client';
import { Avatar, Tag, Button, Space, Modal, Form, Input, Select, message, Skeleton, Alert } from 'antd';
import useSWR from 'swr';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { PlusOutlined, UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import PageContainer from '../components/PageContainer';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UsersPage() {
  const { data, isLoading } = useSWR('/api/admin/users', fetcher);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form] = Form.useForm();

  const columns: ProColumns<any>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (dom: React.ReactNode, entity: any) => (
        <Space>
          <Avatar src={entity.avatar} icon={<UserOutlined />} />        
          <span className="font-medium">{entity.name}</span>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      copyable: true,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      valueType: 'select',
      valueEnum: {
        管理員: { text: '管理員', status: 'Success' },
        操作員: { text: '操作員', status: 'Processing' },
        審核員: { text: '審核員', status: 'Warning' },
      },
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      valueType: 'select',
      valueEnum: {
        啟用: { text: '啟用', status: 'Success' },
        停用: { text: '停用', status: 'Error' },
      },
      render: (text: any, entity: any) => (
        <Tag color={entity.status === '啟用' ? 'success' : 'error'}>{entity.status}</Tag>
      ),
    },
    {
      title: '建立時間',
      dataIndex: 'createdAt',
      key: 'createdAt',
      valueType: 'date',
      sorter: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            setEditing(record);
            form.setFieldsValue(record);
            setModalOpen(true);
          }}
        >
          編輯
        </a>,
        <a
          key="delete"
          onClick={() => {
            message.success('刪除成功 (Demo)');
          }}
          className="text-red-500"
        >
          刪除
        </a>,
      ],
    },
  ];

  const handleOk = () => {
    form.validateFields().then((values) => {
      message.success(editing ? '用戶已更新 (Demo)' : '用戶已新增 (Demo)');
      setModalOpen(false);
    });
  };

  return (
    <PageContainer
      title="用戶管理"
      subTitle="管理系統用戶，設定角色與權限"
      extra={
        <Button
          type="primary"
          key="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setModalOpen(true);
          }}
        >
          新增用戶
        </Button>
      }
    >
      {(!data || data.length === 0) && !isLoading && (
        <Alert
          message="⚠️ 現在不是真實資料"
          description="目前未能從數據庫取得用戶資料，顯示的是演示數據。"
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <ProTable
        columns={columns}
        dataSource={data || []}
        rowKey="id"
        loading={isLoading}
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        dateFormatter="string"
        toolbar={{
          title: '用戶列表',
        }}
        cardProps={{
          bordered: true,
          style: { borderRadius: 8 }
        }}
      />

      <Modal
        title={editing ? '編輯用戶' : '新增用戶'}
        open={modalOpen}
        onOk={handleOk}
        onCancel={() => setModalOpen(false)}
        width={500}
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '請輸入姓名' }]}
          >
            <Input placeholder="請輸入姓名" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: '請輸入 Email' }, { type: 'email', message: '請輸入有效的 Email' }]}
          >
            <Input placeholder="請輸入 Email" />
          </Form.Item>
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '請選擇角色' }]}
          >
            <Select
              options={[
                { value: '管理員', label: '管理員' },
                { value: '操作員', label: '操作員' },
                { value: '審核員', label: '審核員' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="狀態"
            rules={[{ required: true, message: '請選擇狀態' }]}
          >
            <Select
              options={[
                { value: '啟用', label: '啟用' },
                { value: '停用', label: '停用' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
