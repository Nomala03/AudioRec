import { useEffect } from "react";
import { Alert } from "react-native";
import { Audio } from "expo-av";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Microphone access is needed.");
      }
    })();
  }, []);

  return <HomeScreen />;
}
