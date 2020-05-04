import React from 'react';
import { Table, Button, Space } from 'antd';
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

  const handleCreateQuestion = (name: string, weight: number) => {
    const question: Question = { name, weight, answers: [] };

    onChange([...questions, question]);
  };

  return (
    <React.Fragment>
      <QuestionForm onFinish={handleCreateQuestion} />
      <Table columns={columns} dataSource={questions} />
    </React.Fragment>
  );
};

export default QuestionsTable;
