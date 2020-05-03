import React from 'react';
import { Layout } from 'antd';

import styles from './styles.styl';

const { Footer } = Layout;

const PageFooter = () => {
  return (
    <Footer className={styles.footer}>
      Made with
      <span role="img" aria-label="love">
        ❤️
      </span>
      by Wellcare Team
    </Footer>
  );
};

export default PageFooter;
