'use strict';

/**
 *  product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product')

// module.exports = createCoreController('api::product.product', ({ strapi }) => ({
//     async find(ctx) {
//         const { query } = ctx;

//         const entity = await strapi.entityService.findMany('api::product.product', {
//             ...query,
//             populate: {
//                 options: true
//             }
//         });
//         const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

//         return this.transformResponse(sanitizedEntity);
//     }
// }));