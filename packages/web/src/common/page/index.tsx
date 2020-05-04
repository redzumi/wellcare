import React from 'react';
import { Layout, PageHeader, Result } from 'antd';
import { useLocation } from 'react-router-dom';
import { ROUTES } from 'routes';

import Header from './header/Header';
import Footer from './footer/Footer';

import styles from './styles.styl';

type Props = {
  children?: React.ReactNode;
};

const { Content } = Layout;

const Page = (props: Props) => {
  const { children } = props;
  const { pathname } = useLocation();
  const current = ROUTES.find((route) => route.pathname.startsWith(pathname));

  return (
    <Layout>
      <Layout className={styles.layout}>
        <Header />
        <Content className={styles.content}>
          <div className={styles.container}>
            <PageHeader title={current?.name} backIcon={false} />
            {current ? (
              <div className={styles.body}>{children}</div>
            ) : (
              <Result
                status="404"
                title="404"
                subTitle="Кажется, тут ничего нет"
              />
            )}
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Page;
