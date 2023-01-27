import React, { useState } from 'react';
import * as styles from './ProductCardGrid.module.css';

import Drawer from '../Drawer';
import ProductCard from '../ProductCard';
import QuickView from '../QuickView';
import Slider from '../Slider';
import config from '../../config.json';

const ProductCardGrid = (props) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const { height, columns = 3, data, spacing, showSlider = false } = props;
  const columnCount = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };

  function handleQuickView(idx, open) {
    if (open && idx > -1) {
      setShowQuickView(true);
      setSelectedProduct(data[idx]);
    } else {
      setShowQuickView(false);
      setSelectedProduct({});
    }
  }

  const renderCards = () => {
    return data.map((product, index) => {
      return (
        <ProductCard
          key={index}
          height={height}
          price={product.price}
          imageAlt={product.alt || ''}
          name={product.title}
          slug={product.slug}
          image={
            Array.isArray(product.image)
              ? `${config.STRAPI_API_URL}${product.image[0].url}`
              : ''
          }
          meta={product.meta || ''}
          originalPrice={product.original_price || 0}
          link={product.link || 0}
          showQuickView={() => handleQuickView(index, true)}
        />
      );
    });
  };

  return (
    <div className={styles.root} style={columnCount}>
      <div
        className={`${styles.cardGrid} ${
          showSlider === false ? styles.show : ''
        }`}
        style={columnCount}
      >
        {data && renderCards()}
      </div>

      {showSlider === true && (
        <div className={styles.mobileSlider}>
          <Slider spacing={spacing}>{data && renderCards()}</Slider>
        </div>
      )}

      <Drawer visible={showQuickView} close={() => handleQuickView(null, false)}>
        <QuickView
          close={() => handleQuickView(null, false)}
          product={selectedProduct}
        />
      </Drawer>
    </div>
  );
};

export default ProductCardGrid;
