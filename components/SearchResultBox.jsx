import React from "react";
import { View, Text, Image } from "react-native";

export const SearchResultBox = ({ result }) => {
  const { temp, temp_min, temp_max, country, city, icon } = result;
  return (
    <View
      style={{
        marginTop: 40,
        width: "90%",
        minHeight: 209,
        backgroundColor: "#1F414B",
        borderRadius: 50,
        paddingVertical: 41,
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "column", gap: 5 }}>
        <Text style={{ fontSize: 34, fontWeight: 400, color: "white" }}>
          {temp}°
        </Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 400, color: "grey" }}>
            H:{temp_max}°
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 400, color: "grey" }}>
            L:{temp_min}°
          </Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: 400, color: "white" }}>
          {city}, {country}
        </Text>
      </View>

      <View>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          }}
        />
      </View>
    </View>
  );
};
