import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Breath } from "./data";

const { height, width } = Dimensions.get("window");
export default function App() {
  const currentBreatheType = Breath[0];
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ImageBackground
        source={require("./assets/bg.jpg")}
        style={styles.image}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[currentBreatheType.color, "#00000000"]}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
          }}
        ></LinearGradient>
        <LinearGradient
          colors={["#00000000", "#000000", "#000000"]}
          style={{
            height: "90%",
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
        ></LinearGradient>
        <SafeAreaView style={{ flex: 1 }}></SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: height,
    width: width,
  },
});
