import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Breath } from "../data";

interface FooterProps {
  currentBreathTypeID: number;
  onPress: (id: number) => void;
}

const Footer = ({ currentBreathTypeID, onPress }: FooterProps) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerTitle}>Breath to reduce</Text>
      <View style={styles.actionButtonsContainer}>
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
      </View>
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
    fontSize: 18,
    fontWeight: "400",
    alignSelf: "center",
    marginBottom: 15,
  },
});
