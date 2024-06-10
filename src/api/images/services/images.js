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
      const aboutUs = await strapi.entityService.findMany('api::about-us.about-us', { populate: ['mainImage', 'productsImage', 'metaThumbnail'] })
      const gallery = await strapi.entityService.findMany('api::gallery.gallery', { populate: ['images', 'metaThumbnail'] })
      const home = await strapi.entityService.findMany('api::home.home', { populate: ['ticketsImage', 'igImages', 'metaThumbnail'] })
      const marketplace = await strapi.entityService.findMany('api::marketplace.marketplace', { populate: ['mainImage', 'metaThumbnail'] })

      delete aboutUs.id
      delete gallery.id
      delete home.id
      delete marketplace.id

      const peopleUsingImage = people.filter(person => person.photo && person.photo.id == id)
      const postsUsingImage = posts.filter(post => post.image && post.image.id == id)
      const aboutUsUsingImage = aboutUs.mainImage == id || aboutUs.productsImage == id || aboutUs.metaThumbnail == id ? [aboutUs] : []
      const galleryUsingImage = gallery.images.some(image => image.id == id) || gallery.metaThumbnail == id ? [gallery] : []
      const homeUsingImage = home.ticketsImage == id || home.igImages.some(image => image.id == id) || home.metaThumbnail == id ? [home] : []
      const marketplaceUsingImage = marketplace.mainImage == id || marketplace.metaThumbnail == id ? [marketplace] : []

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
