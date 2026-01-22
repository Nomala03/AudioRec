import { useState, useRef, useEffect } from "react";
import { View, Button, Alert, Text, StyleSheet, Platform } from "react-native";
import { Audio } from "expo-av";
import { colors } from "../styles/globalStyles";

interface RecorderProps {
  onSave: (uri: string, duration: number) => void;
}

export default function Recorder({ onSave }: RecorderProps) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [duration, setDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const startRecording = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required");
      return;
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );

    setRecording(recording);
    setDuration(0);
    setIsPaused(false);
    startTimer();
  };

  const stopRecording = async () => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    stopTimer();
    setRecording(null);
    setIsPaused(false);

    if (uri) onSave(uri, duration);
  };

  const pauseRecording = async () => {
    if (!recording) return;

    if (Platform.OS === "ios") {
      await recording.pauseAsync();
      stopTimer();
      setIsPaused(true);
    } else {
      Alert.alert("Pause not supported on Android");
    }
  };

  const resumeRecording = async () => {
    if (!recording) return;

    await recording.startAsync();
    startTimer();
    setIsPaused(false);
  };

  useEffect(() => {
    return () => {
      stopTimer();
      recording?.stopAndUnloadAsync();
    };
  }, [recording]);

  return (
    <View style={styles.container}>
      {recording && (
        <Text style={styles.timer}>⏺ Recording: {duration}s</Text>
      )}

      {!recording ? (
        <Button
          title="New Voice Note"
          onPress={startRecording}
          color={colors.primary}
        />
      ) : (
        <>
          <Button
            title="Stop Recording"
            onPress={stopRecording}
            color={colors.danger}
          />

          {!isPaused ? (
            <Button title="Pause" onPress={pauseRecording} />
          ) : (
            <Button title="Resume" onPress={resumeRecording} />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  timer: {
    fontWeight: "600",
    color: colors.danger,
    marginBottom: 8,
  },
});
