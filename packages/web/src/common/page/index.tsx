import React from 'react';
import { Layout } from 'antd';

import Header from './header/Header';
import Footer from './footer/Footer';

import styles from './styles.styl';

type Props = {
  children?: React.ReactNode;
};

const { Content } = Layout;

const Page = (props: Props) => {
  const { children } = props;

  return (
    <Layout>
      <Layout className={styles.layout}>
        <Header />
        <Content className={styles.content}>
          <div className={styles.container}>
            <div className={styles.body}>{children}</div>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Page;
