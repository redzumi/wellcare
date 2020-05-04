import React from 'react';
import { Divider, Table, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import QuestionForm from './QuestionForm';

type Props = {
  questions: Question[];
  onChange: (value: Question[]) => void;
};

const columns = [
  {
    title: 'Название вопроса',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <span>{text}</span>
  },
  {
    title: 'Операции',
    key: 'action',
    render: () => (
      <Space>
        <Button icon={<EditOutlined />} />
        <Button icon={<DeleteOutlined />} />
      </Space>
    )
  }
];

const QuestionsTable = (props: Props) => {
  const { questions, onChange } = props;
  const questionsWithKeys = questions.map((question) => ({
    ...question,
    key: question.name
  }));

  const handleCreateQuestion = (name: string, weight: number) => {
    const question: Question = { name, weight, answers: [] };

    onChange([...questions, question]);
  };

  return (
    <React.Fragment>
      <QuestionForm onFinish={handleCreateQuestion} />
      <Divider dashed />
      <Table columns={columns} dataSource={questionsWithKeys} />
    </React.Fragment>
  );
};

export default QuestionsTable;
