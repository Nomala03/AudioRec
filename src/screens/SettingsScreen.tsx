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

    <View style={styles.buttonCard}>
      <Button title="Low" onPress={() => updateQuality("low")} />
    </View>

    <View style={styles.buttonCard}>
      <Button title="Medium" onPress={() => updateQuality("medium")} />
    </View>

    <View style={styles.buttonCard}>
      <Button title="High" onPress={() => updateQuality("high")} />
    </View>
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  buttonCard: {
    marginTop: 12,
    padding: 5,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    elevation: 2,           // Android shadow
    shadowColor: "#0a0a0a",    // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

