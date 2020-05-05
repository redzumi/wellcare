import React from 'react';
import { Descriptions, Empty, Card, Button } from 'antd';
import { useHistory } from 'react-router-dom';

type Props = {
  id: string;
  title: string;
  description: string;
  onClick: () => void;
};

const SurveyCard = (props: Props) => {
  const { id, title, description, onClick } = props;
  const history = useHistory();

  const handleBeginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    history.push(`/surveys/begin/${id}`);
  };

  return (
    <Card title={title} bordered hoverable onClick={onClick}>
      <Empty />
      <Descriptions layout="vertical">
        <Descriptions.Item>{description}</Descriptions.Item>
      </Descriptions>
      <Button type="primary" block size="large" onClick={handleBeginClick}>
        Пройти
      </Button>
    </Card>
  );
};

export default SurveyCard;
