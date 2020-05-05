import React, { useState } from 'react';
import { Card, Descriptions, Button, Space } from 'antd';
import Paper from 'common/page/paper/Paper';

import SurveyQuestions from './SurveyQuestions';

import styles from './styles.styl';

const QUEST = {
  imgQuestionSrc:
    'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  questionCount: '21',
  questionTitle: 'Pupa',
  questionDescription:
    'Диссертация – это квалификационный труд, который пишется научным сотрудником для присуждения звания или степени. Различают всего три вида диссертации: магистерскую, кандидатскую и докторскую. Перед тем, как рассказать о том, как правильно писать диссертацию, давайте подробно рассмотрим каждую разновидность этого научного труда.',
  answersOptions: ['pupa', 'lupa', 'zalupa']
};

type Props = {
  title: string;
  description: string;
  imgSrc: string;
};

const BeginSurvey = (props: Props) => {
  const { title, description, imgSrc } = props;
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  if (!isStarted) {
    return (
      <Paper>
        <Space align="center" direction="vertical" size="middle">
          <Card
            title="Тест на коронавирус"
            bordered={false}
            className={styles.cardTitle}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                className={styles.surveyImg}
              />
            }
          >
            <Descriptions layout="vertical">
              <Descriptions.Item>
                Диссертация – это квалификационный труд, который пишется научным
                сотрудником для присуждения звания или степени. Различают всего
                три вида диссертации: магистерскую, кандидатскую и докторскую.
                Перед тем, как рассказать о том, как правильно писать
                диссертацию, давайте подробно рассмотрим каждую разновидность
                этого научного труда.
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Button type="primary" onClick={handleStart}>
            Начать
          </Button>
        </Space>
      </Paper>
    );
  }
  return (
    <SurveyQuestions
      imgQuestionSrc={QUEST.imgQuestionSrc}
      questionCount={QUEST.questionCount}
      questionTitle={QUEST.questionTitle}
      questionDescription={QUEST.questionDescription}
      answersOptions={QUEST.answersOptions}
    />
  );
};

export default BeginSurvey;
