import { useState } from "react";
import { View, Button } from "react-native";
import { Audio } from "expo-av";

interface RecorderProps {
  onSave: (uri: string) => void;
}

export default function Recorder({ onSave }: RecorderProps) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const startRecording = async (): Promise<void> => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync({
      android: {
        extension: ".m4a",
        outputFormat: Audio.AndroidOutputFormat.MPEG_4,
        audioEncoder: Audio.AndroidAudioEncoder.AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
      },
      ios: {
        extension: ".wav",
        audioQuality: Audio.IOSAudioQuality.HIGH,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
      web: {
        mimeType: "audio/webm",
        bitsPerSecond: 128000,
      },
    });

    setRecording(recording);
  };

  const stopRecording = async (): Promise<void> => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    setRecording(null);

    if (uri) {
      onSave(uri);
    }
  };

  return (
    <View>
      {recording ? (
        <Button title="Stop Recording" onPress={stopRecording} />
      ) : (
        <Button title="New Voice Note" onPress={startRecording} />
      )}
    </View>
  );
}
