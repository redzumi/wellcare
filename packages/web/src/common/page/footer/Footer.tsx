import React from 'react';
import { Layout } from 'antd';

import styles from './styles.styl';

const { Footer } = Layout;

const PageFooter = () => {
  return (
    <Footer className={styles.footer}>Made with ❤️by WellCare Team</Footer>
  );
};

export default PageFooter;
