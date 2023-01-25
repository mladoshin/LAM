const path = require("path");
const { generateFilterOptions } = require("./src/helpers/generateFilterOptions");

const gender_options = {
  category: 'gender',
  items: ['men', 'women'].map(el => ({name: el, value: true}))
}

exports.onCreateWebpackConfig = (helper) => {
  const { stage, actions, getConfig } = helper;
  if (stage === 'develop' || stage === 'build-javascript') {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
    );
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }
    actions.replaceWebpackConfig(config);
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const queryResults = await graphql(`
    query {
      strapiPolicy {
        return {
          data {
            return
          }
        }
        payment {
          data {
            payment
          }
        }
        guarantee {
          data {
            guarantee
          }
        }
        delivery {
          data {
            delivery
          }
        }
      }
      allStrapiProduct {
        edges {
          node {
            id
            slug
            title
            stock
            status
            color
            price
            strapi_id
            collection_gender
            original_price
            materials {
              data {
                materials
              }
            }
            policy {
              data {
                policy
              }
            }
            image {
              url
            }
            options {
              sizes
              colors
            }
            categories {
              name
              slug
              id
            }
            description {
              data {
                description
              }
            }
          }
        }
      }
      allStrapiCategory {
        edges {
          node {
            id
            slug
            filters {
              strapi_json_value
            }
            products {
              id
              color
              options {
                sizes
              }
              collection_gender
              company {
                name
              }
            }
          }
        }
      }
    }
  `)

  const shopTemplate = path.resolve(`src/pages/shop.js`)
  const productTemplate = path.resolve(`src/pages/product/sample.js`)

  createPage({
    path: `/shop/men`,
    component: shopTemplate,
    context: {
      // This time the entire product is passed down as context
      crumbs: ['men'],
      filter: { collection_gender: { eq: 'men' } },

    },
  })
  createPage({
    path: `/shop/women`,
    component: shopTemplate,
    context: {
      // This time the entire product is passed down as context
      crumbs: ['women'],
      filter: { collection_gender: { eq: 'women' } }
    },
  })

  //generate category filters 

  queryResults.data.allStrapiCategory.edges.forEach(({ node }) => {

    const productFilters = generateFilterOptions(node)
    const productFilters_men = generateFilterOptions(node, 'men')
    const productFilters_women = generateFilterOptions(node, 'women')

    createPage({
      path: `/shop/men/${node.slug}`,
      component: shopTemplate,
      context: {
        // This time the entire product is passed down as context
        crumbs: ['men', node.slug],
        filter: { collection_gender: { eq: 'men' }, categories: { elemMatch: { slug: { eq: node.slug } } } },
        categoryFilter: { eq: node.slug },
        productFilters: productFilters_men
      },
    })
    createPage({
      path: `/shop/women/${node.slug}`,
      component: shopTemplate,
      context: {
        crumbs: ['women', node.slug],
        filter: { collection_gender: { eq: 'women' }, categories: { elemMatch: { slug: { eq: node.slug } } } },
        categoryFilter: { eq: node.slug },
        productFilters: productFilters_women
      },
    })

    createPage({
      path: `/products/${node.slug}`,
      component: shopTemplate,
      context: {
        // This time the entire product is passed down as context
        crumbs: [node.slug],
        prefix: '/products',
        filter: { categories: { elemMatch: { slug: { eq: node.slug } } } },
        productFilters: [...productFilters, gender_options]
      },
    })
  })

  //create a page for each product
  queryResults.data.allStrapiProduct.edges.forEach(({ node }) => {

    createPage({
      path: `/product/${node.slug}`,
      component: productTemplate,
      context: {
        // This time the entire product is passed down as context
        crumbs: [node.collection_gender, node.categories[0].slug, node.title],
        product: node,
        policy: queryResults.data.strapiPolicy,
        filter: { categories: { elemMatch: { slug: { eq: node.categories[0]?.slug || "" } } }, collection_gender: { eq: node.collection_gender } }
      },
    })

  })
}

