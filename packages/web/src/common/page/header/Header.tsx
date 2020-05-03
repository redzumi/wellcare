import React, { useState } from 'react';
import { Drawer, Space, Button, Row, Col, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useStore } from 'effector-react';

import styles from './styles.styl';

import Logo from '../logo/Logo';
import Menu from '../menu/Menu';

import Profile from './Profile';
import Notifications from './Notifications';

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
            <Row>
              <Logo />
              {ui.media === UIMedia.Desktop && <Menu horizontal />}
            </Row>
          </Col>
          <Col>
            <Space align="center">
              <Notifications />
              {ui.media === UIMedia.Desktop && <Profile />}
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
        <Menu withProfile />
      </Drawer>
    </React.Fragment>
  );
};

export default PageHeader;
