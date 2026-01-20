import { View, Text, Button } from "react-native";
import { Audio } from "expo-av";
import { VoiceNote } from "../types/VoiceNote";
import { deleteNote } from "../utils/storage";

interface Props {
  note: VoiceNote;
  refresh: () => void;
}

export default function VoiceNoteItem({ note, refresh }: Props) {
  const playSound = async (): Promise<void> => {
    const { sound } = await Audio.Sound.createAsync({ uri: note.uri });
    await sound.playAsync();
  };

  const remove = async (): Promise<void> => {
    await deleteNote(note.id);
    refresh();
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Text>{note.date}</Text>
      <Button title="Play" onPress={playSound} />
      <Button title="Delete" onPress={remove} color="red" />
    </View>
  );
}
