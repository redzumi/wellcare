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
  Popover,
  Empty
} from 'antd';
import {
  UserOutlined,
  MenuOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import { useStore } from 'effector-react';

import styles from './styles.styl';

import Logo from '../logo/Logo';
import Menu from '../menu/Menu';

import { $ui } from 'store/ui';

const { Header } = Layout;

const PageHeader = () => {
  const ui = useStore($ui);
  const [drawer, setDrawer] = useState(false);

  const handleMenuClick = () => setDrawer(true);
  const handleDrawerClose = () => setDrawer(false);

  return (
    <React.Fragment>
      <Header className={styles.header}>
        <Row justify="space-between" className={styles.row}>
          <Col>
            <Logo />
          </Col>
          {ui.media === UIMedia.Desktop && (
            <Col>
              <Menu horizontal />
            </Col>
          )}
          <Col>
            <Space align="center">
              <Avatar icon={<UserOutlined />} />
              <Popover
                placement="bottomRight"
                content={<Empty />}
                trigger="click"
              >
                <Badge dot>
                  <Button icon={<NotificationOutlined />} />
                </Badge>
              </Popover>
              {ui.media === UIMedia.Mobile && (
                <Button icon={<MenuOutlined />} onClick={handleMenuClick} />
              )}
            </Space>
          </Col>
        </Row>
      </Header>
      <Drawer
        placement="right"
        className={styles.drawer}
        closable={false}
        onClose={handleDrawerClose}
        visible={drawer}
      >
        <Menu />
      </Drawer>
    </React.Fragment>
  );
};

export default PageHeader;
