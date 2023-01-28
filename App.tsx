import {
  Dimensions,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Breath } from "./data";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import BreatheView from "./components/BreatheView";

const { height, width } = Dimensions.get("window");
export default function App() {
  const [currentBreathTypeID, setCurrentBreathTypeID] = useState(0);
  const currentBreatheType = Breath[currentBreathTypeID];
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
        <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Breathe</Text>
            <View style={styles.hearIconContainer}>
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </View>
          <BreatheView currentBreatheType={currentBreatheType} />
        </SafeAreaView>
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
  titleContainer: {
    alignSelf: "flex-start",
    width: width,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 40,
  },
  hearIconContainer: {
    width: 35,
    height: 35,
    backgroundColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
