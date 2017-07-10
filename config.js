const config = {
  isDev: (process.env.NODE_ENV || 'development') == 'development',
  graphql: process.env.GRAPHQL_ENDPOINT,
  bundleUrl: process.env.BUNDLE_URL || '',
  routesPath: process.env.ROUTES_FILE,
}

if (!config.routesPath) {
  console.error('Must provide ROUTES_FILE');
  process.exit(1);
}

module.exports = config;
