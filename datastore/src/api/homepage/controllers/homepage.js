'use strict';

/**
 * homepage controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::homepage.homepage', ({ strapi }) => ({
//     async find(ctx) {
//         const { query } = ctx;

//         const entity = await strapi.entityService.findMany('api::homepage.homepage', {
//             ...query,
//             populate: {
//                 your-field: {
//                     populate: {
//                         sub-field: true
//                     }
//                 },
//             },
//         });
//         const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

//         return this.transformResponse(sanitizedEntity);
//     }
// });

module.exports = createCoreController('api::homepage.homepage', ({ strapi }) => ({
    async find(ctx) {
        const { query } = ctx;

        const entity = await strapi.entityService.findMany('api::homepage.homepage', {
            ...query,
            populate: {
                primaryhero: {
                    populate: {
                        image: true
                    }
                },
                seo: true,
                secondaryhero: {
                    populate: {
                        image: true
                    }
                },
                newarrivals: {
                    populate: {
                        products: true
                    }
                },
                recentarticles: {
                    populate: {
                        articles: {
                            populate: {
                                preview: true
                            }
                        }
                    }
                },
                newcollections: {
                    populate: {
                        men: true,
                        women: true
                    }
                },
                promotions: {
                    populate: {
                        image: true
                    }
                }
            },
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    }
}));
