'use strict';

/**
 * A set of functions called "actions" for `images`
 */

module.exports = {
  create: async (ctx) => {
    try {
      const { files = {}, body } = ctx.request;
      const filesMapped = Object.values(files)

      if (!filesMapped.length) {
        return ctx.badRequest('No files uploaded!');
      }

      const data = await strapi
        .service('api::images.images')
        .create({ files: filesMapped, ...body });

      if (!data) {
        return ctx.notFound('file.notFound');
      }

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("[CREATE IMAGE ERROR]", { moreDetails: err });
    }
  },
  delete: async (ctx) => {
    try {
      const data = await strapi
        .service('api::images.images')
        .delete(ctx.params);

      if (!data) {
        return ctx.notFound('file.notFound');
      }

      ctx.body = data
    } catch (err) {
      ctx.badRequest("[DELETE IMAGE ERROR]", { moreDetails: err });
    }
  },
  update: async (ctx) => {
    try {
      const data = await strapi
        .service('api::images.images')
        .update(ctx.params, ctx.request.body);

      if (!data) {
        return ctx.notFound('file.notFound');
      }

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("[UPDATE IMAGE ERROR]", { moreDetails: err });
    }
  },
  checkUsed: async (ctx) => {
    try {
      const data = await strapi
        .service('api::images.images')
        .checkUsed(ctx.params);

      if (!data) {
        return ctx.notFound('file.notFound');
      }

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("[CHECK USED IMAGE ERROR]", { moreDetails: err });
    }
  },
};
