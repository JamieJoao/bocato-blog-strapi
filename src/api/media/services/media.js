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

      console.log('[folders find]', folders)
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

      console.log('[folder findOne]', folder)
      return folder
    } catch (error) {
      return error
    }
  },
  findByField: async (query) => {
    try {
      const folder = await strapi
        .entityService
        .findMany(
          'plugin::upload.folder',
          {
            filters: query,
          },
        )

      console.log('[folder findByField]', folder)
      return folder
    } catch (error) {
      return error
    }
  },
  create: async ({ name }) => {
    try {
      const { max } = await strapi
        .db
        .queryBuilder('plugin::upload.folder')
        .max('pathId')
        .first()
        .execute()

      const pathId = max ? max + 1 : 1

      const folder = await strapi
        .entityService
        .create(
          'plugin::upload.folder',
          {
            data: {
              name,
              pathId,
              path: `/${pathId}`
            }
          }
        )

      console.log('[folder created]', folder)
      return folder
    } catch (error) {
      return error
    }
  },
  delete: async ({ folderId }) => {
    try {
      const folder = await strapi
        .service('plugin::upload.folder')
        .deleteByIds([folderId])

      console.log('[folder delete]', folder)
      return folder
    } catch (error) {
      return error
    }
  },
  deleteMultiple: async ({ foldersId }) => {
    try {
      const folders = await strapi
        .service('plugin::upload.folder')
        .deleteByIds(foldersId)

      console.log('[folders delete]', folders)
      return folders
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

      console.log('[folder update]', folder)
      return folder
    } catch (error) {
      return error
    }
  },
  checkUsed: async ({ folderId }) => {
    try {
      const folder = await strapi
        .entityService
        .findOne(
          'plugin::upload.folder',
          folderId,
          {
            populate: {
              files: {
                fields: ['id', 'name'],
              }
            }
          }
        )

      if (!folder) return null

      const promises = folder
        .files
        .map(async ({ id, name }) => {
          const uses = await strapi
            .service('api::images.images')
            .checkUsed({ id })

          return {
            id,
            name,
            uses,
          }
        })

      const usesList = await Promise.all(promises)

      console.log('[folder checkUsed]', usesList)
      return usesList
    } catch (error) {
      return error
    }
  },
})
