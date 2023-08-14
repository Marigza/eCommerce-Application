// import fetch from 'node-fetch'
// import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  Client,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

export const projectKey = process.env.REACT_APP_PROJECT_KEY || '';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_SECRET || '',
  },
  scopes: [
    'view_products:just-develop23 manage_my_quotes:just-develop23 manage_my_payments:just-develop23 view_published_products:just-develop23 view_categories:just-develop23 create_anonymous_token:just-develop23 manage_my_business_units:just-develop23 manage_my_shopping_lists:just-develop23 manage_my_quote_requests:just-develop23 manage_my_profile:just-develop23 manage_my_orders:just-develop23',
  ],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

export const ctpClient: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

// export const getApiRoot: () => ApiRoot = () => {
//   return createApiBuilderFromCtpClient(client);
// };
