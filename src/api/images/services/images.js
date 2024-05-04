'use strict';
const pathnode = require('path');
const { Readable } = require('stream');
const { findAllPaths } = require('../../../utils');

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
  deleteMany: async ({ ids }) => {
    try {
      const images = await strapi
        .service('plugin::upload.file')
        .deleteByIds(ids)

      console.log('[images delete]', images)
      return images
    } catch (error) {
      console.log('[error]', error)
      return error;
    }
  },
  checkUsed: async ({ id }) => {
    try {
      const image = await strapi.entityService.findOne('plugin::upload.file', id)
      if (!image) return null

      const people = await strapi.entityService.findMany('api::person.person', { populate: ['photo'] })
      const posts = await strapi.entityService.findMany('api::post.post', { populate: ['image'] })
      const { results: [aboutUs] } = await strapi.entityService.findPage('api::about-us.about-us')
      const { results: [gallery] } = await strapi.entityService.findPage('api::gallery.gallery')
      const { results: [home] } = await strapi.entityService.findPage('api::home.home')
      const { results: [marketplace] } = await strapi.entityService.findPage('api::marketplace.marketplace')

      const peopleUsingImage = people.filter(person => person.photo && person.photo.id == id)
      const postsUsingImage = posts.filter(post => post.image && post.image.id == id)
      const aboutUsUsingImage = findAllPaths(aboutUs?.data ?? {}, image.url)
      const galleryUsingImage = findAllPaths(gallery?.data ?? {}, image.url)
      const homeUsingImage = findAllPaths(home?.data ?? {}, image.url)
      const marketplaceUsingImage = findAllPaths(marketplace?.data ?? {}, image.url)

      return {
        person: peopleUsingImage,
        post: postsUsingImage,
        aboutUs: aboutUsUsingImage,
        gallery: galleryUsingImage,
        home: homeUsingImage,
        marketplace: marketplaceUsingImage,
      }
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
