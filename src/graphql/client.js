import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://10.53.2.25:4000',
  cache: new InMemoryCache(),
});

export default client;
