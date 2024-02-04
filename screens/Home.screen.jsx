import { Image, Text } from "react-native";
import { ImageBackground, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";
import { MainWeather } from "../components/MainWeather";
import { Icon, MD3Colors } from "react-native-paper";
import { useEffect, useState } from "react";
import { SplashScreen } from "./Splash.screen";
export const HomeScreen = ({ position }) => {
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState(null);
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeg, setIsDeg] = useState(true);

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
          setCity(res.name);
          setIsLoading(false);
        }
      });
  }, []);

  function kelvinToCelsius(k) {
    return Math.floor(k - 273.15);
  }

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    const API_KEY = "6fbedd40e91ffc5670f8ff2ad82440b3";
    const searchUrl = `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&mode=json&appid=${API_KEY}`;

    fetch(searchUrl, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error('Error fetching city suggestions:', error);
      });
  };

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
                onChangeText={(text) => {
                  setSearchQuery(text);
                  handleSearch(text);
                }}
                value={searchQuery}
              />
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
                  20°
                </Text>
                <View style={{ flexDirection: "row", gap: 20 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: 400, color: "grey" }}
                  >
                    H:88°
                  </Text>
                  <Text
                    style={{ fontSize: 16, fontWeight: 400, color: "grey" }}
                  >
                    L:18°
                  </Text>
                </View>
                <Text style={{ fontSize: 20, fontWeight: 400, color: "white" }}>
                  Dakar, Senegal
                </Text>
              </View>

              <View>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{
                    uri: "https://openweathermap.org/img/wn/10d@2x.png",
                  }}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      )}
    </>
  );
};
