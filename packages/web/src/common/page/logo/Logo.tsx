import React from 'react';
import Icon from '@ant-design/icons';

import LogoSvg from './LogoSvg';

import styles from './styles.styl';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Icon className={styles.svg} component={LogoSvg} />
      <span>Wellcare</span>
    </div>
  );
};

export default Logo;
