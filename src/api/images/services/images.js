'use strict';
const pathnode = require('path');
const { Readable } = require('stream');

/**
 * images service
 */

module.exports = () => ({
  create: async ({ files, pathId }) => {
    try {
      const image = strapi
        .plugins
        .upload
        .services
        .upload
        .upload({
          files: files,
          data: {
            fileInfo: {
              folder: pathId,
            },
          },
        })

      return image
    } catch (error) {
      console.log('[error]', error)
      return error;
    }
  },
  delete: async ({ id }) => {
    try {
      const image = await strapi
        .entityService
        .delete(
          'plugin::upload.file',
          id
        )

      return image
    } catch (error) {
      console.log('[error]', error)
      return error;
    }
  }
});
