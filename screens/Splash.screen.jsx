import { Image, ImageBackground, View } from "react-native";

export const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#90d6fa",
      }}
    >
      <Image
        source={require("../assets/logo.jpeg")}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
};
