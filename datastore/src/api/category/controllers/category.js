'use strict';

/**
 *  category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category');

// module.exports = createCoreController('api::category.category', ({ strapi }) => ({
//     async find(ctx) {
//         const { query } = ctx;

//         const entity = await strapi.entityService.findMany('api::category.category', {
//             ...query,
//             populate: {
//                 whero: {
//                     populate: {
//                         image: true
//                     }
//                 },
//                 mhero: {
//                     populate: {
//                         image: true
//                     }
//                 },
//             },
//         });
//         const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

//         return this.transformResponse(sanitizedEntity);
//     }
// }));