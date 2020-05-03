import React from 'react';
import { Row, Col, Layout, Breadcrumb } from 'antd';

import styles from './styles.styl';

const { Header } = Layout;

const PageHeader = () => {
  return (
    <Header className={styles.header}>
      <Row justify="space-between" className={styles.row}>
        <Col>
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>Wellcare</Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col>Test</Col>
      </Row>
    </Header>
  );
};

export default PageHeader;
