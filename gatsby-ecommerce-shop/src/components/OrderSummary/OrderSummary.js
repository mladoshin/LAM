import React, { useMemo, useState } from 'react';
import { Link, navigate } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../PriceFormatter';

import * as styles from './OrderSummary.module.css';
import PriceFormatter from '../PriceFormatter';
import { useFormik } from 'formik';

function TextField({ label, ...props }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.name}>{label}</label>
      <input
        {...props}
      />
    </div>
  );
}
const OrderSummary = ({ subtotal = 0 }) => {
  const [coupon, setCoupon] = useState('');
  const [giftCard, setGiftCard] = useState('');

  const total = useMemo(() => {
    return subtotal;
  }, [subtotal]);

  const formik = useFormik({
    initialValues: {
      city: '',
      street: '',
      home: '',
      flat: '',
      floor: '',
      code: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={styles.root}>
      <div className={styles.orderSummary}>
        <span className={styles.title}>Заказ</span>
        <div className={styles.calculationContainer}>
          <div className={styles.labelContainer}>
            <span>Итого</span>
            <span>
              <PriceFormatter amount={subtotal} />
            </span>
          </div>

          <div className={styles.labelContainer}>
            <span>Доставка</span>
            <span>---</span>
          </div>

          <div className={styles.address}>
            <TextField
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Город"
            />
            <TextField
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Улица"
              name="street"
            />
            <TextField
              value={formik.values.home}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Дом"
              name="home"
            />
            <TextField
              value={formik.values.flat}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Квартира"
              name="flat"
            />
            <TextField
              value={formik.values.floor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Этаж"
              name="floor"
            />
            <TextField
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Домофон"
              name="code"
            />
          </div>
        </div>
        <div className={styles.couponContainer}>
          <span>Промокод</span>
          <FormInputField
            value={coupon}
            handleChange={(_, coupon) => setCoupon(coupon)}
            id={'couponInput'}
            icon={'arrow'}
          />
          <span>Подарочная карта</span>
          <FormInputField
            value={giftCard}
            handleChange={(_, giftCard) => setGiftCard(giftCard)}
            id={'couponInput'}
            icon={'arrow'}
          />
        </div>
        <div className={styles.totalContainer}>
          <span>Итого: </span>
          <span>
            <PriceFormatter amount={total} />
          </span>
        </div>
      </div>
      <div className={styles.actionContainer}>
        <Button
          onClick={() => navigate('/orderConfirm')}
          fullWidth
          level={'primary'}
        >
          Оплатить
        </Button>
        <div className={styles.linkContainer}>
          <Link to={'/shop'}>Продолжить покупки</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
