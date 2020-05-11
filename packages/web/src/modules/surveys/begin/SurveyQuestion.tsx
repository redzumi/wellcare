import React from 'react';
import { Row, Col, Space, Divider } from 'antd';
import { Store } from 'antd/lib/form/interface';

import SurveyReason from './SurveyReason';
import SurveyProgress from './SurveyProgress';

import styles from './styles.styl';
import SurveyQuestionCard from './SurveyQuestionCard';

type Props = {
  surveyId: string;
  media: UIMedia;
  user: User;
  question: Question;
  questions: Question[];
  reaction: SurveyReasonReaction;
  onComplete: (values: Store) => void;
};

const SurveyQuestion = (props: Props) => {
  const {
    surveyId,
    media,
    user,
    question,
    questions,
    reaction,
    onComplete
  } = props;

  return (
    <Space direction="vertical" size="large" className={styles.questions}>
      <SurveyProgress
        media={media}
        currentIndex={questions.indexOf(question)}
        questions={questions}
      />
      <Row justify="center">
        <Col span={media === UIMedia.Mobile ? 24 : 12}>
          <SurveyQuestionCard question={question} onComplete={onComplete} />
          <Divider dashed />
          {question.reason && (
            <SurveyReason
              key={question.feature}
              id={surveyId}
              user={user}
              feature={question.feature}
              reaction={reaction}
              text={question.reason}
            />
          )}
        </Col>
      </Row>
    </Space>
  );
};

export default SurveyQuestion;
