import { Image, Text } from "react-native";
import { ImageBackground, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";
import { MainWeather } from "../components/MainWeather";
import { Icon, MD3Colors } from "react-native-paper";
import { useEffect, useState } from "react";
import { SplashScreen } from "./Splash.screen";
import { SearchResultBox } from "../components/SearchResultBox";
import { imageAssets } from "../utils/getImage-assets";

export const HomeScreen = ({ position }) => {
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState(null);
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeg, setIsDeg] = useState(true);
  const [searchResult, setSearchResult] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(
    require("../assets/logo.jpeg")
  );
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
          const background = imageAssets.find(
            (asset) => asset.name === res.weather[0].main
          );

          if (background) {
            setBackgroundImage(background.asset);
          }
          setInterval(() => {
            setIsLoading(false);
          }, 1000);
        }
      });
  }, []);

  function kelvinToCelsius(k) {
    return Math.floor(k - 273.15);
  }

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    if (searchQuery.length < 3) {
      console.log("le champ que vous avez rentré est trop court");
      return;
    }
    const url = `https://api-adresse.data.gouv.fr/search/?q=${replaceSpacesWithPlus(
      searchQuery
    )}&autocomplete=1&limit=1`;
    const requestInfo = {
      method: "GET",
      Headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, error
    };
    fetch(url, requestInfo)
      .then((res) => res.json())
      .then((res) => {
        const coordinates = res.features[0].geometry.coordinates;

        if (coordinates) {
          const API_KEY = "6fbedd40e91ffc5670f8ff2ad82440b3";
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[1]}&lon=${coordinates[0]}&lang=fr&appid=${API_KEY}`;
          fetch(weatherUrl, requestInfo)
            .then((res) => res.json())
            .then((res) => {
              if (res) {
                setSearchResult({
                  temp: kelvinToCelsius(res.main.temp),
                  temp_min: kelvinToCelsius(res.main.temp_min),
                  temp_max: kelvinToCelsius(res.main.temp_max),
                  country: res.sys.country,
                  city: res.name,
                  icon: res.weather[0].icon,
                });
              }
            });
        }
      });
  };

  function replaceSpacesWithPlus(inputString) {
    return inputString.replace(/ /g, "+");
  }
  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <ImageBackground
          source={backgroundImage}
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
                marginTop: 20,
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
                left={<TextInput.Icon icon="magnify" onPress={handleSearch} />}
                placeholder="Renseignez l'adresse ou la ville"
                onChangeText={(text) => {
                  setSearchQuery(text);
                }}
                value={searchQuery}
              />
            </View>
            {searchResult && <SearchResultBox result={searchResult} setSearchResult={setSearchResult}/>}
          </View>
        </ImageBackground>
      )}
    </>
  );
};
