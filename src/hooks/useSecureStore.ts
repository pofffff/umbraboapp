import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
export const useSecureStore = () => {


    const setValue = async (key: string, value: string) => {

        try {
            Platform.OS === 'web' ? await AsyncStorage.setItem(`@${key}`, value) :
                await SecureStore.setItemAsync(key, value);
        } catch (e) {
            console.error(`Error storing ${key}`)
        }

    }

    const deleteValue = async (key: string) => {

        try {
            Platform.OS === 'web' ? await AsyncStorage.removeItem(`@${key}`) :
                await SecureStore.deleteItemAsync(key);
        } catch (e) {
            console.error(`Error deleting ${key}`)
        }

    }

    const getValue = async (key: string) => {

        try {
            const result = Platform.OS === 'web' ? await AsyncStorage.getItem(`@${key}`) : await SecureStore.getItemAsync(key);
            if (result) {
                return result
            } else {
                console.error(`${key} not found`)
            }
        } catch (e) {
            console.error(`Error reading ${key} `)
        }

    }

    return { setValue, deleteValue, getValue }
}