require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Sydney Ecommerce Theme`,
    siteUrl: `https://jamm.matter.design`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Sydney Ecommerce Theme`,
        short_name: `Sydney`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: 'src/assets/favicon.png',
      },
    },
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_API_URL || "http://localhost:1337",
        accessToken: process.env.STRAPI_TOKEN,
        collectionTypes: [
          {
            singularName: "product",
          },
          {
            singularName: "company",
          },
          {
            singularName: "category"
          },
          {
            singularName: "article",
          },
        ],
        singleTypes: [
          {
            singularName: "homepage",
            api: {
              qs: {
                populate: "*"
              }
            }
          },
          {
            singularName: "policy",
            api: {
              qs: {
                populate: "*"
              }
            }
          },
        ],
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
  ],
};


