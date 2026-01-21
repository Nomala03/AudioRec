import { View, Text, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { globalStyles, colors } from "../styles/globalStyles";
import { Audio } from "expo-av";
import { VoiceNote } from "../types/VoiceNote";
import { deleteNote } from "../utils/storage";

interface Props {
  note: VoiceNote;
  refresh: () => void;
}

export default function VoiceNoteItem({ note, refresh }: Props) {
  const [rate, setRate] = useState<number>(1);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  const playSound = async (): Promise<void> => {

    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: note.uri },
      { rate, shouldCorrectPitch: true }
    );

    setSound(newSound);
    setIsPlaying(true);

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) return;

      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    });

    await newSound.playAsync();
  };

  const changeRate = async (newRate: number): Promise<void> => {
    setRate(newRate);

    if (sound) {
      await sound.setRateAsync(newRate, true);
    }
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
        <Button
          title={isPlaying ? "Playing..." : "Play"}
          onPress={playSound}
        />
        <Button
          title="Delete"
          onPress={remove}
          color={colors.danger}
        />
      </View>

      <View style={styles.speedControls}>
        <Button title="0.5x" onPress={() => changeRate(0.5)} />
        <Button title="1x" onPress={() => changeRate(1)} />
        <Button title="1.5x" onPress={() => changeRate(1.5)} />
        <Button title="2x" onPress={() => changeRate(2)} />
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
