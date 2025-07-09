import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const UserCard = ({ user, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.email}</Text>
      <Text style={styles.posts}>
        Posts: {user.posts?.meta?.totalCount || 0}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  posts: {
    marginTop: 4,
    fontStyle: 'italic',
  },
});

export default UserCard;
