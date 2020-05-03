import React from 'react';
import { Layout, Breadcrumb } from 'antd';

const { Header } = Layout;

const PageHeader = () => {
  return (
    <Header>
      <Breadcrumb
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <Breadcrumb.Item>WellCare</Breadcrumb.Item>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
    </Header>
  );
};

export default PageHeader;
