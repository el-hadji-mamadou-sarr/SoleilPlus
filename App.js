import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { HomeScreen } from "./screens/Home.screen";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
export default function App() {
  const [position, setPosition] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const currentPosition = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setPosition(currentPosition);
    })();
  }, []);
  return (
    <PaperProvider>
      <View style={styles.container}>
        {position && <HomeScreen position={position} />}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#90d6fa",
    alignItems: "center",
    justifyContent: "center",
  },
});
