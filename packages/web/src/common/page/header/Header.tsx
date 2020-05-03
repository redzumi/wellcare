import React, { useState } from 'react';
import {
  Drawer,
  Avatar,
  Badge,
  Space,
  Button,
  Row,
  Col,
  Layout,
  Breadcrumb,
  Popover,
  Empty
} from 'antd';
import {
  UserOutlined,
  MenuOutlined,
  NotificationOutlined
} from '@ant-design/icons';

import styles from './styles.styl';

const { Header } = Layout;

const PageHeader = () => {
  const [drawer, setDrawer] = useState(false);

  const handleMenuClick = () => setDrawer(true);
  const handleDrawerClose = () => setDrawer(false);

  return (
    <React.Fragment>
      <Header className={styles.header}>
        <Row justify="space-between" className={styles.row}>
          <Col>
            <Breadcrumb className={styles.breadcrumb}>
              <Breadcrumb.Item>Wellcare</Breadcrumb.Item>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col>
            <Space align="center">
              <Avatar className={styles.avatar} icon={<UserOutlined />} />
              <Popover
                placement="bottomRight"
                content={<Empty />}
                trigger="click"
              >
                <Badge dot>
                  <Button icon={<NotificationOutlined />} />
                </Badge>
              </Popover>
              <Button icon={<MenuOutlined />} onClick={handleMenuClick} />
            </Space>
          </Col>
        </Row>
      </Header>
      <Drawer placement="right" onClose={handleDrawerClose} visible={drawer}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </React.Fragment>
  );
};

export default PageHeader;
