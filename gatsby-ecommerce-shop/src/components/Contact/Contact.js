import React, { useState } from 'react';
import Button from '../Button';

import FormInputField from '../FormInputField/FormInputField';

import * as styles from './Contact.module.css';

const Contact = (props) => {
  const initialState = {
    name: '',
    phone: '',
    email: '',
    comment: '',
  };

  const [contactForm, setContactForm] = useState(initialState);

  const handleChange = (id, e) => {
    const tempForm = { ...contactForm, [id]: e };
    setContactForm(tempForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContactForm(initialState);
  };

  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <h4>Свяжитесь с нами</h4>
        <p>
          Наш центр поддержки работает с 9:00 до 18:00 в Пн - Пт (по Московскому времени)
        </p>
        <p>Будем рады вам помочь!</p>
      </div>

      <div className={styles.section}>
        <h4>Телефон</h4>
        <p>+7 424 280 4971</p>
        <p>С понедельника по пятницу - с 9:00 до 18:00</p>
      </div>

      <div className={styles.section}>
        <h4>Почта</h4>
        <p>
          Вы можете написать на почту центра поддержки: <a href="mailto:customerservice@example.ru">customerservice@example.ru</a> или через форму связи внизу.
        </p>
      </div>

      <div className={styles.contactContainer}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.contactForm}>
            <FormInputField
              id={'name'}
              value={contactForm.name}
              handleChange={(id, e) => handleChange(id, e)}
              type={'text'}
              labelName={'Полное имя'}
              required
            />
            <FormInputField
              id={'phone'}
              value={contactForm.phone}
              handleChange={(id, e) => handleChange(id, e)}
              type={'number'}
              labelName={'Номер телефона'}
              required
            />
            <FormInputField
              id={'email'}
              value={contactForm.email}
              handleChange={(id, e) => handleChange(id, e)}
              type={'email'}
              labelName={'Почта'}
              required
            />
            <div className={styles.commentInput}>
              <FormInputField
                id={'comment'}
                value={contactForm.comment}
                handleChange={(id, e) => handleChange(id, e)}
                type={'textarea'}
                labelName={'Вопросы'}
                required
              />
            </div>
          </div>
          <Button
            className={styles.customButton}
            level={'primary'}
            type={'buttonSubmit'}
          >
            Отправить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
