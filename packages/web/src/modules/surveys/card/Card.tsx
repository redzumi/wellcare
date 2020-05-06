import React from 'react';
import { Descriptions, Empty, Card, Row, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import CovidIcon from 'common/icons/covid/CovidIcon';
import HealthIcon from 'common/icons/health/HealthIcon';

import styles from './styles.styl';

type Props = {
  id: string;
  title: string;
  description: string;
  onClick: () => void;
};

// TODO: from backend
const getIconByTitle = (title: string) => {
  if (title.toLowerCase().includes('коронавирус')) {
    return (
      <Row justify="center">
        <CovidIcon />
      </Row>
    );
  }

  if (title.toLowerCase().includes('здоровье')) {
    return (
      <Row justify="center">
        <HealthIcon />
      </Row>
    );
  }

  return <Empty />;
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
    <Card
      title={title}
      bordered
      hoverable
      onClick={onClick}
      className={styles.card}
    >
      {getIconByTitle(title)}
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
