import React, { useEffect } from 'react';
import { Result, Card, Row, Space, Divider, Statistic } from 'antd';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { ArrowUpOutlined } from '@ant-design/icons';
import { $surveys, fetchSurveys } from 'store/surveys';
import Paper from 'common/page/paper/Paper';

const FinishSurvey = () => {
  const { id } = useParams();

  const { ready, data: surveys } = useStore($surveys);
  const currentSurvey = surveys.find((survey) => survey.id === id);

  useEffect(() => {
    if (!ready) {
      fetchSurveys();
    }
  }, [ready]);

  return (
    <Paper title={currentSurvey?.name}>
      <Result status="success" />
      <Divider />
      <Row justify="center">
        <Space>
          <Card>
            <Statistic
              title="Заболело"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowUpOutlined />}
              suffix=".тыс"
            />
          </Card>
          <Card>
            <Statistic
              title="Выздоровело"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix=".тыс"
            />
          </Card>
        </Space>
        <Divider />
        <Row>Ваша группа риска:</Row>
      </Row>
    </Paper>
  );
};

export default FinishSurvey;
