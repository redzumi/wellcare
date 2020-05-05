import React, { useEffect, useState } from 'react';
import { Result, Card, Row, Space, Divider, Statistic, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { ArrowUpOutlined, SmileOutlined } from '@ant-design/icons';

import { $surveys, fetchSurveys, predictSurvey } from 'store/surveys';

import Paper from 'common/page/paper/Paper';
import SurveyResults from './SurveyResults';

const FinishSurvey = () => {
  const { id } = useParams();

  const [result, setResult] = useState<number | null>(null);
  const { ready, data: surveys } = useStore($surveys);
  const currentSurvey = surveys.find((survey) => survey.id === id);

  useEffect(() => {
    if (!ready) {
      fetchSurveys();
    }
  }, [ready]);

  useEffect(() => {
    if (currentSurvey) {
      const fetchResult = async () => {
        setResult(await predictSurvey(currentSurvey));
      };
      fetchResult();
    }
  }, [id, currentSurvey]);

  return (
    <Paper title={currentSurvey?.name}>
      <Result
        icon={<SmileOutlined />}
        status="success"
        title="Вы прошли опрос!"
      />
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
        {result ? <SurveyResults probability={result} /> : <Spin spinning />}
      </Row>
    </Paper>
  );
};

export default FinishSurvey;
