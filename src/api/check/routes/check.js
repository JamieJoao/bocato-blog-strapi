module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/check/person/:id',
     handler: 'check.person',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'GET',
      path: '/check/category/:id',
      handler: 'check.category',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
