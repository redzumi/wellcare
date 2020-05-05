import React, { useState } from 'react';
import { Drawer, Space, Button, Row, Col, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useStore } from 'effector-react';

import { $ui } from 'store/ui';
import { $session } from 'store/session';

import styles from './styles.styl';

import Logo from '../logo/Logo';
import Menu from '../menu/Menu';

import Profile from './Profile';
import Notifications from './Notifications';

const { Header } = Layout;

const PageHeader = () => {
  const ui = useStore($ui);
  const session = useStore($session);
  const [drawer, setDrawer] = useState(false);

  const handleMenuClick = () => setDrawer(true);
  const handleDrawerClose = () => setDrawer(false);

  return (
    <React.Fragment>
      <Header className={styles.header}>
        <Row justify="space-between" className={styles.row}>
          <Col>
            <Row>
              <Space size="middle">
                <Logo />
                {ui.media === UIMedia.Desktop && (
                  <Menu horizontal exclude={['/profile']} media={ui.media} />
                )}
              </Space>
            </Row>
          </Col>
          <Col>
            {session.token && (
              <Space align="center">
                <Notifications />
                <Profile />
                {ui.media === UIMedia.Mobile && (
                  <Button icon={<MenuOutlined />} onClick={handleMenuClick} />
                )}
              </Space>
            )}
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
        <Menu media={ui.media} />
      </Drawer>
    </React.Fragment>
  );
};

export default PageHeader;
