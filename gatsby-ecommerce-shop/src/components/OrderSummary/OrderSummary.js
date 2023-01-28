import React, { useEffect, useMemo, useState } from 'react';
import { Link, navigate } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import * as styles from './OrderSummary.module.css';
import PriceFormatter from '../PriceFormatter';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле!'),
  email: Yup.string()
    .email('Неправильный email')
    .required('Обязательное поле!'),
  tel: Yup.string().required('Обязательное поле!').length(11),
  city: Yup.string().required('Обязательное поле!'),
  street: Yup.string().required('Обязательное поле!'),
  home: Yup.string().required('Обязательное поле!'),
  flat: Yup.string().required('Обязательное поле!'),
  delivery_type: Yup.string().required('Обязательное поле!'),
});

const delivery_types = {
  courier: 'Курьер',
  mail: 'Почта',
  boxberry: 'Boxberry',
  pickpoint: 'PickPoint',
  sdek: 'СДЭК',
};

function TextField({ touched, error = '', label, ...props }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} />
      {touched && error && <i className={styles.error}>{error}</i>}
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

function DeliveryType({ error, touched, types, active, onChange }) {
  return (
    <div style={{ padding: '1rem 0rem' }}>
      <b>Выберите тип доставки</b>
      <div className={styles.delivery_selector}>
        {types.map((type) => (
          <div
            key={type.value}
            className={active === type.value ? styles.active : ''}
            onClick={() => onChange(type.value)}
          >
            <span>{type.label}</span>
          </div>
        ))}
      </div>
      {error && touched && <i className={styles.error}>{error}</i>}
    </div>
  );
}

function getDeliveryTypes(city, within_mcad) {
  let res = [];

  if (within_mcad) {
    // Москва
    res = ['courier', 'pickpoint'];
  } else {
    if (city.toLowerCase().trim() == 'москва') {
      // Московская область
      res = ['courier', 'mail', 'boxberry', 'pickpoint', 'sdek'];
    } else {
      // Регионы
      res = ['mail', 'boxberry', 'pickpoint', 'sdek'];
    }
  }

  return res.map((key) => ({
    label: delivery_types[key],
    value: key,
  }));
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
      within_mcad: false,
      delivery_type: '',
      types: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: FormSchema,
  });

  // console.log(formik.values);

  useEffect(() => {
    console.log('Update');
    const res = getDeliveryTypes(formik.values.city, formik.values.within_mcad);
    formik.setFieldValue('types', res);
  }, [formik.values.city, formik.values.within_mcad]);

  function handleChangeMCAD(value) {
    formik.setFieldValue('within_mcad', value);
  }

  function handleChangeCity(value) {
    formik.setFieldValue('city', value);

    if (value === '') {
      formik.setFieldValue('types', []);
      return;
    }

    if (value.toLowerCase() !== 'москва') {
      handleChangeMCAD(false);
    }
    handleChangeMCAD(false);
  }

  console.log(formik);

  return (
    <form className={styles.root} onSubmit={formik.handleSubmit}>
      <div className={styles.orderSummary}>
        <span className={styles.title}>Заказ</span>
        <div className={styles.calculationContainer}>
          <div className={styles.labelContainer}>
            <span>Итого</span>
            <span>
              <PriceFormatter amount={subtotal} />
            </span>
          </div>
          <b>Контакты</b>
          <div className={styles.address} style={{ marginBottom: '2rem' }}>
            <TextField
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Имя"
              error={formik.errors.name}
              touched={formik.touched.name}
            />

            <TextField
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Почта"
              error={formik.errors.email}
              touched={formik.touched.email}
            />

            <TextField
              name="tel"
              value={formik.values.tel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Телефон"
              error={formik.errors.tel}
              touched={formik.touched.tel}
            />
          </div>

          <b>Адрес доставки</b>
          <div className={styles.address}>
            <TextField
              name="city"
              value={formik.values.city}
              onChange={(e) => handleChangeCity(e.target.value)}
              onBlur={formik.handleBlur}
              label="Город"
              error={formik.errors.city}
              touched={formik.touched.city}
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
              error={formik.errors.street}
              touched={formik.touched.street}
            />
            <TextField
              value={formik.values.home}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Дом"
              name="home"
              error={formik.errors.home}
              touched={formik.touched.home}
            />
            <TextField
              value={formik.values.flat}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Квартира"
              name="flat"
              error={formik.errors.flat}
              touched={formik.touched.flat}
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

          <DeliveryType
            types={formik.values.types}
            active={formik.values.delivery_type}
            onChange={(val) => formik.setFieldValue('delivery_type', val)}
            error={formik.errors.delivery_type}
            touched={formik.touched.delivery_type}
          />
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
          fullWidth
          level={'primary'}
          // disabled={!formik.isValid}
          type="submit"
          className={!formik.isValid ? styles.disabled : ''}
        >
          Оплатить
        </Button>
        <div className={styles.linkContainer}>
          <Link to={'/shop'}>Продолжить покупки</Link>
        </div>
      </div>
    </form>
  );
};

export default OrderSummary;
