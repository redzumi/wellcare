import React from 'react';
import { Layout, PageHeader } from 'antd';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Footer from './footer/Footer';

type Props = {
  children?: React.ReactNode;
  media: UIMedia;
};

const { Content } = Layout;

const Page = (props: Props) => {
  const { children, media } = props;

  const isMobile = media === UIMedia.Mobile;
  const layoutOffset = isMobile ? 80 : 200; // TODO: use constants

  return (
    <Layout>
      <Sidebar collapsed={isMobile} />
      <Layout style={{ marginLeft: layoutOffset }}>
        <Header />
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            background: '#fff'
          }}
        >
          <PageHeader title="Home" backIcon={false} />
          <div style={{ padding: 24, textAlign: 'center' }}>{children}</div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Page;
