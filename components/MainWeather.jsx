import { Text, View } from "react-native";
import { weatherTypes } from "../utils/weather-types";

export const MainWeather = ({ weather, temp, city }) => {
  function getWeatherTranslation(weatherCondition) {
    const translatedWeather = weatherTypes.find(
      (weather) => weather.name === weatherCondition
    );
    return translatedWeather ? translatedWeather.translate : weatherCondition;
  }
  return (
    <View style={{ alignItems: "center", marginBottom: 5 }}>
      <Text style={{ fontSize: 34, fontWeight: 400, color: "white" }}>
        {city}
      </Text>
      
      <Text style={{ fontSize: 96, fontWeight: 400, color: "white" }}>
        {temp.temp}°C
      </Text>

      <Text style={{ fontSize: 20, fontWeight: 400, color: "#1F414B" }}>
        {getWeatherTranslation(weather)}
      </Text>
      <View style={{ flexDirection: "row", gap: 50, marginVertical: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 400, color: "white" }}>
          H:{temp.temp_max}°
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 400, color: "white" }}>
          L:{temp.temp_min}°
        </Text>
      </View>
    </View>
  );
};
