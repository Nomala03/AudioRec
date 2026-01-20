import { View, Text, Button } from "react-native";
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
    <View style={{ padding: 20 }}>
      <Text>Recording Quality</Text>

      <Button title="Low" onPress={() => updateQuality("low")} />
      <Button title="Medium" onPress={() => updateQuality("medium")} />
      <Button title="High" onPress={() => updateQuality("high")} />
    </View>
  );
}
