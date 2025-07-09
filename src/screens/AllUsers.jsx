import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { useQuery, useMutation } from '@apollo/client';

import Icon from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { GET_ALL_USERS } from '../graphql/queries';
import { UPDATE_USER } from '../graphql/mutations';
import { DELETE_USER } from '../graphql/mutations';

const screenHeight = Dimensions.get('window').height;

const AllUsers = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [profession, setProfession] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [deleteUser] = useMutation(DELETE_USER);
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      setModalVisible(false);
      refetch(); // optional: update list
    },
    onError: err => {
      console.error('Update error:', err.message);
    },
  });

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setPhone(selectedUser.phone);
      setProfession(selectedUser.profession);
      setAddress(selectedUser.address);
    }
  }, [selectedUser]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4c8bf5" />
        <Text style={styles.loadingText}>Fetching users...</Text>
      </View>
    );
  }

  if (error) return <Text>Error: {error.message}</Text>;

  const handleUpdate = async () => {
    try {
      await updateUser({
        variables: {
          id: selectedUser.id,
          input: {
            name,
            email,
            phone,
            profession,
            address,
            age: selectedUser.age, // if you want to keep the age unchanged
          },
        },
      });
    } catch (err) {
      console.error('Error updating user:', err.message);
    }
  };

  const handleDeleteUser = id => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser({ variables: { id } });
              await refetch(); // ✅ Refresh the data manually
              console.log(`User ${id} deleted`);
            } catch (err) {
              console.error('Error deleting user:', err.message);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* User List */}
      <FlatList
        data={data.getAllUsers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
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

              <View style={styles.headerIcons}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedUser(item);
                    setModalVisible(true);
                  }}
                >
                  <EvilIcons name="pencil" size={35} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
                  <Icon name="delete" size={27} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Icon name="chevron-right" size={30} color="#aaa" />
                </TouchableOpacity>
              </View>
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
          </View>
        )}
      />

      {/* Bottom Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            style={styles.modalContent}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.modalTitle}>Edit User</Text>

              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Name"
              />

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
              />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
              />
              <TextInput
                style={styles.input}
                value={profession}
                onChangeText={setProfession}
                placeholder="Profession"
              />
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Address"
              />

              {/* Add more fields here if needed */}

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleUpdate}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: 'red', marginTop: 20 }}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default AllUsers;

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
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4c8bf5',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    height: (screenHeight * 1) / 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#4c8bf5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});
