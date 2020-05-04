import React from 'react';
import { PageHeader, Empty } from 'antd';

import styles from './styles.styl';

type Props = {
  title?: string;
  children?: React.ReactNode;
};

const Paper = (props: Props) => {
  const { title, children } = props;

  return (
    <div className={styles.paper}>
      <PageHeader className={styles.header} title={title} backIcon={false} />
      {children || <Empty />}
    </div>
  );
};

export default Paper;
