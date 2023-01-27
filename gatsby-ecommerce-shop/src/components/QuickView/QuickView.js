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
  const { updateProduct } = props;
  const { addProduct } = useCart();
  const {
    close,
    buttonTitle = 'Добавить в корзину',
    product,
    edit = false,
  } = props;

  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;
  const [activeSwatch, setActiveSwatch] = useState(product?.color);
  const [activeSize, setActiveSize] = useState(null);

  useEffect(() => {
    if (!product.strapi_id) return;
    let sizes = null
    setActiveSwatch(product.color);

    if(edit){
      sizes = product?.sizes

      setActiveSize(product.options.size);
    }else{
      sizes = product?.options?.sizes

      if (Array.isArray(sizes)) {
        setActiveSize(sizes[0]);
      }
    }  
    
  }, [product, props.open]);

  const handleAddToBag = () => {
    close();
    
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
      sizes: product.options?.sizes || [],
    };

    showNotification(pr);

    addProduct(pr);
  };

  const handleUpdateProduct = () => {
    const pr = {
      ...product,
    };

    pr.options.size = activeSize

    updateProduct(pr)
  }

  const handleSubmit = () => {
    if (props.edit){
      handleUpdateProduct()
      close()
      return
    }

    handleAddToBag()
  }

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

        {edit
          ? product?.sizes?.length > 0 && (
              <div className={styles.sectionContainer}>
                <SizeList
                  sizeList={product.sizes}
                  activeSize={activeSize}
                  setActiveSize={setActiveSize}
                />
              </div>
            )
          : product.options?.sizes?.length > 0 && (
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

        <Button onClick={handleSubmit} fullWidth level={'primary'}>
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};

export default QuickView;
