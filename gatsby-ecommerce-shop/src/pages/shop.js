import React, { useState, useEffect, useMemo } from 'react';
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
import { generateFilterOptions } from '../helpers/generateFilterOptions';

//generate unique set of categories in filters
function generateProductCategories(products){
  const categorySet = new Set()

  products?.map(p => {
    p.categories?.forEach(cat => categorySet.add(cat.name))
  })

  return {
    category: 'category',
    items: Array.from(categorySet).map(cat => ({name: cat, value: true}))
  }
}

const gender_options = {
  category: 'gender',
  items: ['men', 'women'].map(el => ({name: el, value: true}))
}

const ShopPage = (props) => {
  const collection_gender = props.pageContext.filter?.collection_gender?.eq || null
  const products = props.data.allStrapiProduct.edges.map(n => ({ ...n.node }))

  //generate product filters for a page
  const productFilters = useMemo(() => {
    let res = null
    if (!props.pageContext.productFilters) {
      res = generateFilterOptions({ products })
      const category_filter = generateProductCategories(products)
      res.push(category_filter)
      if (!collection_gender) res.push(gender_options);
    }

    return res
  }, [])


  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const { filteredProducts, filterState, filterTick, resetFilter, sortState, setSortState } = useFilter({ products, productFilters: props.pageContext.productFilters || productFilters })

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



  let banner = {}
  if (collection_gender === 'men') {
    banner = { ...props.data.strapiCategory.mhero, image: props.data.strapiCategory.men_img }
  } else if (collection_gender === 'women') {
    banner = { ...props.data.strapiCategory.whero, image: props.data.strapiCategory.women_img }
  }

  const size_chips = useMemo(()=>{
    const idx = filterState.findIndex(f => f.category == 'size')
    if (idx == -1) return [];
    if(filterState[idx].items.every(i => i.value)) return [{name: 'All'}];
    
    return filterState[idx].items.filter(i => i.value)
  }, [filterState])

  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.breadcrumbContainer}>
            <Breadcrumbs
              crumbs={crumbs || []}
            />
          </div>
        </Container>
        <Banner
          maxWidth={'650px'}
          banner={banner}
        />
        <Container size={'large'} spacing={'min'}>
          <div className={styles.metaContainer}>
            <span className={styles.itemCount}>{filteredProducts.length} items</span>
            <div className={styles.controllerContainer}>
              <div
                className={styles.iconContainer}
                role={'presentation'}
                onClick={() => setShowFilter(!showFilter)}
              >
                <Icon symbol={'filter'} />
                <span>Filters</span>
              </div>
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
            {size_chips.map(chip => (
              <Chip name={chip.name} />
            ))}
          </div>
          <div className={styles.productContainer}>
            <span className={styles.mobileItemCount}>{filteredProducts.length} items</span>
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
          color
          options {
            sizes
          }
          categories {
            id
            slug
            name
          }
          company {
            name
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
