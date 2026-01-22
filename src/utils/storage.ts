import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { VoiceNote } from "../types/VoiceNote";

const STORAGE_KEY = "VOICE_NOTES";
const AUDIO_DIR = FileSystem.documentDirectory + "voice-notes/";

async function ensureDirExists(): Promise<void> {
  const dirInfo = await FileSystem.getInfoAsync(AUDIO_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(AUDIO_DIR, { intermediates: true });
  }
}

export async function saveNote(
  tempUri: string,
  duration: number,
): Promise<void> {
  await ensureDirExists();

  const id = Date.now().toString();
  const newUri = `${AUDIO_DIR}${id}.m4a`;

  await FileSystem.moveAsync({
    from: tempUri,
    to: newUri,
  });

  const note: VoiceNote = {
    id,
    uri: newUri,
    date: new Date().toLocaleString(),
    duration,
  };

  const existing = await getNotes();
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([note, ...existing])
  );
}

export async function getNotes(): Promise<VoiceNote[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function deleteNote(id: string): Promise<void> {
  const notes = await getNotes();
  const note = notes.find((n) => n.id === id);

  if (note) {
    await FileSystem.deleteAsync(note.uri, { idempotent: true });
  }

  const updated = notes.filter((n) => n.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
