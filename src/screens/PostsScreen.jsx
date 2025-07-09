import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const PostsScreen = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    age: '', // added
    profession: '',
    address: '',
  });

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: data => {
      Alert.alert('✅ Success', `User ${data.createUser.name} created`);
      setForm({
        name: '',
        email: '',
        phone: '',
        age: '',
        profession: '',
        address: '',
      });
    },
    onError: error => {
      Alert.alert('❌ Error', error.message);
    },
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    const { name, email, phone, age } = form;

    if (!name || !email || !phone) {
      Alert.alert('⚠️ Missing Fields', 'Name, Email, and Phone are required.');
      return;
    }

    const input = {
      ...form,
      age: age ? parseInt(age) : null, // convert age to number
    };

    createUser({ variables: { input } });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create New User</Text>

      {['name', 'email', 'phone', 'age', 'profession', 'address'].map(field => (
        <TextInput
          key={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          style={styles.input}
          value={form[field]}
          onChangeText={value => handleChange(field, value)}
          keyboardType={
            field === 'age' || field === 'phone' ? 'numeric' : 'default'
          }
        />
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creating...' : 'Create User'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
