'use client';
import useSWR from 'swr';
import {
  Typography,
  Tag,
  Button,
  Modal,
  Descriptions,
  message,
  Space,
  Timeline,
  Divider,
  Row,
  Col,
  Statistic,
  Avatar,
  Tooltip,
  Card,
  Upload,
} from 'antd';
import ProCard from '@ant-design/pro-card';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import ProSkeleton from '@ant-design/pro-skeleton';
import { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  EnvironmentOutlined,
  FileDoneOutlined,
  DollarCircleOutlined,
  ShoppingOutlined,
  CarOutlined,
  DeliveredProcedureOutlined,
} from '@ant-design/icons';
// 表格 hover 效果 CSS
import './orders-table-hover.css';

const { Title } = Typography;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const statusColorMap: Record<string, string> = {
  pending: 'orange',
  paid: 'blue',
  shipped: 'cyan',
  delivered: 'green',
  canceled: 'red',
};

const statusTextMap: Record<string, string> = {
  pending: '待付款',
  paid: '已付款',
  shipped: '已出貨',
  delivered: '已配送',
  canceled: '已取消',
};

export default function OrdersPage() {
  const { data, isLoading } = useSWR('/api/mock/orders', fetcher);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const actionRef = useRef();

  const columns: ProColumns<any>[] = [
    {
      title: '訂單編號',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: 120,
    },
    {
      title: '用戶',
      dataIndex: 'user',
      key: 'user',
      width: 120,
      render: (_dom: any, entity: any) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <span>{entity.user}</span>
        </Space>
      ),
    },
    {
      title: '總金額',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 100,
      sorter: (a: any, b: any) => a.totalPrice - b.totalPrice,
      render: (_dom: any, entity: any) => (
        <span style={{ color: '#f5222d', fontWeight: 'bold' }}>¥{entity.totalPrice}</span>
      ),
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      filters: [
        { text: '待付款', value: 'pending' },
        { text: '已付款', value: 'paid' },
        { text: '已出貨', value: 'shipped' },
        { text: '已配送', value: 'delivered' },
        { text: '已取消', value: 'canceled' },
      ],
      render: (_dom: any, entity: any) => (
        <Tag color={statusColorMap[entity.status] || 'default'}>
          {statusTextMap[entity.status] || entity.status}
        </Tag>
      ),
    },
    {
      title: '商品數',
      key: 'itemCount',
      width: 80,
      render: (_dom: any, entity: any) => `${entity.items?.length || 0} 件`,
    },
    {
      title: '建立時間',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      search: true,
      valueType: 'dateRange',
      sorter: true,
      render: (_dom: any, entity: any) => entity.createdAt,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      fixed: 'right',
      valueType: 'option',
      render: (_: unknown, record: any) => (
        <Button type="link" size="small" onClick={() => onDetail(record)}>
          詳情
        </Button>
      ),
    },
  ];

  function onDetail(record: any) {
    setSelected(record);
    setModalOpen(true);
    setFileList(record?.images || []);
  }

  function handleStatusChange(status: string) {
    message.success(`訂單狀態已改為 ${statusTextMap[status]}（Demo）`);
    setModalOpen(false);
  }

  // 圖片上傳/預覽
  const handleUploadChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };
  const handlePreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const imgWindow = window.open(src);
    if (imgWindow) {
      imgWindow.document.write(`<img src='${src}' style='max-width:100%' />`);
    }
  };

  const stats = data
    ? {
        total: data.length,
        pending: data.filter((o: any) => o.status === 'pending').length,
        paid: data.filter((o: any) => o.status === 'paid').length,
        shipped: data.filter((o: any) => o.status === 'shipped').length,
        delivered: data.filter((o: any) => o.status === 'delivered').length,
      }
    : { total: 0, pending: 0, paid: 0, shipped: 0, delivered: 0 };

  return (
    <ProCard
      ghost
      direction="column"
      gutter={[16, 16]}
      style={{ minHeight: '100vh', background: '#f5f5f5' }}
    >
      <ProCard ghost>
        <Title level={3} style={{ color: '#1677ff', fontWeight: 700, marginBottom: 8 }}>
          訂單管理
        </Title>
        <span style={{ color: '#888' }}>管理訂單資訊，支援詳情、狀態修改、多維度統計</span>
      </ProCard>

      {/* 骨架屏 loading 效果 */}
      {isLoading ? (
        <ProSkeleton type="list" active />
      ) : (
        <>
          {/* 統計卡片（Ant Design Card，variant="outlined"） */}
          <Row gutter={[16, 16]} style={{ marginBottom: 8 }}>
            <Col xs={24} sm={12} lg={4.8}>
              <Card
                variant="outlined"
                style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e6e6e6' }}
                hoverable
              >
                <Space>
                  <FileDoneOutlined style={{ fontSize: 32, color: '#1890ff' }} />
                  <Statistic
                    title="總訂單數"
                    value={stats.total}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={4.8}>
              <Card
                variant="outlined"
                style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e6e6e6' }}
                hoverable
              >
                <Space>
                  <DollarCircleOutlined style={{ fontSize: 32, color: '#faad14' }} />
                  <Statistic
                    title="待付款"
                    value={stats.pending}
                    valueStyle={{ color: '#faad14' }}
                  />
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={4.8}>
              <Card
                variant="outlined"
                style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e6e6e6' }}
                hoverable
              >
                <Space>
                  <ShoppingOutlined style={{ fontSize: 32, color: '#1890ff' }} />
                  <Statistic title="已付款" value={stats.paid} valueStyle={{ color: '#1890ff' }} />
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={4.8}>
              <Card
                variant="outlined"
                style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e6e6e6' }}
                hoverable
              >
                <Space>
                  <CarOutlined style={{ fontSize: 32, color: '#1890ff' }} />
                  <Statistic
                    title="已出貨"
                    value={stats.shipped}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={4.8}>
              <Card
                variant="outlined"
                style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e6e6e6' }}
                hoverable
              >
                <Space>
                  <DeliveredProcedureOutlined style={{ fontSize: 32, color: '#52c41a' }} />
                  <Statistic
                    title="已配送"
                    value={stats.delivered}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Space>
              </Card>
            </Col>
          </Row>

          {/* 分隔線 */}
          <Divider style={{ margin: '8px 0 16px 0' }} />

          {/* 表格 */}
          <ProCard
            bordered
            style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #e6e6e6' }}
          >
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
              tableStyle={{ borderRadius: 12, overflow: 'hidden' }}
              rowClassName={() => 'pro-table-row-hover'}
            />
          </ProCard>

          {/* 詳情 Modal */}
          <Modal
            title="訂單詳情"
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            width={700}
            footer={
              selected && selected.status !== 'canceled' && selected.status !== 'delivered'
                ? [
                    <Button
                      key="paid"
                      onClick={() => handleStatusChange('paid')}
                      style={{ display: selected.status === 'pending' ? 'inline-block' : 'none' }}
                    >
                      標記為已付款
                    </Button>,
                    <Button
                      key="shipped"
                      onClick={() => handleStatusChange('shipped')}
                      style={{ display: selected.status === 'paid' ? 'inline-block' : 'none' }}
                    >
                      標記為已出貨
                    </Button>,
                    <Button
                      key="deliver"
                      onClick={() => handleStatusChange('delivered')}
                      style={{ display: selected.status === 'shipped' ? 'inline-block' : 'none' }}
                    >
                      標記為已配送
                    </Button>,
                    <Button key="cancel" danger onClick={() => handleStatusChange('canceled')}>
                      取消訂單
                    </Button>,
                  ]
                : null
            }
          >
            {selected && (
              <div style={{ paddingTop: 16 }}>
                {/* 基本信息 */}
                <Descriptions column={2} bordered size="small" style={{ marginBottom: 24 }}>
                  <Descriptions.Item label="訂單編號">{selected.orderNumber}</Descriptions.Item>
                  <Descriptions.Item label="狀態">
                    <Tag color={statusColorMap[selected.status] || 'default'}>
                      {statusTextMap[selected.status] || selected.status}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="用戶">{selected.user}</Descriptions.Item>
                  <Descriptions.Item label="建立時間">{selected.createdAt}</Descriptions.Item>
                  <Descriptions.Item label="總金額" span={2}>
                    <span style={{ color: '#f5222d', fontWeight: 'bold', fontSize: 16 }}>
                      ¥{selected.totalPrice}
                    </span>
                  </Descriptions.Item>
                </Descriptions>

                {/* 訂單圖片上傳/預覽 */}
                <Divider>訂單圖片</Divider>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  onPreview={handlePreview}
                  beforeUpload={() => false}
                  multiple
                  maxCount={5}
                  showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
                >
                  {fileList.length >= 5 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>上傳</div>
                    </div>
                  )}
                </Upload>

                <Divider>訂單商品</Divider>

                {/* 商品列表 */}
                {selected.items &&
                  selected.items.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingBottom: 12,
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      <span>{item.product}</span>
                      <span>數量: {item.quantity}</span>
                      <span>¥{item.price * item.quantity}</span>
                    </div>
                  ))}

                <Divider>配送信息</Divider>

                {/* 配送時間線 */}
                <Timeline
                  items={[
                    {
                      dot: <CheckCircleOutlined style={{ fontSize: 16, color: '#52c41a' }} />,
                      children: (
                        <div>
                          <strong>訂單已下單</strong>
                          <br />
                          <span style={{ color: '#888' }}>{selected.createdAt}</span>
                        </div>
                      ),
                    },
                    {
                      dot:
                        selected.status !== 'pending' ? (
                          <CheckCircleOutlined style={{ fontSize: 16, color: '#52c41a' }} />
                        ) : (
                          <ClockCircleOutlined style={{ fontSize: 16, color: '#faad14' }} />
                        ),
                      children: (
                        <div>
                          <strong>待支付/已支付</strong>
                          <br />
                          <span style={{ color: '#888' }}>預計 2小時內</span>
                        </div>
                      ),
                    },
                    {
                      dot: ['shipped', 'delivered'].includes(selected.status) ? (
                        <CheckCircleOutlined style={{ fontSize: 16, color: '#52c41a' }} />
                      ) : (
                        <ClockCircleOutlined style={{ fontSize: 16, color: '#bfbfbf' }} />
                      ),
                      children: (
                        <div>
                          <strong>準備出貨</strong>
                          <br />
                          <span style={{ color: '#888' }}>預計 24小時內</span>
                        </div>
                      ),
                    },
                    {
                      dot:
                        selected.status === 'delivered' ? (
                          <CheckCircleOutlined style={{ fontSize: 16, color: '#52c41a' }} />
                        ) : (
                          <ClockCircleOutlined style={{ fontSize: 16, color: '#bfbfbf' }} />
                        ),
                      children: (
                        <div>
                          <strong>配送中</strong>
                          <br />
                          <span style={{ color: '#888' }}>預計 3-5 個工作天</span>
                        </div>
                      ),
                    },
                  ]}
                />

                <Divider>收貨地址</Divider>

                <div style={{ display: 'flex', gap: 12 }}>
                  <EnvironmentOutlined style={{ fontSize: 18, color: '#1890ff', marginTop: 2 }} />
                  <div>
                    <div>
                      <strong>John Doe</strong>
                    </div>
                    <div style={{ color: '#888', fontSize: 12 }}>+1 234-567-8900</div>
                    <div style={{ marginTop: 4 }}>
                      123 Main Street, Apt 4B, New York, NY 10001, USA
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </>
      )}
    </ProCard>
  );
}
