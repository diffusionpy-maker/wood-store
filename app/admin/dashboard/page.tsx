'use client';
import useSWR from 'swr';
import { Typography, Statistic, Button, Row, Col, Card, Divider, Tabs } from 'antd';
import ProSkeleton from '@ant-design/pro-skeleton';
import ProCard from '@ant-design/pro-card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
} from 'recharts';
import { useState } from 'react';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const COLORS = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'];

export default function DashboardPage() {
  const { data, isLoading } = useSWR('/api/mock/dashboard', fetcher);
  const [selected, setSelected] = useState<string | null>(null);

  // 折線圖
  const mockLineData = [
    { name: '01月', revenue: 4000, orders: 240 },
    { name: '02月', revenue: 3000, orders: 221 },
    { name: '03月', revenue: 2000, orders: 229 },
    { name: '04月', revenue: 2780, orders: 200 },
    { name: '05月', revenue: 1890, orders: 229 },
    { name: '06月', revenue: 2390, orders: 200 },
    { name: '07月', revenue: 3490, orders: 210 },
  ];

  // 圓餅圖
  const mockPieData = [
    { name: '已完成', value: 55 },
    { name: '待發貨', value: 25 },
    { name: '已發貨', value: 15 },
    { name: '已退貨', value: 5 },
  ];

  // 長條圖
  const mockBarData = [
    { name: '商品A', sales: 120 },
    { name: '商品B', sales: 98 },
    { name: '商品C', sales: 86 },
    { name: '商品D', sales: 65 },
    { name: '商品E', sales: 54 },
    { name: '商品F', sales: 43 },
    { name: '商品G', sales: 32 },
  ];

  // 雷達圖
  const mockRadarData = [
    { subject: '瀏覽', A: 120, fullMark: 150 },
    { subject: '下單', A: 98, fullMark: 150 },
    { subject: '付款', A: 86, fullMark: 150 },
    { subject: '評論', A: 99, fullMark: 150 },
    { subject: '收藏', A: 85, fullMark: 150 },
    { subject: '分享', A: 65, fullMark: 150 },
  ];

  // 面積圖
  const mockAreaData = [
    { month: '01月', users: 400 },
    { month: '02月', users: 420 },
    { month: '03月', users: 480 },
    { month: '04月', users: 520 },
    { month: '05月', users: 610 },
    { month: '06月', users: 700 },
    { month: '07月', users: 820 },
  ];

  // 表格假資料
  const mockTableData = [
    { key: 1, order: '20250101', user: '王小明', amount: 1200, status: '已完成' },
    { key: 2, order: '20250102', user: '李小美', amount: 980, status: '待付款' },
    { key: 3, order: '20250103', user: '陳大華', amount: 860, status: '已退貨' },
    { key: 4, order: '20250104', user: '林小強', amount: 650, status: '已完成' },
    { key: 5, order: '20250105', user: '張小芳', amount: 540, status: '待發貨' },
    { key: 6, order: '20250106', user: '周小傑', amount: 430, status: '已完成' },
    { key: 7, order: '20250107', user: '吳小婷', amount: 320, status: '已完成' },
  ];

  const tableColumns = [
    { title: '訂單編號', dataIndex: 'order', key: 'order' },
    { title: '用戶', dataIndex: 'user', key: 'user' },
    { title: '金額', dataIndex: 'amount', key: 'amount' },
    { title: '狀態', dataIndex: 'status', key: 'status' },
  ];

  const [chartTab, setChartTab] = useState('line');

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <ProCard ghost direction="column" gutter={[24, 24]} style={{ padding: 0 }}>
        {/* 標題 */}
        <ProCard ghost style={{ paddingBottom: 0 }}>
          <Title level={3} style={{ color: '#181818', fontWeight: 700, marginBottom: 8 }}>
            儀表板
          </Title>
          <span style={{ color: '#888' }}>即時掌握訂單、營收與商品銷售排行</span>
        </ProCard>
        <Divider style={{ margin: '16px 0 0 0' }} />

        {/* 統計卡片 - 多主題分組，色彩、icon、漸層背景更豐富 */}
        {isLoading ? (
          <ProSkeleton type="result" active />
        ) : (
          <Row gutter={[24, 24]} style={{ marginTop: 8 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  background: 'linear-gradient(135deg, #1890ff 0%, #43e97b 100%)',
                  color: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 2px 12px #0001',
                  transition: 'box-shadow 0.2s',
                }}
              >
                <Statistic
                  title={<span style={{ color: 'rgba(255,255,255,0.85)' }}>銷售訂單</span>}
                  value={data?.todayOrders ?? 0}
                  prefix={<ShoppingCartOutlined style={{ marginRight: 8, color: '#fff' }} />}
                  valueStyle={{ color: '#fff', fontSize: 28 }}
                />
                <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
                  <ArrowUpOutlined style={{ color: '#fff' }} /> 銷售成長{' '}
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>12%</span>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  background: 'linear-gradient(135deg, #faad14 0%, #f5576c 100%)',
                  color: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 2px 12px #0001',
                  transition: 'box-shadow 0.2s',
                }}
              >
                <Statistic
                  title={<span style={{ color: 'rgba(255,255,255,0.85)' }}>本月營收</span>}
                  value={data?.monthRevenue ?? 0}
                  prefix={<DollarOutlined style={{ marginRight: 8, color: '#fff' }} />}
                  suffix="K"
                  valueStyle={{ color: '#fff', fontSize: 28 }}
                />
                <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
                  <ArrowDownOutlined style={{ color: '#fff' }} /> 營收波動{' '}
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>5%</span>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  background: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)',
                  color: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 2px 12px #0001',
                  transition: 'box-shadow 0.2s',
                }}
              >
                <Statistic
                  title={<span style={{ color: 'rgba(255,255,255,0.85)' }}>活躍用戶</span>}
                  value={data?.activeUsers ?? 0}
                  prefix={<UserOutlined style={{ marginRight: 8, color: '#fff' }} />}
                  valueStyle={{ color: '#fff', fontSize: 28 }}
                />
                <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
                  <ArrowUpOutlined style={{ color: '#fff' }} /> 用戶成長{' '}
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>8%</span>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 2px 12px #0001',
                  transition: 'box-shadow 0.2s',
                }}
              >
                <Statistic
                  title={<span style={{ color: 'rgba(255,255,255,0.85)' }}>待處理訂單</span>}
                  value={data?.pendingOrders ?? 0}
                  prefix={<FileTextOutlined style={{ marginRight: 8, color: '#fff' }} />}
                  valueStyle={{ color: '#fff', fontSize: 28 }}
                />
                <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
                  <ArrowUpOutlined style={{ color: '#fff' }} /> 處理進度{' '}
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>3%</span>
                </div>
              </Card>
            </Col>
          </Row>
        )}
        <Divider style={{ margin: '32px 0 0 0' }} />

        {/* 圖表區塊 Tab 切換 */}
        <Card style={{ borderRadius: 12, boxShadow: '0 2px 12px #0001', marginBottom: 24 }}>
          <Tabs
            activeKey={chartTab}
            onChange={setChartTab}
            items={[
              {
                key: 'line',
                label: '營收趨勢(折線)',
                children: (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockLineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#1890ff"
                        strokeWidth={2}
                        name="營收($K)"
                      />
                      <Line
                        type="monotone"
                        dataKey="orders"
                        stroke="#52c41a"
                        strokeWidth={2}
                        name="訂單數"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ),
              },
              {
                key: 'pie',
                label: '訂單狀態分佈(圓餅)',
                children: (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {mockPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ),
              },
              {
                key: 'bar',
                label: '商品銷售排行(長條)',
                children: (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockBarData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill="#1890ff" name="銷量" />
                    </BarChart>
                  </ResponsiveContainer>
                ),
              },
              {
                key: 'radar',
                label: '用戶行為分佈(雷達)',
                children: (
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar
                        name="行為"
                        dataKey="A"
                        stroke="#1890ff"
                        fill="#1890ff"
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                ),
              },
              {
                key: 'area',
                label: '月度活躍用戶(面積)',
                children: (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={mockAreaData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#1890ff"
                        fill="#1890ff"
                        fillOpacity={0.4}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ),
              },
              {
                key: 'table',
                label: '訂單明細(表格)',
                children: (
                  <div style={{ overflowX: 'auto', padding: '16px 0' }}>
                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        background: '#fff',
                        borderRadius: 8,
                        boxShadow: '0 2px 8px #eee',
                      }}
                    >
                      <thead>
                        <tr style={{ background: '#f5f5f5' }}>
                          {tableColumns.map((col) => (
                            <th
                              key={col.key}
                              style={{
                                padding: 8,
                                fontWeight: 600,
                                color: '#333',
                                borderBottom: '1px solid #eee',
                              }}
                            >
                              {col.title}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {mockTableData.map((row) => (
                          <tr key={row.key}>
                            <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                              {row.order}
                            </td>
                            <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                              {row.user}
                            </td>
                            <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                              {row.amount}
                            </td>
                            <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                              {row.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ),
              },
            ]}
          />
        </Card>
        <Divider style={{ margin: '32px 0 0 0' }} />

        {/* 商品銷售排行 TOP 5 - 美化版 */}
        <ProCard
          bordered
          style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e0eafc 100%)',
            borderRadius: 16,
            boxShadow: '0 4px 24px #dbeafe',
            marginTop: 16,
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <BarChart style={{ fontSize: 32, color: '#1890ff', marginRight: 12 }} />
            <Title level={4} style={{ color: '#1890ff', marginBottom: 0, fontWeight: 700 }}>
              商品銷售排行 TOP 5
            </Title>
            <span style={{ color: '#888', marginLeft: 16, fontSize: 16 }}>熱銷商品一目了然</span>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data?.topProducts ?? []}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#1890ff', fontWeight: 600, fontSize: 14 }} />
              <YAxis tick={{ fill: '#888', fontSize: 13 }} />
              <Tooltip
                contentStyle={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee' }}
                labelStyle={{ color: '#1890ff', fontWeight: 600 }}
              />
              <Legend wrapperStyle={{ color: '#1890ff', fontWeight: 600 }} />
              <Bar
                dataKey="sales"
                name="銷量"
                radius={[8, 8, 0, 0]}
                fill="#52c41a"
                barSize={32}
                onClick={(data) => setSelected(data.name)}
                style={{ cursor: 'pointer' }}
                label={{ position: 'top', fill: '#1890ff', fontWeight: 700, fontSize: 16 }}
              />
            </BarChart>
          </ResponsiveContainer>
          {selected && (
            <div
              style={{
                marginTop: 20,
                padding: 14,
                background: '#e0eafc',
                borderRadius: 8,
                color: '#1890ff',
                fontWeight: 600,
              }}
            >
              <b>已選擇商品：</b> {selected}
              <Button className="ml-4" size="small" onClick={() => setSelected(null)}>
                清除
              </Button>
            </div>
          )}
        </ProCard>
      </ProCard>
    </div>
  );
}
