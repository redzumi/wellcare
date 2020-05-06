import React, { useState, useEffect } from 'react';
import { Divider, Typography, Table, Drawer, Button, Space } from 'antd';
import { useStore } from 'effector-react';
import { ColumnProps } from 'antd/lib/table';

import { DeleteOutlined } from '@ant-design/icons';

import { $ui } from 'store/ui';

import QuestionForm from './QuestionForm';
import AnswerForm from './AnswerForm';

type Props = {
  question: Question | null;
  onChange: (question: Question) => void;
  onClose: () => void;
};

const { Title } = Typography;

const EditQuestionDrawer = (props: Props) => {
  const { question, onChange, onClose } = props;
  const [answers, setAnswers] = useState<Answer[]>(question?.answers || []);

  const ui = useStore($ui);

  useEffect(() => {
    if (question) {
      setAnswers(question.answers);
    }
  }, [question]);

  const handleClose = () => onClose();

  const handleAnswerCreate = (
    name: string,
    feature: string,
    weight: number
  ) => {
    setAnswers([...answers, { name, feature, weight }]);
  };

  const handleAnswerDelete = (answer: Answer) => () => {
    setAnswers(answers.filter((a) => a.feature !== answer.feature));
  };

  const handleQuestionsChange = (value: Question) => {
    onChange({ ...question, ...value, answers });
  };

  const columns: ColumnProps<Answer>[] = [
    {
      title: 'Ответ',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Вес',
      dataIndex: 'weight',
      key: 'weight',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Признак',
      dataIndex: 'feature',
      key: 'feature',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <Space direction="vertical">
          <Button
            icon={<DeleteOutlined />}
            onClick={handleAnswerDelete(record)}
          />
        </Space>
      )
    }
  ];

  return (
    <Drawer
      title={question?.name}
      height={ui.media === UIMedia.Mobile ? '100%' : 'auto'}
      width={ui.media === UIMedia.Desktop ? '50%' : 'auto'}
      placement={ui.media === UIMedia.Mobile ? 'bottom' : 'right'}
      closable
      onClose={handleClose}
      visible={Boolean(question)}
    >
      {question && (
        <QuestionForm question={question} onFinish={handleQuestionsChange} />
      )}
      <Divider dashed />
      <Title level={4}>Ответы</Title>
      <Divider dashed />
      <AnswerForm onFinish={handleAnswerCreate} />
      <Table
        columns={columns}
        dataSource={answers.map((data) => ({ ...data, key: data.name }))}
      />
    </Drawer>
  );
};

export default EditQuestionDrawer;
