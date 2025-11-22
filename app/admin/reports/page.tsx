'use client';
import { Card, Statistic, Row, Col, Divider } from 'antd';
import { BarChartOutlined, LineChartOutlined } from '@ant-design/icons';
const mockReport = [
  { title: '本月營收', value: 120000, icon: <BarChartOutlined /> },
  { title: '本月訂單', value: 320, icon: <LineChartOutlined /> },
  { title: '活躍用戶', value: 85, icon: <BarChartOutlined /> },
];
export default function ReportsPage() {
  return (
    <Card title="報表分析" bordered style={{ borderRadius: 12, boxShadow: '0 2px 12px #0001' }}>
      <Row gutter={24}>
        {mockReport.map((item, idx) => (
          <Col span={8} key={idx}>
            <Card bordered style={{ marginBottom: 16 }}>
              <Statistic title={item.title} value={item.value} prefix={item.icon} />
            </Card>
          </Col>
        ))}
      </Row>
      <Divider />
      <div style={{ color: '#888' }}>更多圖表分析功能可擴充...</div>
    </Card>
  );
}
