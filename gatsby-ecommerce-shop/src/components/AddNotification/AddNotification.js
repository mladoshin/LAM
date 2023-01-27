import { Link } from 'gatsby';
import React, { useContext, useEffect } from 'react';
import AddItemNotificationContext from '../../context/AddItemNotificationProvider';
import Button from '../Button';
import Icon from '../Icons/Icon';
import * as styles from './AddNotification.module.css';
import config from '../../config.json'

const AddNotification = (props) => {
  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotif = ctxAddItemNotification.state?.open;
  const product = ctxAddItemNotification.state?.product || {}

  useEffect(() => {
    console.log(ctxAddItemNotification.state);

    //refreshCart();
  }, [showNotif]);

  return (
    <div
      className={`${styles.root} ${
        showNotif === true ? styles.show : styles.hide
      }`}
    >
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <Icon symbol={'check'}></Icon>
        </div>
        <span>Товар был добавлен в корзину</span>
      </div>

      <div className={styles.newItemContainer}>
        <div className={styles.imageContainer}>
          <img alt="image" src={`${config.STRAPI_API_URL}${product.image}`} />
        </div>
        <div className={styles.detailContainer}>
          <span className={styles.name}>{product.name}</span>
          <span className={styles.meta}>Color: {product.options?.color}</span>
          <span className={styles.meta}>Size: {product.options?.size}</span>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <Button onClick={props.openCart} level={'secondary'}>
          Смотреть корзину (1)
        </Button>
        <Button level="primary" href="/cart">
          Оформление заказа
        </Button>
        <div className={styles.linkContainer}>
          <Link to={'/shop'}>Продолжить покупки</Link>
        </div>
      </div>
    </div>
  );
};

export default AddNotification;
