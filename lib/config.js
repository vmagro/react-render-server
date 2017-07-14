const winston = require('winston');

const config = {
  // isDev: (process.env.NODE_ENV || 'development') === 'development',
  isDev: false,
  graphql: process.env.GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql',
  bundleUrl: process.env.BUNDLE_URL || '',
  routesPath: process.env.ROUTES_FILE || './example/routes',
};

if (!config.routesPath) {
  winston.error('Must provide ROUTES_FILE');
  process.exit(1);
}

export default config;
