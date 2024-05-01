'use strict'

/**
 * media service
 */

module.exports = () => ({
  find: async () => {
    try {
      const folders = await strapi
        .entityService
        .findMany(
          'plugin::upload.folder',
          {
            fields: ['id', 'name', 'path', 'pathId', 'createdAt'],
            sort: 'createdAt:desc',
            populate: {
              files: {
                fields: ['id', 'url', 'width', 'height', 'size', 'formats'],
                sort: 'createdAt:desc',
              }
            }
          }
        )

      console.log('[folders]', folders)
      return folders
    } catch (error) {
      return error
    }
  },
  findOne: async ({ folderId }) => {
    try {
      const folder = await strapi
        .entityService
        .findOne(
          'plugin::upload.folder',
          folderId,
          {
            fields: ['id', 'name', 'path', 'pathId'],
            populate: {
              files: {
                fields: ['id', 'name', 'url', 'formats', 'width', 'height', 'ext', 'size', 'folderPath', 'createdAt', 'updatedAt'],
                sort: 'createdAt:desc',
              }
            }
          }
        )

      console.log('[folder]', folder)
      return folder
    } catch (error) {
      return error
    }
  },
  create: async ({ name, pathId }) => {
    try {
      const folder = await strapi
        .entityService
        .create(
          'plugin::upload.folder',
          { data: { name, path: `/${pathId}`, pathId } }
        )

      console.log('[folder]', folder)
      return folder
    } catch (error) {
      return error
    }
  },
  delete: async ({ folderId }) => {
    try {
      const folder = await strapi
        .entityService
        .delete(
          'plugin::upload.folder',
          folderId
        )

      console.log('[folder]', folder)
      return folder
    } catch (error) {
      return error
    }
  },
  update: async ({ folderId }, data) => {
    try {
      const folder = await strapi
        .entityService
        .update(
          'plugin::upload.folder',
          folderId,
          { data }
        )

      console.log('[folder]', folder)
      return folder
    } catch (error) {
      return error
    }
  }
})
