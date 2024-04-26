'use strict';

/**
 * A set of functions called "actions" for `images`
 */

module.exports = {
  create: async (ctx) => {
    try {
      const { files = {}, body: { pathId } } = ctx.request;
      const filesMapped = Object
        .keys(files)
        .map(key => files[key]);

      if (!filesMapped.length) {
        return ctx.badRequest('No files uploaded!');
      }

      const data = await strapi
        .service('api::images.images')
        .create({ files: filesMapped, pathId });

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
  }
};
