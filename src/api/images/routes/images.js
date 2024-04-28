module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/images',
      handler: 'images.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/images/:id',
      handler: 'images.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/images/:id',
      handler: 'images.update',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
