import React, { useState } from 'react';
import { Space, Card, Descriptions, Radio, Button } from 'antd';
import Paper from 'common/page/paper/Paper';
import { RadioChangeEvent } from 'antd/lib/radio';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

type Props = {
  imgQuestionSrc: string;
  questionCount: string;
  questionTitle: string;
  questionDescription: string;
  answersOptions: string[];
};

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
};

const SurveyQuestions = (props: Props) => {
  const history = useHistory();

  const {
    imgQuestionSrc,
    questionDescription,
    questionCount,
    questionTitle,
    answersOptions
  } = props;

  const [currQuestion, setCurrQuestion] = useState(1);
  const [answers, setAnswers] = useState(['']);

  const handleChangeRadio = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setAnswers([...answers, e.target.value]);
  };

  const handleMoveToNextQuestion = () => {
    setCurrQuestion(currQuestion + 1);
  };

  const handleMoveToPrevQuestion = () => {
    setCurrQuestion(currQuestion - 1);
    history.goBack();
  };

  return (
    <Paper>
      <Space align="center" direction="vertical" size="middle">
        <Card cover={<img alt="survey" src={imgQuestionSrc} />}>
          {currQuestion}/{questionCount}
          <Descriptions title={questionTitle} layout="vertical">
            <Descriptions.Item>{questionDescription}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Radio.Group onChange={handleChangeRadio} value={answers[currQuestion]}>
          {answersOptions.map((curr, index) => (
            <Radio style={radioStyle} value={currQuestion} key={currQuestion}>
              {answersOptions[index]}
            </Radio>
          ))}
        </Radio.Group>
        <Space direction="horizontal">
          <Button
            icon={<ArrowRightOutlined />}
            onClick={handleMoveToNextQuestion}
          />
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleMoveToPrevQuestion}
          />
        </Space>
      </Space>
    </Paper>
  );
};

export default SurveyQuestions;
