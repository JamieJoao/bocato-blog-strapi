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
  ],
};
