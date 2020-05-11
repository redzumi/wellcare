import React, { useState } from 'react';
import { Comment, Tooltip, Avatar, Typography, Button, Space } from 'antd';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled
} from '@ant-design/icons';

type Props = {
  text: string;
};

const { Title } = Typography;

// TODO: fetch likes and dislikes
const SurveyReason = (props: Props) => {
  const { text } = props;

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string>('');

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Space key="actions">
      <Tooltip title="Мне понравилось">
        <Button onClick={like} type="primary" size="small" ghost>
          {action === 'liked' ? <LikeFilled /> : <LikeOutlined />}
          <span>{likes}</span>
        </Button>
      </Tooltip>
      <Tooltip title="Мне не понравилось">
        <Button onClick={dislike} size="small" danger ghost>
          {action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />}
          <span>{dislikes}</span>
        </Button>
      </Tooltip>
    </Space>
  ];

  return (
    <Comment
      actions={actions}
      author={<Title level={4}>Мнение врача</Title>}
      avatar={<Avatar src="/assets/doc.jpg" alt="Доктор" />}
      content={<p>{text}</p>}
    />
  );
};

export default SurveyReason;
