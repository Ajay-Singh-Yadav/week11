import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useQuery, gql } from '@apollo/client';

import Icon from 'react-native-vector-icons/MaterialIcons';

const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
      phone
      profession
      address
    }
  }
`;

const UserListScreen = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);

  if (loading) return <Text>Loading users...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data.getAllUsers}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.cardContainer}>
          {/* Header Row */}
          <View style={styles.header}>
            <Image
              source={require('../assets/images/Profile.jpeg')}
              style={styles.avatar}
            />
            <View style={styles.headerText}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subtitle}>{item.profession}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#aaa" />
          </View>

          <View style={styles.divider} />

          {/* Info Rows */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Work Email :</Text>
            <Text style={styles.value}>{item.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Work Phone :</Text>
            <Text style={styles.value}>{item.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Address :</Text>
            <Text style={styles.value}>{item.address}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: '#888',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginVertical: 4,
    gap: 12,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
  },
});

export default UserListScreen;
