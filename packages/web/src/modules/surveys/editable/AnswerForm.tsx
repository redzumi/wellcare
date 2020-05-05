import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';

type Props = {
  onFinish: (name: string, weight: number) => void;
};

const AnswerForm = (props: Props) => {
  const { onFinish } = props;

  const handleSubmit = (values: Store) => onFinish(values.name, values.weight);

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      name="survey"
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Ответ"
        name="name"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите текст вопроса'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Вес"
        name="weight"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите вес вопроса'
          }
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" icon={<PlusOutlined />}>
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AnswerForm;
