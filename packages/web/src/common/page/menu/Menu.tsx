import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { PAGES } from 'router';

import styles from './styles.styl';

type Props = {
  exclude?: string[];
  horizontal?: boolean;
  media: UIMedia;
};

const PageMenu = (props: Props) => {
  const { horizontal, exclude, media } = props;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const history = useHistory();
  const { location } = history;

  useEffect(() => setSelectedKeys([location.pathname]), [location]);

  const pagesWithoutExcluded = PAGES.filter(
    (page) => !exclude?.includes(page.pathname)
  );

  const handleMenuClick = (pathname: string) => () => history.push(pathname);

  return (
    <Menu
      className={styles.menu}
      mode={horizontal ? 'horizontal' : 'vertical'}
      selectedKeys={selectedKeys}
    >
      {pagesWithoutExcluded.reduce((acc, curr) => {
        const menuItem =
          curr.deviders && media === UIMedia.Mobile ? (
            [
              <Menu.Divider key={`${curr.pathname}-devider-top`} />,
              <Menu.Item
                key={curr.pathname}
                icon={<curr.icon />}
                onClick={handleMenuClick(curr.pathname)}
              >
                {curr.name}
              </Menu.Item>,
              <Menu.Divider key={`${curr.pathname}-devider-bottom`} />
            ]
          ) : (
            <Menu.Item
              key={curr.pathname}
              icon={<curr.icon />}
              onClick={handleMenuClick(curr.pathname)}
            >
              {curr.name}
            </Menu.Item>
          );

        return [...acc, menuItem];
      }, [])}
    </Menu>
  );
};

export default PageMenu;
