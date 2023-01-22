import React, { useState, useEffect } from 'react';
import * as styles from './shop.module.css';

import Banner from '../components/Banner';
import Breadcrumbs from '../components/Breadcrumbs';
import CardController from '../components/CardController';
import Container from '../components/Container';
import Chip from '../components/Chip';
import Icon from '../components/Icons/Icon';
import Layout from '../components/Layout';
import LayoutOption from '../components/LayoutOption';
import ProductCardGrid from '../components/ProductCardGrid';
import { generateMockProductData } from '../helpers/mock';
import Button from '../components/Button';
import Config from '../config.json';
import { graphql } from 'gatsby';
import capitilize from '../helpers/capitilize';
import useFilter from '../hooks/useFilter';
import SortDropdown from '../components/SortDropdown';


const ShopPage = (props) => {
  const products = props.data.allStrapiProduct.edges.map(n => ({ ...n.node }))

  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  // const [filteredProducts, setFilteredProducts] = useState(products)
  const { filteredProducts, filterState, filterTick, resetFilter, sortState, setSortState } = useFilter({ products })

  useEffect(() => {
    window.addEventListener('keydown', escapeHandler);
    return () => window.removeEventListener('keydown', escapeHandler);
  }, []);

  const escapeHandler = (e) => {
    if (e?.keyCode === undefined) return;
    if (e.keyCode === 27) setShowFilter(false);
  };

  const prefix = props.pageContext.prefix || 'shop'
  let link = ""
  const crumbs = props.pageContext.crumbs?.map((el, idx) => {
    link += (el + '/')
    return { label: capitilize(el), link: `${props.location.origin}/${prefix}/${link}` }
  })

  const collection_gender = props.pageContext.filter.collection_gender.eq
  const banner = collection_gender === 'men' ?
    { ...props.data.strapiCategory.mhero, image: props.data.strapiCategory.men_img }
    :
    { ...props.data.strapiCategory.whero, image: props.data.strapiCategory.women_img }

  console.log(products)
  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.breadcrumbContainer}>
            <Breadcrumbs
              crumbs={crumbs}
            />
          </div>
        </Container>
        <Banner
          maxWidth={'650px'}
          banner={banner}
        />
        <Container size={'large'} spacing={'min'}>
          <div className={styles.metaContainer}>
            <span className={styles.itemCount}>476 items</span>
            <div className={styles.controllerContainer}>
              <div
                className={styles.iconContainer}
                role={'presentation'}
                onClick={() => setShowFilter(!showFilter)}
              >
                <Icon symbol={'filter'} />
                <span>Filters</span>
              </div>
              {/* <div
                className={`${styles.iconContainer} ${styles.sortContainer}`}
                onClick={() => setShowSort(s => !s)}
                style={{position: 'relative'}}
              >
                <span>Sort by</span>
                <Icon symbol={'caret'} />
                <SortPanel open={showSort} options={Object.values(Config.sort).map(sk => ({sort: sk, order: Config.sortOrder.DESC}))}/>
              </div> */}
              <SortDropdown sortState={sortState} setSortState={setSortState} showSort={showSort} setShowSort={setShowSort} />
            </div>
          </div>
          <CardController
            closeFilter={() => setShowFilter(false)}
            visible={showFilter}
            state={filterState}
            filterTick={filterTick}
            resetFilter={resetFilter}
          />
          <div className={styles.chipsContainer}>
            <Chip name={'XS'} />
            <Chip name={'S'} />
          </div>
          <div className={styles.productContainer}>
            <span className={styles.mobileItemCount}>476 items</span>
            <ProductCardGrid data={filteredProducts}></ProductCardGrid>
          </div>
          <div className={styles.loadMoreContainer}>
            <span>6 of 456</span>
            <Button fullWidth level={'secondary'}>
              LOAD MORE
            </Button>
          </div>
        </Container>
      </div>

      <LayoutOption />
    </Layout>
  );
};

export const query = graphql`
  query ($filter: STRAPI_PRODUCTFilterInput, $categoryFilter: StringQueryOperatorInput) {
    strapiCategory(slug: $categoryFilter) {
      id
      name
      mhero {
        title
      }
      whero {
        title
      }
      men_img {
        url
      }
      women_img {
        url
      }
    }
    allStrapiProduct(filter: $filter) {
      edges {
        node {
          id
          collection_gender
          original_price
          createdAt
          categories {
            id
            slug
          }
          slug
          price
          image {
            url
          }
          title
          description {
            data {
              description
            }
          }

        }
      }
    }
  }
`

export default ShopPage;
