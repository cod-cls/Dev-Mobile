import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { getCredentials, deleteCredentials } from '../utils/SecureStore';
import Swipeout from 'react-native-swipeout';

const PasswordList = () => {
  const [credentials, setCredentials] = useState([]);
  const [memoizedCredentials, setMemoizedCredentials] = useState([]);

  useEffect(() => {
    const fetchCredentials = async () => {
      const credentials = await getCredentials();
      if (credentials) {
        setCredentials(Object.entries(credentials));
      }
    };
    fetchCredentials();
  }, []);

  const handleRefresh = async () => {
    const credentials = await getCredentials();
    if (credentials) {
      setCredentials(Object.entries(credentials));
    } else {
      setCredentials([]);
    }
  };

  const handleDelete = async (title) => {
    await deleteCredentials(title);
    const credentials = await getCredentials();
    if (credentials) {
      setCredentials(Object.entries(credentials));
    } else {
      setCredentials([]);
    }
  };

  const renderCredentials = ({ item }) => {
    const swipeoutButtons = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        color:"white",
        
        onPress: () => handleDelete(item[0])
      },
    ];
    return (
      <Swipeout style={{backgroundColor:"white",}} right={swipeoutButtons} autoClose={true}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item[0]}</Text>
          <Text style={styles.itemValue}>{item[1]}</Text>
        </View>
      </Swipeout>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={credentials}
        keyExtractor={(item) => item[0]}
        renderItem={renderCredentials}
        style={styles.list}
      />
      <Button title="refresh" style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Atualizar</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    list: {
      marginTop: 16,
    },
    itemContainer: {
      backgroundColor: '#f9f9f9',
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    itemValue: {
      fontSize: 16,
      color: '#666',
    },
    refreshButton: {
      backgroundColor: '#0066cc',
      padding: 16,
      borderRadius: 8,
      alignSelf: 'center',
      marginTop: 16,
    },
    refreshButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  export default PasswordList;