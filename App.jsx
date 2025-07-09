import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './src/graphql/client';
import AppNavigator from './src/AppNavigator/AppNavigator';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  );
}
