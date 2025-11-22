"use client";
import useSWR from 'swr';
import { Typography, Modal, Form, Input, message, Button, Space, Popconfirm, Row, Col, Statistic, Tag } from 'antd';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import { useState, useRef } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';

const { Title } = Typography;
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CategoriesPage() {
  const { data, isLoading } = useSWR('/api/mock/categories', fetcher);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const actionRef = useRef();

  const columns: ProColumns<any, string>[] = [
    { 
      title: 'ID', 
      dataIndex: 'id', 
      key: 'id',
      width: 80,
    },
    { 
      title: '類別名稱', 
      dataIndex: 'name', 
      key: 'name',
      width: 200,
      search: true,
      render: (dom: React.ReactNode, entity: any) => <Tag color="blue">{entity.name}</Tag>
    },
    { 
      title: '描述', 
      dataIndex: 'description', 
      key: 'description',
      width: 300,
      ellipsis: true,
      search: false,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right' as 'right',
      valueType: 'option',
      render: (_: any, record: any) => [
        <Button type="link" size="small" key="edit" icon={<EditOutlined />} onClick={() => onEdit(record)}>編輯</Button>,
        <Popconfirm
          key="delete"
          title="確認刪除"
          description="確定要刪除此類別嗎？"
          onConfirm={() => onDelete(record.id)}
          okText="是"
          cancelText="否"
        >
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>刪除</Button>
        </Popconfirm>
      ]
    }
  ];

  function onEdit(record: any) {
    setEditing(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  }

  function onDelete(id: number) {
    message.success(`已刪除類別 #${id}（Demo 無實際刪除）`);
  }

  function batchDelete() {
    if (selectedRowKeys.length === 0) {
      message.warning('請先選擇要刪除的類別');
      return;
    }
    Modal.confirm({
      title: '批量刪除',
      content: `確定要刪除選中的 ${selectedRowKeys.length} 個類別嗎？`,
      okText: '確定',
      cancelText: '取消',
      onOk() {
        message.success(`已刪除 ${selectedRowKeys.length} 個類別（Demo）`);
        setSelectedRowKeys([]);
      }
    });
  }

  function onAdd() {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  }

  function handleOk() {
    form.validateFields().then(values => {
      message.success(editing ? '類別已更新（Demo）' : '類別已新增（Demo）');
      setModalOpen(false);
    });
  }

  return (
    <ProCard ghost direction="column" gutter={[16, 16]} style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <ProCard ghost>
        <Title level={3} style={{ color: '#1677ff', fontWeight: 700, marginBottom: 8 }}>類別管理</Title>
        <span style={{ color: '#888' }}>管理商品分類，支援新增、編輯、批量操作</span>
      </ProCard>

      {/* 統計卡片 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <ProCard bordered style={{ background: '#fff' }}>
            <Statistic title="總類別數" value={data?.length ?? 0} valueStyle={{ color: '#1890ff' }} />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <ProCard bordered style={{ background: '#fff' }}>
            <Statistic title="已選擇" value={selectedRowKeys.length} valueStyle={{ color: '#faad14' }} />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <ProCard bordered style={{ background: '#fff' }}>
            <Statistic title="管理效率" value={95} suffix="%" valueStyle={{ color: '#52c41a' }} />
          </ProCard>
        </Col>
      </Row>

      {/* 表格 */}
      <ProCard bordered style={{ background: '#fff' }}>
        <Space style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <Button type="primary" onClick={onAdd}>新增類別</Button>
            <Button danger onClick={batchDelete} disabled={selectedRowKeys.length === 0}>
              批量刪除 ({selectedRowKeys.length})
            </Button>
          </Space>
        </Space>
        <ProTable
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={isLoading}
          pagination={{ pageSize: 10 }}
          search={{
            labelWidth: 'auto',
          }}
          actionRef={actionRef}
          options={{
            setting: false,
          }}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
        />
      </ProCard>

      {/* 新增/編輯 Modal */}
      <Modal
        title={editing ? '編輯類別' : '新增類別'}
        open={modalOpen}
        onOk={handleOk}
        onCancel={() => setModalOpen(false)}
        okText="儲存"
        cancelText="取消"
        width={500}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="類別名稱" rules={[{ required: true, message: '請輸入類別名稱' }]}> 
            <Input placeholder="輸入類別名稱" /> 
          </Form.Item>
          <Form.Item name="description" label="描述"> 
            <Input.TextArea placeholder="輸入類別描述" rows={3} /> 
          </Form.Item>
        </Form>
      </Modal>
    </ProCard>
  );
}