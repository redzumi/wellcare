import React from 'react';

import { Form, Space, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';

type Props = {
  onRegister: () => void;
};

const NormalLoginForm = (props: Props) => {
  const { onRegister } = props;

  const handleFinish = (values: Store) => {
    console.log('Received values of form: ', values);
  };

  const handleRegister = () => onRegister();

  return (
    <Form name="normal_login" onFinish={handleFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Пожалуйста, введите почту' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="example@email.ru" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="password"
        />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
          <Button type="link" onClick={handleRegister}>
            Или зарегистрируйтесь
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default NormalLoginForm;
