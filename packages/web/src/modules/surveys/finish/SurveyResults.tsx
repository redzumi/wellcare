import React, { useState, useEffect } from 'react';
import {
  Layout,
  Divider,
  Typography,
  Steps,
  Button,
  Row,
  Descriptions,
  Space
} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import styles from './styles.styl';
import Status from './Status';

type Props = {
  probability: number;
};

const { Title } = Typography;
const { Content } = Layout;
const { Step } = Steps;

const Description = (props: { children: React.ReactNode }) => (
  <Descriptions layout="vertical">
    <Descriptions.Item>
      <div style={{ fontSize: 18 }}>{props.children}</div>
    </Descriptions.Item>
  </Descriptions>
);
const steps = [
  {
    title: 'Мойте руки',
    content: () => (
      <Description>
        Всегда мойте руки: когда приходите на работу или возвращаетесь домой.
        Для профилактики также подойдут влажные салфетки или дезинфицирующие
        растворы
      </Description>
    )
  },
  {
    title: 'Не трогайте лицо руками',
    content: () => (
      <Description>
        Не трогайте лицо руками Не подносите руки к носу и глазам. Быстрее всего
        вирус попадает в организм через слизистую оболочку. Когда чихаете всегда
        прикрывайтесь платком
      </Description>
    )
  },
  {
    title: 'Избегайте больших скоплений людей',
    content: () => (
      <Description>
        Избегайте больших скоплений людей Избегайте ненужных поездок и не ходите
        в места массового скопления людей
      </Description>
    )
  },
  {
    title: 'Отмените путешествия',
    content: () => (
      <Description>
        На время, пока разные страны мира борются с корона вирусом, не следует
        путешествовать заграницу. В особенности туда, где ситуация с
        коронавирусом крайне тяжелая
      </Description>
    )
  }
];

const getTitleByProbability = (probability: number) => {
  if (probability < 33) {
    return (
      <Title level={2}>
        У вас небольшая вероятность заболеть{' '}
        <span style={{ paddingLeft: 8 }} role="img" aria-label="congratius">
          🎉
        </span>
      </Title>
    );
  }

  if (probability > 33 && probability < 66) {
    return (
      <Title level={2}>
        Кажется, вы вот-вот заболеете{' '}
        <span style={{ paddingLeft: 8 }} role="img" aria-label="congratius">
          😢
        </span>
      </Title>
    );
  }

  if (probability > 66) {
    return (
      <Title level={2}>
        Пришло время обратиться к врачу{' '}
        <span style={{ paddingLeft: 8 }} role="img" aria-label="congratius">
          👩‍⚕️
        </span>
      </Title>
    );
  }

  return null;
};

const SurveyResults = (props: Props) => {
  const { probability } = props;
  const [current, setCurrent] = useState(0);

  const handleClickNext = () => setCurrent(current + 1);
  const handleClickPrev = () => setCurrent(current - 1);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }, 1500);
  }, []);

  return (
    <React.Fragment>
      <Content className={styles.content}>
        <Row justify="center">{getTitleByProbability(probability)}</Row>
        <Divider dashed />
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className={styles['steps-content']}>
          {steps[current].content()}
        </div>
        <div className={styles['steps-action']}>
          <Space direction="vertical">
            {current < steps.length - 1 && (
              <Button type="primary" size="large" onClick={handleClickNext}>
                Следущий совет
              </Button>
            )}
            {current > 0 && (
              <Button size="large" onClick={handleClickPrev}>
                Предыдущий совет
              </Button>
            )}
          </Space>
        </div>
        <Divider dashed />
        <Link to="/surveys">
          <Button onClick={handleClickNext} icon={<ArrowRightOutlined />}>
            Вернуться к опросам
          </Button>
        </Link>
        <Divider dashed />
        <Row justify="center">
          <Status />
        </Row>
      </Content>
    </React.Fragment>
  );
};

export default SurveyResults;
