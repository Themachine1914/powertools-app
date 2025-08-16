import { Platform } from 'react-native';

// Storage universal que funciona en web y móvil
class UniversalStorage {
  static async getItem(key) {
    try {
      if (Platform.OS === 'web') {
        // En web, usar localStorage directamente
        return localStorage.getItem(key);
      } else {
        // En móvil, usar AsyncStorage
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        return await AsyncStorage.getItem(key);
      }
    } catch (error) {
      console.error('Storage getItem error:', error);
      return null;
    }
  }

  static async setItem(key, value) {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
      } else {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        await AsyncStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('Storage setItem error:', error);
    }
  }

  static async multiSet(keyValuePairs) {
    try {
      if (Platform.OS === 'web') {
        keyValuePairs.forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
      } else {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        await AsyncStorage.multiSet(keyValuePairs);
      }
    } catch (error) {
      console.error('Storage multiSet error:', error);
    }
  }

  static async multiGet(keys) {
    try {
      if (Platform.OS === 'web') {
        return keys.map(key => [key, localStorage.getItem(key)]);
      } else {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        return await AsyncStorage.multiGet(keys);
      }
    } catch (error) {
      console.error('Storage multiGet error:', error);
      return keys.map(key => [key, null]);
    }
  }
}

export default UniversalStorage;
