import React, { useState, useEffect } from 'react';
import {
  Comment,
  Tooltip,
  Avatar,
  Typography,
  Button,
  Space,
  Spin
} from 'antd';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled
} from '@ant-design/icons';
import { makeReaction } from 'store/surveys/reasons';

type Props = {
  id: string;
  feature: string;
  reactions: {
    likes: {
      [key: string]: string[];
    };
    dislikes: {
      [key: string]: string[];
    };
  };
  text: string;
};

const { Title } = Typography;

const SurveyReason = (props: Props) => {
  const { id, feature, text, reactions } = props;

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string>('');

  useEffect(() => {
    if (reactions) {
      if (reactions.likes[feature]) {
        setLikes(reactions.likes[feature].length || 0);
      } else {
        setLikes(0);
      }

      if (reactions.dislikes[feature]) {
        setDislikes(reactions.dislikes[feature].length || 0);
      } else {
        setDislikes(0);
      }
    }
  }, [reactions]);

  const like = () => {
    makeReaction({ surveyId: id, feature, action: 'like' });
    setAction('liked');
  };

  const dislike = () => {
    makeReaction({ surveyId: id, feature, action: 'dislike' });
    setAction('disliked');
  };

  const actions = reactions
    ? [
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
      ]
    : [<Spin spinning />];

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
