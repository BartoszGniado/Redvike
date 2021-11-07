const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const APP_VERSION = require('./package.json').version;
const DESCRIPTION = require('./package.json').description;

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: APP_VERSION,
      title: DESCRIPTION,
      description:
        'to test endpoints requiring authorization use /login first <br> \
       user with login/pass user/user is provided',
      contact: {
        name: 'bartosz.gniado@opegieka.pl',
      },
      servers: ['http://localhost:8000'],
    },
  },
  apis: ['app.js', 'routes/*.js', 'db/models/*.yaml'],
};

exports.initSwagger = (app) => {
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
