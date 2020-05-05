import React, { useState, useEffect } from 'react';
import {
  Layout,
  Divider,
  Typography,
  Steps,
  Button,
  Row,
  Descriptions
} from 'antd';

import styles from './styles.styl';
import Status from './Status';

type Props = {
  probability: number;
};

const { Title } = Typography;
const { Content } = Layout;
const { Step } = Steps;

const steps = [
  {
    title: 'Мойте руки',
    content: () => (
      <Descriptions layout="vertical">
        <Descriptions.Item>
          <div style={{ fontSize: 18 }}>
            Всегда мойте руки: когда приходите на работу или возвращаетесь
            домой. Для профилактики также подойдут влажные салфетки или
            дезинфицирующие растворы
          </div>
        </Descriptions.Item>
      </Descriptions>
    )
  },
  {
    title: 'Не трогайте лицо руками',
    content: () => (
      <Descriptions layout="vertical">
        <Descriptions.Item>
          <div style={{ fontSize: 18 }}>
            Не трогайте лицо руками Не подносите руки к носу и глазам. Быстрее
            всего вирус попадает в организм через слизистую оболочку. Когда
            чихаете всегда прикрывайтесь платком
          </div>
        </Descriptions.Item>
      </Descriptions>
    )
  },
  {
    title: 'Избегайте больших скоплений людей',
    content: () => (
      <Descriptions layout="vertical">
        <Descriptions.Item>
          <div style={{ fontSize: 18 }}>
            Избегайте больших скоплений людей Избегайте ненужных поездок и не
            ходите в места массового скопления людей
          </div>
        </Descriptions.Item>
      </Descriptions>
    )
  },
  {
    title: 'Отмените путешествия',
    content: () => (
      <Descriptions layout="vertical">
        <Descriptions.Item>
          <div style={{ fontSize: 18 }}>
            На время, пока разные страны мира борются с корона вирусом, не
            следует путешествовать заграницу. В особенности туда, где ситуация с
            коронавирусом крайне тяжелая
          </div>
        </Descriptions.Item>
      </Descriptions>
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
      <Content>
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
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={handleClickPrev}>
              Предыдущий совет
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={handleClickNext}>
              Следущий совет
            </Button>
          )}
        </div>
        <Divider dashed />
        <Row justify="center">
          <Status />
        </Row>
      </Content>
    </React.Fragment>
  );
};

export default SurveyResults;
