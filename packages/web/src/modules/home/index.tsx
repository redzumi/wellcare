import React from 'react';
import { Card, Avatar, Row, Col } from 'antd';
import { useStore } from 'effector-react';
import { UserOutlined } from '@ant-design/icons';

import { $ui } from 'store/ui';
import Paper from 'common/page/paper/Paper';
import Meta from 'antd/lib/card/Meta';

const NEWS = [
  {
    title: 'В Москве в два раза увеличили количество тестов на коронавирус',
    description:
      'За последнюю неделю в Москве увеличились масштабы тестирования на коронавирус для своевременной диагностики и оказания заболевшим медицинской помощи. В этой области удалось добиться кардинальных изменений, которые выводят Москву на самый высокий уровень среди городов мира.',
    image:
      'https://www.mos.ru/upload/newsfeed/pressevents/clUl8bcoTY6y-mish(9).jpg'
  },
  {
    title: 'Инструкция: как найти хорошего врача',
    description:
      'Речь о поиске хорошего врача, который в последнее время у нас в стране в большом дефиците. Как действовать в этом случае рядовому пациенту? Есть разные варианты.',
    image: 'https://i.imgur.com/csBwSlb.jpg'
  },
  {
    title: 'Что такое цифровой пропуск и как его оформить?',
    description:
      'С 15 апреля 2020 года в Москве вводится пропускная система. Цифровой пропуск понадобится, если вы будете передвигаться по городу с использованием любого вида личного или общественного транспорта — велосипеда, электросамоката, мотоцикла, скутера, автомобиля, такси, метро.',
    image:
      'https://static.mk.ru/upload/entities/2020/04/21/20/articles/detailPicture/2b/11/3f/d5/e050143382f0ac9a534716579d2f649d.jpg'
  },
  {
    title: 'Сергей Собянин — о борьбе с коронавирусной инфекцией в столице',
    description:
      'В столице, как и в других мегаполисах, намерены при необходимости размещать больных во временных госпиталях, которые обустраивают в торговых центрах, спортивных сооружениях и других крупных капитальных объектах.',
    image:
      'https://www.mos.ru/upload/newsfeed/pressevents/00ss_vu_opitGrishkinSS(9).jpg'
  }
];

const News = (props: { title: string; description: string; image: string }) => {
  const { title, description, image } = props;

  return (
    <Card
      style={{ width: 312 }}
      hoverable
      bordered={false}
      cover={<img alt="example" src={image} />}
    >
      <Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={title}
        description={description}
      />
    </Card>
  );
};

const Home = () => {
  const ui = useStore($ui);
  const colSpan = ui.media === UIMedia.Mobile ? 24 : 8;

  return (
    <Paper title="Главная">
      <Row gutter={[16, 16]}>
        {NEWS.map((article) => (
          <Col key={article.title} span={colSpan}>
            <News
              title={article.title}
              description={article.description}
              image={article.image}
            />
          </Col>
        ))}
      </Row>
    </Paper>
  );
};

export default Home;
