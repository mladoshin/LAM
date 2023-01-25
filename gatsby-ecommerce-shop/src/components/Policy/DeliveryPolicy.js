import classNames from 'classnames';
import React from 'react';
import './index.scss';
import * as styles from './Policy.module.css';

function DeliveryPolicy() {

  return (
    <div className={classNames(styles.root, 'root-delivery')}>
      <div className={styles.section}>
        <h3>Доставка</h3>

        <p>
          Все заказы доставляются только доставкой. Мы доставляем наши товары
          клиентам курьерской службой по всей России.
        </p>

        <h4>Стоимость доставки в Московской области</h4>
        <ul>
          <li>В пределах МКАД - 500 рублей</li>
          <li>За пределами МКАД - 800 рублей</li>
        </ul>
      </div>

      <div className={styles.section}>
        <p>
          Вы можете оформить доставку по всей россии с помощью BoxBerry, СДЭК,
          Почта России. Доставка по всей России занимает от 3-5 рабочих дней, в
          отдельных случаях до 10 рабочих дней. Стоимость доставки расчитывается
          онлайн автоматически, но вы также можете написать нам либо позвонить,
          чтобы уточнить детали доставки и точную стоимость доставки до вашего
          города.
        </p>
      </div>

    </div>
  );
}

export default DeliveryPolicy;
