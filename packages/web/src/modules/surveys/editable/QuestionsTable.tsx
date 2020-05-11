import React, { useState } from 'react';
import { Divider, Table, Button, Space } from 'antd';
import { ColumnProps } from 'antd/lib/table/Column';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import QuestionForm from './QuestionForm';
import EditQuestionDrawer from './EditQuestionDrawer';

type Props = {
  questions: Question[];
  onChange: (value: Question[]) => void;
};

const QuestionsTable = (props: Props) => {
  const [current, setCurrent] = useState<Question | null>(null);
  const { questions, onChange } = props;

  const handleQuestionEdit = (question: Question) => () => {
    setCurrent(question);
  };

  const handleQuestionDelete = (question: Question) => () => {
    onChange(questions.filter((q) => q._id !== question._id));
  };

  const handleCreateQuestion = (value: Question) => {
    onChange([...questions, { ...value }]);
  };

  const handleQuestionChange = (question: Question) => {
    onChange(
      questions.map((q) => ({
        ...q,
        ...(q._id === question._id && question)
      }))
    );
    setCurrent(null);
  };

  const handleDrawerClose = () => setCurrent(null);

  const columns: ColumnProps<Question>[] = [
    {
      title: 'Вопрос',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Question) => (
        <Space direction="vertical">
          <Space direction="horizontal">
            <Button
              icon={<EditOutlined />}
              onClick={handleQuestionEdit(record)}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={handleQuestionDelete(record)}
            />
          </Space>
          {text}
        </Space>
      )
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
      <EditQuestionDrawer
        question={current}
        onChange={handleQuestionChange}
        onClose={handleDrawerClose}
      />
    </React.Fragment>
  );
};

export default QuestionsTable;
