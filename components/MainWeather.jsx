import { Text, View } from "react-native";

export const MainWeather = () => {
  return (
    <View style={{ alignItems: "center", marginBottom: 5 }}>
      <Text style={{ fontSize: 34, fontWeight: 400, color: "white" }}>
        Paris
      </Text>
      <Text style={{ fontSize: 96, fontWeight: 400, color: "white" }}>
        -30°C
      </Text>

      <Text style={{ fontSize: 20, fontWeight: 400, color: "#1F414B" }}>
        Enneigé
      </Text>
      <View style={{ flexDirection: "row", gap: 50, marginVertical: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 400, color: "white" }}>
          H:24°
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 400, color: "white" }}>
          L:18°
        </Text>
      </View>
    </View>
  );
};
