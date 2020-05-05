import React, { useState, useEffect } from 'react';
import { Divider, Table, Drawer, Button, Space } from 'antd';
import { useStore } from 'effector-react';
import { ColumnProps } from 'antd/lib/table';

import { DeleteOutlined } from '@ant-design/icons';

import { $ui } from 'store/ui';

import AnswerForm from './AnswerForm';

type Props = {
  question: Question | null;
  onClose: () => void;
  onChange: (question: Question) => void;
};

const AnswersDrawer = (props: Props) => {
  const { question, onChange } = props;
  const ui = useStore($ui);
  const [answers, setAnswers] = useState<Answer[]>(question?.answers || []);

  useEffect(() => {
    if (question) {
      setAnswers(question.answers);
    }
  }, [question]);

  const handleClose = () => {
    if (question) {
      onChange({ ...question, answers });
    }
  };

  const handleFinish = (name: string, weight: number) => {
    setAnswers([...answers, { name, weight }]);
  };

  const handleDeleteAnswer = (answer: Answer) => () => {
    setAnswers(answers.filter((a) => a.name !== answer.name));
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
      title: '',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button
            icon={<DeleteOutlined />}
            onClick={handleDeleteAnswer(record)}
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
      <AnswerForm onFinish={handleFinish} />
      <Divider dashed />
      <Table
        columns={columns}
        dataSource={answers.map((data) => ({ ...data, key: data.name }))}
      />
    </Drawer>
  );
};

export default AnswersDrawer;
