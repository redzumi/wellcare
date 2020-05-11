import React from 'react';
import { Card, Space, Radio, Button, Form } from 'antd';
import { Store } from 'antd/lib/form/interface';

import styles from './styles.styl';

type Props = {
  question: Question;
  onComplete: (values: Store) => void;
};

const SurveyQuestionCard = (props: Props) => {
  const { question, onComplete } = props;

  return (
    <Card title={question.name} className={styles.card}>
      <Space direction="vertical" size="middle">
        <Form key={question.feature} onFinish={onComplete}>
          <Form.Item name="answer">
            <Radio.Group>
              <Space direction="vertical" size="middle">
                {question.answers.map((answer: Answer) => (
                  <Radio
                    key={answer.name}
                    value={answer.feature}
                    className={styles.radio}
                  >
                    {answer.name}
                  </Radio>
                ))}
              </Space>
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
  );
};

export default SurveyQuestionCard;
