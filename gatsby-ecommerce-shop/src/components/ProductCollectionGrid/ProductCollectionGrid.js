import React from 'react';
import * as styles from './ProductCollectionGrid.module.css';

import ProductCollection from '../ProductCollection';

const ProductCollectionGrid = (props) => {
  return (
    <div className={styles.root}>
      <ProductCollection
        image={'/collections/collection1.png'}
        title={'Для мужчин'}
        text={'Смотреть'}
        link={'/shop/men'}
      />
      <ProductCollection
        image={'/collections/collection2.png'}
        title={'Для женщин'}
        text={'Смотреть'}
        link={'/shop/women'}
      />
    </div>
  );
};

export default ProductCollectionGrid;
