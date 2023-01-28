import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { BreathType } from "../types";

interface Props {
  currentBreatheType: BreathType;
}

const { width } = Dimensions.get("window");
const RADIUS = width / 4;

const BreatheView = ({ currentBreatheType }: Props) => {
  const circles = new Array(6).fill(0);
  return (
    <>
      {circles.map((_, index) => {
        const alpha = (index * 2 * Math.PI) / 6;
        /**
         *  Polar to Cartesian -->
         *  x = RADIUS * cos(alpha)
         *  Y = RADIUS * sin(alpha)
         *
         */
        /**
         * Cartesian to Canvas -->
         *  x'= x + centerX
         *  y'= -1 * (y + centerY)
         */

        const x = RADIUS * Math.cos(alpha);
        const y = RADIUS * Math.sin(alpha);
        const translateX = x + 0;
        const translateY = -1 * (y + 0);
        return (
          <View key={index} style={styles.breatheViewContainer}>
            <View
              style={[
                { backgroundColor: currentBreatheType.color },
                styles.breatheCircle,
                {
                  transform: [{ translateX }, { translateY }],
                },
              ]}
            />
          </View>
        );
      })}
    </>
  );
};

export default BreatheView;

const styles = StyleSheet.create({
  breatheViewContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  breatheCircle: {
    width: 2 * RADIUS,
    height: 2 * RADIUS,
    borderRadius: RADIUS,
    opacity: 0.5,
  },
});
