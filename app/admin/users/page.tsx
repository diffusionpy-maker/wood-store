'use client';
import { Avatar, Tag, Button, Space, Modal, Form, Input, Select, message } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { PlusOutlined, UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import PageContainer from '../components/PageContainer';

const initialUsers = [
  {
    key: 1,
    name: '王小明',
    email: 'ming@example.com',
    role: '管理員',
    status: '啟用',
    createdAt: '2025-11-01',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
  },
  {
    key: 2,
    name: '李小美',
    email: 'mei@example.com',
    role: '操作員',
    status: '啟用',
    createdAt: '2025-11-10',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
  },
  {
    key: 3,
    name: '陳大華',
    email: 'hua@example.com',
    role: '審核員',
    status: '停用',
    createdAt: '2025-10-25',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
  },
  {
    key: 4,
    name: '林小強',
    email: 'qiang@example.com',
    role: '管理員',
    status: '啟用',
    createdAt: '2025-11-15',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=4',
  },
];

export default function UsersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form] = Form.useForm();
  const [users, setUsers] = useState(initialUsers);

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
      <ProTable
        columns={columns}
        dataSource={users}
        rowKey="key"
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
