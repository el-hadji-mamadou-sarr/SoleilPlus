import { Image, Text } from "react-native";
import { ImageBackground, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";
import { MainWeather } from "../components/MainWeather";
import { Icon, MD3Colors } from "react-native-paper";
export const HomeScreen = () => {
  return (
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
          onPress={() => console.log("Pressed")}
        >
          <FontAwesome6
            name="arrow-right-arrow-left"
            size={12}
            color="#1F414B"
          />
        </Button>
        <MainWeather />
        <View style={{ width: "80%" }}>
          <TextInput
            // contentStyle={{ backgroundColor: "#93D5FA" }}
            style={{ height: 30, backgroundColor: "#F4B67C" }}
            left={<TextInput.Icon icon="magnify" />}
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
              <Text style={{ fontSize: 16, fontWeight: 400, color: "grey" }}>
                H:88°
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 400, color: "grey" }}>
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
              source={{ uri: "https://openweathermap.org/img/wn/10d@2x.png" }}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
