import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const AddUser = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    profession: '',
    address: '',
  });

  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: data => {
      console.log('✅ User Created:', data.createUser);
      alert('User created successfully!');
      setForm({
        name: '',
        email: '',
        phone: '',
        age: '',
        profession: '',
        address: '',
      });
    },
    onError: err => {
      console.error('❌ Error creating user:', err.message);
      alert('Failed to create user');
    },
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAddUser = () => {
    const { name, email, phone, age, profession, address } = form;
    if (!name || !email || !phone) {
      alert('Name, email, and phone are required');
      return;
    }

    createUser({
      variables: {
        input: {
          name,
          email,
          phone,
          age: parseInt(age) || 0,
          profession,
          address,
        },
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={require('../assets/images/Profile.jpeg')}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Full Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Your Name"
            placeholderTextColor={'#ccc'}
            style={styles.input}
            value={form.name}
            onChangeText={text => handleChange('name', text)}
          />
          <Icon name="person" size={20} style={styles.inputIcon} />
        </View>
      </View>

      {/* Email Address */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="example @ your email"
            placeholderTextColor={'#ccc'}
            style={styles.input}
            value={form.email}
            onChangeText={text => handleChange('email', text)}
            keyboardType="email-address"
          />
          <Icon name="email" size={20} style={styles.inputIcon} />
        </View>
      </View>

      {/* Phone Number */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputWrapper}>
          <View style={styles.countryCode}>
            <MaterialCommunityIcons name="flag" size={20} />
            <Text style={{ marginLeft: 6 }}>+91</Text>
          </View>
          <TextInput
            placeholder="8945768923"
            placeholderTextColor={'#ccc'}
            style={[styles.input, { flex: 1 }]}
            value={form.phone}
            onChangeText={text => handleChange('phone', text)}
            keyboardType="phone-pad"
          />
          <Icon name="phone" size={20} style={styles.inputIcon} />
        </View>
      </View>

      {/* Age */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Age in years"
            placeholderTextColor={'#ccc'}
            style={styles.input}
            value={form.age}
            onChangeText={text => handleChange('age', text)}
            keyboardType="phone-pad"
          />
          <Icon name="calendar-today" size={20} style={styles.inputIcon} />
        </View>
      </View>

      {/* Profession */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Profession</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Profession"
            placeholderTextColor={'#ccc'}
            style={styles.input}
            value={form.profession}
            onChangeText={text => handleChange('profession', text)}
          />
          <Icon name="work" size={20} style={styles.inputIcon} />
        </View>
      </View>

      {/* Address */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Home Address</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Your Address"
            placeholderTextColor={'#ccc'}
            style={styles.input}
            value={form.address}
            onChangeText={text => handleChange('address', text)}
          />
          <Icon name="home" size={20} style={styles.inputIcon} />
        </View>
      </View>

      {/* Submit */}
      <TouchableOpacity style={styles.updateButton} onPress={handleAddUser}>
        <Text style={styles.updateButtonText}>
          {loading ? 'Adding...' : 'Add user'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#e0ecf4',
    flexGrow: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 30,
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#008080',
    borderRadius: 12,
    padding: 4,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: '#333',
  },
  inputIcon: {
    color: '#888',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  updateButton: {
    backgroundColor: '#008080',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
  },
  updateButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
  cancelText: {
    color: '#555',
    marginTop: 14,
  },
});

export default AddUser;
