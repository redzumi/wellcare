import React from 'react';
import { Layout, Result } from 'antd';
import { useRouteMatch } from 'react-router-dom';
import { ROUTES } from 'router';

import Header from './header/Header';
import Footer from './footer/Footer';

import styles from './styles.styl';

type Props = {
  children?: React.ReactNode;
};

const { Content } = Layout;

const Page = (props: Props) => {
  const { children } = props;
  const hasMatched = ROUTES.some(
    (route) => useRouteMatch(route.pathname)?.isExact
  );

  return (
    <Layout>
      <Layout className={styles.layout}>
        <Header />
        <Content className={styles.content}>
          <div className={styles.container}>
            <div className={styles.body}>{children}</div>
            {!hasMatched && (
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
