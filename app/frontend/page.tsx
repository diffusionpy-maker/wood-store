// 前台獨立路徑 Demo
"use client";
import { Button, Typography, Card, Row, Col, Input, Form, Spin, Tag } from "antd";
import { useState } from "react";
const { Title, Paragraph } = Typography;

export default function FrontendHome() {
  // AI 關鍵字推薦 mock
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const handleRecommend = (values: { description: string }) => {
    setLoading(true);
    setTimeout(() => {
      // mock AI 回傳
      setKeywords(["溫馨", "驚喜", "療癒", "美感"]);
      setProducts([
        { id: 1, name: "香氛蠟燭", desc: "療癒香氣，溫暖心靈" },
        { id: 2, name: "手作巧克力", desc: "甜蜜驚喜，送給特別的人" },
        { id: 3, name: "設計師花束", desc: "美感生活，浪漫氛圍" },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center">
      <Card className="shadow-xl p-8 w-full max-w-2xl" bordered={false}>
        <Title level={2} style={{ color: '#1677ff', fontWeight: 700 }}>Auction 前台 Demo</Title>
        <Paragraph className="text-gray-500 mb-6">
          歡迎來到拍賣平台！這裡可以瀏覽商品、參與競標、查看最新活動。
        </Paragraph>
        {/* AI 關鍵字推薦區塊 */}
        <Card className="mb-6" bordered style={{ background: '#f6faff' }}>
          <Title level={4} style={{ color: '#52c41a' }}>AI 選禮推薦</Title>
          <Paragraph className="text-gray-500 mb-2">描述送禮對象或情境，AI 幫你推薦最舒服的關鍵字與商品！</Paragraph>
          <Form layout="inline" onFinish={handleRecommend} className="mb-2">
            <Form.Item name="description" rules={[{ required: true, message: '請輸入描述' }]}> 
              <Input placeholder="例如：生日、療癒、女生、驚喜..." style={{ width: 220 }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>AI推薦</Button>
            </Form.Item>
          </Form>
          {loading && <Spin />}
          {keywords.length > 0 && (
            <div className="mb-2">
              <span className="mr-2 text-gray-500">AI 關鍵字：</span>
              {keywords.map(k => <Tag color="blue" key={k}>{k}</Tag>)}
            </div>
          )}
          {products.length > 0 && (
            <Row gutter={16}>
              {products.map(p => (
                <Col span={8} key={p.id}>
                  <Card hoverable className="mb-2" title={p.name}>
                    <Paragraph>{p.desc}</Paragraph>
                    <Button type="primary">選擇</Button>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card>
        {/* ...existing code... */}
        <Row gutter={24} className="mb-4">
          <Col span={12}>
            <Card hoverable className="h-40 flex flex-col justify-center items-center">
              <Title level={4}>熱門商品</Title>
              <Button type="primary">瀏覽商品</Button>
            </Card>
          </Col>
          <Col span={12}>
            <Card hoverable className="h-40 flex flex-col justify-center items-center">
              <Title level={4}>最新競標</Title>
              <Button type="default">立即競標</Button>
            </Card>
          </Col>
        </Row>
        <div className="flex justify-end">
          <Button type="link">登入 / 註冊</Button>
        </div>
      </Card>
    </div>
  );
}