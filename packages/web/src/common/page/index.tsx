import React from 'react';
import { Layout } from 'antd';

import Sidebar from './sidebar/Sidebar';
import Footer from './footer/Footer';

type Props = {
  children?: React.ReactNode;
};

const SIDEBAR_WIDTH = 200;
const { Header, Content } = Layout;

const Page = (props: Props) => {
  const { children } = props;

  return (
    <Layout>
      <Sidebar />
      <Layout style={{ marginLeft: SIDEBAR_WIDTH }}>
        <Header />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center' }}>{children}</div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Page;
