import AsyncStorage from '@react-native-async-storage/async-storage';

export type AsyncStorageTypes = '@auth_phone' | '@user_token' | '@user_user';

export const setData = async (key: AsyncStorageTypes, value: string) =>
  AsyncStorage.setItem(key, value);

export const getData = async (key: AsyncStorageTypes) =>
  AsyncStorage.getItem(key);

export const delData = async (key: AsyncStorageTypes) =>
  AsyncStorage.removeItem(key);

export const clearData = async () => AsyncStorage.clear();
