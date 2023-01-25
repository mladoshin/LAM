import classNames from 'classnames';
import React from 'react';
import './index.scss';
import * as styles from './Policy.module.css';

function PaymentPolicy() {
  return (
    <div className={classNames(styles.root, 'root-payment')}>
      <div className={styles.section}>
        <h3>Оплата и безопасность</h3>

        <p>
          Заказы в магазине можно оплачивать двумя разными способами:
        </p>
        <ul>
            <li>Онлайн (При оплате онлайн действует скидка 10%.)</li>
            <li>Наличными при получении товара</li>
        </ul>

        <p style={{marginTop: "2.5rem"}}>
          На сайте LAM Leather можно производить безопасную оплату следующими
          способами:
        </p>

        <ul>
          <li>Банковская карта (Visa, Masterсard, Maestro, Мир, JCB)</li>
          <li>ЮMoney</li>
          <li>QIWI Wallet</li>
          <li>Альфа-Клик</li>
          <li>Тинькофф</li>
          <li>SberPay</li>
          <li>Оплата через приложение Mir Pay с телефонов на Android™</li>
          <li>Оплата через приложения банков</li>
        </ul>

      </div>

    </div>
  );
}

export default PaymentPolicy;
