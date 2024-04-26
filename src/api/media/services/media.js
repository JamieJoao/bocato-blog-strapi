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
            fields: ['id', 'name', 'path', 'pathId'],
          }
        )

      for (const folder of folders) {
        const count = await strapi
          .entityService
          .count(
            'plugin::upload.file',
            {
              filters: { $and: [{ folder }] }
            })

        folder.count = count
      }

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
                fields: ['id', 'name', 'url', 'formats', 'width', 'height', 'createdAt', 'updatedAt']
              }
            }
          }
        )

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

      return folder
    } catch (error) {
      return error
    }
  },
  update: async ({ folderId }, { name }) => {
    try {
      const folder = await strapi
        .entityService
        .update(
          'plugin::upload.folder',
          folderId,
          { data: { name } }
        )

      return folder
    } catch (error) {
      return error
    }
  }
})
