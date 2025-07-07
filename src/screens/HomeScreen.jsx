import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_USERS = gql`
  query {
    users {
      data {
        id
        name
        email
      }
    }
  }
`;

const HomeScreen = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data.users.data}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
  },
});
