import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_POSTS_BY_USER } from '../graphql/queries';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

const getRandomCount = (min = 10, max = 1000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const UserPostsSection = ({ user }) => {
  const userId = user.id || user._id;

  const { data, loading, error, refetch } = useQuery(GET_POSTS_BY_USER, {
    variables: { userId },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [userId]),
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1877f2" />
        <Text style={styles.infoText}>Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          ❌ Something went wrong. Please try again later.
        </Text>
      </View>
    );
  }

  const posts = data?.getPostsByUser || [];

  if (posts.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={styles.infoText}>
          📭 No posts yet. Create one to share your thoughts!
        </Text>
      </View>
    );
  }

  return (
    <View style={{ marginHorizontal: 20 }}>
      {posts.map(post => {
        const likeCount = getRandomCount(100, 900);
        const commentCount = getRandomCount(5, 50);
        const shareCount = getRandomCount(1, 20);

        return (
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
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })
                    : 'Date not available'}
                </Text>
              </View>
              <TouchableOpacity style={{ marginLeft: 'auto' }}>
                <Icon name="more-horiz" size={20} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Post Text */}
            <Text style={styles.postText}>{post.title || ''}</Text>

            <Text style={styles.postText}>{post.content}</Text>

            {/* Images Grid */}
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

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>👍 {likeCount}</Text>
              <Text style={styles.footerText}>💬 {commentCount} comments</Text>
              <Text style={styles.footerText}>🔁 {shareCount} shares</Text>
            </View>
          </View>
        );
      })}
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
