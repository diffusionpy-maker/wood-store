'use client';
import useSWR from 'swr';
import {
  Typography,
  Statistic,
  Button,
  Row,
  Col,
  Card,
  Divider,
  Tabs,
  Collapse,
  theme,
  Alert,
} from 'antd';
import ProSkeleton from '@ant-design/pro-skeleton';
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
  CaretRightOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  TableOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function DashboardPage() {
  const { data, isLoading } = useSWR('/api/admin/dashboard', fetcher);
  const [selected, setSelected] = useState<string | null>(null);
  const { token } = theme.useToken();

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
  ];

  const tableColumns = [
    { title: '訂單編號', dataIndex: 'order', key: 'order' },
    { title: '用戶', dataIndex: 'user', key: 'user' },
    { title: '金額', dataIndex: 'amount', key: 'amount' },
    { title: '狀態', dataIndex: 'status', key: 'status' },
  ];

  const [chartTab, setChartTab] = useState('line');

  const StatCard = ({ title, value, prefix, suffix, color, trend, trendValue }: any) => (
    <Card
      hoverable
      className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      style={{ borderRadius: 16, background: '#fff' }}
      styles={{ body: { padding: 24 } }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>{prefix}</div>
        <div
          className={`px-2 py-1 rounded-full text-xs font-bold ${trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
        >
          {trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {trendValue}
        </div>
      </div>
      <Statistic
        title={<span className="text-gray-500 font-medium">{title}</span>}
        value={value}
        suffix={suffix}
        valueStyle={{ fontWeight: 700, fontSize: 32, color: '#1e293b' }}
      />
    </Card>
  );

  return (
    <div className="min-h-screen pb-12">
      <div className="mb-8">
        <Title level={2} style={{ color: '#0f172a', marginBottom: 8 }}>
          Dashboard
        </Title>
        <Text type="secondary">歡迎回到管理後台，這是今天的營運概況。</Text>
      </div>

      {(!data || !data.todayOrders) && !isLoading && (
        <Alert
          message="⚠️ 現在不是真實資料"
          description="目前無法從數據庫取得儀表板資料，顯示的是演示數據。"
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {isLoading ? (
        <ProSkeleton type="result" active />
      ) : (
        <div className="space-y-6">
          {/* 統計卡片區域 - 預設展開 */}
          <Collapse
            defaultActiveKey={['stats']}
            ghost
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="bg-transparent"
            items={[
              {
                key: 'stats',
                label: <span className="font-bold text-lg text-slate-700">核心指標</span>,
                className: 'border-none p-0',
                children: (
                  <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} lg={6}>
                      <StatCard
                        title="今日訂單"
                        value={data?.todayOrders ?? 128}
                        prefix={<ShoppingCartOutlined className="text-2xl text-blue-500" />}
                        color="bg-blue-500"
                        trend="up"
                        trendValue="12%"
                      />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                      <StatCard
                        title="本月營收"
                        value={data?.monthRevenue ?? 45.2}
                        suffix="K"
                        prefix={<DollarOutlined className="text-2xl text-emerald-500" />}
                        color="bg-emerald-500"
                        trend="down"
                        trendValue="5%"
                      />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                      <StatCard
                        title="活躍用戶"
                        value={data?.activeUsers ?? 892}
                        prefix={<UserOutlined className="text-2xl text-violet-500" />}
                        color="bg-violet-500"
                        trend="up"
                        trendValue="8%"
                      />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                      <StatCard
                        title="待處理"
                        value={data?.pendingOrders ?? 15}
                        prefix={<FileTextOutlined className="text-2xl text-amber-500" />}
                        color="bg-amber-500"
                        trend="up"
                        trendValue="3%"
                      />
                    </Col>
                  </Row>
                ),
              },
            ]}
          />

          {/* 圖表分析區域 - 可折疊 */}
          <Collapse
            defaultActiveKey={['charts']}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            items={[
              {
                key: 'charts',
                label: (
                  <div className="flex items-center gap-2 py-2">
                    <BarChartOutlined className="text-blue-500" />
                    <span className="font-bold text-lg text-slate-700">數據分析</span>
                  </div>
                ),
                className: 'border-none',
                children: (
                  <Tabs
                    activeKey={chartTab}
                    onChange={setChartTab}
                    type="card"
                    items={[
                      {
                        key: 'line',
                        label: (
                          <span>
                            <LineChartOutlined /> 營收趨勢
                          </span>
                        ),
                        children: (
                          <div className="h-[400px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={mockLineData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="name" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip
                                  contentStyle={{
                                    borderRadius: 8,
                                    border: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                  }}
                                />
                                <Legend />
                                <Line
                                  type="monotone"
                                  dataKey="revenue"
                                  stroke="#3b82f6"
                                  strokeWidth={3}
                                  dot={{ r: 4 }}
                                  activeDot={{ r: 8 }}
                                  name="營收($K)"
                                />
                                <Line
                                  type="monotone"
                                  dataKey="orders"
                                  stroke="#10b981"
                                  strokeWidth={3}
                                  dot={{ r: 4 }}
                                  name="訂單數"
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        ),
                      },
                      {
                        key: 'pie',
                        label: (
                          <span>
                            <PieChartOutlined /> 訂單分佈
                          </span>
                        ),
                        children: (
                          <div className="h-[400px] w-full mt-4 flex justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={mockPieData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={80}
                                  outerRadius={120}
                                  paddingAngle={5}
                                  dataKey="value"
                                >
                                  {mockPieData.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={COLORS[index % COLORS.length]}
                                    />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        ),
                      },
                      {
                        key: 'table',
                        label: (
                          <span>
                            <TableOutlined /> 近期訂單
                          </span>
                        ),
                        children: (
                          <div className="overflow-x-auto mt-4">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-gray-100">
                                  {tableColumns.map((col) => (
                                    <th
                                      key={col.key}
                                      className="p-4 font-semibold text-slate-600 bg-gray-50 first:rounded-tl-lg last:rounded-tr-lg"
                                    >
                                      {col.title}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {mockTableData.map((row) => (
                                  <tr
                                    key={row.key}
                                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                                  >
                                    <td className="p-4 text-slate-700 font-medium">{row.order}</td>
                                    <td className="p-4 text-slate-600">{row.user}</td>
                                    <td className="p-4 text-slate-600 font-mono">
                                      NT$ {row.amount}
                                    </td>
                                    <td className="p-4">
                                      <span
                                        className={`px-2 py-1 rounded-full text-xs font-bold 
                                      ${
                                        row.status === '已完成'
                                          ? 'bg-green-100 text-green-600'
                                          : row.status === '待付款'
                                            ? 'bg-amber-100 text-amber-600'
                                            : 'bg-gray-100 text-gray-600'
                                      }`}
                                      >
                                        {row.status}
                                      </span>
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
                ),
              },
            ]}
          />

          {/* 銷售排行 - 可折疊 */}
          <Collapse
            defaultActiveKey={['products']}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            items={[
              {
                key: 'products',
                label: (
                  <div className="flex items-center gap-2 py-2">
                    <ShoppingCartOutlined className="text-emerald-500" />
                    <span className="font-bold text-lg text-slate-700">熱銷商品排行</span>
                  </div>
                ),
                className: 'border-none',
                children: (
                  <>
                    <div className="h-[350px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.topProducts ?? mockBarData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                          <Tooltip
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{
                              borderRadius: 8,
                              border: 'none',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            }}
                          />
                          <Bar
                            dataKey="sales"
                            name="銷量"
                            radius={[4, 4, 0, 0]}
                            fill="#3b82f6"
                            barSize={40}
                            onClick={(data) => setSelected(data.name)}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            {mockBarData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    {selected && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                        <span className="text-blue-700 font-medium">
                          已選擇商品：<span className="font-bold">{selected}</span>
                        </span>
                        <Button
                          type="text"
                          size="small"
                          onClick={() => setSelected(null)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          清除篩選
                        </Button>
                      </div>
                    )}
                  </>
                ),
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
