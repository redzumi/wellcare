import React from 'react';
import { Layout, PageHeader } from 'antd';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Footer from './footer/Footer';

import styles from './styles.styl';

type Props = {
  children?: React.ReactNode;
  media: UIMedia;
};

const { Content } = Layout;

const Page = (props: Props) => {
  const { children, media } = props;
  const isMobile = media === UIMedia.Mobile;

  return (
    <Layout>
      <Sidebar collapsed={isMobile} />
      <Layout className={styles.layout}>
        <Header />
        <Content className={styles.page}>
          <PageHeader title="Home" backIcon={false} />
          <div className={styles.content}>{children}</div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Page;
