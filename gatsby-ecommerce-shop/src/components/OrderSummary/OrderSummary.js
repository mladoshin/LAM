import React, { useEffect, useMemo, useState } from 'react';
import { Link, navigate } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../PriceFormatter';

import * as styles from './OrderSummary.module.css';
import PriceFormatter from '../PriceFormatter';
import { useFormik } from 'formik';

const delivery_types = {
  courier: 'Курьер',
  mail: 'Почта',
  boxberry: 'Boxberry',
  pickpoint: 'PickPoint',
  sdek: 'СДЭК',
};

function TextField({ label, ...props }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} />
    </div>
  );
}

function McadSelector({ value, onChange, label }) {
  return (
    <div className={styles.mcad_selector}>
      <span style={{ display: 'block' }}>{label}</span>
      <form>
        <div>
          <input
            type="radio"
            name="not_mcad"
            checked={!value}
            onChange={() => onChange(false)}
          />
          <label htmlFor="not_mcad">Нет</label>
        </div>

        <div>
          <input
            type="radio"
            name="mcad"
            checked={value}
            onChange={() => onChange(true)}
          />
          <label htmlFor="mcad">Да</label>
        </div>
      </form>
    </div>
  );
}

function DeliveryType({ types }) {
  return (
    <div>
      <span>Типы доставки</span>
      <div className={styles.delivery_selector}>
        {types.map((type) => (
          <div key={type.value}>
            <span>{type.label}</span>
          </div>
        ))}
      </div>
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
      delivery_cost: 0,
      within_mcad: false,
      delivery_type: '',
      types: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(formik.values);

  function handleChangeMCAD(value) {
    formik.setFieldValue('within_mcad', value);
    if (value) {
      const tmp = ['courier', 'pickpoint'];
      formik.setFieldValue('delivery_cost', 500);
      formik.setFieldValue(
        'types',
        tmp.map((key) => ({
          label: delivery_types[key],
          value: key,
        }))
      );
    } else {
      const tmp = ['mail', 'boxberry', 'pickpoint', 'sdek'];
      formik.setFieldValue('delivery_cost', 800);
      formik.setFieldValue(
        'types',
        tmp.map((key) => ({
          label: delivery_types[key],
          value: key,
        }))
      );
    }
  }

  function handleChangeCity(value){
    formik.setFieldValue('city', value)

    if(value === ""){
      formik.setFieldValue('types', [])
      return
    }

    if(formik.values.city.toLowerCase() !== 'москва'){
      handleChangeMCAD(false)
    }
  }

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
            <PriceFormatter amount={formik.values.delivery_cost} />
          </div>

          <div className={styles.address}>
            <TextField
              name="city"
              value={formik.values.city}
              onChange={e => handleChangeCity(e.target.value)}
              onBlur={formik.handleBlur}
              label="Город"
            />

            {formik.values.city.toLowerCase() === 'москва' && (
              <McadSelector
                value={formik.values.within_mcad}
                onChange={handleChangeMCAD}
                label="В пределах МКАД"
              />
            )}

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
            {/* <Button
              onClick={() => navigate('/orderConfirm')}
              fullWidth
              level='secondary'
            >
              Расчитать стоимость
            </Button> */}
          </div>

          <DeliveryType types={formik.values.types} />
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
