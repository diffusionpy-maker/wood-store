'use client';
import { Card, Table, Avatar, Tag, Upload, Modal, Button, DatePicker } from 'antd';
import update from 'immutability-helper';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Image from 'next/image';
const initialUsers = [
  {
    key: 1,
    name: '王小明',
    email: 'ming@example.com',
    role: '管理員',
    status: '啟用',
    createdAt: '2025-11-01',
  },
  {
    key: 2,
    name: '李小美',
    email: 'mei@example.com',
    role: '操作員',
    status: '啟用',
    createdAt: '2025-11-10',
  },
  {
    key: 3,
    name: '陳大華',
    email: 'hua@example.com',
    role: '審核員',
    status: '停用',
    createdAt: '2025-10-25',
  },
  {
    key: 4,
    name: '林小強',
    email: 'qiang@example.com',
    role: '管理員',
    status: '啟用',
    createdAt: '2025-11-15',
  },
];
const columns: any[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => (
      <Avatar style={{ backgroundColor: '#1890ff', marginRight: 8 }}>{text[0]}</Avatar>
    ),
  },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: '角色', dataIndex: 'role', key: 'role' },
  {
    title: '狀態',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => <Tag color={status === '啟用' ? 'green' : 'red'}>{status}</Tag>,
  },
  {
    title: '建立時間',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (createdAt: string) => (createdAt ? dayjs(createdAt).format('YYYY-MM-DD') : ''),
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: (keys: any) => void;
      selectedKeys: any;
      confirm: () => void;
      clearFilters: () => void;
    }) => (
      <div style={{ padding: 8 }}>
        <DatePicker.RangePicker
          onChange={(dates) => {
            setSelectedKeys(dates ? [dates] : []);
          }}
          style={{ width: 200, marginBottom: 8, display: 'block' }}
        />
        <Button type="primary" onClick={confirm} size="small" style={{ width: 90, marginRight: 8 }}>
          篩選
        </Button>
        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
          重設
        </Button>
      </div>
    ),
    onFilter: (value: any, record: any) => {
      if (!value || !record.createdAt) return true;
      const [start, end] = value;
      const date = dayjs(record.createdAt);
      return date.isAfter(start) && date.isBefore(end);
    },
  },
];
export default function UsersPage() {
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [users, setUsers] = useState(initialUsers);

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
    setPreviewImage(src);
    setPreviewOpen(true);
    setPreviewTitle(file.name || '預覽');
  };
  const handleCancel = () => setPreviewOpen(false);

  // 拖曳排序 row 元件
  const type = 'DraggableBodyRow';
  const DraggableBodyRow = ({
    index,
    className,
    style,
    ...restProps
  }: {
    index: number;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
  }) => {
    const ref = React.useRef<HTMLTableRowElement>(null);
    const [{ isOver, dropClassName }, drop] = useDrop({
      accept: type,
      collect: (monitor: any) => {
        const { index: dragIndex } = monitor.getItem() || {};
        return {
          isOver: monitor.isOver(),
          dropClassName:
            dragIndex === index
              ? ' drop-over-downward'
              : dragIndex < index
                ? ' drop-over-upward'
                : '',
        };
      },
      drop: (item: any) => {
        moveRow(item.index, index);
      },
    });
    const [, drag] = useDrag({
      type,
      item: { index },
    });
    drop(drag(ref));
    return (
      <tr
        ref={ref}
        className={`${className || ''}${isOver ? dropClassName : ''}`}
        style={{ cursor: 'move', ...style }}
        {...restProps}
      />
    );
  };

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const dragRow = users[dragIndex];
    setUsers(
      update(users, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      }),
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Card title="用戶管理" bordered style={{ borderRadius: 12, boxShadow: '0 2px 12px #0001' }}>
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
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
          centered
        >
          <Image
            alt="預覽"
            src={previewImage}
            width={800}
            height={600}
            style={{ width: '100%', borderRadius: 8, boxShadow: '0 2px 8px #0002', height: 'auto' }}
          />
        </Modal>
        <Table
          columns={columns}
          dataSource={users}
          pagination={false}
          style={{ marginTop: 24 }}
          components={{ body: { row: DraggableBodyRow } }}
          scroll={{ x: 'max-content' }}
          onRow={(_, index) =>
            ({
              'data-row-index': typeof index === 'number' ? index : -1,
            }) as React.HTMLAttributes<HTMLTableRowElement>
          }
        />
      </Card>
    </DndProvider>
  );
}
