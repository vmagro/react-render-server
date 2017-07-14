module.exports = {
  apps: [
    {
      name: 'server',
      instances: 0,
      exec_mode: 'cluseter',
      script: './build/server.js',
      watch: true,
      env: 
        'ROUTES_FILE': '../example/routes',
        'GRAPHQL_ENDPOINT': 'http://localhost:8080/graphql',
        'NODE_ENV': 'development',
      },
      env_prod: {
        'ROUTES_FILE': './example/routes',
        'GRAPHQL_ENDPOINT': 'http://localhost:8080/graphql',
        'NODE_ENV': 'production',
      }
    }
  ],
}
