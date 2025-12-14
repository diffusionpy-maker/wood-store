'use client';
import useSWR from 'swr';
import { Typography, Modal, Form, Input, message, Button, Space, Popconfirm, Row, Col, Statistic, Tag, Alert } from 'antd';
import { Card, Table } from 'antd';
import { useState, useRef } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined, AppstoreOutlined, CheckSquareOutlined, ThunderboltOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import PageContainer from '../components/PageContainer';

const { Title } = Typography;
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CategoriesPage() {
  const { data, isLoading } = useSWR('/api/admin/categories', fetcher);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const actionRef = useRef();

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      // search: false,
    },
    {
      title: '類別名稱',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      // search: true,
      render: (dom: React.ReactNode, entity: any) => <Tag color="blue">{entity.name}</Tag>
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      ellipsis: true,
      // search: false,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right' as 'right',
      // valueType: 'option',
      render: (_: any, record: any) => [
        <a key="edit" onClick={() => onEdit(record)}>編輯</a>,
        <Popconfirm
          key="delete"
          title="確認刪除"
          description="確定要刪除此類別嗎？"
          onConfirm={() => onDelete(record.id)}
          okText="是"
          cancelText="否"
        >
          <a key="delete" className="text-red-500">刪除</a>
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
    <PageContainer
      title="類別管理"
      subTitle="管理商品分類，支援新增、編輯、批量操作"
      extra={
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>新增類別</Button>
          <Button danger onClick={batchDelete} disabled={selectedRowKeys.length === 0}>
            批量刪除 ({selectedRowKeys.length})
          </Button>
        </Space>
      }
    >
      {/* 統計卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: 8, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }} hoverable>
            <Space>
              <AppstoreOutlined style={{ fontSize: 24, color: '#1890ff', padding: 8, background: '#e6f7ff', borderRadius: '50%' }} />
              <Statistic title="總類別數" value={data?.length ?? 0} valueStyle={{ fontWeight: 600 }} />
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: 8, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }} hoverable>
            <Space>
              <CheckSquareOutlined style={{ fontSize: 24, color: '#faad14', padding: 8, background: '#fffbe6', borderRadius: '50%' }} />
              <Statistic title="已選擇" value={selectedRowKeys.length} valueStyle={{ fontWeight: 600 }} />
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderRadius: 8, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }} hoverable>
            <Space>
              <ThunderboltOutlined style={{ fontSize: 24, color: '#52c41a', padding: 8, background: '#f6ffed', borderRadius: '50%' }} />
              <Statistic title="管理效率" value={95} suffix="%" valueStyle={{ fontWeight: 600 }} />
            </Space>
          </Card>
        </Col>
      </Row>

      {(!data || data.length === 0) && !isLoading && (
        <Alert
          message="⚠️ 現在不是真實資料"
          description="目前未能從數據庫取得分類資料，顯示的是演示數據。"
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        style={{ borderRadius: 8 }}
      />

      {/* 新增/編輯 Modal */}
      <Modal
        title={editing ? '編輯類別' : '新增類別'}
        open={modalOpen}
        onOk={handleOk}
        onCancel={() => setModalOpen(false)}
        okText="儲存"
        cancelText="取消"
        width={500}
        centered
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
    </PageContainer>
  );
}