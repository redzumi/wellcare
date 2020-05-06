import React, { useState } from 'react';
import { Divider, Table, Button, Space } from 'antd';
import { ColumnProps } from 'antd/lib/table/Column';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import QuestionForm from './QuestionForm';
import AnswersDrawer from './AnswersDrawer';

type Props = {
  questions: Question[];
  onChange: (value: Question[]) => void;
};

const QuestionsTable = (props: Props) => {
  const [current, setCurrent] = useState<Question | null>(null);
  const { questions, onChange } = props;

  const handleDeleteQuestion = (question: Question) => () => {
    onChange(questions.filter((q) => q.name !== question.name));
  };

  const handleEditQuestion = (question: Question) => () => {
    setCurrent(question);
  };

  const handleCreateQuestion = (value: Question) => {
    onChange([...questions, { ...value }]);
  };

  const handleDrawerClose = () => setCurrent(null);
  const handleQuestionChange = (question: Question) => {
    onChange(
      questions.map((q) => ({
        ...q,
        ...(q.name === question.name && question)
      }))
    );
    setCurrent(null);
  };

  const columns: ColumnProps<Question>[] = [
    {
      title: 'Вопрос',
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
            icon={<EditOutlined />}
            onClick={handleEditQuestion(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={handleDeleteQuestion(record)}
          />
        </Space>
      )
    }
  ];

  return (
    <React.Fragment>
      <QuestionForm onFinish={handleCreateQuestion} />
      <Divider dashed />
      <Table
        columns={columns}
        dataSource={questions.map((data) => ({ ...data, key: data.name }))}
      />
      <AnswersDrawer
        question={current}
        onChange={handleQuestionChange}
        onClose={handleDrawerClose}
      />
    </React.Fragment>
  );
};

export default QuestionsTable;
