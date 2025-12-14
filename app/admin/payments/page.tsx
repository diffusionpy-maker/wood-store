'use client';
import useSWR from 'swr';
import {
  Typography,
  Tag,
  Row,
  Col,
  Statistic,
  Button,
  Space,
  Modal,
  Upload,
  Alert,
} from 'antd';
import { Card, Table, Skeleton } from 'antd';
import { useState, useRef, useEffect } from 'react';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  PlusOutlined,
  BankOutlined,
} from '@ant-design/icons';
import PageContainer from '../components/PageContainer';
// 表格 hover 效果 CSS
import './payments-table-hover.css';

const { Title } = Typography;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const statusColorMap: Record<string, string> = {
  confirmed: 'green',
  failed: 'red',
  pending: 'orange',
};

const statusTextMap: Record<string, string> = {
  confirmed: '已確認',
  failed: '失敗',
  pending: '待確認',
};

export default function PaymentsPage() {
  const { data, isLoading } = useSWR('/api/admin/payments', fetcher);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  // 憑證圖片上傳/預覽
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      // search: false,
    },
    {
      title: '訂單編號',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: 120,
      // search: true,
    },
    {
      title: '金流商',
      dataIndex: 'provider',
      key: 'provider',
      width: 120,
      filters: [
        { text: 'Stripe', value: 'Stripe' },
        { text: 'PayPal', value: 'PayPal' },
        { text: '信用卡', value: '信用卡' },
      ],
      render: (_dom: any, entity: any) => <Tag color="processing">{entity.provider}</Tag>,
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      filters: [
        { text: '已確認', value: 'confirmed' },
        { text: '待確認', value: 'pending' },
        { text: '失敗', value: 'failed' },
      ],
      render: (_dom: any, entity: any) => {
        const iconMap: Record<string, React.ReactNode> = {
          confirmed: <CheckCircleOutlined style={{ marginRight: 4, color: '#52c41a' }} />,
          failed: <CloseCircleOutlined style={{ marginRight: 4, color: '#f5222d' }} />,
          pending: <ClockCircleOutlined style={{ marginRight: 4, color: '#faad14' }} />,
        };
        return (
          <span>
            {iconMap[entity.status]}
            <Tag color={statusColorMap[entity.status] || 'default'}>
              {statusTextMap[entity.status] || entity.status}
            </Tag>
          </span>
        );
      },
    },
    {
      title: '金額',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      sorter: (a: any, b: any) => a.amount - b.amount,
      render: (_dom: any, entity: any) => (
        <span style={{ color: '#f5222d', fontWeight: 'bold' }}>¥{entity.amount}</span>
      ),
    },
    {
      title: '訊息',
      dataIndex: 'message',
      key: 'message',
      width: 200,
      ellipsis: true,
    },
    {
      title: '建立時間',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      search: true,
      // valueType: 'dateRange',
      sorter: true,
      render: (_dom: any, entity: any) => entity.createdAt,
    },
  ];

  const stats = data
    ? {
      total: data.length,
      confirmed: data.filter((p: any) => p.status === 'confirmed').length,
      pending: data.filter((p: any) => p.status === 'pending').length,
      failed: data.filter((p: any) => p.status === 'failed').length,
      totalAmount: data.reduce((sum: number, p: any) => sum + (p.amount || 0), 0),
    }
    : { total: 0, confirmed: 0, pending: 0, failed: 0, totalAmount: 0 };

  return (
    <PageContainer
      title="金流紀錄"
      subTitle="查看所有金流交易與狀態，支援篩選、搜尋、下載報表"
      extra={
        <Button icon={<DownloadOutlined />}>下載報表</Button>
      }
    >
      {/* 骨架屏 loading 效果 */}
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <>
          {/* 統計卡片 */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card style={{ borderRadius: 8, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }} hoverable>
                <Space>
                  <BankOutlined style={{ fontSize: 24, color: '#1890ff', padding: 8, background: '#e6f7ff', borderRadius: '50%' }} />
                   <Statistic title="總交易筆數" value={stats.total} style={{ fontWeight: 600 }} />
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card style={{ borderRadius: 8, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }} hoverable>
                <Space>
                  <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a', padding: 8, background: '#f6ffed', borderRadius: '50%' }} />
                  <Statistic title="成功交易" value={stats.confirmed} style={{ fontWeight: 600 }} />
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card style={{ borderRadius: 8, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }} hoverable>
                <Space>
                  <ClockCircleOutlined style={{ fontSize: 24, color: '#faad14', padding: 8, background: '#fffbe6', borderRadius: '50%' }} />
                  <Statistic title="待確認" value={stats.pending} style={{ fontWeight: 600 }} />
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card style={{ borderRadius: 8, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }} hoverable>
                <Space>
                  <CloseCircleOutlined style={{ fontSize: 24, color: '#f5222d', padding: 8, background: '#fff1f0', borderRadius: '50%' }} />
                  <Statistic title="失敗交易" value={stats.failed} style={{ fontWeight: 600 }} />
                </Space>
              </Card>
            </Col>
          </Row>

          <Card style={{ borderRadius: 8, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={data}
              loading={isLoading}
              pagination={{ pageSize: 10 }}
              style={{ overflow: 'hidden', borderRadius: 8 }}
              className="pro-table-row-hover"
            />
          </Card>

          {/* 金流憑證 Modal（Demo，僅顯示第一筆） */}
          <Modal
            title="金流憑證上傳/預覽"
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            width={600}
            footer={null}
            centered
          >
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
          </Modal>
        </>
      )}
    </PageContainer>
  );
}
