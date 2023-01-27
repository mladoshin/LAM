import React, {useState} from 'react';

import { navigate } from 'gatsby';
import AdjustItem from '../AdjustItem';
import RemoveItem from '../RemoveItem';

import * as styles from './MiniCartItem.module.css';
import PriceFormatter from '../PriceFormatter';
import config from '../../config.json';

const MiniCartItem = ({ product, removeProduct, updateProduct }) => {
  const { image, alt = 'image', name, price, options, size, slug, quantity } = product;
  // const [qty, setQty] = useState(product?.quantity)
  console.log(product);

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
        onClick={() => navigate(`/product/${slug}`)}
      >
        <img src={`${config.STRAPI_API_URL}${image}`} alt={alt} />
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.metaContainer}>
          <span className={styles.name}>{name}</span>
          <div className={styles.priceContainer}>
            <PriceFormatter amount={price} />
          </div>
          <span className={styles.meta}>Цвет: {options.color}</span>

          {options.size && (
            <span className={styles.meta}>
              Размер:
              <span className={styles.size}>{options.size}</span>
            </span>
          )}
        </div>
        <div className={styles.adjustItemContainer}>
          <AdjustItem qty={product.quantity} setQty={handleUpdate}/>
        </div>
      </div>
      <div className={styles.closeContainer}>
        <RemoveItem onClick={removeProduct}/>
      </div>
    </div>
  );
};

export default MiniCartItem;
