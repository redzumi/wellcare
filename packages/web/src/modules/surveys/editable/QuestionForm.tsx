import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';

type Props = {
  onFinish: (name: string, feature: string, weight: number) => void;
};

const QuestionForm = (props: Props) => {
  const { onFinish } = props;

  const handleSubmit = (values: Store) =>
    onFinish(values.name, values.feature, values.weight);

  return (
    <Form name="survey" onFinish={handleSubmit}>
      <Form.Item
        label="Текст"
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
      <Form.Item
        label="Признак"
        name="feature"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите признак вопроса'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" icon={<PlusOutlined />}>
          Добавить вопрос
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuestionForm;
