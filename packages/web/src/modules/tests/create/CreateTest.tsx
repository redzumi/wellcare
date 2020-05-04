import React, { useState } from 'react';
import { Form, Input, Table, Button, Space } from 'antd';
import { useStore } from 'effector-react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';

import { $ui } from 'store/ui';
import { createTest } from 'store/tests';

import Paper from 'common/page/paper/Paper';

import styles from './styles.styl';

const columns = [
  {
    title: 'Название теста',
    dataIndex: 'testName',
    key: 'testName',
    render: (text: string) => <span>{text}</span>
  },
  {
    title: 'Операции',
    key: 'action',
    render: () => (
      <div className={styles.actions}>
        <Space>
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} />
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
  const ui = useStore($ui);
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

    // createTest({});
  };

  return (
    <Paper title="Создать тест">
      <Form
        name="survey"
        onFinish={handleAddingSurvey}
        className={styles.surveyForm}
      >
        <Space
          direction={ui.media === UIMedia.Mobile ? 'vertical' : 'horizontal'}
        >
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
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              {ui.media === UIMedia.Mobile && 'Добавить'}
            </Button>
          </Form.Item>
        </Space>
      </Form>
      <Table columns={columns} dataSource={tableData} />
    </Paper>
  );
};
export default CreateTest;
