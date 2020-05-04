import React from 'react';
import { Divider, Table, Button, Space } from 'antd';
import { ColumnProps } from 'antd/lib/table/Column';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import QuestionForm from './QuestionForm';

type Props = {
  questions: Question[];
  onChange: (value: Question[]) => void;
};

const QuestionsTable = (props: Props) => {
  const { questions, onChange } = props;
  const questionsWithKeys = questions.map((question) => ({
    ...question,
    key: question.name
  }));

  const handleDeleteQuestion = (question: Question) => () => {
    onChange(questions.filter((q) => q.name !== question.name));
  };

  const handleEditQuestion = (question: Question) => () => {
    // TODO answers
    console.log(question);
  };

  const handleCreateQuestion = (name: string, weight: number) => {
    const question: Question = { name, weight, answers: [] };

    onChange([...questions, question]);
  };

  const columns: ColumnProps<Question>[] = [
    {
      title: 'Название вопроса',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Вес вопроса',
      dataIndex: 'weight',
      key: 'weight',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Операции',
      key: 'action',
      render: (text, record) => (
        <Space>
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
      <Table columns={columns} dataSource={questionsWithKeys} />
    </React.Fragment>
  );
};

export default QuestionsTable;
