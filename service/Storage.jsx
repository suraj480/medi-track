import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLocalStorage = async (key, values) => {
  await AsyncStorage.setItem(key, JSON.stringify(values));
};

export const getLocalStorage = async (key) => {
  const result = await AsyncStorage.getItem(key);
  return JSON.parse(result);
};

export const RemoveLocalStorage = async () => {
  await AsyncStorage.clear();
};
