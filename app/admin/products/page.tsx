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
  Card,
  ConfigProvider,
} from 'antd';
import zhTW from 'antd/es/locale/zh_TW';
// ProCard 已移除，改用 antd Card
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
  PlusOutlined,
} from '@ant-design/icons';
import PageContainer from '../components/PageContainer';

const { Title } = Typography;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductsPage() {
  const { data, isLoading } = useSWR('/api/mock/products', fetcher);
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
      search: true,
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
            preview={true}
            style={{ borderRadius: 4 }}
          />
          <span className="font-medium">{entity.name}</span>
        </Space>
      ),
    },
    {
      title: '價格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      sorter: (a: any, b: any) => a.price - b.price,
      search: true,
      render: (_dom: any, entity: any) => (
        <span className="text-emerald-600 font-bold">${entity.price.toFixed(2)}</span>
      ),
    },
    {
      title: '類別',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      filters: [
        { text: '電子產品', value: 'Electronics' },
        { text: '收藏品', value: 'Collectibles' },
        { text: '時尚', value: 'Fashion' },
      ],
      search: true,
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
      search: true,
      render: (_dom: any, entity: any) => (
        <Tag color={entity.stock > 10 ? 'success' : entity.stock > 0 ? 'warning' : 'error'}>
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
      render: (_dom: any, entity: any) => <span className="text-gray-500">{entity.createdAt}</span>,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      valueType: 'option',
      render: (_dom: any, entity: any) => (
        <Space>
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => onEdit(entity)}>
            編輯
          </Button>
          <Popconfirm
            title="確認刪除"
            description="確定要刪除此商品嗎？"
            onConfirm={() => onDelete(entity.id)}
            okText="是"
            cancelText="否"
          >
            <Button type="text" size="small" danger icon={<DeleteOutlined />}>
              刪除
            </Button>
          </Popconfirm>
        </Space>
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
      duration: 2,
      icon: <DeleteOutlined style={{ color: '#3f8600' }} />,
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
        description: 'Demo操作，未實際儲存',
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
      content: `確定要刪除選取的 ${selectedRowKeys.length} 件商品嗎？`,
      okText: '確定',
      cancelText: '取消',
      onOk() {
        notification.success({
          message: '批次刪除成功',
          description: `已刪除 ${selectedRowKeys.length} 件商品（Demo）`,
          placement: 'topRight',
        });
        setSelectedRowKeys([]);
      },
    });
  }

  return (
    <PageContainer
      title="商品管理"
      subTitle="管理商品資訊，支援搜尋、篩選、批次操作"
      extra={
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
            新增商品
          </Button>
          <Button danger onClick={batchDelete} disabled={selectedRowKeys.length === 0}>
            批次刪除 ({selectedRowKeys.length})
          </Button>
        </Space>
      }
    >
      {/* 骨架屏 loading 效果 */}
      {isLoading ? (
        <ProSkeleton type="list" active />
      ) : (
        <>
          {/* 統計卡片一行 4 個橫向排列 */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card
                style={{
                  borderRadius: 8,
                  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
                }}
                hoverable
                variant="outlined"
              >
                <Space>
                  <AppstoreOutlined
                    style={{
                      fontSize: 24,
                      color: '#1890ff',
                      padding: 8,
                      background: '#e6f7ff',
                      borderRadius: '50%',
                    }}
                  />
                  <Statistic
                    title="總商品數"
                    value={data?.length ?? 0}
                    style={{ fontWeight: 600 }}
                    formatter={(value) => (
                      <CountUp end={Number(value)} duration={1.2} separator="," />
                    )}
                  />
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                style={{
                  borderRadius: 8,
                  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
                }}
                hoverable
                variant="outlined"
              >
                <Space>
                  <ShoppingOutlined
                    style={{
                      fontSize: 24,
                      color: '#52c41a',
                      padding: 8,
                      background: '#f6ffed',
                      borderRadius: '50%',
                    }}
                  />
                  <Statistic
                    title="總庫存"
                    value={data?.reduce((sum: number, p: any) => sum + p.stock, 0) ?? 0}
                      style={{ fontWeight: 600 }}
                    formatter={(value) => (
                      <CountUp end={Number(value)} duration={1.2} separator="," />
                    )}
                  />
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                style={{
                  borderRadius: 8,
                  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
                }}
                hoverable
                variant="outlined"
              >
                <Space>
                  <CloseCircleOutlined
                    style={{
                      fontSize: 24,
                      color: '#f5222d',
                      padding: 8,
                      background: '#fff1f0',
                      borderRadius: '50%',
                    }}
                  />
                  <Statistic
                    title="缺貨商品"
                    value={data?.filter((p: any) => p.stock === 0).length ?? 0}
                      style={{ fontWeight: 600 }}
                    formatter={(value) => (
                      <CountUp end={Number(value)} duration={1.2} separator="," />
                    )}
                  />
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                style={{
                  borderRadius: 8,
                  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
                }}
                hoverable
                variant="outlined"
              >
                <Space>
                  <WarningOutlined
                    style={{
                      fontSize: 24,
                      color: '#faad14',
                      padding: 8,
                      background: '#fffbe6',
                      borderRadius: '50%',
                    }}
                  />
                  <Statistic
                    title="低庫存預警"
                    value={data?.filter((p: any) => p.stock > 0 && p.stock <= 10).length ?? 0}
                      style={{ fontWeight: 600 }}
                    formatter={(value) => (
                      <CountUp end={Number(value)} duration={1.2} separator="," />
                    )}
                  />
                </Space>
              </Card>
            </Col>
          </Row>

          <ProTable
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={isLoading}
            pagination={{ pageSize: 10 }}
            search={{
              labelWidth: 'auto',
              collapsed: false,
            }}
            actionRef={actionRef}
            options={{
              setting: true,
              density: true,
              fullScreen: true,
            }}
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
            cardProps={{
              title: '商品列表',
              style: { borderRadius: 8 },
            }}
            tableStyle={{ overflow: 'hidden' }}
            rowClassName={() => 'pro-table-row-hover'}
          />

          {/* 新增/編輯 Modal */}
          <Modal
            title={editing ? '編輯商品' : '新增商品'}
            open={modalOpen}
            onOk={handleOk}
            onCancel={() => setModalOpen(false)}
            okText="儲存"
            cancelText="取消"
            width={600}
            centered
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
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上傳</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item
                name="name"
                label="商品名稱"
                rules={[{ required: true, message: '請輸入商品名稱' }]}
              >
                <Input placeholder="請輸入" />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="price"
                    label="價格"
                    rules={[{ required: true, message: '請輸入價格' }]}
                  >
                    <InputNumber
                      min={0}
                      placeholder="請輸入"
                      style={{ width: '100%' }}
                      prefix="$"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="stock"
                    label="庫存"
                    rules={[{ required: true, message: '請輸入庫存' }]}
                  >
                    <InputNumber min={0} placeholder="請輸入" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="category"
                label="類別"
                rules={[{ required: true, message: '請選取類別' }]}
              >
                <Select
                  placeholder="請選擇"
                  options={[
                    { value: 'Electronics', label: '電子產品' },
                    { value: 'Collectibles', label: '收藏品' },
                    { value: 'Fashion', label: '時尚' },
                  ]}
                />
              </Form.Item>
              <Form.Item name="description" label="描述">
                <Input.TextArea placeholder="請輸入商品描述" rows={4} />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </PageContainer>
  );
}
