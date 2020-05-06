import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type Props = {
  question?: Question;
  onFinish: (value: Partial<Question>) => void;
};

const QuestionForm = (props: Props) => {
  const { question, onFinish } = props;

  const handleSubmit = (values: Partial<Question>) =>
    onFinish({
      ...values,
      answers: []
    });

  return (
    <Form name="survey" initialValues={question} onFinish={handleSubmit}>
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
        <Input.TextArea />
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
      <Form.Item
        label="Причина"
        name="reason"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите причину вопроса'
          }
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        {question ? (
          <Button type="primary" ghost htmlType="submit">
            Сохранить
          </Button>
        ) : (
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Добавить вопрос
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default QuestionForm;
