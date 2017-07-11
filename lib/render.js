import React from 'react';
import {
  ApolloClient, createNetworkInterface, ApolloProvider, getDataFromTree
} from 'react-apollo';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';

// this is necessary to make apollo work on the server
import 'isomorphic-fetch';

import { isDev, routesPath, graphql, bundleUrl } from './config';

let routes = require(routesPath).default;

export default (req, res) => {
  // provide the option to skip ssr completely
  if (isDev) {
    if (req.query.nossr != null) {
      console.log('[dev] skipping ssr');
      res.send(renderPage(''));
      return;
    }
    console.log('[dev] hot-reloading routes');
    // clear all the loaded modules from the cache
    Object.keys(require.cache).forEach((key) => delete require.cache[key]);
    routes = require(routesPath).default;
  }


  const context = {};
  const router = (
    <StaticRouter location={req.url} context={context}>
      {routes}
    </StaticRouter>
  );

  // using graphql is optional, if its being used, wrap the router component in
  // an ApolloProvider
  if (graphql) {
    console.log('Rendering in graphql', req.url);
    const client = new ApolloClient({
      ssrMode: true,
      // Remember that this is the interface the SSR server will use to connect to the
      // API server, so we need to ensure it isn't firewalled, etc
      networkInterface: createNetworkInterface({
        uri: graphql,
        opts: {
          credentials: 'same-origin',
          headers: {
            cookie: req.header('Cookie'),
          },
        },
      }),
    });

    const app = (
      <ApolloProvider client={client}>
        {router}
      </ApolloProvider>
    );

    const initialState = {
      apollo: client.getInitialState(),
    };
    getDataFromTree(app).then(renderApp.bind(null, app, context, initialState, res));
  } else { // not using graphql
    renderApp(router, context, {}, res);
  }
};

/** 
 * Render app component as a string and send it to the client
 */
function renderApp(app, context, initialState, res) {
  const appHtml = renderToString(app);

  if (context.status) {
    res.status(context.status);
  }

  const helmet = Helmet.renderStatic();

  if (context.url) {
    // a React <Redirect> happened
    res.redirect(301, context.url);
  } else {
    res.send(renderPage(appHtml, helmet, initialState));
  }
}

function renderPage(appHtml, helmet, state) {
  if (state == null) {
    state = {};
  }
  return `
    <!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="app">${appHtml}</div>
        <script type="text/javascript">
          window.__APOLLO_STATE__ =
            ${JSON.stringify(state).replace(/</g, '\\u003c')};
        </script>
        <script type="text/javascript" src="${bundleUrl}"></script>
      </body>
    </html>
  `;
}
