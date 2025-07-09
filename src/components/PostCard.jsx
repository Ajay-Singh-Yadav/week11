import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostCard = ({ post }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{post.title}</Text>
      <Text>{post.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 15,
  },
});

export default PostCard;
