'use strict';

module.exports = {
  async checkUid(ctx) {
    try {
      const { contentTypeUID, field, data } = ctx.request.body;

      if (!contentTypeUID || !field || !data) {
        return ctx.badRequest('contentTypeUID, field, and data are required');
      }

      const isAvailable = await strapi
        .service('api::uid.uid')
        .checkUid(contentTypeUID, field, data);

      ctx.send({ isAvailable });
    } catch (error) {
      console.log('[error]', error)
      ctx.badRequest('Error generating UID', { error });
    }
  },
};
