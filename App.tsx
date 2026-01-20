import { useEffect } from "react";
import { Alert } from "react-native";
import { Audio } from "expo-av";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./src/navigation/BottomTabs";


export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Microphone access is needed.");
      }
    })();
  }, []);

  return ( 
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );  
}
