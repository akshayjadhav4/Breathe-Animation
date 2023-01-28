import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { BreathType } from "../types";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface Props {
  currentBreatheType: BreathType;
}

const { width } = Dimensions.get("window");
const RADIUS = width / 4;

/**
 *  Polar to Cartesian -->
 *  x = RADIUS * cos(alpha)
 *  Y = RADIUS * sin(alpha)
 *
 */
function polarToCartesian(r: number, alpha: number) {
  "worklet";
  return {
    x: RADIUS * Math.cos(alpha),
    y: RADIUS * Math.sin(alpha),
  };
}

/**
 * Cartesian to Canvas -->
 *  x'= x + centerX
 *  y'= -1 * (y + centerY)
 */
function cartesianToCanvas(x: number, y: number) {
  "worklet";
  return {
    translateX: x + 0,
    translateY: -1 * (y + 0),
  };
}

const BreatheView = ({ currentBreatheType }: Props) => {
  const circles = new Array(8).fill(0);
  const progress = useSharedValue(0);
  const reanimatedBreatheViewStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(progress.value, [0, 1], [-180, 0]);
    return {
      transform: [{ rotate: `${rotateValue}deg` }],
    };
  });
  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 4000 }), -1, true);
  }, [progress]);

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, reanimatedBreatheViewStyles]}
    >
      {circles.map((_, index) => {
        const alpha = (index * 2 * Math.PI) / 8;

        const reanimatedStyles = useAnimatedStyle(() => {
          const { x, y } = polarToCartesian(RADIUS, alpha);
          const { translateX, translateY } = cartesianToCanvas(x, y);
          const translateXValue = interpolate(
            progress.value,
            [0, 1],
            [0, translateX]
          );
          const translateYValue = interpolate(
            progress.value,
            [0, 1],
            [0, translateY]
          );
          const scale = interpolate(progress.value, [0, 1], [0.2, 1]);
          return {
            transform: [
              { translateX: translateXValue },
              { translateY: translateYValue },
              { scale },
            ],
          };
        });
        return (
          <View key={index} style={styles.breatheViewContainer}>
            <Animated.View
              style={[
                { backgroundColor: currentBreatheType.color },
                styles.breatheCircle,
                reanimatedStyles,
              ]}
            />
          </View>
        );
      })}
    </Animated.View>
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
