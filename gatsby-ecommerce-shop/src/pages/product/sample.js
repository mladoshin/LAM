import React, { useState, useContext } from 'react';
import * as styles from './sample.module.css';

import Accordion from '../../components/Accordion';
import AdjustItem from '../../components/AdjustItem';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import Container from '../../components/Container';
import CurrencyFormatter from '../../components/PriceFormatter';
import Gallery from '../../components/Gallery';
import SizeList from '../../components/SizeList';
import Split from '../../components/Split';
import SwatchList from '../../components/SwatchList';
import Layout from '../../components/Layout/Layout';

import { generateMockProductData } from '../../helpers/mock';
import Icon from '../../components/Icons/Icon';
import ProductCardGrid from '../../components/ProductCardGrid';
import { graphql, navigate } from 'gatsby';

import AddItemNotificationContext from '../../context/AddItemNotificationProvider';
import config from '../../config.json'
import PriceFormatter from '../../components/PriceFormatter';
import capitilize from '../../helpers/capitilize';
import StockInfo from '../../components/StockInfo';
import useCart from '../../hooks/useCart';

const ProductPage = (props) => {
  const { cart, addProduct} = useCart()
  
  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;
  const [qty, setQty] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const product = props.pageContext.product || {}
  const policy = props.pageContext.policy || {}

  const [activeSwatch, setActiveSwatch] = useState(product?.color);
  const [activeSize, setActiveSize] = useState(Array.isArray(product?.options?.sizes) ? product?.options?.sizes[0] : "");
  // const suggestions = generateMockProductData(4, 'woman');

  // console.log(props)
  const suggestions = props.data.allStrapiProduct.edges?.map(edge => ({ ...edge.node }))?.filter(edge => edge.slug !== product?.slug)

  const baseSlug = product?.slug?.replace(product.color, "")

  let link = ""
  const crumbs = props.pageContext.crumbs?.map((el, idx) => {
    link += (el+'/')
    if (typeof window == "undefined"){
      return {label: capitilize(el), link: '#'}
    }

    return {label: capitilize(el), link: idx===props.pageContext.crumbs.length-1 ? window.location.href: `${window.location.origin}/shop/${link}`}
  })

  console.log(product)

  function handleAddProduct(){
    if (!product.stock) return;

    const pr = {
      strapi_id: product.strapi_id,
      image: product.image[0].url,
      title: product.title,
      slug: product.slug,
      options: {
        color: product.color,
        size: activeSize
      },
      price: product.price,
      quantity: qty
    }

    addProduct(pr)
  }

  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <Breadcrumbs
            crumbs={crumbs}
          />
          <div className={styles.content}>
            <div className={styles.gallery}>
              <Gallery images={product.image?.map(img => ({ alt: 'img', image: `${config.STRAPI_API_URL}${img.url}` }))} />
            </div>
            <div className={styles.details}>
              <h1>{product.title}</h1>

              <div className={styles.priceContainer}>
                {/* <span>{`${product.price} руб.`}</span> */}
                <PriceFormatter amount={product.price} />
                <StockInfo stock={product.stock}/>
              </div>

              {product.options?.colors?.length > 0 &&
                <div>
                  <SwatchList
                    swatchList={product.options?.colors.map(c => ({ color: c, slug: `${baseSlug}${c}` }))}
                    activeSwatch={activeSwatch}
                    setActiveSwatch={setActiveSwatch}
                  />
                </div>
              }

              {product.options?.sizes?.length > 0 &&
                <div className={styles.sizeContainer}>
                  <SizeList
                    sizeList={product.options?.sizes || []}
                    activeSize={activeSize}
                    setActiveSize={setActiveSize}
                  />
                </div>
              }

              <div className={styles.quantityContainer}>
                <span>Количество</span>
                <AdjustItem qty={qty} setQty={setQty} />
              </div>

              <div className={styles.actionContainer}>
                <div className={styles.addToButtonContainer}>
                  <Button
                    onClick={() => {
                      showNotification()
                      handleAddProduct()
                    }}
                    fullWidth
                    level={'primary'}
                  >
                    Добавить в корзину
                  </Button>
                </div>
                <div
                  className={styles.wishlistActionContainer}
                  role={'presentation'}
                  onClick={() => setIsWishlist(!isWishlist)}
                >
                  <Icon symbol={'heart'}></Icon>
                  <div
                    className={`${styles.heartFillContainer} ${isWishlist === true ? styles.show : styles.hide
                      }`}
                  >
                    <Icon symbol={'heartFill'}></Icon>
                  </div>
                </div>
              </div>

              {/* <div className={styles.description}>
                <p>{product.description.data.description}</p>
                <span>Product code: {sampleProduct.productCode}</span>
              </div> */}

              <div className={styles.informationContainer}>
                <Accordion
                  type={'plus'}
                  customStyle={styles}
                  title={'Материалы'}
                >
                  <p className={styles.information}>
                    {product.materials?.data?.materials}
                  </p>
                </Accordion>

                <Accordion
                  type={'plus'}
                  customStyle={styles}
                  title={'Доставка и оплата'}
                >
                  <p className={styles.information}>
                    {policy.delivery?.data.delivery}
                  </p>
                  <p className={styles.information}>
                    {policy.payment?.data.payment}
                  </p>
                </Accordion>

                <Accordion
                  type={'plus'}
                  customStyle={styles}
                  title={'Гарантия и возврат'}
                >
                  <p className={styles.information}>
                    {policy.guarantee?.data.guarantee}
                  </p>
                  <p className={styles.information}>
                    {policy.return?.data.return}
                  </p>
                </Accordion>
                {/* <Accordion type={'plus'} customStyle={styles} title={'help'}>
                  <p className={styles.information}>
                    {sampleProduct.description}
                  </p>
                </Accordion> */}
              </div>
            </div>
          </div>
          {suggestions?.length > 0 &&
            <div className={styles.suggestionContainer}>
              <h2>Рекомендуем также</h2>
              <ProductCardGrid
                spacing
                showSlider
                height={400}
                columns={4}
                data={suggestions}
              />
            </div>
          }
        </Container>

        {/* <div className={styles.attributeContainer}>
          <Split
            image={'/cloth.png'}
            alt={'attribute description'}
            title={'Sustainability'}
            description={
              'We design our products to look good and to be used on a daily basis. And our aim is to inspire people to live with few timeless objects made to last. This is why quality over quantity is a cornerstone of our ethos and we have no interest in trends or seasonal collections.'
            }
            ctaText={'learn more'}
            cta={() => navigate('/blog')}
            bgColor={'var(--standard-light-grey)'}
          />
        </div> */}
      </div>
    </Layout>
  );
};


export const query = graphql`
  query ($filter: STRAPI_PRODUCTFilterInput) {
    allStrapiProduct(filter: $filter) {
      edges {
        node {
          id
          slug
          price
          image {
            url
          }
          title
        }
      }
    }
  }
`

export default ProductPage;
