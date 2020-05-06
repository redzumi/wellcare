import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Space,
  Radio,
  Steps,
  Popover,
  Button,
  Spin,
  Form,
  Breadcrumb
} from 'antd';
import { useStore } from 'effector-react';
import { useParams, Redirect } from 'react-router-dom';
import { Store } from 'antd/lib/form/interface';

import { $ui } from 'store/ui';
import { $surveys, fetchSurveys } from 'store/surveys';
import { sendSurveyQA } from 'store/surveysActions';

import Paper from 'common/page/paper/Paper';

import styles from './styles.styl';

const { Step } = Steps;

const SurveyQuestions = () => {
  const { id } = useParams();

  const { media } = useStore($ui);
  const { ready, data: surveys } = useStore($surveys);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSurvey = surveys.find((survey) => survey.id === id);

  useEffect(() => {
    if (!ready) {
      fetchSurveys();
    }
  }, [ready]);

  if (!currentSurvey || !ready) {
    return (
      <Paper>
        <Spin spinning />
      </Paper>
    );
  }

  const { questions } = currentSurvey;
  const currQuestion = questions[currentIndex];

  if (!currQuestion) {
    return <Redirect to={`/surveys/finish/${id}`} />;
  }

  const handleMoveToNextQuestion = async (values: Store) => {
    await sendSurveyQA({
      survey: currentSurvey,
      question: currQuestion.feature,
      answer: values.answer
    });
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <Paper>
      <Space direction="vertical" size="large" className={styles.questions}>
        {media === UIMedia.Desktop ? (
          <Steps current={currentIndex} size="small">
            {questions.map((question) => (
              <Step key={question.name} />
            ))}
          </Steps>
        ) : (
          <Breadcrumb>
            <Breadcrumb.Item>{(currentIndex + 1).toString()}</Breadcrumb.Item>
            <Breadcrumb.Item>{questions.length.toString()}</Breadcrumb.Item>
          </Breadcrumb>
        )}
        <Row justify="center">
          <Col span={media === UIMedia.Mobile ? 24 : 12}>
            <Row justify="end">
              {currQuestion.reason && (
                <Popover
                  content={
                    <div style={{ maxWidth: '300px' }}>
                      {currQuestion.reason}
                    </div>
                  }
                  trigger="click"
                >
                  <Button type="link" style={{ paddingRight: 0 }}>
                    Хотите узнать подробнее?
                    <span> </span>
                    <span
                      style={{ paddingLeft: 8 }}
                      role="img"
                      aria-label="smile"
                    >
                      😉
                    </span>
                  </Button>
                </Popover>
              )}
            </Row>
            <Card title={currQuestion.name} className={styles.card}>
              <Space direction="vertical" size="middle">
                <Form
                  key={currQuestion.feature}
                  onFinish={handleMoveToNextQuestion}
                >
                  <Form.Item name="answer">
                    <Radio.Group>
                      {currQuestion.answers.map((answer: Answer) => (
                        <Radio key={answer.name} value={answer.feature}>
                          {answer.name}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Дальше
                    </Button>
                  </Form.Item>
                </Form>
              </Space>
            </Card>
          </Col>
        </Row>
      </Space>
    </Paper>
  );
};

export default SurveyQuestions;
