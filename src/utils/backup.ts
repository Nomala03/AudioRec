import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VoiceNote } from "../types/VoiceNote";

const STORAGE_KEY = "VOICE_NOTES";
const BACKUP_FILE = FileSystem.documentDirectory + "voice-notes-backup.json";


//BackUp

export async function backupNotes(): Promise<void> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  if (!data) {
    throw new Error("No notes to back up");
  }

  await FileSystem.writeAsStringAsync(BACKUP_FILE, data, {
    encoding: "utf8",
  });

  await Sharing.shareAsync(BACKUP_FILE);
}

//Restore
export async function restoreNotes(): Promise<void> {
  const result = await DocumentPicker.getDocumentAsync({
    type: "application/json",
  });

  if (result.canceled) return;

  const fileUri = result.assets[0].uri;

  const content = await FileSystem.readAsStringAsync(fileUri);
  const parsed: VoiceNote[] = JSON.parse(content);

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
}
