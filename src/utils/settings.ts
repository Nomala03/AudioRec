import AsyncStorage from "@react-native-async-storage/async-storage";
import { Settings } from "../types/Settings";

const KEY = "APP_SETTINGS";

export async function getSettings(): Promise<Settings> {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : { quality: "high" };
}

export async function saveSettings(settings: Settings) {
  await AsyncStorage.setItem(KEY, JSON.stringify(settings));
}
