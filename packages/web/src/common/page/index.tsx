import React from 'react';
import { Layout, PageHeader } from 'antd';

import Header from './header/Header';
import Footer from './footer/Footer';

import styles from './styles.styl';

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const { Content } = Layout;

const Page = (props: Props) => {
  const { children, title } = props;

  return (
    <Layout>
      <Layout className={styles.layout}>
        <Header />
        <Content className={styles.content}>
          <div className={styles.container}>
            <PageHeader title={title} backIcon={false} />
            <div className={styles.body}>{children}</div>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Page;
