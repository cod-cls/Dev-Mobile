import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { saveCredential } from '../utils/SecureStore';

const PasswordForm = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  const handleSave = async () => {
    if (title && value) {
      await saveCredential(title, value);
       setTitle('');
       setValue('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="User"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={value}
        onChangeText={setValue}
        secureTextEntry
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default PasswordForm;
