import { View, Text, Button, StyleSheet } from "react-native";
import { globalStyles, colors } from "../styles/globalStyles";
import { useEffect, useState } from "react";
import { getSettings, saveSettings } from "../utils/settings";
import { AudioQuality } from "../types/Settings";

export default function SettingsScreen() {
  const [quality, setQuality] = useState<AudioQuality>("high");

  useEffect(() => {
    getSettings().then(s => setQuality(s.quality));
  }, []);

  const updateQuality = async (value: AudioQuality) => {
    setQuality(value);
    await saveSettings({ quality: value });
  };

  return (
   <View style={globalStyles.container}>
  <View style={globalStyles.card}>
    <Text style={globalStyles.title}>Recording Quality</Text>

    <View style={styles.buttons}>
      <Button title="Low" onPress={() => updateQuality("low")} />
      <Button title="Medium" onPress={() => updateQuality("medium")} />
      <Button title="High" onPress={() => updateQuality("high")} color={colors.primary} />
    </View>
  </View>
</View>

  );
}

const styles = StyleSheet.create({
  buttons: {
    gap: 8,
  },
});

