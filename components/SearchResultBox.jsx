import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";
export const SearchResultBox = ({ result, setSearchResult }) => {
  const { temp, temp_min, temp_max, country, city, icon } = result;
  const closeSearch = () => {
    setSearchResult(null);
  };
  return (
    <View
      style={{
        marginTop: 40,
        width: "90%",
        minHeight: 209,
        backgroundColor: "#1F414B",
        borderRadius: 50,
        paddingTop: 20,
        paddingHorizontal: 30,
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          backgroundColor: "#F4B67C",
          padding: 0,
          borderRadius: 25,
        }}
        onPress={closeSearch}
      >
        <AntDesign name="closecircleo" size={24} color="#1F414B" />
      </TouchableOpacity>
      <View
        style={{
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
    </View>
  );
};
