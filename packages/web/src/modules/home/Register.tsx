import React from 'react';
import { Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: Store) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item
        name="email"
        label="Почта"
        rules={[
          {
            type: 'email',
            message: 'Кажется, это не почта'
          },
          {
            required: true,
            message: 'Пожалуйста, введите почту'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите пароль'
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="username"
        label="Имя пользователя"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите имя пользователя',
            whitespace: true
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="firstName"
        label="Ваше имя"
        rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Ваша фамилия"
        rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Регистрация
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
