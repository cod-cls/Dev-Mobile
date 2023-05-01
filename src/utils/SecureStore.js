import * as SecureStore from 'expo-secure-store';

export const saveCredential = async (title, value) => {
  const credentials = await getCredentials();
  const newCredentials = { ...credentials, [title]: value };
  await SecureStore.setItemAsync('credentials', JSON.stringify(newCredentials));
};

export const getCredentials = async () => {
  const credentials = await SecureStore.getItemAsync('credentials');
  return credentials ? JSON.parse(credentials) : null;
};

export const deleteCredentials = async (title) => {
    const credentials = await getCredentials();
    if (credentials && credentials[title]) {
      delete credentials[title];
      await SecureStore.setItemAsync('credentials', JSON.stringify(credentials));
    }
  };
  