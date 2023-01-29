import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Breath } from "../data";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

interface FooterProps {
  currentBreathTypeID: number;
  onPress: (id: number) => void;
  onStartPress: () => void;
  progress: Animated.SharedValue<number>;
}

const Footer = ({
  currentBreathTypeID,
  onPress,
  onStartPress,
  progress,
}: FooterProps) => {
  const [hideActionButtons, setHideActionButtons] = useState(false);
  const hide = useDerivedValue(() => {
    return hideActionButtons ? 1 : 0;
  });

  const reanimatedActionButtonsContainer = useAnimatedStyle(() => {
    return {
      opacity: hide.value ? withTiming(0) : withTiming(1, { duration: 2000 }),
    };
  });

  return (
    <View style={styles.footer}>
      <Animated.Text
        style={[styles.footerTitle, reanimatedActionButtonsContainer]}
      >
        Breath to reduce
      </Animated.Text>
      <Animated.View
        style={[
          styles.actionButtonsContainer,
          reanimatedActionButtonsContainer,
        ]}
      >
        {Breath.map((type) => (
          <Pressable
            key={type.id}
            style={[
              {
                borderWidth: 1,
                borderColor: "#ffffff",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
                backgroundColor:
                  type.id === currentBreathTypeID ? "#ffffff" : "#000000",
              },
            ]}
            onPress={() => onPress(type.id)}
          >
            <Text
              style={{
                color: type.id === currentBreathTypeID ? "#000000" : "#ffffff",
              }}
            >
              {type.title}
            </Text>
          </Pressable>
        ))}
      </Animated.View>

      <Pressable
        style={{
          backgroundColor: hideActionButtons
            ? "#000000"
            : Breath[currentBreathTypeID].color,
          marginHorizontal: 9,
          marginVertical: 19,
          alignItems: "center",
          padding: 15,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: Breath[currentBreathTypeID].color,
        }}
        onPress={() => {
          if (hideActionButtons) {
            setHideActionButtons(false);
          } else {
            setHideActionButtons(true);
          }
          onStartPress();
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontWeight: "800",
            fontSize: 20,
            textTransform: "uppercase",
          }}
        >
          {hideActionButtons ? "Stop" : "start"}
        </Text>
      </Pressable>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    position: "absolute",
    bottom: "5%",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  footerTitle: {
    color: "#ffff",
    fontSize: 22,
    fontWeight: "400",
    alignSelf: "center",
    marginBottom: 15,
  },
});
