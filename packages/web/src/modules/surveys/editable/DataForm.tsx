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
  onSave: () => void;
  onDelete: () => void;
};

const { TextArea } = Input;

const DataForm = (props: Props) => {
  const { id, name, description, onChange, onSave, onDelete } = props;

  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    onDelete();
  };

  return (
    <Form
      name="survey"
      initialValues={{
        name,
        description
      }}
      onValuesChange={onChange}
      onFinish={onSave}
    >
      <Space direction="vertical" className={styles.form}>
        <Form.Item
          label="Название опроса"
          name="name"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите название опроса'
            }
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Описание опроса"
          name="description"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите описание опроса'
            }
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Space>
            {id === 'new' ? (
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Создать
              </Button>
            ) : (
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            )}
            {id !== 'new' && (
              <Button
                type="ghost"
                danger
                htmlType="button"
                onClick={handleDelete}
              >
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
