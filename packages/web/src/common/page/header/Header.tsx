import React from 'react';
import { Row, Col, Layout, Breadcrumb } from 'antd';

import styles from './styles.styl';

const { Header } = Layout;

const PageHeader = () => {
  return (
    <Header className={styles.header}>
      <Row>
        <Col>
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>Wellcare</Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col></Col>
      </Row>
    </Header>
  );
};

export default PageHeader;
