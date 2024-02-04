import React, { useEffect, useState } from "react";
import { Image, Text } from "react-native";
import { ImageBackground, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";
import { MainWeather } from "../components/MainWeather";
import { SplashScreen } from "./Splash.screen";

export const HomeScreen = ({ position }) => {
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState(null);
  const [city, setCity] = useState("Dakar, Senegal"); // Set default city
  const [isLoading, setIsLoading] = useState(true);
  const [isDeg, setIsDeg] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const switchTempUnits = () => {
    setIsDeg(!isDeg);
  };

  useEffect(() => {
    const requestInfo = {
      method: "GET",
      Headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, error
    };
    const API_KEY = "6fbedd40e91ffc5670f8ff2ad82440b3";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&lang=fr&appid=${API_KEY}`;

    fetch(url, requestInfo)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setTemp({
            temp: kelvinToCelsius(res.main.temp),
            temp_min: kelvinToCelsius(res.main.temp_min),
            temp_max: kelvinToCelsius(res.main.temp_max),
          });
          setWeather(res.weather[0].main);
          setIsLoading(false);
        }
      });
  }, [position]);

  const handleSearch = () => {
    if (searchQuery) {
      const API_KEY = "6fbedd40e91ffc5670f8ff2ad82440b3";
      const searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&lang=fr&appid=${API_KEY}`;

      fetch(searchUrl, { method: 'GET' })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setTemp({
              temp: kelvinToCelsius(res.main.temp),
              temp_min: kelvinToCelsius(res.main.temp_min),
              temp_max: kelvinToCelsius(res.main.temp_max),
            });
            setWeather(res.weather[0].main);
            setCity(res.name);
          }
        })
        .catch((error) => {
          console.error('Error fetching city weather:', error);
        });
    }
  };

  function kelvinToCelsius(k) {
    return Math.floor(k - 273.15);
  }

  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <ImageBackground
          source={require("../assets/rain.jpeg")}
          style={{ width: "100%", height: "100%" }}
        >
          <View
            style={{
              paddingVertical: 20,
              paddingHorizontal: 5,
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                alignSelf: "flex-end",
                width: "40px",
                backgroundColor: "#F4B67C",
              }}
              mode="contained"
              onPress={switchTempUnits}
            >
              <FontAwesome6
                name="arrow-right-arrow-left"
                size={12}
                color="#1F414B"
              />
            </Button>
            <MainWeather
              weather={weather}
              temp={temp}
              city={city}
              isDeg={isDeg}
            />
            <View style={{ width: "80%" }}>
              <TextInput
                style={{ height: 30, backgroundColor: "white" }}
                left={<TextInput.Icon icon="magnify" />}
                placeholder="Search City"
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
              />
              <Button
                style={{
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#1F414B',
                }}
                mode="contained"
                onPress={handleSearch}
              >
                Search
              </Button>
            </View>
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
                  {temp.temp}°
                </Text>
                <View style={{ flexDirection: "row", gap: 20 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: 400, color: "grey" }}
                  >
                    H:{temp.temp_max}°
                  </Text>
                  <Text
                    style={{ fontSize: 16, fontWeight: 400, color: "grey" }}
                  >
                    L:{temp.temp_min}°
                  </Text>
                </View>
                <Text style={{ fontSize: 20, fontWeight: 400, color: "white" }}>
                  {city}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      )}
    </>
  );
};
