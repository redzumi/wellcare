import React from 'react';
import { Form, Input, InputNumber, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';

type Props = {
  onFinish: (name: string, weight: number) => void;
};

const QuestionForm = (props: Props) => {
  const { onFinish } = props;

  const handleSubmit = (values: Store) => onFinish(values.name, values.weight);

  return (
    <Form name="survey" onFinish={handleSubmit}>
      <Form.Item
        label="Текст вопроса"
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
        label="Вес вопроса"
        name="weight"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите вес вопроса'
          }
        ]}
      >
        <InputNumber defaultValue={3} />
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
