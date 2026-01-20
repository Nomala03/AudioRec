import AsyncStorage from "@react-native-async-storage/async-storage";
import { VoiceNote } from "../types/VoiceNote";

const STORAGE_KEY = "VOICE_NOTES";

export async function getNotes(): Promise<VoiceNote[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveNote(note: VoiceNote): Promise<void> {
  const notes = await getNotes();
  const updated = [note, ...notes];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function deleteNote(id: string): Promise<void> {
  const notes = await getNotes();
  const filtered = notes.filter(note => note.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
