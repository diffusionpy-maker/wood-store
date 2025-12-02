'use client';
import { Card, Statistic, Row, Col, DatePicker, Space, Button } from 'antd';
import {DownloadOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import PageContainer from '../components/PageContainer';
// ProCard 已移除，改用 Card

const { RangePicker } = DatePicker;

const data = [
  { name: '1月', uv: 4000, pv: 2400, amt: 2400 },
  { name: '2月', uv: 3000, pv: 1398, amt: 2210 },
  { name: '3月', uv: 2000, pv: 9800, amt: 2290 },
  { name: '4月', uv: 2780, pv: 3908, amt: 2000 },
  { name: '5月', uv: 1890, pv: 4800, amt: 2181 },
  { name: '6月', uv: 2390, pv: 3800, amt: 2500 },
  { name: '7月', uv: 3490, pv: 4300, amt: 2100 },
];

const pieData = [
  { name: 'Electronics', value: 400 },
  { name: 'Fashion', value: 300 },
  { name: 'Home', value: 300 },
  { name: 'Others', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ReportsPage() {
  return (
    <PageContainer
      title="報表分析"
      subTitle="查看系統各項數據分析與趨勢"
      extra={
        <Space>
          <RangePicker />
          <Button icon={<DownloadOutlined />}>匯出報表</Button>
        </Space>
      }
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 8, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }} hoverable>
            <Statistic
              title="總營收"
              value={112893}
              precision={2}
              style={{ color: '#3f8600' }}
              prefix="$"
              suffix=""
            />
            <div className="flex items-center mt-2 text-green-500">
              <RiseOutlined /> <span className="ml-1">12% 較上月</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 8, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }} hoverable>
            <Statistic
              title="訂單量"
              value={320}
              style={{ color: '#1677ff' }}
            />
            <div className="flex items-center mt-2 text-green-500">
              <RiseOutlined /> <span className="ml-1">5% 較上月</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 8, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }} hoverable>
            <Statistic
              title="活躍用戶"
              value={85}
              style={{ color: '#cf1322' }}
            />
            <div className="flex items-center mt-2 text-red-500">
              <FallOutlined /> <span className="ml-1">2% 較上月</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 8, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }} hoverable>
            <Statistic
              title="轉換率"
              value={2.4}
              precision={1}
              style={{ color: '#722ed1' }}
              suffix="%"
            />
            <div className="flex items-center mt-2 text-green-500">
              <RiseOutlined /> <span className="ml-1">0.4% 較上月</span>
            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="營收趨勢" variant="outlined" style={{ borderRadius: 8 }}>
            <div style={{ width: '100%', height: 350 }}>
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
                  <Area type="monotone" dataKey="pv" stroke="#52c41a" fill="#52c41a" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="銷售分佈" variant="outlined" style={{ borderRadius: 8 }}>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="uv" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="類別佔比" variant="outlined" style={{ borderRadius: 8 }}>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
}
