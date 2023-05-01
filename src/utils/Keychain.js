import * as Keychain from 'react-native-keychain';

export const getCredentials = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return { username: credentials.username, password: credentials.password };
    }
  } catch (error) {
    console.error('Keychain couldn\'t be accessed!', error);
  }
};

export const saveCredentials = async (username, password) => {
  try {
    await Keychain.setGenericPassword(username, password);
    console.log('Credentials saved successfully!');
  } catch (error) {
    console.error('Keychain couldn\'t be accessed!', error);
  }
};

export const deleteCredentials = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Credentials deleted successfully!');
  } catch (error) {
    console.error('Keychain couldn\'t be accessed!', error);
  }
};
