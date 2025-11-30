'use client';
import { Card, Col, Row, Statistic, Table, Tag, Avatar, List, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, ShoppingCartOutlined, UserOutlined, DollarOutlined, RiseOutlined } from '@ant-design/icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageContainer from './components/PageContainer';

const { Title, Text } = Typography;

const data = [
  { name: '1月', uv: 4000, pv: 2400, amt: 2400 },
  { name: '2月', uv: 3000, pv: 1398, amt: 2210 },
  { name: '3月', uv: 2000, pv: 9800, amt: 2290 },
  { name: '4月', uv: 2780, pv: 3908, amt: 2000 },
  { name: '5月', uv: 1890, pv: 4800, amt: 2181 },
  { name: '6月', uv: 2390, pv: 3800, amt: 2500 },
  { name: '7月', uv: 3490, pv: 4300, amt: 2100 },
];

const recentOrders = [
  {
    key: '1',
    orderNo: '#ORD-001',
    customer: 'John Doe',
    amount: '$120.00',
    status: 'completed',
  },
  {
    key: '2',
    orderNo: '#ORD-002',
    customer: 'Jane Smith',
    amount: '$85.50',
    status: 'processing',
  },
  {
    key: '3',
    orderNo: '#ORD-003',
    customer: 'Bob Johnson',
    amount: '$250.00',
    status: 'pending',
  },
  {
    key: '4',
    orderNo: '#ORD-004',
    customer: 'Alice Brown',
    amount: '$60.00',
    status: 'completed',
  },
  {
    key: '5',
    orderNo: '#ORD-005',
    customer: 'Charlie Wilson',
    amount: '$15.00',
    status: 'rejected',
  },
];

const newUsers = [
  {
    key: '1',
    title: 'Ant Design Title 1',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
    description: 'Registered 2 hours ago',
  },
  {
    key: '2',
    title: 'Ant Design Title 2',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
    description: 'Registered 5 hours ago',
  },
  {
    key: '3',
    title: 'Ant Design Title 3',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
    description: 'Registered 1 day ago',
  },
  {
    key: '4',
    title: 'Ant Design Title 4',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=4',
    description: 'Registered 2 days ago',
  },
];

const columns = [
  {
    title: '訂單編號',
    dataIndex: 'orderNo',
    key: 'orderNo',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '客戶',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: '金額',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: '狀態',
    key: 'status',
    dataIndex: 'status',
    render: (status: string) => {
      let color = 'green';
      if (status === 'pending') color = 'gold';
      if (status === 'processing') color = 'blue';
      if (status === 'rejected') color = 'red';
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
];

export default function AdminDashboard({
  user,
}: {
  user: { name?: string | null; email?: string | null };
}) {
  return (
    <PageContainer title="儀表板" subTitle={`歡迎回來, ${user?.name || user?.email}`}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="outlined" hoverable>
            <Statistic
              title="總營收"
              value={112893}
              precision={2}
              styles={{ content: { color: '#3f8600' } }}
              prefix={<DollarOutlined />}
              suffix=""
            />
            <div className="flex items-center mt-2 text-green-500">
              <ArrowUpOutlined /> <span className="ml-1">12% 較上月</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="outlined" hoverable>
            <Statistic
              title="總訂單"
              value={93}
              styles={{ content: { color: '#1677ff' } }}
              prefix={<ShoppingCartOutlined />}
            />
            <div className="flex items-center mt-2 text-green-500">
              <ArrowUpOutlined /> <span className="ml-1">5% 較上月</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="outlined" hoverable>
            <Statistic
              title="總用戶"
              value={1203}
              styles={{ content: { color: '#cf1322' } }}
              prefix={<UserOutlined />}
            />
            <div className="flex items-center mt-2 text-red-500">
              <ArrowDownOutlined /> <span className="ml-1">2% 較上月</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="outlined" hoverable>
            <Statistic
              title="成長率"
              value={9.3}
              precision={2}
              styles={{ content: { color: '#722ed1' } }}
              prefix={<RiseOutlined />}
              suffix="%"
            />
            <div className="flex items-center mt-2 text-green-500">
              <ArrowUpOutlined /> <span className="ml-1">1.2% 較上月</span>
            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="銷售趨勢" variant="outlined">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="uv" stroke="#1677ff" fill="#1677ff" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="近期訂單" variant="outlined">
            <Table columns={columns} dataSource={recentOrders} pagination={false} size="small" />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="新註冊用戶" variant="outlined">
            <Table
              dataSource={newUsers}
              pagination={false}
              size="small"
              columns={[
                {
                  title: '頭像',
                  dataIndex: 'avatar',
                  key: 'avatar',
                  render: (avatar: string) => <Avatar src={avatar} />,
                },
                {
                  title: '用戶名稱',
                  dataIndex: 'title',
                  key: 'title',
                  render: (title: string) => <a href="#">{title}</a>,
                },
                {
                  title: '註冊時間',
                  dataIndex: 'description',
                  key: 'description',
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
}
