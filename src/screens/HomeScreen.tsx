import { useEffect, useState } from "react";
import { View, FlatList, TextInput, Button, StyleSheet } from "react-native";
import { globalStyles, colors } from "../styles/globalStyles";
import Recorder from "../components/Recorder";
import VoiceNoteItem from "../components/VoiceNoteItem";
import { saveNote, getNotes } from "../utils/storage";
import { VoiceNote } from "../types/VoiceNote";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigation/HomeStack";

type Props = NativeStackScreenProps<HomeStackParamList, "VoiceJournal">;

export default function HomeScreen({ navigation }: Props) {
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [search, setSearch] = useState<string>("");

  const loadNotes = async (): Promise<void> => {
    const data = await getNotes();
    setNotes(data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSave = async (uri: string, duration: number): Promise<void> => {
    await saveNote(uri, duration);
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
   <Button
        title="Open Settings"
        onPress={() => navigation.navigate("Settings")}
      />
</View>

  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#cccaca48",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#a0a1a35b",
  },
});



