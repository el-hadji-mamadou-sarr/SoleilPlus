import { Text, View } from "react-native";
import { weatherTypes } from "../utils/weather-types";

export const MainWeather = ({ weather, temp, city, isDeg }) => {
  function getWeatherTranslation(weatherCondition) {
    const translatedWeather = weatherTypes.find(
      (weather) => weather.name === weatherCondition
    );
    return translatedWeather ? translatedWeather.translate : weatherCondition;
  }
  function celsiusToFahrenheit(c) {
    return Math.floor((c * 9) / 5 + 32);
  }
  function fahrenheitToCelsius(f) {
    return Math.floor((f - 32) * (5 / 9));
  }
  return (
    <View style={{ alignItems: "center", marginBottom: 5 }}>
      <Text style={{ fontSize: 34, fontWeight: 400, color: "#1F414B" }}>
        {city}
      </Text>

      <Text style={{ fontSize: 96, fontWeight: 400, color: "#1F414B" }}>
        {isDeg ? temp.temp : celsiusToFahrenheit(temp.temp)}
        {isDeg ? "°C" : "°F"}
      </Text>

      <Text style={{ fontSize: 24, fontWeight: 600, color: "#1F414B" }}>
        {getWeatherTranslation(weather)}
      </Text>
      <View style={{ flexDirection: "row", gap: 50, marginVertical: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 500, color: "#1F414B" }}>
          H:{temp.temp_max}°
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 500, color: "#1F414B" }}>
          L:{temp.temp_min}°
        </Text>
      </View>
    </View>
  );
};
