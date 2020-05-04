import React, { useState } from 'react';
import { Form, Input, Table, Button } from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  ZoomInOutlined
} from '@ant-design/icons';

import Paper from 'common/page/paper/Paper';

const columns = [
  {
    title: 'Название теста',
    dataIndex: 'testName',
    key: 'testName',
    render: (text: string) => <a>{text}</a>
  },
  {
    title: 'Операции',
    key: 'action',
    render: () => (
      <div>
        <a href="">
          <ZoomInOutlined />
        </a>
        <a href="">
          <EditOutlined />
        </a>
        <a href="">
          <DeleteOutlined />
        </a>
      </div>
    )
  }
];

const data = [
  {
    key: '1',
    testName: 'Тест по коронавирусу'
  },
  {
    key: '2',
    testName: 'Тест по ВИЧ/СПИД'
  },
  {
    key: '3',
    testName: 'Тест по туберкулезу'
  }
];

const CreateTest = () => {
  const [count, setCount] = useState(data.length);
  const [tableData, setTableData] = useState(data);

  const handleAddingSurvey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(count + 1);
    const newRow = {
      key: count.toString(),
      testName: e.target.value
    };

    setTableData([...tableData, newRow]);
  };

  const handleChange = () => {
    console.log('boba');
  };

  return (
    <Paper>
      Admin Panel
      <Form name="survey">
        <Form.Item
          label="Введите название статьи"
          name="surveyName"
          rules={[
            {
              required: true,
              message: 'Введите название теста!'
            }
          ]}
        >
          <Input onChange={handleChange} onSubmit={handleAddingSurvey} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            +
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={data} />
    </Paper>
  );
};
export default CreateTest;
