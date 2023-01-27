import { Link } from 'gatsby';
import React from 'react';

import Brand from '../components/Brand';
import CartItem from '../components/CartItem';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Icon from '../components/Icons/Icon';
import OrderSummary from '../components/OrderSummary';
import useCart from '../hooks/useCart';

import * as styles from './cart.module.css';

const CartPage = (props) => {
  const { cart, updateProduct, removeProduct, getTotal } = useCart();

  const subtotal = getTotal()

  return (
    <div>
      <div className={styles.contentContainer}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.headerContainer}>
            <div className={styles.shoppingContainer}>
              <Link className={styles.shopLink} to={'/shop'}>
                <Icon symbol={'arrow'}></Icon>
                <span className={styles.continueShopping}>
                  Продолжить покупки
                </span>
              </Link>
            </div>
            <Brand />
            <div className={styles.loginContainer}>
              <Link to={'/login'}>Вход</Link>
            </div>
          </div>
          <div className={styles.summaryContainer}>
            <h3>Моя корзина</h3>
            <div className={styles.cartContainer}>
              <div className={styles.cartItemsContainer}>
                {cart.products?.map((product, idx) => (
                  <CartItem
                    product={product}
                    removeProduct={() => removeProduct({ rm_idx: idx })}
                    updateProduct={(pr) => updateProduct({idx, product: pr})}
                  />
                ))}
              </div>
              <OrderSummary subtotal={subtotal}/>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
