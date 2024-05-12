'use strict';

/**
 * SOLO SE PUEDEN ELIMINAR LAS QUE TENGAN RELACIONES DE UNO A MUCHOS, NO DE UNO A UNO
 * UN POST TIENE UN SOLO AUTOR, UN POST TIENE UNA SOLA CATEGORÍA (NO PUEDEN ELIMINARSE SI HAY DEPENDENCIAS)
 * UN POST TIENE MUCHOS COMENTARIOS (SE PUEDEN ELIMINAR)
 */

module.exports = () => ({
  person: async (params) => {
    const { id } = params;

    const quantityPosts = await strapi
      .entityService
      .count('api::post.post', { filters: { author: id } })

    return quantityPosts
  },
  category: async (params) => {
    const { id } = params;

    const category = await strapi
      .entityService
      .count('api::post.post', { filters: { category: id } })

    return category
  }
});
