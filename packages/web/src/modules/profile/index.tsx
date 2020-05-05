import React from 'react';
import {
  Card,
  Row,
  Col,
  Avatar,
  Result,
  Typography,
  Rate,
  Space,
  Button,
  Tag
} from 'antd';
import { UserOutlined, SmileOutlined, HeartFilled } from '@ant-design/icons';
import { useStore } from 'effector-react';

import { $session } from 'store/session';
import { $ui } from 'store/ui';

import Paper from 'common/page/paper/Paper';
import { useHistory } from 'react-router-dom';

const { Title, Text } = Typography;

const Profile = () => {
  const ui = useStore($ui);
  const session = useStore($session);
  const history = useHistory();

  const handleSurveysClick = () => history.push('/surveys');

  return (
    <Paper title="Профиль">
      <Row gutter={[16, 16]}>
        <Col span={ui.media === UIMedia.Mobile ? 24 : 12}>
          <Card>
            <Row gutter={[16, 16]}>
              <Col>
                <Avatar size={64} icon={<UserOutlined />} />
              </Col>
              <Col>
                <Title level={4}>
                  {session.user?.firstName} {session.user?.lastName}
                </Title>
                <Tag>{session.user?.username}</Tag>
                <Text>
                  {session.user?.role === UserRole.Default
                    ? 'Пользователь'
                    : 'Администратор'}
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={ui.media === UIMedia.Mobile ? 24 : 12}>
          <Card>
            <Row gutter={[16, 16]}>
              <Space direction="vertical">
                <Title level={4}>Активность</Title>
                <Text>Прошедших опросов: 2</Text>
                <Rate
                  character={<HeartFilled />}
                  allowHalf
                  disabled
                  defaultValue={2}
                />
              </Space>
            </Row>
          </Card>
        </Col>
      </Row>
      <Result
        icon={<SmileOutlined />}
        title="Спасибо, что вы с нами! :)"
        extra={
          <Button type="primary" onClick={handleSurveysClick}>
            Пройти опросы?
          </Button>
        }
      />
    </Paper>
  );
};

export default Profile;
