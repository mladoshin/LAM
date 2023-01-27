import { Link, navigate } from 'gatsby';
import React, { useMemo } from 'react';

import Button from '../Button';
import CurrencyFormatter from '../PriceFormatter';
import MiniCartItem from '../MiniCartItem';

import * as styles from './MiniCart.module.css';
import useCart from '../../hooks/useCart';

const MiniCart = (props) => {
  const { cart, getTotal, removeProduct, updateProduct } = useCart();

  const total = useMemo(() => getTotal(), [cart]);

  const navigateToCheckout = () => {
    document.body.style.overflowY = 'auto'
    navigate('/cart')
  }

  const navigateToShop = () => {
    props.handleOpenCart(false)
    navigate('/shop')
  }

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <h4>Моя корзина</h4>
      </div>
      <div className={styles.cartItemsContainer}>
        {cart.products.map((product, idx) => (
          <MiniCartItem
            key={`${product.strapi_id}-${idx}`}
            product={product}
            removeProduct={() => removeProduct({ rm_idx: idx })}
            updateProduct={(product) => updateProduct({idx, product})}
          />
        ))}
      </div>
      <div className={styles.summaryContainer}>
        <div className={styles.summaryContent}>
          <div className={styles.totalContainer}>
            <span>Итого</span>
            <span>
              <CurrencyFormatter amount={total} appendZero />
            </span>
          </div>
          <span className={styles.taxNotes}>
            Доставка будет расчитана при оформлении заказа
          </span>
          <Button onClick={navigateToCheckout} level={'primary'} fullWidth>
            Оформить заказ
          </Button>
          <div className={styles.linkContainer}>
            <a onClick={navigateToShop}>Продолжить покупки</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
