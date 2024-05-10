'use strict';

/**
 * A set of functions called "actions" for `media`
 */

module.exports = {
  find: async (ctx, next) => {
    try {
      const data = await strapi
        .service('api::media.media')
        .find();

      if (!data) {
        return ctx.notFound('folders.notFound');
      }

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("[FIND FOLDERS ERROR]", { moreDetails: err });
    }
  },
  findOne: async (ctx, next) => {
    try {
      const data = await strapi
        .service('api::media.media')
        .findOne(ctx.params);

      if (!data) {
        return ctx.notFound('folder.notFound');
      }

      ctx.body = data;
    } catch (err) {
      console.log(err);
      ctx.badRequest("[FIND FOLDER BY ID ERROR]", { moreDetails: err });
    }
  },
  findByField: async (ctx, next) => {
    try {
      const data = await strapi
        .service('api::media.media')
        .findByField(ctx.request.query);

      if (!data) {
        return ctx.notFound('folder.notFound');
      }

      ctx.body = data;
    } catch (err) {
      console.log(err);
      ctx.badRequest("[FIND FOLDER BY FIELD ERROR]", { moreDetails: err });
    }
  },
  create: async (ctx, next) => {
    try {
      const data = await strapi
        .service('api::media.media')
        .create(ctx.request.body)

      if (!data) {
        return ctx.notFound('folder.notFound');
      }

      ctx.body = data;
    } catch (err) {
      console.log(err);
      ctx.badRequest("[CREATE FOLDER ERROR]", { moreDetails: err });
    }
  },
  delete: async (ctx, next) => {
    try {
      const data = await strapi
        .service('api::media.media')
        .delete(ctx.params);

      if (!data) {
        return ctx.notFound('folder.notFound');
      }

      ctx.body = data;
    } catch (err) {
      console.log(err);
      ctx.badRequest("[DELETE FOLDER ERROR]", { moreDetails: err });
    }
  },
  deleteMultiple: async (ctx, next) => {
    try {
      const data = await strapi
        .service('api::media.media')
        .deleteMultiple(ctx.request.body);

      if (!data) {
        return ctx.notFound('folders.notFound');
      }

      ctx.body = data;
    } catch (err) {
      console.log(err);
      ctx.badRequest("[DELETE MULTIPLE FOLDERS ERROR]", { moreDetails: err });
    }
  },
  update: async (ctx, next) => {
    try {
      const data = await strapi
        .service('api::media.media')
        .update(ctx.params, ctx.request.body);

      if (!data) {
        return ctx.notFound('folder.notFound');
      }

      ctx.body = data;
    } catch (err) {
      console.log(err);
      ctx.badRequest("[UPDATE FOLDER ERROR]", { moreDetails: err });
    }
  },
  checkUsed: async (ctx, next) => {
    try {
      const data = await strapi
        .service('api::media.media')
        .checkUsed(ctx.params);

      if (!data) {
        return ctx.notFound('folder.notFound');
      }

      ctx.body = data;
    } catch (err) {
      console.log(err);
      ctx.badRequest("[CHECK USED FOLDER ERROR]", { moreDetails: err });
    }
  },
};
