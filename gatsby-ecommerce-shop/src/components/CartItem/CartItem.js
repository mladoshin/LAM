import React, { useState } from 'react';

import AdjustItem from '../AdjustItem';
import CurrencyFormatter from '../PriceFormatter';
import Drawer from '../Drawer';
import RemoveItem from '../RemoveItem';
import QuickView from '../QuickView';

import * as styles from './CartItem.module.css';
import { navigate } from 'gatsby';
import PriceFormatter from '../PriceFormatter';
import config from '../../config.json'

const CartItem = ({product, removeProduct, updateProduct}) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [qty, setQty] = useState(product?.quantity)
  const { image, alt="", options, title, price } = product;

  const handleUpdate = (value) => {
    // setQty(value)
    const tmp = {
      ...product,
      quantity: value
    }
    console.log(tmp)
    updateProduct(tmp)
  }

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        role={'presentation'}
        onClick={() => navigate(`/product/${product.slug}`)}
      >
        <img src={`${config.STRAPI_API_URL}${image}`} alt={alt}></img>
      </div>
      <div className={styles.itemContainer}>
        <span className={styles.name}>{title}</span>
        <div className={styles.metaContainer}>
          <span>Color: {options.color}</span>
          <span>Size: {options.size}</span>
        </div>
        <div
          className={styles.editContainer}
          role={'presentation'}
          onClick={() => setShowQuickView(true)}
        >
          <span>Edit</span>
        </div>
      </div>
      <div className={styles.adjustItemContainer}>
        <AdjustItem qty={product?.quantity} setQty={handleUpdate}/>
      </div>
      <div className={styles.priceContainer}>
        <PriceFormatter amount={price} />
      </div>
      <div className={styles.removeContainer}>
        <RemoveItem onClick={removeProduct}/>
      </div>

      <Drawer visible={showQuickView} close={() => setShowQuickView(false)}>
        <QuickView close={() => setShowQuickView(false)} product={product}/>
      </Drawer>
    </div>
  );
};

export default CartItem;
