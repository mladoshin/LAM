import React, { useState, useContext, useEffect } from 'react';

import Button from '../Button';
import CurrencyFormatter from '../PriceFormatter';
import SizeList from '../SizeList';
import SwatchList from '../SwatchList';

import { generateMockProductData } from '../../helpers/mock';
import AddItemNotificationContext from '../../context/AddItemNotificationProvider';

import * as styles from './QuickView.module.css';
import useCart from '../../hooks/useCart';
import config from '../../config.json';
import PriceFormatter from '../PriceFormatter';

const QuickView = (props) => {
  const { addProduct } = useCart();
  const { close, buttonTitle = 'Добавить в корзину', product } = props;

  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;
  const [activeSwatch, setActiveSwatch] = useState(product?.color);
  const [activeSize, setActiveSize] = useState(null);

  useEffect(() => {
    if (!product.strapi_id) return;

    setActiveSwatch(product.color);
    if (Array.isArray(product?.options?.sizes)) {
      setActiveSize(product?.options?.sizes[0]);
    }
  }, [product]);

  const handleAddToBag = () => {
    close();
    showNotification();

    console.log(product);
    if (!product.stock) return;

    const pr = {
      strapi_id: product.strapi_id,
      image: product.image[0].url,
      name: product.title,
      slug: product.slug,
      options: {
        color: product?.color,
        size: activeSize,
      },
      price: product.price,
      quantity: 1,
      sizes: product.options?.sizes || []
    };

    addProduct(pr);
  };

  const baseSlug = product?.slug?.replace(product.color, '');

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <h4>Выберите параметры</h4>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.productContainer}>
          <span className={styles.productName}>{product?.title}</span>
          <div className={styles.price}>
            <PriceFormatter amount={product.price} />
          </div>
          <div className={styles.productImageContainer}>
            {Array.isArray(product?.image) ? (
              <img
                alt={product.title}
                src={`${config.STRAPI_API_URL}${product?.image[0].url}`}
              />
            ) : (
              <img
                alt={product.title}
                src={`${config.STRAPI_API_URL}${product?.image}`}
              />
            )}
          </div>
        </div>

        {/* {product.options?.colors?.length > 0 && (
          <div className={styles.sectionContainer}>
            <SwatchList
              swatchList={product.options?.colors.map((c) => ({
                color: c,
                slug: `${baseSlug}${c}`,
              }))}
              activeSwatch={activeSwatch}
              setActiveSwatch={setActiveSwatch}
              onClick={(value)=>setActiveSwatch(value)}
            />
          </div>
        )} */}

        {product.options?.sizes?.length > 0 && (
          <div className={styles.sectionContainer}>
            <SizeList
              sizeList={product.options.sizes}
              activeSize={activeSize}
              setActiveSize={setActiveSize}
            />
          </div>
        )}

        <div className={styles.description}>
          <p>{product?.description?.data?.description}</p>
        </div>

        <Button onClick={() => handleAddToBag()} fullWidth level={'primary'}>
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};

export default QuickView;
