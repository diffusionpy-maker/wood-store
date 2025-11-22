'use client';
// 表格 hover 效果 CSS
import './products-table-hover.css';
import useSWR from 'swr';
import CountUp from 'react-countup';
import {
  Typography,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  notification,
  Button,
  Space,
  Tag,
  Image,
  Popconfirm,
  Row,
  Col,
  Statistic,
  Divider,
  Upload,
} from 'antd';
import ProCard from '@ant-design/pro-card';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import ProSkeleton from '@ant-design/pro-skeleton';
import { useState, useRef } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductsPage() {
  const { data, isLoading, mutate } = useSWR('/api/mock/products', fetcher);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const actionRef = useRef();

  const columns: ProColumns<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      search: false,
    },
    {
      title: '商品名稱',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      search: true,
      render: (_dom: any, entity: any) => (
        <Space>
          <Image
            width={40}
            height={40}
            src={`https://via.placeholder.com/40?text=${entity.id}`}
            alt={`商品 ${entity.name}`}
            preview={{
              mask: <EyeOutlined />,
            }}
          />
          <span>{entity.name}</span>
        </Space>
      ),
    },
    {
      title: '價格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      sorter: (a: any, b: any) => a.price - b.price,
      render: (_dom: any, entity: any) => `$${entity.price.toFixed(2)}`,
    },
    {
      title: '類別',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      filters: [
        { text: 'Electronics', value: 'Electronics' },
        { text: 'Collectibles', value: 'Collectibles' },
        { text: 'Fashion', value: 'Fashion' },
      ],
      render: (_dom: any, entity: any) => {
        const colorMap: Record<string, string> = {
          Electronics: 'blue',
          Collectibles: 'purple',
          Fashion: 'pink',
        };
        return <Tag color={colorMap[entity.category] || 'default'}>{entity.category}</Tag>;
      },
    },
    {
      title: '庫存',
      dataIndex: 'stock',
      key: 'stock',
      width: 80,
      sorter: (a: any, b: any) => a.stock - b.stock,
      render: (_dom: any, entity: any) => (
        <Tag color={entity.stock > 10 ? 'green' : entity.stock > 0 ? 'orange' : 'red'}>
          {entity.stock > 0 ? `${entity.stock}件` : '缺貨'}
        </Tag>
      ),
    },
    {
      title: '建立時間',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      search: true,
      valueType: 'dateRange',
      render: (_dom: any, entity: any) => entity.createdAt,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      valueType: 'option',
      render: (_dom: any, entity: any) => (
        <>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => onEdit(entity)}>
            編輯
          </Button>
          <Popconfirm
            title="確認刪除"
            description="確定要刪除此商品嗎？"
            onConfirm={() => onDelete(entity.id)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              刪除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  function onEdit(record: any) {
    setEditing(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  }

  function onDelete(id: number) {
    notification.success({
      message: '刪除成功',
      description: `已刪除商品 #${id}（Demo 無實際刪除）`,
      placement: 'topRight',
    });
  }

  function onAdd() {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  }

  function handleOk() {
    form.validateFields().then((values) => {
      notification.success({
        message: editing ? '商品已更新' : '商品已新增',
        description: 'Demo 操作，未實際儲存',
        placement: 'topRight',
      });
      setModalOpen(false);
    });
  }

  // 批量操作
  function batchDelete() {
    if (selectedRowKeys.length === 0) {
      notification.warning({
        message: '請先選取要刪除的商品',
        placement: 'topRight',
      });
      return;
    }
    Modal.confirm({
      title: '批次刪除',
      content: `確定要刪除選取的 ${selectedRowKeys.length} 個商品嗎？`,
      okText: '確定',
      cancelText: '取消',
      onOk() {
        notification.success({
          message: '批次刪除成功',
          description: `已刪除 ${selectedRowKeys.length} 個商品（Demo）`,
          placement: 'topRight',
        });
        setSelectedRowKeys([]);
      },
    });
  }

  return (
    <ProCard
      ghost
      direction="column"
      gutter={[16, 16]}
      style={{ minHeight: '100vh', background: '#f5f5f5' }}
    >
      <ProCard ghost>
        <Title level={3} style={{ color: '#1677ff', fontWeight: 700, marginBottom: 8 }}>
          商品管理
        </Title>
        <span style={{ color: '#888' }}>管理商品資訊，支援搜尋、篩選、批次操作</span>
      </ProCard>

      {/* 骨架屏 loading 效果 */}
      {isLoading ? (
        <ProSkeleton type="list" active />
      ) : (
        <>
          {/* 統計卡片一行 4 個橫向排列 */}
          <Row gutter={[16, 16]} style={{ marginBottom: 8 }}>
            <Col xs={24} sm={12} lg={6}>
              <ProCard
                bordered
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px #e6e6e6',
                  marginBottom: 0,
                }}
                hoverable
              >
                <Space>
                  <AppstoreOutlined style={{ fontSize: 32, color: '#1890ff' }} />
                  <Statistic
                    title="總商品數"
                    value={data?.length ?? 0}
                    valueStyle={{ color: '#1890ff' }}
                    formatter={(value) => (
                      <CountUp end={Number(value)} duration={1.2} separator="," />
                    )}
                  />
                </Space>
              </ProCard>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <ProCard
                bordered
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px #e6e6e6',
                  marginBottom: 0,
                }}
                hoverable
              >
                <Space>
                  <ShoppingOutlined style={{ fontSize: 32, color: '#52c41a' }} />
                  <Statistic
                    title="總庫存"
                    value={data?.reduce((sum: number, p: any) => sum + p.stock, 0) ?? 0}
                    valueStyle={{ color: '#52c41a' }}
                    formatter={(value) => (
                      <CountUp end={Number(value)} duration={1.2} separator="," />
                    )}
                  />
                </Space>
              </ProCard>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <ProCard
                bordered
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px #e6e6e6',
                  marginBottom: 0,
                }}
                hoverable
              >
                <Space>
                  <CloseCircleOutlined style={{ fontSize: 32, color: '#f5222d' }} />
                  <Statistic
                    title="缺貨商品"
                    value={data?.filter((p: any) => p.stock === 0).length ?? 0}
                    valueStyle={{ color: '#f5222d' }}
                    formatter={(value) => (
                      <CountUp end={Number(value)} duration={1.2} separator="," />
                    )}
                  />
                </Space>
              </ProCard>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <ProCard
                bordered
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px #e6e6e6',
                  marginBottom: 0,
                }}
                hoverable
              >
                <Space>
                  <WarningOutlined style={{ fontSize: 32, color: '#faad14' }} />
                  <Statistic
                    title="低庫存預警"
                    value={data?.filter((p: any) => p.stock > 0 && p.stock <= 10).length ?? 0}
                    valueStyle={{ color: '#faad14' }}
                    formatter={(value) => (
                      <CountUp end={Number(value)} duration={1.2} separator="," />
                    )}
                  />
                </Space>
              </ProCard>
            </Col>
          </Row>

          {/* 分隔線 */}
          <Divider style={{ margin: '8px 0 16px 0' }} />

          {/* 表格卡片寬度限制，margin-top拉近視覺重心 */}
          <ProCard
            bordered
            style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 2px 12px #e6e6e6',
              maxWidth: 1200,
              margin: '24px auto 0 auto',
            }}
          >
            <Space style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
              <Space>
                <Button type="primary" onClick={onAdd}>
                  新增商品
                </Button>
                <Button danger onClick={batchDelete} disabled={selectedRowKeys.length === 0}>
                  批次刪除 ({selectedRowKeys.length})
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
              tableStyle={{ borderRadius: 12, overflow: 'hidden' }}
              rowClassName={() => 'pro-table-row-hover'}
            />
          </ProCard>

          {/* 新增/編輯 Modal */}
          <Modal
            title={editing ? '編輯商品' : '新增商品'}
            open={modalOpen}
            onOk={handleOk}
            onCancel={() => setModalOpen(false)}
            okText="儲存"
            cancelText="取消"
            width={600}
          >
            <Form form={form} layout="vertical">
              <Form.Item label="商品圖片" name="image">
                <Upload
                  listType="picture-card"
                  showUploadList={{ showPreviewIcon: true }}
                  maxCount={1}
                  beforeUpload={() => false} // 禁止自動上傳，Demo用
                >
                  <div>
                    <span style={{ color: '#1677ff' }}>上傳圖片</span>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item
                name="name"
                label="商品名稱"
                rules={[{ required: true, message: '請輸入商品名稱' }]}
              >
                <Input placeholder="輸入商品名稱" />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="price"
                    label="價格"
                    rules={[{ required: true, message: '請輸入價格' }]}
                  >
                    <InputNumber min={0} placeholder="0.00" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="stock"
                    label="庫存"
                    rules={[{ required: true, message: '請輸入庫存' }]}
                  >
                    <InputNumber min={0} placeholder="0" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="category"
                label="類別"
                rules={[{ required: true, message: '請選取類別' }]}
              >
                <Select
                  placeholder="選取類別"
                  options={[
                    { value: 'Electronics', label: 'Electronics' },
                    { value: 'Collectibles', label: 'Collectibles' },
                    { value: 'Fashion', label: 'Fashion' },
                  ]}
                />
              </Form.Item>
              <Form.Item name="description" label="描述">
                <Input.TextArea placeholder="輸入商品描述" rows={4} />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </ProCard>
  );
}
