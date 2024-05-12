'use strict';

/**
 * A set of functions called "actions" for `check`
 */

module.exports = {
  person: async (ctx) => {
    try {
      const data = await strapi
        .service('api::check.check')
        .person(ctx.params);

      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  },
  category: async (ctx) => {
    try {
      const data = await strapi
        .service('api::check.check')
        .category(ctx.params);

      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
};
