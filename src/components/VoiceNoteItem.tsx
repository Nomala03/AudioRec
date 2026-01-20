import { View, Text, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { globalStyles, colors } from "../styles/globalStyles";
import { Audio } from "expo-av";
import { VoiceNote } from "../types/VoiceNote";
import { deleteNote } from "../utils/storage";

interface Props {
  note: VoiceNote;
  refresh: () => void;
}

export default function VoiceNoteItem({ note, refresh }: Props) {
  const [rate, setRate] = useState(1);
  const playSound = async (): Promise<void> => {
    const { sound } = await Audio.Sound.createAsync({ uri: note.uri });
    await sound.playAsync();
  };

  const remove = async (): Promise<void> => {
    await deleteNote(note.id);
    refresh();
  };

  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.title}>Voice Note</Text>
      <Text style={globalStyles.mutedText}>{note.date}</Text>

      <Text style={styles.speed}>Speed: {rate}x</Text>

      <View style={styles.controls}>
        <Button title="Play" onPress={playSound} />
        <Button title="Delete" onPress={remove} color={colors.danger} />
      </View>

      <View style={styles.speedControls}>
        <Button title="0.5x" onPress={() => setRate(0.5)} />
        <Button title="1x" onPress={() => setRate(1)} />
        <Button title="1.5x" onPress={() => setRate(1.5)} />
        <Button title="2x" onPress={() => setRate(2)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    marginTop: 8,
    marginBottom: 8,
  },
  speed: {
    marginTop: 8,
    fontWeight: "500",
  },
  speedControls: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});



