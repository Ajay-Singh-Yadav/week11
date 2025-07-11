import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_POSTS_BY_USER } from '../graphql/queries';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const UserPostsSection = ({ user }) => {
  const userId = user.id || user._id;

  const { data, loading, error, refetch } = useQuery(GET_POSTS_BY_USER, {
    variables: { userId },
  });

  useFocusEffect(
    useCallback(() => {
      refetch(); // Refetch posts whenever this screen is focused
    }, [userId]),
  );

  if (loading) return <Text style={styles.infoText}>Loading posts...</Text>;
  if (error) return <Text style={styles.infoText}>Failed to load posts.</Text>;

  const posts = data?.getPostsByUser || [];

  return (
    <View
      style={{
        marginHorizontal: 20,
      }}
    >
      {posts.map(post => (
        <View key={post.id} style={styles.postCard}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Image
              source={require('../assets/images/Profile.jpeg')}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.dateText}>
                {new Date(post.createdAt).toDateString()}
              </Text>
            </View>
            <TouchableOpacity style={{ marginLeft: 'auto' }}>
              <Icon name="more-horiz" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Text */}
          <Text style={styles.postText}>
            {post.title || ''} {post.content}
          </Text>

          {/* Grid Images (up to 4) */}
          {post.images?.length > 0 && (
            <View style={styles.imageGrid}>
              {post.images.slice(0, 4).map((img, index) => (
                <Image
                  key={index}
                  source={{ uri: img }}
                  style={styles.gridImage}
                />
              ))}
            </View>
          )}

          {/* Footer: Like, Comment, Share */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>👍 590</Text>
            <Text style={styles.footerText}>💬 14 comments</Text>
            <Text style={styles.footerText}>🔁 3 shares</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: '#fff',
    borderTopWidth: 0.3,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  dateText: {
    fontSize: 12,
    color: 'gray',
  },
  postText: {
    fontSize: 14,
    marginVertical: 6,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginVertical: 6,
  },
  gridImage: {
    width: '48%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
  infoText: {
    padding: 12,
    color: '#888',
  },
});

export default UserPostsSection;
