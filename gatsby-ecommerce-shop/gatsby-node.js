const path = require("path");
const { categories } = require("../datastore/data/data");

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

  queryResults.data.allStrapiCategory.edges.forEach(({ node }) => {
    createPage({
      path: `/shop/men/${node.slug}`,
      component: shopTemplate,
      context: {
        // This time the entire product is passed down as context
        crumbs: ['men', node.slug],
        filter: { collection_gender: { eq: 'men' }, categories: { elemMatch: { slug: { eq: node.slug } } } },
        categoryFilter: { eq: node.slug }
      },
    })
    createPage({
      path: `/shop/women/${node.slug}`,
      component: shopTemplate,
      context: {
        crumbs: ['women', node.slug],
        filter: { collection_gender: { eq: 'women' }, categories: { elemMatch: { slug: { eq: node.slug } } } },
        categoryFilter: { eq: node.slug}
      },
    })

    createPage({
      path: `/products/${node.slug}`,
      component: shopTemplate,
      context: {
        // This time the entire product is passed down as context
        crumbs: [node.slug],
        prefix: '/products',
        filter: { categories: { elemMatch: { slug: { eq: node.slug } } } }
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

