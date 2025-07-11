import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../graphql/mutations';

const CreatePostScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    onCompleted: () => {
      alert('✅ Post created!');
      setTitle('');
      setContent('');
      navigation.goBack(); // go back after post
    },
    onError: err => {
      console.error('❌ Post creation error:', err.message);
      alert('❌ Failed to create post');
    },
  });

  // ✅ Extract userId from route safely
  useEffect(() => {
    if (route.params?.userId) {
      setUserId(route.params.userId);
    } else {
      alert('❌ User ID is missing. Please go back.');
    }
  }, [route.params]);

  const handleCreatePost = () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required');
      return;
    }

    if (!userId) {
      alert('User ID not found');
      return;
    }

    createPost({
      variables: {
        input: {
          title: title.trim(),
          content: content.trim(),
          userId,
        },
      },
    });
  };

  useEffect(() => {
    const passedUserId = route.params?.userId;
    console.log('📦 Passed userId:', passedUserId);

    if (passedUserId) {
      setUserId(passedUserId);
    } else {
      alert('⚠️ User ID is missing! Cannot create post.');
    }
  }, [route.params]);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create post</Text>
        <TouchableOpacity onPress={handleCreatePost}>
          <Text style={styles.postDisabled}>
            {loading ? 'Posting...' : 'POST'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Profile Row */}
      <View style={styles.profileRow}>
        <Image
          source={require('../assets/images/Profile.jpeg')}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Aj Yadav</Text>
          <View style={styles.badges}>
            <Text style={styles.badge}>👥 Friends</Text>
            <Text style={styles.badge}>+ Album</Text>
            <Text style={styles.badge}>📷 Off</Text>
            <Text style={styles.badge}>+ AI label off</Text>
          </View>
        </View>
      </View>

      {/* Text Input */}
      <TextInput
        placeholder="Title?"
        placeholderTextColor="#444"
        style={styles.textInputTitle}
        multiline
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="What's on your mind?"
        placeholderTextColor="#444"
        style={styles.textInput}
        multiline
        value={content}
        onChangeText={setContent}
      />

      {/* Options List */}
      <View style={styles.optionsList}>
        <Option icon="image" label="Photo/video" color="#2ecc71" />
        <Option icon="person-add" label="Tag people" color="#2980b9" />
        <Option
          icon="emoji-emotions"
          label="Feeling/activity"
          color="#f1c40f"
        />
        <Option icon="place" label="Check in" color="#e74c3c" />
        <Option icon="videocam" label="Live video" color="#e84393" />
        <Option icon="text-fields" label="Background color" color="#1abc9c" />
        <Option icon="photo-camera" label="Camera" color="#2980b9" />
        <Option icon="gif" label="GIF" color="#27ae60" />
        <Option icon="flag" label="Life event" color="#3498db" />
        <Option icon="music-note" label="Music" color="#e67e22" />
        <Option icon="face" label="Your avatar" color="#8e44ad" />
      </View>
    </ScrollView>
  );
};

const Option = ({ icon, label, color }) => (
  <View style={styles.optionRow}>
    <MaterialCommunityIcons name={icon} size={24} color={color} />
    <Text style={styles.optionText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  postDisabled: { color: '#1877f2', fontWeight: '600' },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  badge: {
    fontSize: 12,
    backgroundColor: '#e0ecff',
    color: '#1877f2',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  textInputTitle: {
    height: 70,
    fontSize: 18,
    paddingHorizontal: 12,
    paddingTop: 10,
    textAlignVertical: 'top',
    color: '#444',
  },
  textInput: {
    height: 120,
    fontSize: 18,
    paddingHorizontal: 12,
    paddingTop: 10,
    textAlignVertical: 'top',
    color: '#444',
  },
  optionsList: {
    borderTopWidth: 0.3,
    borderTopColor: '#ccc',
    marginTop: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.3,
    borderBottomColor: '#ddd',
  },
  optionText: {
    marginLeft: 14,
    fontSize: 15,
  },
});

export default CreatePostScreen;
