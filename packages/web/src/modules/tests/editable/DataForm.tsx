import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';

import styles from './styles.styl';

type Props = {
  id: string;
  name: string;
  description: string;
  onChange: (values: Store) => void;
};

const { TextArea } = Input;

const DataForm = (props: Props) => {
  const { id, name, description, onChange } = props;

  return (
    <Form name="survey" onFinish={onChange}>
      <Space direction="vertical" className={styles.form}>
        <Form.Item
          label="Название теста"
          name="name"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите название теста'
            }
          ]}
        >
          <Input value={name} />
        </Form.Item>
        <Form.Item
          label="Описание теста"
          name="description"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите описание теста'
            }
          ]}
        >
          <TextArea rows={4} value={description} />
        </Form.Item>
        <Form.Item>
          <Space>
            {id === 'new' ? (
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Создать
              </Button>
            ) : (
              <Button htmlType="submit">Сохранить</Button>
            )}
            {id !== 'new' && (
              <Button type="ghost" danger htmlType="submit">
                Удалить
              </Button>
            )}
          </Space>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default DataForm;
