'use strict';
const pathnode = require('path');
const { Readable } = require('stream');

/**
 * images service
 */

module.exports = () => ({
  create: async ({ files, folderId }) => {
    try {
      const folder = await strapi
        .entityService
        .findOne('plugin::upload.folder', folderId)
      if (!folder) return null

      /**
       * files always come as an array
       */
      const fileInfo = files.map(() => ({ folder: folder.id }))
      const image = await strapi
        .plugins
        .upload
        .services
        .upload
        .upload({
          files,
          data: { fileInfo }
        })

      console.log('[image create]', image)
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
  },
  update: async ({ id }, data) => {
    try {
      const { name, folderId } = data
      const image = await strapi
        .plugins
        .upload
        .services
        .upload
        .updateFileInfo(
          id,
          { name, folder: folderId }
        )

      return image
    } catch (error) {
      console.log('[error]', error)
      return error;
    }
  }
});
