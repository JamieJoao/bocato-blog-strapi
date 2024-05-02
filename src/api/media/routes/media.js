module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/media',
      handler: 'media.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/media/:folderId',
      handler: 'media.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/media',
      handler: 'media.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/media/:folderId',
      handler: 'media.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/media/:folderId',
      handler: 'media.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/media/delete-multiple',
      handler: 'media.deleteMultiple',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
