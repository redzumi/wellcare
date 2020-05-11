import React from 'react';
import { Steps, Breadcrumb } from 'antd';

type Props = {
  media: UIMedia;
  currentIndex: number;
  questions: Question[];
};

const { Step } = Steps;

const SurveyProgress = (props: Props) => {
  const { media, currentIndex, questions } = props;

  return media === UIMedia.Desktop ? (
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
  );
};

export default SurveyProgress;
