import React, { useState } from 'react';
import { Form, Input, Table, Button, Space } from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  ZoomInOutlined
} from '@ant-design/icons';

import Paper from 'common/page/paper/Paper';
import { Store } from 'antd/lib/form/interface';

import styles from './styles.styl';

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
      <div className={styles.actions}>
        <Space>
          <a href="">
            <ZoomInOutlined />
          </a>
          <a href="">
            <EditOutlined />
          </a>
          <a href="">
            <DeleteOutlined />
          </a>
        </Space>
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

  const handleAddingSurvey = (values: Store) => {
    const { surveyName } = values;

    setCount(count + 1);
    setTableData([
      ...tableData,
      {
        key: surveyName,
        testName: surveyName
      }
    ]);
  };

  return (
    <Paper>
      <Form
        name="survey"
        onFinish={handleAddingSurvey}
        className={styles.surveyForm}
      >
        <Space>
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
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              +
            </Button>
          </Form.Item>
        </Space>
      </Form>
      <Table columns={columns} dataSource={tableData} />
    </Paper>
  );
};
export default CreateTest;
