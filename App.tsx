import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { ApolloProvider } from '@apollo/client';
import client from './src/graphql/apolloClient';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <HomeScreen />
    </ApolloProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
