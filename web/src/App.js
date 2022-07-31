import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

import Pages from '/pages';

import { setContext } from 'apollo-link-context';
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});
const client = new ApolloClient({
  uri,
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});
const data = {
  isLoggedIn: !!localStorage.getItem('token')
};

cache.writeData({ data });
client.onResetStore(() => cache.writeData({ data }));

const App = () => (
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
