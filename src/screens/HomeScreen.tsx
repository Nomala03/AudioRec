import { useEffect, useState } from "react";
import { View, FlatList, TextInput, StyleSheet } from "react-native";
import { globalStyles, colors } from "../styles/globalStyles";
import Recorder from "../components/Recorder";
import VoiceNoteItem from "../components/VoiceNoteItem";
import { getNotes, saveNote } from "../utils/storage";
import { VoiceNote } from "../types/VoiceNote";
import { v4 as uuidv4 } from "uuid";


export default function HomeScreen() {
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [search, setSearch] = useState<string>("");

  const loadNotes = async (): Promise<void> => {
    const data = await getNotes();
    setNotes(data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSave = async (uri: string): Promise<void> => {
    const note: VoiceNote = {
      id: uuidv4(),
      uri,
      date: new Date().toLocaleString(),
    };

    await saveNote(note);
    loadNotes();
  };

  const filteredNotes = notes.filter(note =>
    note.date.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={globalStyles.container}>
  <TextInput
    placeholder="Search voice notes..."
    value={search}
    onChangeText={setSearch}
    style={styles.search}
  />

  <Recorder onSave={handleSave} />

  <FlatList
    data={filteredNotes}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <VoiceNoteItem note={item} refresh={loadNotes} />
    )}
  />
</View>

  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});

