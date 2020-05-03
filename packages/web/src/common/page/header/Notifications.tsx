import React from 'react';
import { Badge, Button, Popover, Empty } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';

const Notifications = () => {
  return (
    <Popover placement="bottomRight" content={<Empty />} trigger="click">
      <Badge dot>
        <Button icon={<NotificationOutlined />} />
      </Badge>
    </Popover>
  );
};

export default Notifications;
