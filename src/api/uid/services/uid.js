'use strict';

const contentTypesMap = {
  post: 'api::post.post',
  category: 'api::category.category',
}

module.exports = {
  async checkUid(type, field, data) {
    const dataField = data[field] || 'default';
    const entries = await strapi
    .entityService
    .findMany(
      contentTypesMap[type],
      {
        filters: {
          [field]: dataField
        }
      }
    )

    console.log(entries);

    if (data.id && entries.every(entry => String(entry.id) === data.id)) {
      return true;
    }
    
    return entries.length === 0;
  },
};
