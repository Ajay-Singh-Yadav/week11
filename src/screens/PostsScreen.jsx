import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import UserPostsSection from '../components/UserPostsSection';

import { useQuery } from '@apollo/client';
import { GET_POSTS_BY_USER } from '../graphql/queries';

const FacebookProfile = () => {
  const route = useRoute();
  const { user } = route.params;

  const navigation = useNavigation();

  const {
    data,
    loading: postsLoading,
    error,
  } = useQuery(GET_POSTS_BY_USER, {
    variables: { userId: user.id || user._id },
  });

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon}>
          <Icon name="menu" size={24} />
        </TouchableOpacity>
      </View>

      {/* Cover Image */}
      <View style={styles.coverContainer}>
        <Image
          source={require('../assets/images/Profile.jpeg')} // Replace with your profile photo
          style={styles.profilePhoto}
        />
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.friends}>{user.profession}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.storyButton}
            onPress={
              () => navigation.navigate('CreatePost', { user }) // passing the entire user object
            }
          >
            <Text style={styles.buttonText}>+ Create Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.buttonText}>+ Add Story</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.locked}>🔒 You locked your profile</Text>
      </View>

      {/* Details */}
      <View style={styles.details}>
        <Text style={styles.detailText}>📞 {user.phone}</Text>
        <Text style={styles.detailText}>
          🎓 Profession <Text style={styles.bold}>{user.profession}</Text>
        </Text>
        <Text style={styles.detailText}>
          🧑 Age <Text style={styles.bold}>{user.age}</Text>
        </Text>

        <Text style={styles.detailText}>
          🏠 Lives in <Text style={styles.bold}>{user.address}</Text>
        </Text>
        <Text style={[styles.detailText, styles.link]}>All Posts</Text>
      </View>

      <UserPostsSection user={user} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  header: {
    paddingTop: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: { fontSize: 22, fontWeight: 'bold' },
  menuIcon: { padding: 5 },

  coverContainer: {
    alignItems: 'center',
    marginTop: 50,
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: 180,
    backgroundColor: '#ccc',
  },
  profilePhoto: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#fff',
    position: 'absolute',
    bottom: -55,
  },

  profileInfo: {
    marginTop: 60,
    alignItems: 'center',
  },
  friends: { color: 'gray', marginTop: 5 },
  status: { marginTop: 5, fontSize: 15 },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  storyButton: {
    backgroundColor: '#1877f2',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  locked: {
    marginTop: 10,
    color: '#1877f2',
    fontWeight: '600',
  },

  details: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  detailText: {
    fontSize: 14,
    paddingVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: '#1877f2',
    fontWeight: 'bold',
  },
  postCard: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 0.3,
    borderColor: '#ccc',
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  postContent: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  postDate: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default FacebookProfile;
