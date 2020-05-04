import React from 'react';
import { PageHeader, Empty } from 'antd';
import { useHistory } from 'react-router-dom';

import styles from './styles.styl';

type Props = {
  title?: string;
  children?: React.ReactNode;
};

const Paper = (props: Props) => {
  const { title, children } = props;
  const history = useHistory();

  const handleBack = () => history.goBack();

  return (
    <div className={styles.paper}>
      <PageHeader className={styles.header} title={title} onBack={handleBack} />
      {children || <Empty />}
    </div>
  );
};

export default Paper;
