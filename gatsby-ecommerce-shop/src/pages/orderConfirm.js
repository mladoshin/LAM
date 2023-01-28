import React from 'react';
import * as styles from './accountSuccess.module.css';

import ActionCard from '../components/ActionCard';
import Container from '../components/Container';
import Layout from '../components/Layout/Layout';

const OrderConfirmPage = (props) => {
  return (
    <Layout disablePaddingBottom>
      <Container size={'medium'}>
        <div className={styles.root}>
          <h1>Спасибо за заказ!</h1>
          <p>
            Мы приняли ваш заказ и скоро свяжемся с вами для подтверждения. Спасибо, что выбрали именно нас!
          </p>
          <div className={styles.actionContainer}>
            <ActionCard
              title={'Статус заказа'}
              icon={'delivery'}
              subtitle={'Проверить статус заказа'}
              link={'/account/orders'}
              size={'lg'}
            />

            <ActionCard
              title={'Магазин'}
              icon={'bag'}
              subtitle={'Продолжить покупки'}
              link={'/shop'}
            />

            <ActionCard
              title={'Часто задаваемые вопросы'}
              icon={'question'}
              subtitle={'Посмотрите раздел с часто задаваемыми вопросами'}
              link={'/faq'}
            />

            <ActionCard
              title={'Свяжитесь с нами'}
              icon={'phone'}
              subtitle={'Напишите нам'}
              link={'/support#contact'}
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default OrderConfirmPage;
